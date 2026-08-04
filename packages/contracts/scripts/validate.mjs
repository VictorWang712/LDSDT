import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import SwaggerParser from "@apidevtools/swagger-parser";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { parse as parseYaml } from "yaml";

const contractRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "stage-1",
);

const readJson = async (relativePath) =>
  JSON.parse(await readFile(path.join(contractRoot, relativePath), "utf8"));

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  strictRequired: false,
});
addFormats(ajv);

const validations = [
  [
    "deployment-manifest.schema.json",
    "examples/deployment-manifest.valid.json",
  ],
  ["evaluation-result.schema.json", "examples/evaluation-result.passed.json"],
  ["evaluation-result.schema.json", "examples/evaluation-result.failed.json"],
  [
    "deployment-credential.schema.json",
    "examples/deployment-credential.valid.json",
  ],
];

const compiledSchemas = new Map();

for (const [schemaPath, examplePath] of validations) {
  const schema = await readJson(schemaPath);
  const example = await readJson(examplePath);
  const validate = compiledSchemas.get(schemaPath) ?? ajv.compile(schema);
  compiledSchemas.set(schemaPath, validate);

  if (!validate(example)) {
    console.error(`Invalid example: ${examplePath}`);
    console.error(validate.errors);
    process.exitCode = 1;
  } else {
    console.log(`✓ ${examplePath}`);
  }
}

const invalidManifest = structuredClone(
  await readJson("examples/deployment-manifest.valid.json"),
);
invalidManifest.artifacts.log_path = "/absolute/path/service.log";

const invalidPassedResult = structuredClone(
  await readJson("examples/evaluation-result.passed.json"),
);
delete invalidPassedResult.deployment_id;

const invalidPassedTests = structuredClone(
  await readJson("examples/evaluation-result.passed.json"),
);
invalidPassedTests.results[0].status = "failed";

const invalidPassedEvidence = structuredClone(
  await readJson("examples/evaluation-result.passed.json"),
);
invalidPassedEvidence.evidence_summary.local_inference_observed = false;

const invalidCredential = structuredClone(
  await readJson("examples/deployment-credential.valid.json"),
);
invalidCredential.platform.local_inference_observed = false;

const negativeValidations = [
  [
    "deployment-manifest.schema.json",
    "absolute artifact paths",
    invalidManifest,
  ],
  [
    "evaluation-result.schema.json",
    "passed results without a deployment ID",
    invalidPassedResult,
  ],
  [
    "evaluation-result.schema.json",
    "passed results containing failed tests",
    invalidPassedTests,
  ],
  [
    "evaluation-result.schema.json",
    "passed results without observed local inference",
    invalidPassedEvidence,
  ],
  [
    "deployment-credential.schema.json",
    "credentials without observed local inference",
    invalidCredential,
  ],
];

for (const [schemaPath, caseName, value] of negativeValidations) {
  const schema = await readJson(schemaPath);
  const validate = compiledSchemas.get(schemaPath) ?? ajv.compile(schema);
  compiledSchemas.set(schemaPath, validate);

  if (validate(value)) {
    console.error(`Schema accepted forbidden case: ${caseName}`);
    process.exitCode = 1;
  } else {
    console.log(`✓ rejects ${caseName}`);
  }
}
const openApiPath = path.join(contractRoot, "model-service-openapi.yaml");
const openApiSource = await readFile(openApiPath, "utf8");
const openApiDocument = parseYaml(openApiSource);

if (openApiDocument.openapi !== "3.1.0") {
  throw new Error("The model service contract must use OpenAPI 3.1.0.");
}

await SwaggerParser.validate(openApiPath);
console.log("✓ model-service-openapi.yaml");

if (process.exitCode) {
  throw new Error("Contract validation failed.");
}

console.log("All stage-one contracts are valid.");

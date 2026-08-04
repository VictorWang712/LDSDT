# LDSDT contracts

Machine-readable contracts shared by course documentation, starter kits, public tests, and evaluation services.

## Stage one

The `stage-1` directory contains the platform-independent v1 contracts for domestic-model deployment:

- `deployment-manifest.schema.json`: student deployment manifest;
- `model-service-openapi.yaml`: model service HTTP API;
- `evaluation-result.schema.json`: evaluator status and feedback;
- `deployment-credential.schema.json`: signed proof of a passing deployment.

Hardware models, allowed model IDs, runtime combinations, timeouts, and resource thresholds are intentionally excluded. A semester-specific platform profile will constrain those values after the teaching environment is known.

## Validation

From the repository root:

```bash
pnpm contracts:check
```

Examples are normative for structure, but their IDs, URLs, timestamps, hashes, and implementation names are illustrative.

## Credential signing

The credential schema validates structure; cryptographic verification belongs to the evaluation service. To create `proof.value`:

1. construct the complete credential and omit only `proof.value`;
2. canonicalize that object with RFC 8785;
3. sign the canonical bytes with the issuer's Ed25519 private key;
4. encode the 64-byte signature as unpadded base64url.

The example credential contains a structurally valid placeholder signature and must not be treated as authentic.

## Versioning

Breaking changes require a new protocol identifier and schema major version. Existing v1 files must not be silently reinterpreted after students begin the experiment.

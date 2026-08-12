# Eight-Week Course Plan

## Course project

Teams of three build an end-to-end LLM-driven software development and testing
system. Given a well-defined natural-language task package, the system must
autonomously understand the requirements, design the software, implement and
test it, diagnose failures, and output an executable code repository together
with reproducible execution evidence.

The course fixes the external task, submission, and evaluation protocols. Teams
are free to choose the number of agents, orchestration topology, prompts,
intermediate representations, memory strategy, and internal implementation.

## Weekly milestones

| Week | Module                        | Required capability                                                                                                                                                                             | Check                                                                                                                                                           |
| ---- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Runtime and baseline          | Accept a task package, call an LLM, operate in an isolated workspace, invoke development tools, produce a repository and structured event log                                                   | Run the provided calibration task from the standard CLI; verify process exit, output layout, build instructions, and event schema                               |
| 2    | Requirement understanding     | Transform natural-language requirements into a persistent, machine-readable Requirement IR containing IDs, acceptance criteria, constraints, dependencies, assumptions, and source traceability | Validate the IR against the team's schema; test supplied normal, ambiguous, and incomplete requirement fixtures; verify a downstream module consumes it         |
| 3    | Architecture and interfaces   | Generate module boundaries, data model, public interfaces, design decisions, and requirement-to-design traceability before implementation                                                       | Run schema and consistency checks; confirm every required behavior is allocated and every public interface is machine-readable; review one design decision      |
| 4    | Software implementation       | Plan implementation tasks, create and modify files, manage dependencies, build the repository, preserve checkpoints, and complete one vertical feature slice                                    | Generate the slice from supplied artifacts in a clean workspace; run the declared install/build/start commands and the public slice tests                       |
| 5    | Test design and execution     | Derive a test plan from the specification, generate executable tests and oracles, run them, and emit structured results covering normal, boundary, and failure behavior                         | Evaluate generated tests on a reference repository and seeded faulty variants; verify real execution and structured feedback rather than self-reported success  |
| 6    | Debugging and repair          | Diagnose failing evidence, produce bounded patches, rerun affected and regression tests, stop under explicit conditions, and resume from persisted state                                        | Repair supplied defects under a fixed budget; require target tests and regression tests to pass; interrupt and resume one run; inspect the repair trace         |
| 7    | Public end-to-end integration | Connect all modules behind the standard entry point and autonomously generate an executable repository for the public task                                                                      | Freeze a candidate commit, run it in a clean environment with a fixed budget, then apply public acceptance tests and inspect completeness of logs and artifacts |
| 8    | Private end-to-end evaluation | Run the frozen system on an unseen task without human modification of generated code and submit the repository, execution trace, and analysis                                                   | Course staff reproduce the run, build and start the output, execute private tests, conduct structured repository review, and perform targeted manual inspection |

## Assessment

There is no written examination. The proposed course grade is entirely based on
laboratory work:

- Weeks 1-6 module milestones: 42% (7% each)
- Public end-to-end task: 18%
- Private end-to-end task: 30%
- Reproducibility, logs, engineering explanation, and final analysis: 10%

End-to-end evaluation combines deterministic build and launch checks,
independent functional and robustness tests, structured repository review, and
targeted manual inspection. Team deliverables receive a base score; individual
scores may be adjusted using Git history, responsibility records, and an oral
check of design understanding.

## Required teaching infrastructure

- AI coding platform accounts and, if platform memberships are not
  programmable, a course-managed LLM API with controlled quotas
- A minimal starter runtime providing model access, workspace isolation, file
  and shell tools, timeouts, retries, and event logging
- A stable task package format, command-line entry point, output repository
  manifest, intermediate artifact conventions, and execution-log schema
- One constrained reference application stack and reproducible container images
- Git hosting and continuous integration for approximately 17 teams
- Weekly fixtures, seeded faulty repositories, one public end-to-end task, one
  or more private tasks, and independent tests calibrated for comparable scope
- Isolated evaluation machines with resource, network, time, and process limits
- Course website, complete laboratory manuals, versioned resources, and a
  support channel

Exact platforms, models, quotas, task domains, and evaluation infrastructure
remain deployment parameters and can be filled in without changing the course
architecture.

# AGENTS.md

Resolver for agent-facing guidance in this repo. Each section points
at the canonical location — content lives there, not here. If you find
yourself duplicating a rule across docs, the duplicate is wrong.

## What is this repo

TypeScript / JavaScript SDKs for Azure services. Monorepo managed by
`pnpm` + Turborepo.

- Packages live under `sdk/*` (e.g. `sdk/web-pubsub/web-pubsub`).
- Shared tools in `common/tools/*` (eslint plugin, dev-tool, warp).
- Engineering tooling under `eng/*`; deep-dive docs under `documentation/*`.
- Contributor onboarding: see `README.md` and `CONTRIBUTING.md`.

## Where to find guidance

| Task / topic | Where to look |
| --- | --- |
| Build / test / lint / format / release a package | `.github/skills/sdk-workflow/SKILL.md` |
| Add a feature to a package under `sdk/` | `.github/skills/find-package-skill/SKILL.md` (check the registry FIRST) |
| Generate or regenerate SDK code from TypeSpec | `.github/skills/azsdk-common-generate-sdk-locally/SKILL.md` |
| Release / publish a package | `.github/skills/azsdk-common-sdk-release/SKILL.md` |
| Resolve APIView feedback | `.github/skills/azsdk-common-apiview-feedback-resolution/SKILL.md` |
| Troubleshoot a CI / pipeline failure | `.github/skills/azsdk-common-pipeline-troubleshooting/SKILL.md` |
| Create a new package-specific skill | `.github/skills/create-package-skill/SKILL.md` |
| Code review (architecture, perf, security, deps, tests, docs, mgmt) | `.github/instructions/reviewer/*.instructions.md` |
| Test framework, recorder lifecycle, asset-sync | `documentation/Quickstart-on-how-to-write-tests.md` |
| TypeSpec / codegen workflow | `documentation/Generate-code-from-TypeSpec.md` |
| Linting rules and troubleshooting | `documentation/linting.md` |
| Dependency management | `documentation/dependency-management.md` |
| Authoritative API design guidelines | https://azure.github.io/azure-sdk/typescript_design.html |
| Other deep dives | `documentation/` (browse the directory) |

The skills above carry workflow guidance the rest of this repo's
contributor docs assume agents will find. Read them on demand — don't
load them all up front.

## Hard rules

Rules agents have violated in the past and which the eval suite at
`eng/agent-evals/` actively regression-tests. Each one is here because
it has no static-analysis enforcement today (otherwise it would be a
lint rule or CI check, not an eval).

- Build a single package with `pnpm turbo build --filter=<pkg>... --token 1`.
  Do **not** use `npm run build` at the package level — turbo workspace
  linking breaks it.
- Do **not** edit files under `<package>/generated/`. Those are
  regenerated on every `tsp-client` run. Customizations go in `src/`
  or via TypeSpec decorators. See the modular-customization doc.
- `snippets.spec.ts` files are documentation source, **not** real tests.
  Don't refactor, delete, or "fix" them as part of test cleanup. They're
  consumed by `dev-tool run update-snippets` to keep README code blocks
  in sync.
- Options bags on client methods extend `OperationOptions` from a core
  package (`@azure-rest/core-client`, `@azure/core-client`, or
  `@azure/core-rest-pipeline` depending on the package lineage).
- Do **not** disable `@azure/eslint-plugin-azure-sdk` rules with
  `eslint-disable` directives. Fix the underlying issue.
- Do **not** hand-roll long-running operations. Use the LRO primitives
  in `@azure/core-lro` and `@azure/core-client`. Review
  `sdk/core/core-lro` for the latest patterns.
- Always consult `find-package-skill/SKILL.md` (and the relevant
  package-specific `SKILL.md` if one is registered there) **before**
  modifying a package under `sdk/`.

## Where new guidance belongs

Rules for the agent that maintains this file:

- A rule that applies to **all** package work → here, "Hard rules"
  section, **only if** it's eval-covered. Don't add hard rules without
  a corresponding eval in `eng/agent-evals/` — the eval is what
  prevents the rule from silently drifting.
- A workflow that's specific to one task type (build, generate,
  release, ...) → a new or existing skill in `.github/skills/`.
- Reviewer-only behavior → `.github/instructions/reviewer/`.
- Deep-dive how-to or tutorial → a new file under `documentation/`,
  then a row in the "Where to find guidance" table above pointing at
  it.
- Package-specific tribal knowledge → a package-owned skill at
  `sdk/<svc>/<pkg>/.github/skills/<name>/SKILL.md`.
- Contributor-facing prose (workflows, prerequisites, setup) →
  `CONTRIBUTING.md`, not here. AGENTS.md is for agent-routing only.

If a fact would belong in two places, pick the more-specific one. Link
from the less-specific to the more-specific, don't copy.

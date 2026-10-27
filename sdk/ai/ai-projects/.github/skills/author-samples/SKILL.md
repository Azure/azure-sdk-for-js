---
name: author-samples
description: "Reconcile existing ai-projects samples with regenerated API shapes, including existing beta consumers, and author samples for qualifying new features. Use after API changes even when no new sample is needed. Validate all samples with npm run build:samples."
---

# Maintain ai-projects samples and author new examples

## When to Use

- After `apply-post-emitter-edits` has merged in new public API surface.
- After it has changed an API shape used by an existing sample, even when no new sample is needed.
- The diff of `review/ai-projects-node.api.md` shows new classes, methods, or namespaces.
- A new agent tool, operation, or namespace was added that has no example yet under `samples-dev/`.

## Inputs

- The current API surface report: [review/ai-projects-node.api.md](../../../review/ai-projects-node.api.md).
- The previous version of that file (`git show HEAD:review/ai-projects-node.api.md`).
- Existing samples under [samples-dev/](../../../samples-dev/) — used as style/voice anchors.

## Procedure

Run from `sdk/ai/ai-projects/`.

### Step 0: Reconcile existing samples

Inspect existing samples that use changed methods or model properties against
the finalized `src/` declarations and freshly built API surface. Preserve the
sample's behavior while updating intentional API-shape changes; this maintenance
also applies to existing beta samples and is not limited to newly added APIs.
For SDK `Metadata` properties, use the
[metadata migration guidance](../author-tests/SKILL.md#step-0-reconcile-existing-tests-with-the-regenerated-api);
plain record and OpenAI-client metadata maps must not be wrapped.

Run Step 4 even when no additions qualified for a new sample. A compiler error
from a verified shape change permits one focused consumer fix followed by
revalidation, not an immediate STOP or an SDK compatibility rollback. Stop if
the error is unexplained or validation still fails. Report a sample no-op only
when no new or existing sample changed and compilation passed; otherwise omit
`-SamplesNoOp` when publishing the regeneration.

### Step 1: Diff the API surface

Use the bundled prompt to identify additions:

[prompts/diff-api-surface.prompt.md](./prompts/diff-api-surface.prompt.md)

Concretely:

```powershell
git diff HEAD -- review/ai-projects-node.api.md > /tmp/api-surface.diff
```

Extract added items only (lines beginning with `+` that declare a class, method, namespace, or interface). Ignore reformatting noise.

### Step 2: Bucket each addition

Map each new feature to one of the existing `samples-dev/` subfolders. Existing buckets:

`agents/`, `assets/`, `chatCompletions/`, `connections/`, `conversations/`, `datasets/`, `deployments/`, `evaluations/`, `files/`, `finetuning/`, `indexes/`, `mcpTools/`, `memories/`, `redTeam/`, `responses/`, `skills/`, `telemetry/`, `toolboxes/`

If a new feature does not fit any existing bucket, create a new lowercase subfolder and surface the choice to the human.

### Step 3: Generate the sample

For each bucketed feature, produce a `samples-dev/<bucket>/<featureName>.ts` file from [templates/sample-skeleton.ts](./templates/sample-skeleton.ts). Conventions taken from existing samples (`samples-dev/agents/agentBasic.ts` is the canonical reference):

- Header: copyright comment, then a TSDoc block with `@summary` and `@azsdk-weight`.
- Import `DefaultAzureCredential` from `@azure/identity` and `AIProjectClient` from `@azure/ai-projects`.
- Import `"dotenv/config"` for env loading.
- Pull endpoint and model from `process.env["FOUNDRY_PROJECT_ENDPOINT"]` and `process.env["FOUNDRY_MODEL_NAME"]`.
- Define `export async function main(): Promise<void>` and end with `main().catch((err) => { console.error("Sample failed: ", err); });`.
- Use `console.log` to narrate each step.

### Step 4: Validate

```powershell
npm run build:samples
```

Must succeed. If it fails, fix the sample (do not loosen lint/tsc). Also run `npm run check-format` and `npm run format` if needed.

### Step 5: Hand off

Done. Next: the `author-tests` skill for existing test maintenance and any new
GA coverage, even when no new GA features were added, then `update-changelog`.

## Notes

- Do **not** author samples for `project.beta.*` additions unless explicitly asked — beta surface is allowed to stay sample-less. (Beta samples that already exist in `samples-dev/` like `agents/betaAgents.ts` are fine; just don't add new ones reflexively.)
- Match the voice of nearby samples in the same bucket. Read at least one neighboring file before writing.
- Samples must be runnable end-to-end against a real Foundry project; do not mock.
- **Watch for cascade renames from `apply-post-emitter-edits`.** If a method on the public surface was renamed in the customization layer (e.g. `listSessionFiles` → `getSessionFiles`), `npm run build:samples` will fail in _existing_ samples that called the old name. Fix the call site in the existing sample as part of this skill — do not revert the rename. Cross-reference the rename table in [../apply-post-emitter-edits/references/post-emitter-workarounds.md](../apply-post-emitter-edits/references/post-emitter-workarounds.md) before debugging build failures.

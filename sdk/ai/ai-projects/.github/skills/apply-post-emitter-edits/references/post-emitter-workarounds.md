# Post-emitter workarounds for ai-projects

> Bundled reference for the `apply-post-emitter-edits` skill. The canonical
> source is [`scripts/post-emitter-workarounds.md`](../../../../scripts/post-emitter-workarounds.md);
> prefer it if it has been updated.

Merge guidelines for newly emitted code from the `./incoming` directory:

- The following files **must not be deleted or changed** by the emitter merge:

  ```
  src/aiProjectClient.ts
  src/constants.ts
  src/getCustomFetch-browser.mts
  src/getCustomFetch.ts
  src/overwriteOpenAIClient.ts
  src/util.ts
  src/api/aiProjectContext.ts
  src/api/telemetry/index.ts
  src/api/telemetry/operations.ts
  src/api/datasets/operations.ts
  src/classic/telemetry/index.ts
  src/classic/datasets/index.ts
  src/classic/index.ts
  src/static-helpers/**
  ```

- **IMPORTANT**: If any change or deletion has occurred in the files listed above, the merge has failed and **all operations should be aborted**.

- In `src/models/models.ts`, only accept **added** models. Unless otherwise instructed, do not change or delete existing models in this file. **NOTE**: `dev-tool customization apply` does NOT automatically copy newly emitted models from `generated/models/models.ts` into `src/models/models.ts` — you must propagate any new model interfaces, unions, serializers, and deserializers manually.

- In `src/models/index.ts`, only accept **added** models. Unless otherwise instructed, do not change or delete existing models in this file. Same manual-propagation note as above applies.

- `foundryFeatures` must **not** be a positional parameter for any method, internal or external facing. Instead, instantiate it locally to a default value before sending it over the wire. **However**, `foundryFeatures` IS allowed as a property on `*Options` / `*OptionalParams` interfaces (i.e. as a member of the options bag, e.g. `foundryFeatures?: "Skills=V1Preview"`). Only positional parameters are forbidden. Any changes making `foundryFeatures` a method parameter must be reverted to the local-const pattern.

- **No changes to the `list` operation in `BetaEvaluatorsOperations` are permitted.** The emitter wants to create a `listLatestVersions` method instead of `list`, but that is not allowed. Revert the rename.

- **Known customization-layer renames** (custom name on the right; if the spec-side name appears in `src/` after a regen, it's a propagation false positive — add a private alias instead of copying):

  | Spec name | Custom name |
  | --- | --- |
  | `_FileSearchToolFiltersValue` | `_ComparisonFilterValue` |
  | `_FileSearchToolFiltersFilter` | `_CompoundFilterFilter` |
  | `_updateAgentSend` / `_createAgentSend` | `_updateSend` / `_createSend` |
  | `AgentsUpdateAgentOptionalParams` / `AgentsCreateAgentOptionalParams` | `AgentsUpdateOptionalParams` / `AgentsCreateOptionalParams` |
  | `DeleteVersionOptionalParams` (et al. on toolboxes) | `BetaToolboxesDeleteVersionOptionalParams` (et al.) |
  | `agentSessionId` (positional param on beta agents session ops) | `sessionId` |
  | `name` (positional param on beta toolbox ops) | `toolboxName` |
  | `listSessionFiles` (on `project.beta.agents`) | `getSessionFiles` |

- **Known duplicate-export hot spots** in `src/models/models.ts` after a regen — always sweep these and keep only the earlier definition:

  - `MCPToolFilter`, `mcpToolFilterSerializer`, `mcpToolFilterDeserializer`
  - `MCPToolRequireApproval`, `mcpToolRequireApprovalSerializer`, `mcpToolRequireApprovalDeserializer`

- **Known duplicate-property hot spot**: the `AgentVersion` interface and its `agentVersionDeserializer` may end up with two `status` fields — keep `status?: AgentVersionStatus` and delete the bare-string-literal duplicate.

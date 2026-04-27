Merge guidelines for newly emitted code from the .\incoming directory:
- The following files should not be deleted or changed:
    src\aiProjectClient.ts
    src\constants.ts
    src\getCustomFetch-browser.mts
    src\getCustomFetch.ts
    src\overwriteOpenAIClient.ts
    src\util.ts
    src\api\aiProjectContext.ts
    src\api\telemetry\index.ts
    src\api\telemetry\operations.ts
    src\api\datasets\operations.ts
    src\classic\telemetry\index.ts
    src\classic\datasets\index.ts
    src\classic\index.ts
    src\static-helpers\**
- IMPORTANT: If any change or deletion has occurred in the files listed above, the merge has failed, and all operations should be aborted.
- In src\models\models.ts, please only accept added models. Unless otherwise instructed in the prompt, do not change or delete existing models in this file. NOTE: `dev-tool customization apply` does NOT automatically copy newly emitted models from `generated/models/models.ts` into `src/models/models.ts` — you must propagate any new model interfaces, unions, serializers, and deserializers manually.
- In src\models\index.ts, please only accept added models. Unless otherwise instructed in the prompt, do not change or delete existing models in this file. Same manual-propagation note as above applies.
- foundryFeatures must not be a positional parameter for any method, internal or external facing. Instead, instantiate it locally to a default value before sending it over the wire. foundryFeatures IS allowed as a property on `*Options` / `*OptionalParams` interfaces (the options bag); only positional parameters are forbidden. Any changes making foundryFeatures a method parameter should be reverted to the local-const pattern.
- No changes to the list operation in BetaEvaluatorsOperations are permitted. The emitter wants to create a "listLatestVersions" method instead of list, but that is not allowed.
- Known customization-layer renames (custom name on the right). If the spec-side name still appears in `src/` after a regen, it is a propagation false positive — add a private `type` alias rather than copying the definition:
  - `_FileSearchToolFiltersValue` → `_ComparisonFilterValue`
  - `_FileSearchToolFiltersFilter` → `_CompoundFilterFilter`
  - `_updateAgentSend` / `_createAgentSend` → `_updateSend` / `_createSend`
  - `AgentsUpdateAgentOptionalParams` / `AgentsCreateAgentOptionalParams` → `AgentsUpdateOptionalParams` / `AgentsCreateOptionalParams`
  - `DeleteVersionOptionalParams` (and siblings on toolboxes) → `BetaToolboxesDeleteVersionOptionalParams` (and siblings)
  - `agentSessionId` (positional param on beta agents session ops) → `sessionId`
  - `name` (positional param on beta toolbox ops) → `toolboxName`
  - `listSessionFiles` (on `project.beta.agents`) → `getSessionFiles`
- Known duplicate-export hot spots in `src/models/models.ts` after a regen — sweep these and keep only the earlier definition: `MCPToolFilter` / `mcpToolFilterSerializer` / `mcpToolFilterDeserializer`, and `MCPToolRequireApproval` / `mcpToolRequireApprovalSerializer` / `mcpToolRequireApprovalDeserializer`.
- Known duplicate-property hot spot: the `AgentVersion` interface and its `agentVersionDeserializer` may end up with two `status` fields — keep `status?: AgentVersionStatus` and delete the bare-string-literal duplicate.
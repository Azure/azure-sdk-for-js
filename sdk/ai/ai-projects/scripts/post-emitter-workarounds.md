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
- After resolving customization conflicts and propagating top-level exports, run `.github\skills\apply-post-emitter-edits\scripts\check-generated-member-parity.mjs`. It checks newly added members of existing interfaces and request-body objects in `*Send` functions. Matching export names are not sufficient because optional members and their wire mappings can be dropped while the package still compiles.
- foundryFeatures must not be a positional parameter for any method, internal or external facing. Instead, instantiate it locally to a default value before sending it over the wire. foundryFeatures IS allowed as a property on `*Options` / `*OptionalParams` interfaces (the options bag); only positional parameters are forbidden. Any changes making foundryFeatures a method parameter should be reverted to the local-const pattern.
- No changes to the list operation in BetaEvaluatorsOperations are permitted. The emitter wants to create a "listLatestVersions" method instead of list, but that is not allowed.
- Known customization-layer renames (custom name on the right). If the spec-side name still appears in `src/` after a regen, it is a propagation false positive — add a private `type` alias rather than copying the definition:
  - `_FileSearchToolFiltersValue` → `_ComparisonFilterValue`
  - `_FileSearchToolFiltersFilter` → `_CompoundFilterFilter`
  - `_updateAgentSend` / `_createAgentSend` → `_updateSend` / `_createSend`
  - `AgentsUpdateAgentOptionalParams` / `AgentsCreateAgentOptionalParams` → `AgentsUpdateOptionalParams` / `AgentsCreateOptionalParams`
  - `DeleteVersionOptionalParams` (and siblings on toolboxes) → `BetaToolboxesDeleteVersionOptionalParams` (and siblings)
  - `agentSessionId` (positional param on beta agents **session management** ops: `deleteSession`, `getSession`, `createSession`, `getSessionLogStream`) → `sessionId`. **Note:** the session **file** operations (`deleteSessionFile`, `getSessionFiles`, `downloadSessionFile`, `uploadSessionFile`) keep the spec-side name `agentSessionId` as their public parameter.
  - `name` (positional param on beta toolbox ops) → `toolboxName`
- Known duplicate-export hot spots in `src/models/models.ts` after a regen — sweep these and keep only the earlier definition: `MCPToolFilter` / `mcpToolFilterSerializer` / `mcpToolFilterDeserializer`, and `MCPToolRequireApproval` / `mcpToolRequireApprovalSerializer` / `mcpToolRequireApprovalDeserializer`.
- Known duplicate-property hot spot: the `AgentVersion` interface and its `agentVersionDeserializer` may end up with two `status` fields — keep `status?: AgentVersionStatus` and delete the bare-string-literal duplicate.
- Browser-compatibility hot spot for `node:fs` / `node:path` usage: the emitter writes **named** imports (e.g. `import { readFileSync, readdirSync, statSync } from "node:fs"` and `import { join, relative } from "node:path"`) in `src/api/beta/models/operations.ts`. Vite externalizes `node:fs` to a stub for the browser, and named imports bind those properties at module-load time, which throws `Module "node:fs" has been externalized for browser compatibility` and fails ALL browser test suites that transitively import the module. After a regen, convert these to default imports with lazy property access (the pattern already used in `src/api/datasets/operations.ts`): `import fs from "node:fs"` + `import nodePath from "node:path"`, then call `fs.readFileSync` / `fs.readdirSync` / `fs.statSync` and `nodePath.join` / `nodePath.relative`. Apply the same fix to any other emitted `src/` file that introduces named `node:fs`/`node:path` imports.
- Job-creating LROs must keep the job id reachable from the poller. The three beta job-create operations are emitted as `getLongRunningPoller(...) as PollerLike<OperationState<T>, T>`, where `T` is the job's terminal `result` payload (the spec marks it `@lroResult`), so the queued job's id is dropped and callers cannot use the paired get/cancel/delete APIs without an unfiltered list-and-match lookup. After a regen, re-apply the customization in these files:
  - `src/api/beta/agents/operations.ts` → `createOptimizationJob` returns `JobPoller<OptimizationJobResult>`
  - `src/api/beta/datasets/operations.ts` → `createGenerationJob` returns `JobPoller<DataGenerationJobResult>`
  - `src/api/beta/evaluators/operations.ts` → `createGenerationJob` returns `JobPoller<EvaluatorVersion>`

  In each, swap `getLongRunningPoller` for `getJobPoller` from `src/static-helpers/pollingHelpers.ts`, drop the trailing `as PollerLike<...>` cast, and replace the `@azure/core-lro` type import with `import type { JobPoller } from "../../../static-helpers/pollingHelpers.js"`. Mirror the same return type in `src/classic/beta/{agents,datasets,evaluators}/index.ts`. `JobOperationState` / `JobPoller` are re-exported from `src/index.ts`; `getJobPoller` is internal. `getJobPoller` is a delegating `PollerLike` wrapper rather than an `Object.defineProperty` patch on `operationState`, because `operationState` being an own accessor is an undocumented core-lro internal and this package floats on `@azure/core-lro: ^3.1.0`. Remove this workaround once the spec stops annotating `result` with `@lroResult` and the LRO's final result becomes the job resource itself (which carries `id`); the wrapper can also collapse into plain options once core-lro gains an init-time state hook (https://github.com/Azure/azure-sdk-for-js/issues/39476).

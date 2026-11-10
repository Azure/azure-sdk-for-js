# Post-emitter workarounds for ai-projects

> Bundled reference for the `apply-post-emitter-edits` skill. The canonical
> source is [`scripts/post-emitter-workarounds.md`](../../../../scripts/post-emitter-workarounds.md);
> prefer it if it has been updated.

Integration guidelines for newly emitted code in `generated/` and customized code in `src/`:

- The following hand-maintained files are protected from broad emitter rewrites or deletion:

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

- Narrowly scoped changes to protected files are permitted when necessary to integrate verified upstream APIs (for example, wiring a new operation group into the customized client and its exports). Start from the clean pre-regeneration customization baseline, preserve existing authentication scopes, tracing, user-agent construction, paging options/headers, error shapes, and other custom behavior, and reject unrelated emitter rewrites. Audit every intentional protected-file delta against upstream evidence and validate it with focused regression tests, build, API extraction, lint, and formatting. Stop for unresolved drift or validation failures, not merely because a protected path changed.
- When resuming after emitter output has already been committed, use the recorded clean pre-regeneration ref rather than `HEAD` for all generated/source/API comparisons and restoration decisions. Pass `--base-ref <clean-ref>` to both the member-parity guard and the model-removal synchronizer. Never reset history or discard preserved output just to recover an uncommitted workflow.

- In `src/models/models.ts`, additions-only is the default. **NOTE**: `dev-tool customization apply` does NOT automatically copy newly emitted models from `generated/models/models.ts` into `src/models/models.ts`, so propagate additions manually. When upstream intent and the generated baseline diff establish that models were removed, start from the clean customized source and run `.github/skills/apply-post-emitter-edits/scripts/sync-generated-model-removals.mjs --write`; never replace the file with its generated counterpart.

- Apply the same additions-only default and generated-removal synchronizer to `src/models/index.ts` and its top-level re-exports.

- The model-removal synchronizer may cascade only to customized declarations that depend on a removed declaration. It must not delete an independent support declaration merely because a removed model references it. For a reviewed custom-only removal that never existed in `generated/`, pass its exact name to the parity guard with `--allow-source-removal`; stale or misspelled allowances fail validation.

- After resolving customization conflicts and synchronizing validated additions/removals, run `.github/skills/apply-post-emitter-edits/scripts/check-generated-member-parity.mjs`. It checks newly added members of existing interfaces, serializer/deserializer return objects, and request-body objects in `*Send` functions; preserves baseline exports except generated-backed model removals; rejects `src/restorePollerHelpers.ts` references; and enforces the customized `@azure/core-paging` imports in `src/index.ts`. A wholesale generated-to-`src` copy can contain every newly emitted member while silently deleting maintained API and import customizations, so all checks are required.

- `foundryFeatures` must **not** be a positional parameter for any method, internal or external facing. Use a local constant only for an operation's required preview flag; do not manufacture a default for GA or conditional operations. `foundryFeatures` IS allowed as a property on `*Options` / `*OptionalParams` interfaces (the options bag). Forward explicit conditional opt-ins from that bag, without adding positional parameters.
- Apply the VoiceAgents GA split per operation and selected model, not as a blanket preview-header preservation rule. Realtime/cascaded definitions, delegate subagents, phone system tools, `agents:generate`, all 14 stored Realtime conversation operations, Realtime protocol/OpenAI Realtime models, TPE/Twilio telephony, and call-job list/get are GA without a VoiceAgents header. Never add that header to `agents:generate`. Telephony binding/transfer/call writes and call-job create/cancel/delete forward an explicit `VoiceAgents=V1Preview` option only when SIP is used. GPT Live definitions/delegation/sessions/conversations/models, inline handoff configuration/state/events, SIP models, all seven campaigns, and `post_call` configuration/types remain preview; unions containing those members retain their conditional opt-in contracts.
- Determine SIP usage from the connection/binding/call/job provider or a SIP destination, not address discriminators alone: a SIP connection can use `phone_number` source and destination addresses. `transfer.require_handoff` is a GA transfer-summary setting, distinct from preview inline handoff, and must not trigger a blanket handoff opt-in.
- Keep `project.voiceAgents.realtime` as the primary native Realtime entry point. Preserve `project.beta.voiceAgents.realtime` only as a deprecated compatibility alias to the exact same instance; use the root path in all runnable examples. `RealtimeConnectOptions.foundryFeatures` explicitly opts a connection into preview when the agent uses inline handoff, SIP transfer destinations, or `post_call`; ordinary Realtime connects send no flag. Native GPT Live remains under beta and always supplies its required flag internally. Keep typed opt-ins and reserved-query validation intact.
- Keep campaign operations under `project.beta.voiceAgents.telephony`, with `deleteCampaign` as the preferred public name and `deleteTelephony` only as a deprecated compatibility alias. Preserve the existing REST helper and request body.

- Preserve arbitrary JSON Schema properties in `RealtimeFunctionToolParameters`: expose a `Record<string, unknown>` and serialize its contents, not the emitter's empty object. A voice function tool must retain its `type`, `properties`, and `required` schema entries on the wire.
- New voice/telephony list operations must use the customized cursor paging helper with `last_id` / `has_more` and forward operation options and headers on continuation requests, including required Live/campaign flags or explicit conditional SIP opt-ins where applicable; never add a VoiceAgents flag to a GA continuation by default. Outbound campaign LROs use the existing `pollHeaders` option to preserve required preview and custom headers. Preserve explicit conditional opt-ins through applicable polling as well; their presence must not make unrelated GA requests preview. The terminal `TelephonyOperationResource` already includes the resource id, so no new identity wrapper is needed.

- **Preserve the evaluator `list` name, never `listLatestVersions`.** After the verified promotion in azure-rest-api-specs#46830, it belongs to root `EvaluatorsOperations`; `BetaEvaluatorsOperations` retains only uploads. Require generated-baseline promotion evidence and retain upload options while removing unused promoted beta options. Root evaluator wiring must use the same cognitive auth context previously supplied to beta.

- **Known customization-layer renames** (custom name on the right; if the spec-side name appears in `src/` after a regen, it's a propagation false positive — add a private alias instead of copying):

  | Spec name                                                             | Custom name                                                 |
  | --------------------------------------------------------------------- | ----------------------------------------------------------- |
  | `_FileSearchToolFiltersValue`                                         | `_ComparisonFilterValue`                                    |
  | `_FileSearchToolFiltersFilter`                                        | `_CompoundFilterFilter`                                     |
  | `_updateAgentSend` / `_createAgentSend`                               | `_updateSend` / `_createSend`                               |
  | `AgentsUpdateAgentOptionalParams` / `AgentsCreateAgentOptionalParams` | `AgentsUpdateOptionalParams` / `AgentsCreateOptionalParams` |
  | `DeleteVersionOptionalParams` (et al. on toolboxes)                   | `BetaToolboxesDeleteVersionOptionalParams` (et al.)         |
  | `agentSessionId` (positional param on `project.agents` session ops)   | `sessionId`                                                 |
  | `name` (positional param on beta toolbox ops)                         | `toolboxName`                                               |

- **Known duplicate-export hot spots** in `src/models/models.ts` after a regen — always sweep these and keep only the earlier definition:

  - `MCPToolFilter`, `mcpToolFilterSerializer`, `mcpToolFilterDeserializer`
  - `MCPToolRequireApproval`, `mcpToolRequireApprovalSerializer`, `mcpToolRequireApprovalDeserializer`

- **Known duplicate-property hot spot**: the `AgentVersion` interface and its `agentVersionDeserializer` may end up with two `status` fields — keep `status?: AgentVersionStatus` and delete the bare-string-literal duplicate.

- **Identity-bearing LROs must preserve the created resource id.** The emitter resolves these operations to terminal result payloads that omit the id needed by paired get, cancel, and delete operations:

  - Optimization, data-generation, and evaluator-generation operations return `JobPoller<T>` and expose `operationState.jobId` through `getJobPoller`, including after promotion out of beta.
  - `src/api/beta/agentInsightMonitors/operations.ts#createRun` returns `RunPoller<AgentInsightRunResult>` and exposes `operationState.runId` through `getRunPoller`.

  Mirror each customized return type in its corresponding `src/classic/` operations interface and re-export `JobOperationState` / `JobPoller` and `RunOperationState` / `RunPoller` from `src/index.ts`. The internal helpers share a delegating `PollerLike` wrapper so the id is present through `operationState`, `poll()`, `onProgress()`, serialization, and resume.

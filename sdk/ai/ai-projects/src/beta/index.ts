// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Beta subpath entry point for `@azure/ai-projects`.
 *
 * Importing this module augments the `AIProjectClient` with beta operation groups
 * (memoryStores, redTeams, schedules, evaluators, insights, evaluationTaxonomies)
 * and adds `foundryFeatures` opt-in flags to GA operation options for preview features.
 *
 * @example
 * ```typescript
 * import { AIProjectClient } from "@azure/ai-projects";
 * import "@azure/ai-projects/beta";
 *
 * const client = new AIProjectClient(endpoint, credential);
 * // Beta operation groups are now available:
 * const store = await client.memoryStores.create("my-store", definition);
 * // Preview foundryFeatures flags are now available on GA operations:
 * await client.agents.create("my-agent", body, { foundryFeatures: "WorkflowAgents=V1Preview" });
 * ```
 *
 * @module
 */

import { AIProjectClient } from "../aiProjectClient.js";
import type { AIProjectContext } from "../api/aiProjectContext.js";
import { _getBetaMemoryStoresOperations } from "../classic/beta/memoryStores/index.js";
import { _getBetaRedTeamsOperations } from "../classic/beta/redTeams/index.js";
import { _getBetaSchedulesOperations } from "../classic/beta/schedules/index.js";
import { _getBetaInsightsOperations } from "../classic/beta/insights/index.js";
import { _getBetaEvaluatorsOperations } from "../classic/beta/evaluators/index.js";
import { _getBetaEvaluationTaxonomiesOperations } from "../classic/beta/evaluationTaxonomies/index.js";
import type { BetaMemoryStoresOperations } from "../classic/beta/memoryStores/index.js";
import type { BetaRedTeamsOperations } from "../classic/beta/redTeams/index.js";
import type { BetaSchedulesOperations } from "../classic/beta/schedules/index.js";
import type { BetaInsightsOperations } from "../classic/beta/insights/index.js";
import type { BetaEvaluatorsOperations } from "../classic/beta/evaluators/index.js";
import type { BetaEvaluationTaxonomiesOperations } from "../classic/beta/evaluationTaxonomies/index.js";

// ---------------------------------------------------------------------------
// Module augmentation: Add beta operation groups to AIProjectClient
// ---------------------------------------------------------------------------

declare module "../aiProjectClient.js" {
  interface AIProjectClient {
    /** Beta: Memory Stores operations */
    readonly memoryStores: BetaMemoryStoresOperations;
    /** Beta: Red Teams operations */
    readonly redTeams: BetaRedTeamsOperations;
    /** Beta: Schedules operations */
    readonly schedules: BetaSchedulesOperations;
    /** Beta: Insights operations */
    readonly insights: BetaInsightsOperations;
    /** Beta: Evaluators operations */
    readonly evaluators: BetaEvaluatorsOperations;
    /** Beta: Evaluation Taxonomies operations */
    readonly evaluationTaxonomies: BetaEvaluationTaxonomiesOperations;
  }
}

// ---------------------------------------------------------------------------
// Module augmentation: Add foundryFeatures to GA operation options
// ---------------------------------------------------------------------------

declare module "../api/agents/options.js" {
  interface AgentsCreateOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?:
      | "ContainerAgents=V1Preview"
      | "HostedAgents=V1Preview"
      | "WorkflowAgents=V1Preview";
  }
  interface AgentsUpdateOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?:
      | "ContainerAgents=V1Preview"
      | "HostedAgents=V1Preview"
      | "WorkflowAgents=V1Preview";
  }
  interface AgentsCreateVersionOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?:
      | "ContainerAgents=V1Preview"
      | "HostedAgents=V1Preview"
      | "WorkflowAgents=V1Preview";
  }
}

declare module "../api/evaluationRules/options.js" {
  interface EvaluationRulesListOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?: "Evaluations=V1Preview";
  }
  interface EvaluationRulesCreateOrUpdateOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?: "Evaluations=V1Preview";
  }
  interface EvaluationRulesDeleteOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?: "Evaluations=V1Preview";
  }
  interface EvaluationRulesGetOptionalParams {
    /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
    foundryFeatures?: "Evaluations=V1Preview";
  }
}

// ---------------------------------------------------------------------------
// Runtime augmentation: Add lazy-initialized beta operation group getters
// ---------------------------------------------------------------------------

function defineBetaProperty<T>(
  name: string,
  factory: (context: AIProjectContext) => T,
): void {
  Object.defineProperty(AIProjectClient.prototype, name, {
    get(this: AIProjectClient) {
      const value = factory(this._cognitiveContext);
      // Self-replacing getter: cache after first access
      Object.defineProperty(this, name, {
        value,
        writable: false,
        enumerable: true,
        configurable: true,
      });
      return value;
    },
    enumerable: true,
    configurable: true,
  });
}

defineBetaProperty("memoryStores", _getBetaMemoryStoresOperations);
defineBetaProperty("redTeams", _getBetaRedTeamsOperations);
defineBetaProperty("schedules", _getBetaSchedulesOperations);
defineBetaProperty("insights", _getBetaInsightsOperations);
defineBetaProperty("evaluators", _getBetaEvaluatorsOperations);
defineBetaProperty("evaluationTaxonomies", _getBetaEvaluationTaxonomiesOperations);

// ---------------------------------------------------------------------------
// Re-exports: Beta operation interfaces
// ---------------------------------------------------------------------------

export { BetaOperations } from "../classic/beta/index.js";
export { BetaMemoryStoresOperations } from "../classic/beta/memoryStores/index.js";
export { BetaRedTeamsOperations } from "../classic/beta/redTeams/index.js";
export { BetaSchedulesOperations } from "../classic/beta/schedules/index.js";
export { BetaInsightsOperations } from "../classic/beta/insights/index.js";
export { BetaEvaluatorsOperations } from "../classic/beta/evaluators/index.js";
export { BetaEvaluationTaxonomiesOperations } from "../classic/beta/evaluationTaxonomies/index.js";

// ---------------------------------------------------------------------------
// Re-exports: Beta optional params
// ---------------------------------------------------------------------------

export {
  BetaEvaluationTaxonomiesUpdateOptionalParams,
  BetaEvaluationTaxonomiesCreateOptionalParams,
  BetaEvaluationTaxonomiesDeleteOptionalParams,
  BetaEvaluationTaxonomiesListOptionalParams,
  BetaEvaluationTaxonomiesGetOptionalParams,
} from "../api/beta/evaluationTaxonomies/index.js";
export {
  BetaEvaluatorsUpdateVersionOptionalParams,
  BetaEvaluatorsCreateVersionOptionalParams,
  BetaEvaluatorsDeleteVersionOptionalParams,
  BetaEvaluatorsGetVersionOptionalParams,
  BetaEvaluatorsListLatestVersionsOptionalParams,
  BetaEvaluatorsListVersionsOptionalParams,
} from "../api/beta/evaluators/index.js";
export {
  BetaInsightsListOptionalParams,
  BetaInsightsGetOptionalParams,
  BetaInsightsGenerateOptionalParams,
} from "../api/beta/insights/index.js";
export {
  BetaMemoryStoresDeleteScopeOptionalParams,
  BetaMemoryStoresGetUpdateResultOptionalParams,
  BetaMemoryStoresUpdateMemoriesOptionalParams,
  BetaMemoryStoresSearchMemoriesOptionalParams,
  BetaMemoryStoresDeleteOptionalParams,
  BetaMemoryStoresListOptionalParams,
  BetaMemoryStoresGetOptionalParams,
  BetaMemoryStoresUpdateOptionalParams,
  BetaMemoryStoresCreateOptionalParams,
} from "../api/beta/memoryStores/index.js";
export {
  BetaRedTeamsCreateOptionalParams,
  BetaRedTeamsListOptionalParams,
  BetaRedTeamsGetOptionalParams,
} from "../api/beta/redTeams/index.js";
export {
  BetaSchedulesListRunsOptionalParams,
  BetaSchedulesGetRunOptionalParams,
  BetaSchedulesCreateOrUpdateOptionalParams,
  BetaSchedulesListOptionalParams,
  BetaSchedulesGetOptionalParams,
  BetaSchedulesDeleteOptionalParams,
} from "../api/beta/schedules/index.js";

// ---------------------------------------------------------------------------
// Re-exports: Beta model types
// ---------------------------------------------------------------------------

export {
  EvaluationTaxonomy,
  EvaluationTaxonomyInput,
  EvaluationTaxonomyInputUnion,
  EvaluationTaxonomyInputType,
  AgentTaxonomyInput,
  EvaluatorVersion,
  EvaluatorType,
  EvaluatorCategory,
  EvaluatorDefinition,
  EvaluatorDefinitionUnion,
  EvaluatorDefinitionType,
  EvaluatorMetric,
  EvaluatorMetricType,
  EvaluatorMetricDirection,
  CodeBasedEvaluatorDefinition,
  PromptBasedEvaluatorDefinition,
  Insight,
  InsightsMetadata,
  OperationState,
  InsightRequest,
  InsightRequestUnion,
  InsightType,
  EvaluationRunClusterInsightRequest,
  InsightModelConfiguration,
  AgentClusterInsightRequest,
  EvaluationComparisonInsightRequest,
  InsightResult,
  InsightResultUnion,
  EvaluationComparisonInsightResult,
  EvalRunResultComparison,
  EvalRunResultSummary,
  EvalRunResultCompareItem,
  TreatmentEffectType,
  EvaluationRunClusterInsightResult,
  ClusterInsightResult,
  InsightSummary,
  ClusterTokenUsage,
  InsightCluster,
  InsightSample,
  InsightSampleUnion,
  SampleType,
  EvaluationResultSample,
  EvalResult,
  ChartCoordinate,
  AgentClusterInsightResult,
  MemoryStoreDefinition,
  MemoryStoreDefinitionUnion,
  MemoryStoreKind,
  MemoryStoreDefaultDefinition,
  MemoryStoreDefaultOptions,
  MemoryStore,
  DeleteMemoryStoreResponse,
  MemoryStoreSearchResponse,
  MemorySearchItem,
  MemoryItem,
  MemoryItemUnion,
  MemoryItemKind,
  UserProfileMemoryItem,
  ChatSummaryMemoryItem,
  MemoryStoreOperationUsage,
  ResponseUsageInputTokensDetails,
  ResponseUsageOutputTokensDetails,
  MemoryStoreUpdateResponse,
  MemoryStoreUpdateStatus,
  MemoryStoreUpdateCompletedResult,
  MemoryOperation,
  MemoryOperationKind,
  MemoryStoreDeleteScopeResponse,
  RedTeam,
  AttackStrategy,
  TargetConfig,
  TargetConfigUnion,
  AzureOpenAIModelConfiguration,
  Schedule,
  ScheduleProvisioningStatus,
  Trigger,
  TriggerUnion,
  TriggerType,
  CronTrigger,
  RecurrenceTrigger,
  RecurrenceSchedule,
  RecurrenceScheduleUnion,
  RecurrenceType,
  HourlyRecurrenceSchedule,
  DailyRecurrenceSchedule,
  WeeklyRecurrenceSchedule,
  DayOfWeek,
  MonthlyRecurrenceSchedule,
  OneTimeTrigger,
  ScheduleTask,
  ScheduleTaskUnion,
  ScheduleTaskType,
  EvaluationScheduleTask,
  InsightScheduleTask,
  ScheduleRun,
  FoundryFeaturesOptInKeys,
  MemoryStoreType,
} from "../models/index.js";

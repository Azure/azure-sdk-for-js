// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EvaluationRuleActionType } from "../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluationRulesListOptionalParams extends OperationOptions {
  /** Filter by the type of evaluation rule. */
  actionType?: EvaluationRuleActionType;
  /** Filter by the agent name. */
  agentName?: string;
  /** Filter by the enabled status. */
  enabled?: boolean;
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface EvaluationRulesCreateOrUpdateOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface EvaluationRulesDeleteOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

/** Optional parameters. */
export interface EvaluationRulesGetOptionalParams extends OperationOptions {
  /** A feature flag opt-in required when using preview operations or modifying persisted preview resources. */
  foundryFeatures?: "Evaluations=V1Preview";
}

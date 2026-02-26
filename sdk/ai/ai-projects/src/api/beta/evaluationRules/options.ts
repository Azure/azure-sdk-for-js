// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EvaluationRuleActionType } from "../../../models/models.js";
import { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface BetaEvaluationRulesListOptionalParams extends OperationOptions {
  /** Filter by the type of evaluation rule. */
  actionType?: EvaluationRuleActionType;
  /** Filter by the agent name. */
  agentName?: string;
  /** Filter by the enabled status. */
  enabled?: boolean;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaEvaluationRulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface BetaEvaluationRulesDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface BetaEvaluationRulesGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

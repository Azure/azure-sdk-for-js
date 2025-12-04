// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EvaluationRuleActionType } from "../../models/models.js";
import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters. */
export interface EvaluationRulesListOptionalParams extends OperationOptions {
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
export interface EvaluationRulesCreateOrUpdateOptionalParams extends OperationOptions {}

/** Optional parameters. */
export interface EvaluationRulesDeleteOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

/** Optional parameters. */
export interface EvaluationRulesGetOptionalParams extends OperationOptions {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  clientRequestId?: string;
}

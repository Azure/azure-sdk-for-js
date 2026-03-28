// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, create, get } from "../../api/sentinelOnboardingStates/operations.js";
import type {
  SentinelOnboardingStatesListOptionalParams,
  SentinelOnboardingStatesDeleteOptionalParams,
  SentinelOnboardingStatesCreateOptionalParams,
  SentinelOnboardingStatesGetOptionalParams,
} from "../../api/sentinelOnboardingStates/options.js";
import type { SentinelOnboardingState, SentinelOnboardingStatesList } from "../../models/models.js";

/** Interface representing a SentinelOnboardingStates operations. */
export interface SentinelOnboardingStatesOperations {
  /** Gets all Sentinel onboarding states */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: SentinelOnboardingStatesListOptionalParams,
  ) => Promise<SentinelOnboardingStatesList>;
  /** Delete Sentinel onboarding state */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    sentinelOnboardingStateName: string,
    options?: SentinelOnboardingStatesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create Sentinel onboarding state */
  create: (
    resourceGroupName: string,
    workspaceName: string,
    sentinelOnboardingStateName: string,
    options?: SentinelOnboardingStatesCreateOptionalParams,
  ) => Promise<SentinelOnboardingState>;
  /** Get Sentinel onboarding state */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    sentinelOnboardingStateName: string,
    options?: SentinelOnboardingStatesGetOptionalParams,
  ) => Promise<SentinelOnboardingState>;
}

function _getSentinelOnboardingStates(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: SentinelOnboardingStatesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      sentinelOnboardingStateName: string,
      options?: SentinelOnboardingStatesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, sentinelOnboardingStateName, options),
    create: (
      resourceGroupName: string,
      workspaceName: string,
      sentinelOnboardingStateName: string,
      options?: SentinelOnboardingStatesCreateOptionalParams,
    ) => create(context, resourceGroupName, workspaceName, sentinelOnboardingStateName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      sentinelOnboardingStateName: string,
      options?: SentinelOnboardingStatesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, sentinelOnboardingStateName, options),
  };
}

export function _getSentinelOnboardingStatesOperations(
  context: SecurityInsightsContext,
): SentinelOnboardingStatesOperations {
  return {
    ..._getSentinelOnboardingStates(context),
  };
}

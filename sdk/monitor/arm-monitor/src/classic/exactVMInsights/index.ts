// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { getOnboardingStatus } from "../../api/exactVMInsights/operations.js";
import type { ExactVMInsightsGetOnboardingStatusOptionalParams } from "../../api/exactVMInsights/options.js";
import type { VMInsightsOnboardingStatus } from "../../models/vmInsightsOnboarding/models.js";

/** Interface representing a ExactVMInsights operations. */
export interface ExactVMInsightsOperations {
  /** Retrieves the VM Insights onboarding status for the specified resource or resource scope. */
  getOnboardingStatus: (
    resourceUri: string,
    options?: ExactVMInsightsGetOnboardingStatusOptionalParams,
  ) => Promise<VMInsightsOnboardingStatus>;
}

function _getExactVMInsights(context: MonitorContext) {
  return {
    getOnboardingStatus: (
      resourceUri: string,
      options?: ExactVMInsightsGetOnboardingStatusOptionalParams,
    ) => getOnboardingStatus(context, resourceUri, options),
  };
}

export function _getExactVMInsightsOperations(context: MonitorContext): ExactVMInsightsOperations {
  return {
    ..._getExactVMInsights(context),
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { getOnboardingStatus } from "../../api/vmInsights/operations.js";
import type { VMInsightsGetOnboardingStatusOptionalParams } from "../../api/vmInsights/options.js";
import type { VmInsightsOnboardingVMInsightsOnboardingStatus } from "../../models/vmInsightsOnboarding/models.js";

/** Interface representing a VMInsights operations. */
export interface VMInsightsOperations {
  /** Retrieves the VM Insights onboarding status for the specified resource or resource scope. */
  getOnboardingStatus: (
    resourceUri: string,
    options?: VMInsightsGetOnboardingStatusOptionalParams,
  ) => Promise<VmInsightsOnboardingVMInsightsOnboardingStatus>;
}

function _getVMInsights(context: MonitorContext) {
  return {
    getOnboardingStatus: (
      resourceUri: string,
      options?: VMInsightsGetOnboardingStatusOptionalParams,
    ) => getOnboardingStatus(context, resourceUri, options),
  };
}

export function _getVMInsightsOperations(context: MonitorContext): VMInsightsOperations {
  return {
    ..._getVMInsights(context),
  };
}

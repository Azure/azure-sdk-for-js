// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext } from "../../api/monitorContext.js";
import { getOnboardingStatus } from "../../api/vMInsights/operations.js";
import type { vMInsightsGetOnboardingStatusOptionalParams } from "../../api/vMInsights/options.js";
import type { VmInsightsOnboardingVMInsightsOnboardingStatus } from "../../models/vmInsightsOnboarding/models.js";

/** Interface representing a vMInsights operations. */
export interface vMInsightsOperations {
  /** Retrieves the VM Insights onboarding status for the specified resource or resource scope. */
  getOnboardingStatus: (
    resourceUri: string,
    options?: vMInsightsGetOnboardingStatusOptionalParams,
  ) => Promise<VmInsightsOnboardingVMInsightsOnboardingStatus>;
}

function _getvMInsights(context: MonitorContext) {
  return {
    getOnboardingStatus: (
      resourceUri: string,
      options?: vMInsightsGetOnboardingStatusOptionalParams,
    ) => getOnboardingStatus(context, resourceUri, options),
  };
}

export function _getvMInsightsOperations(context: MonitorContext): vMInsightsOperations {
  return {
    ..._getvMInsights(context),
  };
}

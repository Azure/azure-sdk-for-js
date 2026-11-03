// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileSharesContext } from "../../api/fileSharesContext.js";
import {
  getProvisioningRecommendation,
  getLimits,
  getUsageData,
} from "../../api/informationalOperations/operations.js";
import {
  InformationalOperationsGetProvisioningRecommendationOptionalParams,
  InformationalOperationsGetLimitsOptionalParams,
  InformationalOperationsGetUsageDataOptionalParams,
} from "../../api/informationalOperations/options.js";
import {
  FileShareUsageDataResponse,
  FileShareLimitsResponse,
  FileShareProvisioningRecommendationRequest,
  FileShareProvisioningRecommendationResponse,
} from "../../models/models.js";

/** Interface representing a InformationalOperations operations. */
export interface InformationalOperationsOperations {
  /** Get file shares provisioning parameters recommendation. */
  getProvisioningRecommendation: (
    location: string,
    body: FileShareProvisioningRecommendationRequest,
    options?: InformationalOperationsGetProvisioningRecommendationOptionalParams,
  ) => Promise<FileShareProvisioningRecommendationResponse>;
  /** Get file shares limits. */
  getLimits: (
    location: string,
    options?: InformationalOperationsGetLimitsOptionalParams,
  ) => Promise<FileShareLimitsResponse>;
  /** Get file shares usage data. */
  getUsageData: (
    location: string,
    options?: InformationalOperationsGetUsageDataOptionalParams,
  ) => Promise<FileShareUsageDataResponse>;
}

function _getInformationalOperations(context: FileSharesContext) {
  return {
    getProvisioningRecommendation: (
      location: string,
      body: FileShareProvisioningRecommendationRequest,
      options?: InformationalOperationsGetProvisioningRecommendationOptionalParams,
    ) => getProvisioningRecommendation(context, location, body, options),
    getLimits: (location: string, options?: InformationalOperationsGetLimitsOptionalParams) =>
      getLimits(context, location, options),
    getUsageData: (location: string, options?: InformationalOperationsGetUsageDataOptionalParams) =>
      getUsageData(context, location, options),
  };
}

export function _getInformationalOperationsOperations(
  context: FileSharesContext,
): InformationalOperationsOperations {
  return {
    ..._getInformationalOperations(context),
  };
}

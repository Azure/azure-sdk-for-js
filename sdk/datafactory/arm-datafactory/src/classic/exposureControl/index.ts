// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  getFeatureValue,
  queryFeatureValuesByFactory,
  getFeatureValueByFactory,
} from "../../api/exposureControl/operations.js";
import type {
  ExposureControlGetFeatureValueOptionalParams,
  ExposureControlQueryFeatureValuesByFactoryOptionalParams,
  ExposureControlGetFeatureValueByFactoryOptionalParams,
} from "../../api/exposureControl/options.js";
import type {
  ExposureControlRequest,
  ExposureControlResponse,
  ExposureControlBatchRequest,
  ExposureControlBatchResponse,
} from "../../models/models.js";

/** Interface representing a ExposureControl operations. */
export interface ExposureControlOperations {
  /** Get exposure control feature for specific location. */
  getFeatureValue: (
    locationId: string,
    exposureControlRequest: ExposureControlRequest,
    options?: ExposureControlGetFeatureValueOptionalParams,
  ) => Promise<ExposureControlResponse>;
  /** Get list of exposure control features for specific factory. */
  queryFeatureValuesByFactory: (
    resourceGroupName: string,
    factoryName: string,
    exposureControlBatchRequest: ExposureControlBatchRequest,
    options?: ExposureControlQueryFeatureValuesByFactoryOptionalParams,
  ) => Promise<ExposureControlBatchResponse>;
  /** Get exposure control feature for specific factory. */
  getFeatureValueByFactory: (
    resourceGroupName: string,
    factoryName: string,
    exposureControlRequest: ExposureControlRequest,
    options?: ExposureControlGetFeatureValueByFactoryOptionalParams,
  ) => Promise<ExposureControlResponse>;
}

function _getExposureControl(context: DataFactoryManagementContext) {
  return {
    getFeatureValue: (
      locationId: string,
      exposureControlRequest: ExposureControlRequest,
      options?: ExposureControlGetFeatureValueOptionalParams,
    ) => getFeatureValue(context, locationId, exposureControlRequest, options),
    queryFeatureValuesByFactory: (
      resourceGroupName: string,
      factoryName: string,
      exposureControlBatchRequest: ExposureControlBatchRequest,
      options?: ExposureControlQueryFeatureValuesByFactoryOptionalParams,
    ) =>
      queryFeatureValuesByFactory(
        context,
        resourceGroupName,
        factoryName,
        exposureControlBatchRequest,
        options,
      ),
    getFeatureValueByFactory: (
      resourceGroupName: string,
      factoryName: string,
      exposureControlRequest: ExposureControlRequest,
      options?: ExposureControlGetFeatureValueByFactoryOptionalParams,
    ) =>
      getFeatureValueByFactory(
        context,
        resourceGroupName,
        factoryName,
        exposureControlRequest,
        options,
      ),
  };
}

export function _getExposureControlOperations(
  context: DataFactoryManagementContext,
): ExposureControlOperations {
  return {
    ..._getExposureControl(context),
  };
}

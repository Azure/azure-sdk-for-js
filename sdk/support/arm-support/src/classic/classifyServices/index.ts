// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { classifyServices } from "../../api/classifyServices/operations.js";
import { ClassifyServicesClassifyServicesOptionalParams } from "../../api/classifyServices/options.js";
import { ServiceClassificationRequest, ServiceClassificationOutput } from "../../models/models.js";

/** Interface representing a ClassifyServices operations. */
export interface ClassifyServicesOperations {
  /** Classify the list of right Azure services. */
  classifyServices: (
    serviceClassificationRequest: ServiceClassificationRequest,
    options?: ClassifyServicesClassifyServicesOptionalParams,
  ) => Promise<ServiceClassificationOutput>;
}

function _getClassifyServices(context: MicrosoftSupportContext) {
  return {
    classifyServices: (
      serviceClassificationRequest: ServiceClassificationRequest,
      options?: ClassifyServicesClassifyServicesOptionalParams,
    ) => classifyServices(context, serviceClassificationRequest, options),
  };
}

export function _getClassifyServicesOperations(
  context: MicrosoftSupportContext,
): ClassifyServicesOperations {
  return {
    ..._getClassifyServices(context),
  };
}

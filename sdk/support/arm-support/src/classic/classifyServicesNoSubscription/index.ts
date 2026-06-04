// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupportContext } from "../../api/microsoftSupportContext.js";
import { classifyServices } from "../../api/classifyServicesNoSubscription/operations.js";
import { ClassifyServicesNoSubscriptionClassifyServicesOptionalParams } from "../../api/classifyServicesNoSubscription/options.js";
import { ServiceClassificationRequest, ServiceClassificationOutput } from "../../models/models.js";

/** Interface representing a ClassifyServicesNoSubscription operations. */
export interface ClassifyServicesNoSubscriptionOperations {
  /** Classify the list of right Azure services. */
  classifyServices: (
    serviceClassificationRequest: ServiceClassificationRequest,
    options?: ClassifyServicesNoSubscriptionClassifyServicesOptionalParams,
  ) => Promise<ServiceClassificationOutput>;
}

function _getClassifyServicesNoSubscription(context: MicrosoftSupportContext) {
  return {
    classifyServices: (
      serviceClassificationRequest: ServiceClassificationRequest,
      options?: ClassifyServicesNoSubscriptionClassifyServicesOptionalParams,
    ) => classifyServices(context, serviceClassificationRequest, options),
  };
}

export function _getClassifyServicesNoSubscriptionOperations(
  context: MicrosoftSupportContext,
): ClassifyServicesNoSubscriptionOperations {
  return {
    ..._getClassifyServicesNoSubscription(context),
  };
}

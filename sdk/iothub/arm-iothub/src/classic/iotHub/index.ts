// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { IotHubContext } from "../../api/iotHubContext.js";
import { manualFailover } from "../../api/iotHub/operations.js";
import type { IotHubManualFailoverOptionalParams } from "../../api/iotHub/options.js";
import type { FailoverInput } from "../../models/models.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IotHub operations. */
export interface IotHubOperations {
  /** Manually initiate a failover for the IoT Hub to its secondary region. To learn more, see https://aka.ms/manualfailover */
  manualFailover: (
    iotHubName: string,
    resourceGroupName: string,
    failoverInput: FailoverInput,
    options?: IotHubManualFailoverOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use manualFailover instead */
  beginManualFailover: (
    iotHubName: string,
    resourceGroupName: string,
    failoverInput: FailoverInput,
    options?: IotHubManualFailoverOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use manualFailover instead */
  beginManualFailoverAndWait: (
    iotHubName: string,
    resourceGroupName: string,
    failoverInput: FailoverInput,
    options?: IotHubManualFailoverOptionalParams,
  ) => Promise<void>;
}

function _getIotHub(context: IotHubContext) {
  return {
    manualFailover: (
      iotHubName: string,
      resourceGroupName: string,
      failoverInput: FailoverInput,
      options?: IotHubManualFailoverOptionalParams,
    ) => manualFailover(context, iotHubName, resourceGroupName, failoverInput, options),
    beginManualFailover: async (
      iotHubName: string,
      resourceGroupName: string,
      failoverInput: FailoverInput,
      options?: IotHubManualFailoverOptionalParams,
    ) => {
      const poller = manualFailover(context, iotHubName, resourceGroupName, failoverInput, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginManualFailoverAndWait: async (
      iotHubName: string,
      resourceGroupName: string,
      failoverInput: FailoverInput,
      options?: IotHubManualFailoverOptionalParams,
    ) => {
      return await manualFailover(context, iotHubName, resourceGroupName, failoverInput, options);
    },
  };
}

export function _getIotHubOperations(context: IotHubContext): IotHubOperations {
  return {
    ..._getIotHub(context),
  };
}

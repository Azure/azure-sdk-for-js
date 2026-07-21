// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceUpdateContext,
  DeviceUpdateClientOptionalParams,
  createDeviceUpdate,
} from "./api/index.js";
import {
  DeviceManagementOperations,
  _getDeviceManagementOperations,
} from "./classic/deviceManagement/index.js";
import {
  DeviceUpdateOperations,
  _getDeviceUpdateOperations,
} from "./classic/deviceUpdate/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DeviceUpdateClientOptionalParams } from "./api/deviceUpdateContext.js";

export class DeviceUpdateClient {
  private _client: DeviceUpdateContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Device Update for IoT Hub is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in IoT Hub). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Device Update for IoT Hub handle the updates. */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    instanceId: string,
    options: DeviceUpdateClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDeviceUpdate(endpointParam, credential, instanceId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.deviceManagement = _getDeviceManagementOperations(this._client);
    this.deviceUpdate = _getDeviceUpdateOperations(this._client);
  }

  /** The operation groups for deviceManagement */
  public readonly deviceManagement: DeviceManagementOperations;
  /** The operation groups for deviceUpdate */
  public readonly deviceUpdate: DeviceUpdateOperations;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistrySoftwareUpdateContext,
  DeviceRegistrySoftwareUpdateClientOptionalParams,
  createDeviceRegistrySoftwareUpdate,
} from "./api/index.js";
import {
  DeviceClassesOperations,
  _getDeviceClassesOperations,
} from "./classic/deviceClasses/index.js";
import {
  SoftwareUpdateOperations,
  _getSoftwareUpdateOperations,
} from "./classic/softwareUpdate/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { DeviceRegistrySoftwareUpdateClientOptionalParams } from "./api/deviceRegistrySoftwareUpdateContext.js";

/** Client for managing software updates and device classes in Software Update for Device Registry. */
export class DeviceRegistrySoftwareUpdateClient {
  private _client: DeviceRegistrySoftwareUpdateContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Software Update for Device Registry is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in Device Registry). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Software Update for Device Registry handle the updates. */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: DeviceRegistrySoftwareUpdateClientOptionalParams = {},
  ) {
    this._client = createDeviceRegistrySoftwareUpdate(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
    this.softwareUpdate = _getSoftwareUpdateOperations(this._client);
    this.deviceClasses = _getDeviceClassesOperations(this._client);
  }

  /** The operation groups for softwareUpdate */
  public readonly softwareUpdate: SoftwareUpdateOperations;
  /** The operation groups for deviceClasses */
  public readonly deviceClasses: DeviceClassesOperations;
}

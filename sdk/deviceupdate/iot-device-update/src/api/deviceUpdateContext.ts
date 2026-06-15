// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** Device Update for IoT Hub is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in IoT Hub). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Device Update for IoT Hub handle the updates. */
export interface DeviceUpdateContext extends Client {
  /** The Device Update for IoT Hub account instance identifier. */
  instanceId: string;
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface DeviceUpdateClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Device Update for IoT Hub is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in IoT Hub). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Device Update for IoT Hub handle the updates. */
export function createDeviceUpdate(
  endpointParam: string,
  credential: TokenCredential,
  instanceId: string,
  options: DeviceUpdateClientOptionalParams = {},
): DeviceUpdateContext {
  const endpointUrl = options.endpoint ?? `https://${endpointParam}`;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-iot-device-update/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://api.adu.microsoft.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion, instanceId } as DeviceUpdateContext;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/iot-device-registry-software-update/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** Software Update for Device Registry is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in Device Registry). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Software Update for Device Registry handle the updates. */
export interface DeviceRegistrySoftwareUpdateContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface DeviceRegistrySoftwareUpdateClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Software Update for Device Registry is an Azure service that enables customers to publish updates for their IoT devices to the cloud, and then deploy that update to their devices (approve updates to groups of devices managed and provisioned in Device Registry). It leverages the proven security and reliability of the Windows Update platform, optimized for IoT devices. It works globally and knows when and how to update devices, enabling customers to focus on their business goals and let Software Update for Device Registry handle the updates. */
export function createDeviceRegistrySoftwareUpdate(
  endpointParam: string,
  credential: TokenCredential,
  options: DeviceRegistrySoftwareUpdateClientOptionalParams = {},
): DeviceRegistrySoftwareUpdateContext {
  const endpointUrl = options.endpoint ?? `https://${endpointParam}`;
  const endpointOrigin = new URL(endpointUrl).origin;
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-iot-device-registry-software-update/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://api.adu.microsoft.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  clientContext.pipeline.addPolicy(
    {
      name: "enforce-endpoint-origin",
      async sendRequest(request, next) {
        if (new URL(request.url).origin !== endpointOrigin) {
          throw new Error("Refusing to send credentials to an unexpected request origin.");
        }
        return next(request);
      },
    },
    { beforePhase: "Sign" },
  );
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion } as DeviceRegistrySoftwareUpdateContext;
}

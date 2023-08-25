// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseNotificationHubsConnectionString } from "./auth/connectionStringUtils.js";
import { SasTokenCredential } from "./auth/sasTokenProvider.js";
import type { WebPushClientContext, WebPushClientContextOptions } from "./publicTypes.js";

const API_VERSION = "2020-06";

let clientContext: WebPushClientContext | undefined;

/**
 * @internal
 */
export function _getClientContextInstance(): WebPushClientContext | undefined {
  return clientContext;
}

/**
 * Creates a new instance of the Notification Hubs Web Push client context.
 * @param connectionString - The Azure Notification Hubs connection string.
 * @param hubName - The Azure Notification Hubs hub name.
 * @returns The created client context.
 */
export function createClientContext(
  connectionString: string,
  hubName: string,
  options: WebPushClientContextOptions = {},
): WebPushClientContext {
  const apiVersion = options.apiVersion ?? API_VERSION;
  const { sharedAccessKey, sharedAccessKeyName, endpoint } =
    parseNotificationHubsConnectionString(connectionString);
  const namespaceUrl = endpoint.replace("sb://", "https://");
  const tokenCredential = new SasTokenCredential({ sharedAccessKey, sharedAccessKeyName });

  const applicationUrl = new URL(namespaceUrl);
  applicationUrl.pathname += `/${hubName}`;
  const applicationId = applicationUrl.toString();

  if (
    clientContext &&
    applicationId === clientContext.applicationId &&
    apiVersion === clientContext.apiVersion
  ) {
    return clientContext;
  }

  clientContext = {
    apiVersion,
    applicationId,
    hubName,
    namespaceUrl,
    tokenCredential,
  };

  return clientContext;
}

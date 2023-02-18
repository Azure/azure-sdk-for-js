// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { NotificationHubResponse, WebPushClientContext, WebPushInstallation } from "../publicTypes.js";
import { WebPushError } from "../errors.js";

export interface JsonPatch {
  op: "add" | "remove" | "replace";
  path: string;
  value?: string;
}

export async function createOrUpdateAzureInstallation(
  clientContext: WebPushClientContext,
  installation: WebPushInstallation,
): Promise<NotificationHubResponse> {
  const url = clientContext.requestUrl();
  url.pathname += `/installations/${installation.installationId}`;

  const installationToSave = {
    installationId: installation.installationId,
    platform: "browser",
    pushChannel: {
      endpoint: installation.pushChannel.endpoint,
      p256dh: installation.pushChannel.p256dh,
      auth: installation.pushChannel.auth,
    }
  };
  const headers = await clientContext.createHeaders("createOrUpdateAzureInstallation");
  const body = JSON.stringify(installationToSave);
  const method = "PUT";

  const response = await fetch(url, {
    body,
    headers,
    method
  });

  return handleResponse(response, "createOrUpdateAzureInstallation", 200);
}

export async function deleteAzureInstallation(
  clientContext: WebPushClientContext,
  installationId: string
): Promise<NotificationHubResponse> {
  const url = clientContext.requestUrl();
  url.pathname += `/installations/${installationId}`;

  const headers = await clientContext.createHeaders("deleteInstallation");
  const method = "DELETE";

  const response = await fetch(url, {
    headers,
    method
  });

  return handleResponse(response, "deleteInstallation", 204);
}

export async function updateAzureInstallation(
  clientContext: WebPushClientContext,
  installationId: string,
  updates: JsonPatch[],
): Promise<NotificationHubResponse> {
  const url = clientContext.requestUrl();
  url.pathname += `/installations/${installationId}`;

  const headers = await clientContext.createHeaders("updateInstallation");
  const body = JSON.stringify(updates);
  const method = "PATCH";

  const response = await fetch(url, {
    body,
    headers,
    method
  });

  return handleResponse(response, "updateInstallation", 200);
}

function handleResponse(response: Response, operation: string, successStatus: number): NotificationHubResponse {
  const trackingId = response.headers.get("trackingid") || undefined;
  const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;
  if (response.status !== successStatus) {
    throw new WebPushError(`${operation} failed with status ${response.status}`, {
      status: response.status,
      trackingId,
      correlationId,
    });
  }

  return {
    trackingId,
    correlationId
  };
}

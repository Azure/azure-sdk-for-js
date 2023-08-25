// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as constants from "./constants.js";
import {
  JsonPatch,
  NotificationHubResponse,
  WebPushClientContext,
  WebPushInstallation,
} from "../publicTypes.js";
import { WebPushError } from "../errors.js";

async function createHeaders(
  clientContext: WebPushClientContext,
  operationName: string,
): Promise<Headers> {
  const authorization = await clientContext.tokenCredential.getToken(clientContext.namespaceUrl);
  if (!authorization) {
    throw new WebPushError("Failed to retrieve the authorization token for the request.", {
      status: 401,
    });
  }

  const headers = new Headers();
  headers.set("Authorization", authorization.token);
  headers.set("x-ms-version", clientContext.apiVersion);
  headers.set(
    "x-ms-azsdk-telemetry",
    `class=NotificationHubsServiceClient;method=${operationName}`,
  );
  headers.set(
    "User-Agent",
    `azsdk-js-messaging-notificationhubs-web-push/${constants.SDK_VERSION}`,
  );

  return headers;
}

function requestUrl(clientContext: WebPushClientContext): URL {
  const url = new URL(clientContext.namespaceUrl);
  url.pathname += `/${clientContext.hubName}`;
  url.searchParams.set("api-version", clientContext.apiVersion);

  return url;
}

async function installationRequest(
  clientContext: WebPushClientContext,
  installationId: string,
  method: string,
  body?: BodyInit,
): Promise<NotificationHubResponse> {
  const operation = `${method.toLowerCase()}Installation`;
  const url = requestUrl(clientContext);
  url.pathname += `/installations/${installationId}`;

  const headers = await createHeaders(clientContext, operation);
  const response = await fetch(url, {
    body,
    headers,
    method,
  });

  return handleResponse(response, operation);
}

function handleResponse(response: Response, operation: string): NotificationHubResponse {
  const trackingId = response.headers.get("trackingid") || undefined;
  const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;
  const location = response.headers.get("location") || undefined;
  if (!response.ok) {
    throw new WebPushError(`${operation} failed with status ${response.status}`, {
      status: response.status,
      trackingId,
      correlationId,
    });
  }

  return {
    trackingId,
    correlationId,
    location,
  };
}

export async function createOrUpdateInstallation(
  clientContext: WebPushClientContext,
  installation: WebPushInstallation,
): Promise<NotificationHubResponse> {
  const installationToSave = {
    installationId: installation.installationId,
    platform: "browser",
    pushChannel: {
      endpoint: installation.pushChannel.endpoint,
      p256dh: installation.pushChannel.p256dh,
      auth: installation.pushChannel.auth,
    },
  };
  return installationRequest(
    clientContext,
    installation.installationId,
    "PUT",
    JSON.stringify(installationToSave),
  );
}

export async function deleteInstallation(
  clientContext: WebPushClientContext,
  installationId: string,
): Promise<NotificationHubResponse> {
  return installationRequest(clientContext, installationId, "DELETE");
}

export async function updateInstallation(
  clientContext: WebPushClientContext,
  installationId: string,
  updates: JsonPatch[],
): Promise<NotificationHubResponse> {
  return installationRequest(clientContext, installationId, "PATCH", JSON.stringify(updates));
}

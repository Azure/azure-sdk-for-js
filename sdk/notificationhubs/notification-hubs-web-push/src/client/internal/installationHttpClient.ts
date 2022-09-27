// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushClientContext } from "../../publicTypes.js";
import { WebPushError } from "../../errors.js";
import { WebPushInstallation } from "../../models/installation.js";

export interface JsonPatch {
  op: "add" | "remove" | "replace";
  path: string;
  value?: string;
}

export async function createOrUpdateAzureInstallation(
  clientContext: WebPushClientContext,
  installation: WebPushInstallation,
): Promise<void> {
  const url = clientContext.requestUrl();
  url.pathname += `installations/${installation.installationId}`;

  const headers = await clientContext.createHeaders("createOrUpdateInstallation");
  const body = JSON.stringify(installation);
  const method = "PUT";

  const response = await fetch(url, {
    body,
    headers,
    method
  });

  handleResponse(response, "deleteInstallation", 200);
}

export async function deleteAzureInstallation(
  clientContext: WebPushClientContext,
  installationId: string
): Promise<void> {
  const url = clientContext.requestUrl();
  url.pathname += `installations/${installationId}`;

  const headers = await clientContext.createHeaders("deleteInstallation");
  const method = "DELETE";

  const response = await fetch(url, {
    headers,
    method
  });

  handleResponse(response, "deleteInstallation", 204);
}

export async function updateAzureInstallation(
  clientContext: WebPushClientContext,
  installationId: string,
  updates: JsonPatch[],
): Promise<void> {
  const url = clientContext.requestUrl();
  url.pathname += `installations/${installationId}`;

  const headers = await clientContext.createHeaders("updateInstallation");
  const body = JSON.stringify(updates);
  const method = "PATCH";

  const response = await fetch(url, {
    body,
    headers,
    method
  });

  handleResponse(response, "updateInstallation", 204);
}

function handleResponse(response: Response, operation: string, successStatus: number) {
  if (response.status !== successStatus) {
    const trackingId = response.headers.get("trackingid") || undefined;
    const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;

    throw new WebPushError(`${operation} failed with status ${response.status}`, {
      status: response.status,
      trackingId,
      correlationId,
    });
  }
}

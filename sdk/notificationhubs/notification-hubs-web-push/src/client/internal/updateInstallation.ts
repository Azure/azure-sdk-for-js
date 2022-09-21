// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { WebPushClientContext } from "../../client.js";
import { WebPushError } from "../../errors.js";

export interface JsonPatch {
  op: "add" | "remove" | "replace";
  path: string;
  value?: string;
}

export async function updateInstallation(
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

  const trackingId = response.headers.get("trackingid") || undefined;
  const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;

  if (response.status !== 204) {
    throw new WebPushError(`updateInstallation failed with status ${response.status}`, {
      status: response.status,
      trackingId,
      correlationId,
    });
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/// <reference lib="dom" />

import { WebPushClientContext } from "../../client.js";
import { WebPushError } from "../../errors.js";

export async function deleteInstallation(
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

  const trackingId = response.headers.get("trackingid") || undefined;
  const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;

  if (response.status !== 204) {
    throw new WebPushError(`deleteInstallation failed with status ${response.status}`, {
      status: response.status,
      trackingId,
      correlationId,
    });
  }
}

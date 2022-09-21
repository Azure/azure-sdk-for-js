// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebPushClientContext } from "../../client.js";
import { WebPushError } from "../../errors.js";
import { WebPushInstallation } from "../../models/installation.js";

/// <reference lib="dom" />

export async function createOrUpdateInstallation(
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

  const trackingId = response.headers.get("trackingid") || undefined;
  const correlationId = response.headers.get("x-ms-correlation-request-id") || undefined;  

  if (response.status !== 200) {
    throw new WebPushError(`createOrUpdateInstallation failed with status ${response.status}`, {
      status: response.status,
      trackingId,
      correlationId,
    });
  }
}

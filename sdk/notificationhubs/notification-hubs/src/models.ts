// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions } from "@azure/core-client";

/**
 * Describes the options that can be provided while creating the NotificationHubsClient.
 */
export interface NotificationHubsClientOptions extends CommonClientOptions {}

export interface NotificationHubResponse {
  trackingId?: string;
  correlationId?: string;
  location?: string;
}

export interface Installation {
  installationId: string;

  userId?: string;

  readonly expirationTime: string;

  readonly lastUpdate: string;

  platform: string;

  pushChannel: string;

  tags?: string[];

  templates?: Record<string, InstallationTemplate>;
}

export interface InstallationTemplate {
  body: string;

  headers: Record<string, string>;

  tags?: string[];

  expiry?: string;
}

export type JSONPatchType = "add" | "remove" | "replace";

export interface InstallationPatch {
  op: JSONPatchType;

  path: string;

  value?: string;
}

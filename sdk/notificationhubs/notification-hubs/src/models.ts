// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions } from "@azure/core-client";

/**
 * Describes the options that can be provided while creating the NotificationHubsClient.
 */
export interface NotificationHubsClientOptions extends CommonClientOptions {
  
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

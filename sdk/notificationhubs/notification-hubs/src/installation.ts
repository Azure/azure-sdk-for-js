// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NotificationHubOperationResponse } from "./interfaces";

export type PNSType = "APNS" | "WNS" | "MPNS" | "ADM" | "GCM";

export interface Installation {
  installationId: string;
  userId?: string;
  platform: PNSType;
  pushChannel: string;
  expirationTime?: Date;
  templates?: { [key: string]: InstallationTemplate };
  tags?: string[];
}

export interface InstallationResponse extends Installation, NotificationHubOperationResponse {}

export interface InstallationTemplate {
  body: string;
  headers?: { [key: string]: string };
  tags?: string[];
}

export interface WnsSecondaryTile {
  pushChannel: string;
  tags?: string[];
  headers?: { [key: string]: string };
  templates?: { [key: string]: WnsSecondaryTileTemplate };
}

export interface WnsSecondaryTileTemplate {
  bodyTemplate: string;
  headers: { [key: string]: string };
}

export function mapResponseToInstallation(json: any): Installation {
  const installation: Installation = {
    installationId: json.installationId,
    platform: json.platform,
    pushChannel: json.pushChannel,
    userId: json.userId,
    tags: json.tags,
    templates: json.templates
  };

  if (json.expirationTime && !Number.isNaN(Date.parse(json.expirationTime))) {
    installation.expirationTime = new Date(json.expirationTime);
  }

  return installation;
}

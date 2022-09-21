// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface WebPushChannel {
  endpoint: string;
  auth: string;
  p256dh: string;
}

export interface WebPushInstallation {
  installationId: string;
  pushChannel: WebPushChannel;
  tags?: string[];
  platform: "browser";
}

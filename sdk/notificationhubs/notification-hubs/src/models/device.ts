// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface AdmDevice {
  admRegistrationId: string;
  kind: "adm";
}

export interface AppleDevice {
  deviceToken: string;
  kind: "apple";
}

export interface BaiduDevice {
  baiduChannelId: string;
  baiduUserId: string;
  kind: "baidu";
}

export interface BrowserDevice {
  endpoint: string;
  p256dh: string;
  auth: string;
  kind: "browser";
}

export interface FirebaseLegacyDevice {
  gcmRegistrationId: string;
  kind: "gcm";
}

export interface WindowsDevice {
  channelUri: string;
  kind: "windows";
}

export type RegistrationDevice =
  | AdmDevice
  | AppleDevice
  | BaiduDevice
  | BrowserDevice
  | FirebaseLegacyDevice
  | WindowsDevice;

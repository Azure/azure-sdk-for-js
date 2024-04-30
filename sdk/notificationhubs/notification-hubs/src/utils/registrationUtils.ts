// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-rest-pipeline";
import { RegistrationChannel } from "../models/registration.js";

export function getFilterByChannel(device: RegistrationChannel): string {
  switch (device.kind) {
    case "adm":
      return `AdmRegistrationId eq '${device.admRegistrationId}'`;
    case "apple":
      return `DeviceToken eq '${device.deviceToken.toLocaleUpperCase()}'`;
    case "baidu":
      return `BaiduChannelId eq ${device.baiduChannelId}' and BaiduUserId eq '${device.baiduUserId}'`;
    case "browser":
      return `Endpoint eq '${encodeURIComponent(device.endpoint)}' and P256DH eq '${
        device.p256dh
      }' and Auth eq '${device.auth}'`;
    case "gcm":
      return `GcmRegistrationId eq '${device.gcmRegistrationId}'`;
    case "fcmv1":
      return `FcmV1RegistrationId eq '${device.fcmV1RegistrationId}'`;
    case "windows":
      return `ChannelUri eq '${encodeURIComponent(device.channelUri)}'`;
    default:
      throw new RestError(`Device type is unsupported`, {
        statusCode: 400,
      });
  }
}

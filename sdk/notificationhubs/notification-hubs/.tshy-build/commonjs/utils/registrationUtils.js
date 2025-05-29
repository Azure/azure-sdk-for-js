"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterByChannel = getFilterByChannel;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
function getFilterByChannel(device) {
    switch (device.kind) {
        case "adm":
            return `AdmRegistrationId eq '${device.admRegistrationId}'`;
        case "apple":
            return `DeviceToken eq '${device.deviceToken.toLocaleUpperCase()}'`;
        case "baidu":
            return `BaiduChannelId eq ${device.baiduChannelId}' and BaiduUserId eq '${device.baiduUserId}'`;
        case "browser":
            return `Endpoint eq '${encodeURIComponent(device.endpoint)}' and P256DH eq '${device.p256dh}' and Auth eq '${device.auth}'`;
        case "gcm":
            return `GcmRegistrationId eq '${device.gcmRegistrationId}'`;
        case "fcmv1":
            return `FcmV1RegistrationId eq '${device.fcmV1RegistrationId}'`;
        case "windows":
            return `ChannelUri eq '${encodeURIComponent(device.channelUri)}'`;
        default:
            throw new core_rest_pipeline_1.RestError(`Device type is unsupported`, {
                statusCode: 400,
            });
    }
}
//# sourceMappingURL=registrationUtils.js.map
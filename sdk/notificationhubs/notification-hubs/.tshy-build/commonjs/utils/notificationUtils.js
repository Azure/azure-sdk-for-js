"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMultipartDirectNotification = createMultipartDirectNotification;
/**
 * @internal
 */
function createMultipartDirectNotification(boundaryName, notification, deviceHandles) {
    return (`--${boundaryName}\r\n` +
        `Content-type: ${notification.contentType}\r\n` +
        "Content-Disposition: inline; name=notification\r\n\r\n" +
        notification.body +
        "\r\n" +
        `--${boundaryName}\r\n` +
        "Content-type: application/json\r\n" +
        "Content-Disposition: inline; name=devices\r\n\r\n" +
        JSON.stringify(deviceHandles) +
        "\r\n" +
        `--${boundaryName}--`);
}
//# sourceMappingURL=notificationUtils.js.map
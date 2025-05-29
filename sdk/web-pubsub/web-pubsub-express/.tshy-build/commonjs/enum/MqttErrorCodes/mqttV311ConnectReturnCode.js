"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttV311ConnectReturnCode = void 0;
/**
 * MQTT 3.1.1 Connect Return Codes.
 */
var MqttV311ConnectReturnCode;
(function (MqttV311ConnectReturnCode) {
    /**
     * 0x01: Connection refused, unacceptable protocol version
     * The Server does not support the level of the MQTT protocol requested by the Client.
     */
    MqttV311ConnectReturnCode[MqttV311ConnectReturnCode["UnacceptableProtocolVersion"] = 1] = "UnacceptableProtocolVersion";
    /**
     * 0x02: Connection refused, identifier rejected
     * The Client identifier is correct UTF-8 but not allowed by the Server.
     */
    MqttV311ConnectReturnCode[MqttV311ConnectReturnCode["IdentifierRejected"] = 2] = "IdentifierRejected";
    /**
     * 0x03: Connection refused, server unavailable
     * The Network Connection has been made but the MQTT service is unavailable.
     */
    MqttV311ConnectReturnCode[MqttV311ConnectReturnCode["ServerUnavailable"] = 3] = "ServerUnavailable";
    /**
     * 0x04: Connection refused, bad user name or password
     * The data in the user name or password is malformed.
     */
    MqttV311ConnectReturnCode[MqttV311ConnectReturnCode["BadUsernameOrPassword"] = 4] = "BadUsernameOrPassword";
    /**
     * 0x05: Connection refused, not authorized
     * The Client is not authorized to connect.
     */
    MqttV311ConnectReturnCode[MqttV311ConnectReturnCode["NotAuthorized"] = 5] = "NotAuthorized";
})(MqttV311ConnectReturnCode || (exports.MqttV311ConnectReturnCode = MqttV311ConnectReturnCode = {}));
//# sourceMappingURL=mqttV311ConnectReturnCode.js.map
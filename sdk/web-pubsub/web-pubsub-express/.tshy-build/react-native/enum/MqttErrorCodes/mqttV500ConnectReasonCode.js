// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * MQTT Connect Reason Codes
 * These codes represent the reasons for the outcome of an MQTT CONNECT packet as per MQTT 5.0 specification.
 */
export var MqttV500ConnectReasonCode;
(function (MqttV500ConnectReasonCode) {
    /**
     * 0x80 - Unspecified error
     * Description: The Server does not wish to reveal the reason for the failure, or none of the other Reason Codes apply.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["UnspecifiedError"] = 128] = "UnspecifiedError";
    /**
     * 0x81 - Malformed Packet
     * Description: Data within the CONNECT packet could not be correctly parsed.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["MalformedPacket"] = 129] = "MalformedPacket";
    /**
     * 0x82 - Protocol Error
     * Description: Data in the CONNECT packet does not conform to this specification.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ProtocolError"] = 130] = "ProtocolError";
    /**
     * 0x83 - Implementation specific error
     * Description: The CONNECT is valid but is not accepted by this Server.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ImplementationSpecificError"] = 131] = "ImplementationSpecificError";
    /**
     * 0x84 - Unsupported Protocol Version
     * Description: The Server does not support the version of the MQTT protocol requested by the Client.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["UnsupportedProtocolVersion"] = 132] = "UnsupportedProtocolVersion";
    /**
     * 0x85 - Client Identifier not valid
     * Description: The Client Identifier is a valid string but is not allowed by the Server.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ClientIdentifierNotValid"] = 133] = "ClientIdentifierNotValid";
    /**
     * 0x86 - Bad User Name or Password
     * Description: The Server does not accept the User Name or Password specified by the Client.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["BadUserNameOrPassword"] = 134] = "BadUserNameOrPassword";
    /**
     * 0x87 - Not authorized
     * Description: The Client is not authorized to connect.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["NotAuthorized"] = 135] = "NotAuthorized";
    /**
     * 0x88 - Server unavailable
     * Description: The MQTT Server is not available.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ServerUnavailable"] = 136] = "ServerUnavailable";
    /**
     * 0x89 - Server busy
     * Description: The Server is busy. Try again later.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ServerBusy"] = 137] = "ServerBusy";
    /**
     * 0x8A - Banned
     * Description: This Client has been banned by administrative action. Contact the server administrator.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["Banned"] = 138] = "Banned";
    /**
     * 0x8C - Bad authentication method
     * Description: The authentication method is not supported or does not match the authentication method currently in use.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["BadAuthenticationMethod"] = 140] = "BadAuthenticationMethod";
    /**
     * 0x90 - Topic Name invalid
     * Description: The Will Topic Name is not malformed, but is not accepted by this Server.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["TopicNameInvalid"] = 144] = "TopicNameInvalid";
    /**
     * 0x95 - Packet too large
     * Description: The CONNECT packet exceeded the maximum permissible size.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["PacketTooLarge"] = 149] = "PacketTooLarge";
    /**
     * 0x97 - Quota exceeded
     * Description: An implementation or administrative imposed limit has been exceeded.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["QuotaExceeded"] = 151] = "QuotaExceeded";
    /**
     * 0x99 - Payload format invalid
     * Description: The Will Payload does not match the specified Payload Format Indicator.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["PayloadFormatInvalid"] = 153] = "PayloadFormatInvalid";
    /**
     * 0x9A - Retain not supported
     * Description: The Server does not support retained messages, and Will Retain was set to 1.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["RetainNotSupported"] = 154] = "RetainNotSupported";
    /**
     * 0x9B - QoS not supported
     * Description: The Server does not support the QoS set in Will QoS.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["QosNotSupported"] = 155] = "QosNotSupported";
    /**
     * 0x9C - Use another server
     * Description: The Client should temporarily use another server.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["UseAnotherServer"] = 156] = "UseAnotherServer";
    /**
     * 0x9D - Server moved
     * Description: The Client should permanently use another server.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ServerMoved"] = 157] = "ServerMoved";
    /**
     * 0x9F - Connection rate exceeded
     * Description: The connection rate limit has been exceeded.
     */
    MqttV500ConnectReasonCode[MqttV500ConnectReasonCode["ConnectionRateExceeded"] = 159] = "ConnectionRateExceeded";
})(MqttV500ConnectReasonCode || (MqttV500ConnectReasonCode = {}));
//# sourceMappingURL=mqttV500ConnectReasonCode.js.map
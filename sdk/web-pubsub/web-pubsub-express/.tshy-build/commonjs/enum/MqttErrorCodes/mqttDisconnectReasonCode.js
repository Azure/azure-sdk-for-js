"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttDisconnectReasonCode = void 0;
/**
 * MQTT 5.0 Disconnect Reason Codes.
 */
var MqttDisconnectReasonCode;
(function (MqttDisconnectReasonCode) {
    /**
     * 0x00 - Normal disconnection
     * Sent by: Client or Server
     * Description: Close the connection normally. Do not send the Will Message.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["NormalDisconnection"] = 0] = "NormalDisconnection";
    /**
     * 0x04 - Disconnect with Will Message
     * Sent by: Client
     * Description: The Client wishes to disconnect but requires that the Server also publishes its Will Message.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["DisconnectWithWillMessage"] = 4] = "DisconnectWithWillMessage";
    /**
     * 0x80 - Unspecified error
     * Sent by: Client or Server
     * Description: The Connection is closed but the sender either does not wish to reveal the reason, or none of the other Reason Codes apply.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["UnspecifiedError"] = 128] = "UnspecifiedError";
    /**
     * 0x81 - Malformed Packet
     * Sent by: Client or Server
     * Description: The received packet does not conform to this specification.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["MalformedPacket"] = 129] = "MalformedPacket";
    /**
     * 0x82 - Protocol Error
     * Sent by: Client or Server
     * Description: An unexpected or out of order packet was received.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ProtocolError"] = 130] = "ProtocolError";
    /**
     * 0x83 - Implementation specific error
     * Sent by: Client or Server
     * Description: The packet received is valid but cannot be processed by this implementation.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ImplementationSpecificError"] = 131] = "ImplementationSpecificError";
    /**
     * 0x87 - Not authorized
     * Sent by: Server
     * Description: The request is not authorized.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["NotAuthorized"] = 135] = "NotAuthorized";
    /**
     * 0x89 - Server busy
     * Sent by: Server
     * Description: The Server is busy and cannot continue processing requests from this Client.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ServerBusy"] = 137] = "ServerBusy";
    /**
     * 0x8B - Server shutting down
     * Sent by: Server
     * Description: The Server is shutting down.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ServerShuttingDown"] = 139] = "ServerShuttingDown";
    /**
     * 0x8D - Keep Alive timeout
     * Sent by: Server
     * Description: The Connection is closed because no packet has been received for 1.5 times the Keepalive time.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["KeepAliveTimeout"] = 141] = "KeepAliveTimeout";
    /**
     * 0x8E - Session taken over
     * Sent by: Server
     * Description: Another Connection using the same ClientID has connected causing this Connection to be closed.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["SessionTakenOver"] = 142] = "SessionTakenOver";
    /**
     * 0x8F - Topic Filter invalid
     * Sent by: Server
     * Description: The Topic Filter is correctly formed, but is not accepted by this Server.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["TopicFilterInvalid"] = 143] = "TopicFilterInvalid";
    /**
     * 0x90 - Topic Name invalid
     * Sent by: Client or Server
     * Description: The Topic Name is correctly formed, but is not accepted by this Client or Server.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["TopicNameInvalid"] = 144] = "TopicNameInvalid";
    /**
     * 0x93 - Receive Maximum exceeded
     * Sent by: Client or Server
     * Description: The Client or Server has received more than Receive Maximum publication for which it has not sent PUBACK or PUBCOMP.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ReceiveMaximumExceeded"] = 147] = "ReceiveMaximumExceeded";
    /**
     * 0x94 - Topic Alias invalid
     * Sent by: Client or Server
     * Description: The Client or Server has received a PUBLISH packet containing a Topic Alias which is greater than the Maximum Topic Alias it sent in the CONNECT or CONNACK packet.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["TopicAliasInvalid"] = 148] = "TopicAliasInvalid";
    /**
     * 0x95 - Packet too large
     * Sent by: Client or Server
     * Description: The packet size is greater than Maximum Packet Size for this Client or Server.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["PacketTooLarge"] = 149] = "PacketTooLarge";
    /**
     * 0x96 - Message rate too high
     * Sent by: Client or Server
     * Description: The received data rate is too high.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["MessageRateTooHigh"] = 150] = "MessageRateTooHigh";
    /**
     * 0x97 - Quota exceeded
     * Sent by: Client or Server
     * Description: An implementation or administrative imposed limit has been exceeded.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["QuotaExceeded"] = 151] = "QuotaExceeded";
    /**
     * 0x98 - Administrative action
     * Sent by: Client or Server
     * Description: The Connection is closed due to an administrative action.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["AdministrativeAction"] = 152] = "AdministrativeAction";
    /**
     * 0x99 - Payload format invalid
     * Sent by: Client or Server
     * Description: The payload format does not match the one specified by the Payload Format Indicator.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["PayloadFormatInvalid"] = 153] = "PayloadFormatInvalid";
    /**
     * 0x9A - Retain not supported
     * Sent by: Server
     * Description: The Server does not support retained messages.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["RetainNotSupported"] = 154] = "RetainNotSupported";
    /**
     * 0x9B - QoS not supported
     * Sent by: Server
     * Description: The Client specified a QoS greater than the QoS specified in a Maximum QoS in the CONNACK.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["QosNotSupported"] = 155] = "QosNotSupported";
    /**
     * 0x9C - Use another server
     * Sent by: Server
     * Description: The Client should temporarily change its Server.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["UseAnotherServer"] = 156] = "UseAnotherServer";
    /**
     * 0x9D - Server moved
     * Sent by: Server
     * Description: The Server is moved and the Client should permanently change its server location.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ServerMoved"] = 157] = "ServerMoved";
    /**
     * 0x9E - Shared Subscriptions not supported
     * Sent by: Server
     * Description: The Server does not support Shared Subscriptions.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["SharedSubscriptionsNotSupported"] = 158] = "SharedSubscriptionsNotSupported";
    /**
     * 0x9F - Connection rate exceeded
     * Sent by: Server
     * Description: This connection is closed because the connection rate is too high.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["ConnectionRateExceeded"] = 159] = "ConnectionRateExceeded";
    /**
     * 0xA0 - Maximum connect time
     * Sent by: Server
     * Description: The maximum connection time authorized for this connection has been exceeded.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["MaximumConnectTime"] = 160] = "MaximumConnectTime";
    /**
     * 0xA1 - Subscription Identifiers not supported
     * Sent by: Server
     * Description: The Server does not support Subscription Identifiers; the subscription is not accepted.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["SubscriptionIdentifiersNotSupported"] = 161] = "SubscriptionIdentifiersNotSupported";
    /**
     * 0xA2 - Wildcard Subscriptions not supported
     * Sent by: Server
     * Description: The Server does not support Wildcard Subscriptions; the subscription is not accepted.
     */
    MqttDisconnectReasonCode[MqttDisconnectReasonCode["WildcardSubscriptionsNotSupported"] = 162] = "WildcardSubscriptionsNotSupported";
})(MqttDisconnectReasonCode || (exports.MqttDisconnectReasonCode = MqttDisconnectReasonCode = {}));
//# sourceMappingURL=mqttDisconnectReasonCode.js.map
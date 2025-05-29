/**
 * MQTT 5.0 Disconnect Reason Codes.
 */
export declare enum MqttDisconnectReasonCode {
    /**
     * 0x00 - Normal disconnection
     * Sent by: Client or Server
     * Description: Close the connection normally. Do not send the Will Message.
     */
    NormalDisconnection = 0,
    /**
     * 0x04 - Disconnect with Will Message
     * Sent by: Client
     * Description: The Client wishes to disconnect but requires that the Server also publishes its Will Message.
     */
    DisconnectWithWillMessage = 4,
    /**
     * 0x80 - Unspecified error
     * Sent by: Client or Server
     * Description: The Connection is closed but the sender either does not wish to reveal the reason, or none of the other Reason Codes apply.
     */
    UnspecifiedError = 128,
    /**
     * 0x81 - Malformed Packet
     * Sent by: Client or Server
     * Description: The received packet does not conform to this specification.
     */
    MalformedPacket = 129,
    /**
     * 0x82 - Protocol Error
     * Sent by: Client or Server
     * Description: An unexpected or out of order packet was received.
     */
    ProtocolError = 130,
    /**
     * 0x83 - Implementation specific error
     * Sent by: Client or Server
     * Description: The packet received is valid but cannot be processed by this implementation.
     */
    ImplementationSpecificError = 131,
    /**
     * 0x87 - Not authorized
     * Sent by: Server
     * Description: The request is not authorized.
     */
    NotAuthorized = 135,
    /**
     * 0x89 - Server busy
     * Sent by: Server
     * Description: The Server is busy and cannot continue processing requests from this Client.
     */
    ServerBusy = 137,
    /**
     * 0x8B - Server shutting down
     * Sent by: Server
     * Description: The Server is shutting down.
     */
    ServerShuttingDown = 139,
    /**
     * 0x8D - Keep Alive timeout
     * Sent by: Server
     * Description: The Connection is closed because no packet has been received for 1.5 times the Keepalive time.
     */
    KeepAliveTimeout = 141,
    /**
     * 0x8E - Session taken over
     * Sent by: Server
     * Description: Another Connection using the same ClientID has connected causing this Connection to be closed.
     */
    SessionTakenOver = 142,
    /**
     * 0x8F - Topic Filter invalid
     * Sent by: Server
     * Description: The Topic Filter is correctly formed, but is not accepted by this Server.
     */
    TopicFilterInvalid = 143,
    /**
     * 0x90 - Topic Name invalid
     * Sent by: Client or Server
     * Description: The Topic Name is correctly formed, but is not accepted by this Client or Server.
     */
    TopicNameInvalid = 144,
    /**
     * 0x93 - Receive Maximum exceeded
     * Sent by: Client or Server
     * Description: The Client or Server has received more than Receive Maximum publication for which it has not sent PUBACK or PUBCOMP.
     */
    ReceiveMaximumExceeded = 147,
    /**
     * 0x94 - Topic Alias invalid
     * Sent by: Client or Server
     * Description: The Client or Server has received a PUBLISH packet containing a Topic Alias which is greater than the Maximum Topic Alias it sent in the CONNECT or CONNACK packet.
     */
    TopicAliasInvalid = 148,
    /**
     * 0x95 - Packet too large
     * Sent by: Client or Server
     * Description: The packet size is greater than Maximum Packet Size for this Client or Server.
     */
    PacketTooLarge = 149,
    /**
     * 0x96 - Message rate too high
     * Sent by: Client or Server
     * Description: The received data rate is too high.
     */
    MessageRateTooHigh = 150,
    /**
     * 0x97 - Quota exceeded
     * Sent by: Client or Server
     * Description: An implementation or administrative imposed limit has been exceeded.
     */
    QuotaExceeded = 151,
    /**
     * 0x98 - Administrative action
     * Sent by: Client or Server
     * Description: The Connection is closed due to an administrative action.
     */
    AdministrativeAction = 152,
    /**
     * 0x99 - Payload format invalid
     * Sent by: Client or Server
     * Description: The payload format does not match the one specified by the Payload Format Indicator.
     */
    PayloadFormatInvalid = 153,
    /**
     * 0x9A - Retain not supported
     * Sent by: Server
     * Description: The Server does not support retained messages.
     */
    RetainNotSupported = 154,
    /**
     * 0x9B - QoS not supported
     * Sent by: Server
     * Description: The Client specified a QoS greater than the QoS specified in a Maximum QoS in the CONNACK.
     */
    QosNotSupported = 155,
    /**
     * 0x9C - Use another server
     * Sent by: Server
     * Description: The Client should temporarily change its Server.
     */
    UseAnotherServer = 156,
    /**
     * 0x9D - Server moved
     * Sent by: Server
     * Description: The Server is moved and the Client should permanently change its server location.
     */
    ServerMoved = 157,
    /**
     * 0x9E - Shared Subscriptions not supported
     * Sent by: Server
     * Description: The Server does not support Shared Subscriptions.
     */
    SharedSubscriptionsNotSupported = 158,
    /**
     * 0x9F - Connection rate exceeded
     * Sent by: Server
     * Description: This connection is closed because the connection rate is too high.
     */
    ConnectionRateExceeded = 159,
    /**
     * 0xA0 - Maximum connect time
     * Sent by: Server
     * Description: The maximum connection time authorized for this connection has been exceeded.
     */
    MaximumConnectTime = 160,
    /**
     * 0xA1 - Subscription Identifiers not supported
     * Sent by: Server
     * Description: The Server does not support Subscription Identifiers; the subscription is not accepted.
     */
    SubscriptionIdentifiersNotSupported = 161,
    /**
     * 0xA2 - Wildcard Subscriptions not supported
     * Sent by: Server
     * Description: The Server does not support Wildcard Subscriptions; the subscription is not accepted.
     */
    WildcardSubscriptionsNotSupported = 162
}
//# sourceMappingURL=mqttDisconnectReasonCode.d.ts.map
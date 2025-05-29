/**
 * MQTT 3.1.1 Connect Return Codes.
 */
export declare enum MqttV311ConnectReturnCode {
    /**
     * 0x01: Connection refused, unacceptable protocol version
     * The Server does not support the level of the MQTT protocol requested by the Client.
     */
    UnacceptableProtocolVersion = 1,
    /**
     * 0x02: Connection refused, identifier rejected
     * The Client identifier is correct UTF-8 but not allowed by the Server.
     */
    IdentifierRejected = 2,
    /**
     * 0x03: Connection refused, server unavailable
     * The Network Connection has been made but the MQTT service is unavailable.
     */
    ServerUnavailable = 3,
    /**
     * 0x04: Connection refused, bad user name or password
     * The data in the user name or password is malformed.
     */
    BadUsernameOrPassword = 4,
    /**
     * 0x05: Connection refused, not authorized
     * The Client is not authorized to connect.
     */
    NotAuthorized = 5
}
//# sourceMappingURL=mqttV311ConnectReturnCode.d.ts.map
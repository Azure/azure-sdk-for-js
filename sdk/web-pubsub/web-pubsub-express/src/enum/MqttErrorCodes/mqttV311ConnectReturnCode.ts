// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * MQTT 3.1.1 Connect Return Codes.
 */
export enum MqttV311ConnectReturnCode {
  /**
   * 0x01: Connection refused, unacceptable protocol version
   * The Server does not support the level of the MQTT protocol requested by the Client.
   */
  UnacceptableProtocolVersion = 0x01,

  /**
   * 0x02: Connection refused, identifier rejected
   * The Client identifier is correct UTF-8 but not allowed by the Server.
   */
  IdentifierRejected = 0x02,

  /**
   * 0x03: Connection refused, server unavailable
   * The Network Connection has been made but the MQTT service is unavailable.
   */
  ServerUnavailable = 0x03,

  /**
   * 0x04: Connection refused, bad user name or password
   * The data in the user name or password is malformed.
   */
  BadUsernameOrPassword = 0x04,

  /**
   * 0x05: Connection refused, not authorized
   * The Client is not authorized to connect.
   */
  NotAuthorized = 0x05,
}

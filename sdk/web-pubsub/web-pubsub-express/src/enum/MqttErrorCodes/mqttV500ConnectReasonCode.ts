// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * MQTT Connect Reason Codes
 * These codes represent the reasons for the outcome of an MQTT CONNECT packet as per MQTT 5.0 specification.
 */
export enum MqttV500ConnectReasonCode {
  /**
   * 0x80 - Unspecified error
   * Description: The Server does not wish to reveal the reason for the failure, or none of the other Reason Codes apply.
   */
  UnspecifiedError = 0x80,

  /**
   * 0x81 - Malformed Packet
   * Description: Data within the CONNECT packet could not be correctly parsed.
   */
  MalformedPacket = 0x81,

  /**
   * 0x82 - Protocol Error
   * Description: Data in the CONNECT packet does not conform to this specification.
   */
  ProtocolError = 0x82,

  /**
   * 0x83 - Implementation specific error
   * Description: The CONNECT is valid but is not accepted by this Server.
   */
  ImplementationSpecificError = 0x83,

  /**
   * 0x84 - Unsupported Protocol Version
   * Description: The Server does not support the version of the MQTT protocol requested by the Client.
   */
  UnsupportedProtocolVersion = 0x84,

  /**
   * 0x85 - Client Identifier not valid
   * Description: The Client Identifier is a valid string but is not allowed by the Server.
   */
  ClientIdentifierNotValid = 0x85,

  /**
   * 0x86 - Bad User Name or Password
   * Description: The Server does not accept the User Name or Password specified by the Client.
   */
  BadUserNameOrPassword = 0x86,

  /**
   * 0x87 - Not authorized
   * Description: The Client is not authorized to connect.
   */
  NotAuthorized = 0x87,

  /**
   * 0x88 - Server unavailable
   * Description: The MQTT Server is not available.
   */
  ServerUnavailable = 0x88,

  /**
   * 0x89 - Server busy
   * Description: The Server is busy. Try again later.
   */
  ServerBusy = 0x89,

  /**
   * 0x8A - Banned
   * Description: This Client has been banned by administrative action. Contact the server administrator.
   */
  Banned = 0x8a,

  /**
   * 0x8C - Bad authentication method
   * Description: The authentication method is not supported or does not match the authentication method currently in use.
   */
  BadAuthenticationMethod = 0x8c,

  /**
   * 0x90 - Topic Name invalid
   * Description: The Will Topic Name is not malformed, but is not accepted by this Server.
   */
  TopicNameInvalid = 0x90,

  /**
   * 0x95 - Packet too large
   * Description: The CONNECT packet exceeded the maximum permissible size.
   */
  PacketTooLarge = 0x95,

  /**
   * 0x97 - Quota exceeded
   * Description: An implementation or administrative imposed limit has been exceeded.
   */
  QuotaExceeded = 0x97,

  /**
   * 0x99 - Payload format invalid
   * Description: The Will Payload does not match the specified Payload Format Indicator.
   */
  PayloadFormatInvalid = 0x99,

  /**
   * 0x9A - Retain not supported
   * Description: The Server does not support retained messages, and Will Retain was set to 1.
   */
  RetainNotSupported = 0x9a,

  /**
   * 0x9B - QoS not supported
   * Description: The Server does not support the QoS set in Will QoS.
   */
  QosNotSupported = 0x9b,

  /**
   * 0x9C - Use another server
   * Description: The Client should temporarily use another server.
   */
  UseAnotherServer = 0x9c,

  /**
   * 0x9D - Server moved
   * Description: The Client should permanently use another server.
   */
  ServerMoved = 0x9d,

  /**
   * 0x9F - Connection rate exceeded
   * Description: The connection rate limit has been exceeded.
   */
  ConnectionRateExceeded = 0x9f,
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Error response.
 */
export interface ErrorResponse {
  /**
   * Error code.
   */
  code: ErrorCode;
  /**
   * Error detail.
   */
  detail?: string;
}

/**
 * Error code for the response
 */
export enum ErrorCode {
  /**
   * Unauthorized response to service using 401.
   */
  unauthorized = 401,
  /**
   * Server error response to service using 500.
   */
  serverError = 500,
  /**
   * User error response to service using 400.
   */
  userError = 400
}

/**
 * Response of the connect event.
 */
export interface ConnectResponse {
  /**
   * If error is set, we consider this as a failed response.
   */
  error?: ErrorResponse;
  /**
   * Set the groups the connection would like to join.
   */
  groups?: string[];
  /**
   * Set the roles the connection belongs to.
   */
  roles?: string[];
  /**
   * Set the userId for the connection.
   */
  userId?: string;
  /**
   * Set the subprotocol for the connection to complete WebSocket handshake.
   */
  subprotocol?: string;
}

/**
 * Response of the user event.
 */
export interface UserEventResponse {
  /**
   * Error response. If error is set, we consider this as a failed response.
   */
  error?: ErrorResponse;
  /**
   * Payload data to send back to the client.
   */
  payload?: PayloadData;
}

/**
 * The connection context representing the client WebSocket connection.
 */
export interface ConnectionContext {
  /**
   * The hub the connection belongs to.
   */
  hub: string;
  /**
   * The Id of the connection.
   */
  connectionId: string;
  /**
   * The event name of this CloudEvents request.
   */
  eventName: string;
  /**
   * The host name this CloudEvents request comes from.
   */
  host: string;
  /**
   * The user id of the connection.
   */
  userId?: string;
  /**
   * The subprotocol of this connection.
   */
  subprotocol?: string;
}

/**
 * Request for the connect event.
 */
export interface ConnectRequest {
  /**
   * The context of current CloudEvents request.
   */
  context: ConnectionContext;
  /**
   * The claims that the client WebSocket connection has when it connects.
   */
  claims?: { [key: string]: string[] };
  /**
   * The queries that the client WebSocket connection has when it connects.
   */
  queries?: { [key: string]: string[] };
  /**
   * The subprotocols that the client WebSocket connection uses to do handshake.
   */
  subprotocols?: string[];
  /**
   * The client certificate info that the client WebSocket connection uses to connect.
   */
  clientCertificates?: Certificate[];
}

/**
 * The client certificate.
 */
export interface Certificate {
  /**
   * The thumbprint of the certificate.
   */
  thumbprint: string;
}

/**
 * Request for the connected event.
 */
export interface ConnectedRequest {
  /**
   * The context of current CloudEvents request.
   */
  context: ConnectionContext;
}

/**
 * Request for the user event.
 */
export interface UserEventRequest {
  /**
   * The context of current CloudEvents request.
   */
  context: ConnectionContext;
  /**
   * The payload body of the user event request.
   */
  payload: PayloadData;
}

/**
 * The payload data.
 */
export interface PayloadData {
  /**
   * The content data.
   */
  data: string | ArrayBuffer;
  /**
   * The type of the data.
   */
  dataType: PayloadDataType;
}

/**
 * The data type of the payload data.
 */
export enum PayloadDataType {
  /**
   * The binary format.
   */
  binary,
  /**
   * The plain text format.
   */
  text,
  /**
   * The JSON format.
   */
  json
}

/**
 * Request for the disconnected event.
 */
export interface DisconnectedRequest {
  /**
   * The context of current CloudEvents request.
   */
  context: ConnectionContext;
  /**
   * The reason that the connection disconnects.
   */
  reason?: string;
}

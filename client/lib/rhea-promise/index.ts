// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as rhea from "rhea";
import * as debugModule from "debug";

const debug = debugModule("rhea-promise");

export {
  Delivery, Message, OnAmqpEvent, MessageProperties, MessageHeader, EventContext,
  Connection, ReceiverOptions, SenderOptions, ConnectionOptions, AmqpError, Dictionary
} from "rhea";

/**
 * Establishes an amqp connection.
 * @param {ConnectionOptions} [options] Options to be provided for establishing an amqp connection.
 * @return {Promise<Connection>} Promise<Connection>
 * - **Resolves** the promise with the Connection object when rhea emits the "connection_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "connection_close" event while trying
 * to establish an amqp connection.
 */
export function connect(options?: rhea.ConnectionOptions): Promise<rhea.Connection> {
  return new Promise((resolve, reject) => {
    const connection = rhea.connect(options);

    function removeListeners(connection: rhea.Connection): void {
      connection.removeListener("connection_open", onOpen);
      connection.removeListener("connection_close", onClose);
      connection.removeListener("disconnected", onClose);
    }

    function onOpen(context: rhea.EventContext): void {
      removeListeners(connection);
      process.nextTick(() => {
        debug("Resolving the promise with amqp connection.");
        resolve(connection);
      });
    }

    function onClose(context: rhea.EventContext): void {
      removeListeners(connection);
      debug(`Error occurred while establishing amqp connection.`, context.connection.error);
      reject(context.connection.error);
    }

    connection.once("connection_open", onOpen);
    connection.once("connection_close", onClose);
    connection.once("disconnected", onClose);
  });
}

/**
 * Closes the amqp connection.
 * @param {Connection} connection The amqp connection that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "connection_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "connection_error" event while trying
 * to close an amqp connection.
 */
export function closeConnection(connection: rhea.Connection): Promise<void> {
  if (!connection || (connection && typeof connection !== "object")) {
    throw new Error("connection is a required parameter and must be of type 'object'.");
  }

  return new Promise<void>((resolve, reject) => {
    if (connection.is_open()) {
      function onClose(context: rhea.EventContext): void {
        connection.removeListener("connection_close", onClose);
        process.nextTick(() => {
          debug("Resolving the promise as the connection has been successfully closed.");
          resolve();
        });
      }

      function onError(context: rhea.EventContext): void {
        connection.removeListener("connection_error", onError);
        debug(`Error occurred while closing amqp connection.`, context.connection.error);
        reject(context.connection.error);
      }

      connection.once("connection_close", onClose);
      connection.once("connection_error", onError);
      connection.close();
    } else {
      resolve();
    }
  });
}

/**
 * Creates an amqp session on the provided amqp connection.
 * @param {Connection} connection The amqp connection object
 * @return {Promise<Session>} Promise<Session>
 * - **Resolves** the promise with the Session object when rhea emits the "session_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "session_close" event while trying
 * to create an amqp session.
 */
export function createSession(connection: rhea.Connection): Promise<rhea.Session> {
  if (!connection || (connection && typeof connection !== "object")) {
    throw new Error("connection is a required parameter and must be of type 'object'.");
  }

  return new Promise((resolve, reject) => {
    const session = connection.create_session();

    function removeListeners(session: rhea.Session): void {
      session.removeListener("session_open", onOpen);
      session.removeListener("session_close", onClose);
    }

    function onOpen(context: rhea.EventContext): void {
      removeListeners(session);
      process.nextTick(() => {
        debug("Resolving the promise with amqp session.");
        resolve(session);
      });
    }

    function onClose(context: rhea.EventContext): void {
      removeListeners(session);
      debug(`Error occurred while establishing a session over amqp connection.`, context.session.error);
      reject(context.session.error);
    }

    session.once("session_open", onOpen);
    session.once("session_close", onClose);
    debug("Calling amqp session.begin().");
    session.begin();
  });
}

/**
 * Closes the amqp session.
 * @param {Session} session The amqp session that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "session_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "session_error" event while trying
 * to close an amqp session.
 */
export function closeSession(session: rhea.Session): Promise<void> {
  if (!session || (session && typeof session !== "object")) {
    throw new Error("session is a required parameter and must be of type 'object'.");
  }

  return new Promise<void>((resolve, reject) => {
    if (session.is_open()) {
      function onClose(context: rhea.EventContext): void {
        session.removeListener("session_close", onClose);
        process.nextTick(() => {
          debug("Resolving the promise as the amqp session has been closed.");
          resolve();
        });
      }

      function onError(context: rhea.EventContext): void {
        session.removeListener("session_error", onError);
        debug(`Error occurred while closing amqp session.`, context.session.error);
        reject(context.session.error);
      }

      session.once("session_close", onClose);
      session.once("session_error", onError);
      session.close();
    } else {
      resolve();
    }
  });
}

/**
 * Creates an amqp sender on the provided amqp session.
 * @param {Session} session The amqp session object on which the sender link needs to be established.
 * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
 * @return {Promise<Sender>} Promise<Sender>
 * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
 * to create an amqp sender.
 */
export function createSender(session: rhea.Session, options?: rhea.SenderOptions): Promise<rhea.Sender> {
  if (!session || (session && typeof session !== "object")) {
    throw new Error("session is a required parameter and must be of type 'object'.");
  }

  return new Promise((resolve, reject) => {
    const sender = session.attach_sender(options);

    function removeListeners(session: rhea.Session): void {
      sender.removeListener("sendable", onOpen);
      sender.removeListener("sender_close", onClose);
    }

    function onOpen(context: rhea.EventContext): void {
      removeListeners(session);
      process.nextTick(() => {
        debug(`Resolving the promise with amqp sender "${sender.name}".`);
        resolve(sender);
      });
    }

    function onClose(context: rhea.EventContext): void {
      removeListeners(session);
      debug(`Error occurred while creating a sender over amqp connection.`, context.sender!.error);
      reject(context.sender!.error);
    }

    sender.once("sendable", onOpen);
    sender.once("sender_close", onClose);
  });
}

/**
 * Creates an amqp sender on the provided amqp session.
 * @param {Session} session The amqp session object on which the sender link needs to be established.
 * @param {OnAmqpEvent} onError The event handler for the "error" event for the sender.
 * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
 * @return {Promise<Sender>} Promise<Sender>
 * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
 * to create an amqp sender.
 */
export function createSenderWithHandlers(session: rhea.Session, onError: rhea.OnAmqpEvent, options?: rhea.SenderOptions): Promise<rhea.Sender> {
  if (!session || (session && typeof session !== "object")) {
    throw new Error("session is a required parameter and must be of type 'object'.");
  }

  return new Promise((resolve, reject) => {
    const sender = session.attach_sender(options);
    sender.on("sender_error", onError);

    function removeListeners(session: rhea.Session): void {
      sender.removeListener("sendable", onOpen);
      sender.removeListener("sender_close", onClose);
    }

    function onOpen(context: rhea.EventContext): void {
      removeListeners(session);
      process.nextTick(() => {
        debug(`Resolving the promise with amqp sender "${sender.name}".`);
        resolve(sender);
      });
    }

    function onClose(context: rhea.EventContext): void {
      removeListeners(session);
      debug(`Error occurred while creating a sender over amqp connection.`, context.sender!.error);
      reject(context.sender!.error);
    }

    sender.once("sendable", onOpen);
    sender.once("sender_close", onClose);
  });
}

/**
 * Closes the amqp sender.
 * @param {Sender} sender The amqp sender that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "sender_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the
 * "sender_error" event while trying to close an amqp sender.
 */
export function closeSender(sender: rhea.Sender): Promise<void> {
  if (!sender || (sender && typeof sender !== "object")) {
    throw new Error("sender is a required parameter and must be of type 'object'.");
  }

  return new Promise<void>((resolve, reject) => {
    if (sender.is_open()) {
      function onClose(context: rhea.EventContext): void {
        sender.removeListener("sender_close", onClose);
        process.nextTick(() => {
          debug("Resolving the promise as the amqp sender has been closed.");
          resolve();
        });
      }

      function onError(context: rhea.EventContext): void {
        sender.removeListener("sender_error", onError);
        debug(`Error occurred while closing amqp sender.`, context.sender!.error);
        reject(context.sender!.error);
      }

      sender.once("sender_close", onClose);
      sender.once("sender_error", onError);
      sender.close();
    } else {
      resolve();
    }
  });
}

/**
 * Creates an amqp receiver on the provided amqp session. This method should be used when you will be
 * sending a request and waiting for a response from the service. For example: This method is useful
 * while creating request/response links for $management or $cbs endpoint.
 * @param {Session} session The amqp session object on which the receiver link needs to be established.
 * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
 * @return {Promise<Receiver>} Promise<Receiver>
 * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
 * to create an amqp receiver.
 */
export function createReceiver(session: rhea.Session, options?: rhea.ReceiverOptions): Promise<rhea.Receiver> {
  if (!session || (session && typeof session !== "object")) {
    throw new Error("session is a required parameter and must be of type 'object'.");
  }

  return new Promise((resolve, reject) => {
    const receiver = session.attach_receiver(options);

    function removeListeners(receiver: rhea.Receiver): void {
      receiver.removeListener("receiver_open", onOpen);
      receiver.removeListener("receiver_close", onClose);
    }

    function onOpen(context: rhea.EventContext): void {
      removeListeners(receiver);
      process.nextTick(() => {
        debug(`Resolving the promise with amqp receiver "${receiver.name}".`);
        resolve(receiver);
      });
    }

    function onClose(context: rhea.EventContext): void {
      removeListeners(receiver);
      debug(`Error occurred while creating a receiver over amqp connection.`, context.receiver!.error);
      reject(context.receiver!.error);
    }

    receiver.once("receiver_open", onOpen);
    receiver.once("receiver_close", onClose);
  });
}

/**
 * Creates an amqp receiver with provided message and error event handlers on the provided amqp session.
 * This method should be used when you want to ensure that no messages are lost. For example: This method
 * is useful for creating EventHub Receivers where you want to start receiving ASAP.
 * @param {Session} session The amqp session object on which the receiver link needs to be established.
 * @param {OnAmqpEvent} onMessage The event handler for the "message" event for the receiver.
 * @param {OnAmqpEvent} onError The event handler for the "error" event for the receiver.
 * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
 * @return {Promise<Receiver>} Promise<Receiver>
 * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
 * to create an amqp receiver.
 */
export function createReceiverWithHandlers(session: rhea.Session, onMessage: rhea.OnAmqpEvent, onError: rhea.OnAmqpEvent, options?: rhea.ReceiverOptions): Promise<rhea.Receiver> {
  if (!session || (session && typeof session !== "object")) {
    throw new Error("session is a required parameter and must be of type 'object'.");
  }

  if (!onMessage || (onMessage && typeof onMessage !== "function")) {
    throw new Error("onMessage is a required parameter and must be of type 'function'.");
  }

  if (!onError || (onError && typeof onError !== "function")) {
    throw new Error("onError is a required parameter and must be of type 'function'.");
  }

  return new Promise((resolve, reject) => {
    const receiver = session.attach_receiver(options);
    receiver.on("message", onMessage);
    receiver.on("receiver_error", onError);

    function removeListeners(receiver: any): void {
      receiver.removeListener("receiver_open", onOpen);
      receiver.removeListener("receiver_close", onClose);
    }

    function onOpen(context: rhea.EventContext): void {
      removeListeners(receiver);
      process.nextTick(() => {
        debug(`Resolving the promise with amqp receiver "${receiver.name}".`);
        resolve(receiver);
      });
    }

    function onClose(context: rhea.EventContext): void {
      removeListeners(receiver);
      debug(`Error occurred while creating a receiver over amqp connection.`, context.receiver!.error);
      reject(context.receiver!.error);
    }

    receiver.once("receiver_open", onOpen);
    receiver.once("receiver_close", onClose);
  });
}

/**
 * Closes the amqp receiver.
 * @param {Receiver} receiver The amqp receiver that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "receiver_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the
 * "receiver_error" event while trying to close an amqp receiver.
 */
export function closeReceiver(receiver: rhea.Receiver): Promise<void> {
  if (!receiver || (receiver && typeof receiver !== "object")) {
    throw new Error("receiver is a required parameter and must be of type 'object'.");
  }

  return new Promise<void>((resolve, reject) => {
    if (receiver.is_open()) {
      function onClose(context: rhea.EventContext): void {
        receiver.removeListener("receiver_close", onClose);
        process.nextTick(() => {
          debug("Resolving the promise as the amqp receiver has been closed.");
          resolve();
        });
      }

      function onError(context: rhea.EventContext): void {
        receiver.removeListener("receiver_error", onError);
        debug(`Error occurred while closing amqp receiver.`, context.receiver!.error);
        reject(context.receiver!.error);
      }

      receiver.once("receiver_close", onClose);
      receiver.once("receiver_error", onError);
      receiver.close();
    } else {
      resolve();
    }
  });
}

/**
 * Defines a mapping for Http like response status codes for different status-code values provided by an AMQP broker.
 * @enum AmqpResponseStatusCode
 */
export enum AmqpResponseStatusCode {
  Continue = 100,
  SwitchingProtocols = 101,
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  ResetContent = 205,
  PartialContent = 206,
  Ambiguous = 300,
  MultipleChoices = 300,
  Moved = 301,
  MovedPermanently = 301,
  Found = 302,
  Redirect = 302,
  RedirectMethod = 303,
  SeeOther = 303,
  NotModified = 304,
  UseProxy = 305,
  Unused = 306,
  RedirectKeepVerb = 307,
  TemporaryRedirect = 307,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  NotAcceptable = 406,
  ProxyAuthenticationRequired = 407,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  LengthRequired = 411,
  PreconditionFailed = 412,
  RequestEntityTooLarge = 413,
  RequestUriTooLong = 414,
  UnsupportedMediaType = 415,
  RequestedRangeNotSatisfiable = 416,
  ExpectationFailed = 417,
  UpgradeRequired = 426,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
  HttpVersionNotSupported = 505
}

/**
 * Describes the delivery annotations.
 * @interface
 */
export interface EventHubDeliveryAnnotations extends rhea.DeliveryAnnotations {
  /**
   * @property {string} [last_enqueued_offset] The offset of the last event.
   */
  last_enqueued_offset?: string;
  /**
   * @property {number} [last_enqueued_sequence_number] The sequence number of the last event.
   */
  last_enqueued_sequence_number?: number;
  /**
   * @property {number} [last_enqueued_time_utc] The enqueued time of the last event.
   */
  last_enqueued_time_utc?: number;
  /**
   * @property {number} [runtime_info_retrieval_time_utc] The retrieval time of the last event.
   */
  runtime_info_retrieval_time_utc?: number;
  /**
   * @property {string} Any unknown delivery annotations.
   */
  [x: string]: any;
}

/**
 * Map containing message attributes that will be held in the message header.
 */
export interface EventHubMessageAnnotations extends rhea.MessageAnnotations {
  /**
   * @property {string | null} [x-opt-partition-key] Annotation for the partition key set for the event.
   */
  "x-opt-partition-key"?: string | null;
  /**
   * @property {number} [x-opt-sequence-number] Annontation for the sequence number of the event.
   */
  "x-opt-sequence-number"?: number;
  /**
   * @property {number} [x-opt-enqueued-time] Annotation for the enqueued time of the event.
   */
  "x-opt-enqueued-time"?: number;
  /**
   * @property {string} [x-opt-offset] Annotation for the offset of the event.
   */
  "x-opt-offset"?: string;
  /**
   * @property {any} Any other annotation that can be added to the message.
   */
  [x: string]: any;
}

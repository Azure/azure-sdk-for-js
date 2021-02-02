// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { Constants } from "./util/constants";
import {
  Message as RheaMessage,
  Connection,
  EventContext,
  Receiver,
  ReceiverEvents,
  ReceiverOptions,
  ReqResLink,
  Sender,
  SenderOptions,
  Session,
  generate_uuid
} from "rhea-promise";
import { ConditionStatusMapper, translate } from "./errors";
import { logErrorStackTrace, logger } from "./log";

/**
 * Describes the options that can be specified while sending a request.
 */
export interface SendRequestOptions {
  /**
   * @property {AbortSignalLike} [abortSignal] Cancels the operation.
   */
  abortSignal?: AbortSignalLike;
  /**
   * @property {number} [timeoutInMs] Max time to wait for the operation to complete.
   * Default: `60000 milliseconds`.
   */
  timeoutInMs?: number;
  /**
   * @property {string} [requestName] Name of the request being performed.
   */
  requestName?: string;
}

/**
 * @internal
 */
export interface DeferredPromiseWithCallback {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  /**
   * To be called before resolving or rejecting the deferred promise
   */
  cleanupBeforeResolveOrReject: () => void;
}

/**
 * Describes an amqp request(sender)-response(receiver) link that is created over an amqp session.
 * @class RequestResponseLink
 */
export class RequestResponseLink implements ReqResLink {
  /**
   * @constructor
   * @param {Session} session The amqp session.
   * @param {Sender} sender The amqp sender link.
   * @param {Receiver} receiver The amqp receiver link.
   */
  constructor(public session: Session, public sender: Sender, public receiver: Receiver) {
    this.session = session;
    this.sender = sender;
    this.receiver = receiver;
    this.receiver.on(ReceiverEvents.message, (context) => {
      onMessageReceived(context, this.connection.id, this._responsesMap);
    });
  }

  /**
   * @property {Map<string, Promise<any>>} _responsesMap Maintains a map of responses that
   * are being actively returned. It acts as a store for correlating the responses received for
   * the send requests.
   */
  private _responsesMap: Map<string, DeferredPromiseWithCallback> = new Map<
    string,
    DeferredPromiseWithCallback
  >();

  /**
   * Provides the underlying amqp connection object.
   * @returns {Connection} Connection.
   */
  get connection(): Connection {
    return this.session.connection;
  }

  /**
   * Indicates whether the session and the sender and receiver links are all open or closed.
   * @returns {boolean} boolean - `true` - `open`, `false` - `closed`.
   */
  isOpen(): boolean {
    return this.session.isOpen() && this.sender.isOpen() && this.receiver.isOpen();
  }

  /**
   * Sends the given request message and returns the received response. If the operation is not
   * completed in the provided timeout in milliseconds `default: 60000`, then `OperationTimeoutError` is thrown.
   *
   * @param {RheaMessage} request The AMQP (request) message.
   * @param {SendRequestOptions} [options] Options that can be provided while sending a request.
   * @returns {Promise<Message>} Promise<Message> The AMQP (response) message.
   */
  sendRequest(request: RheaMessage, options: SendRequestOptions = {}): Promise<RheaMessage> {
    const timeoutInMs = options.timeoutInMs || Constants.defaultOperationTimeoutInMs;

    const aborter: AbortSignalLike | undefined = options.abortSignal;

    // If message_id is not already set on the request, set it to a unique value
    // This helps in determining the right response for current request among multiple incoming messages
    if (!request.message_id) {
      request.message_id = generate_uuid();
    }

    return new Promise<RheaMessage>((resolve: any, reject: any) => {
      const rejectOnAbort = (): void => {
        this._responsesMap.delete(request.message_id as string);
        const address = this.receiver.address || "address";
        const requestName = options.requestName;
        const desc: string =
          `[${this.connection.id}] The request "${requestName}" ` +
          `to "${address}" has been cancelled by the user.`;
        // Cancellation is a user-intended action, so log to info instead of warning.
        logger.info(desc);
        const error = new AbortError(
          `The ${requestName ? requestName + " " : ""}operation has been cancelled by the user.`
        );

        reject(error);
      };

      const onAbort = (): void => {
        // safe to clear the timeout if it hasn't already occurred.
        clearTimeout(timer);
        aborter!.removeEventListener("abort", onAbort);

        rejectOnAbort();
      };

      if (aborter) {
        // the aborter may have been triggered between request attempts
        // so check if it was triggered and reject if needed.
        if (aborter.aborted) {
          return rejectOnAbort();
        }
        aborter.addEventListener("abort", onAbort);
      }

      const timer = setTimeout(() => {
        this._responsesMap.delete(request.message_id as string);
        if (aborter) {
          aborter.removeEventListener("abort", onAbort);
        }
        const address = this.receiver.address || "address";
        const desc: string =
          `The request with message_id "${request.message_id}" to "${address}" ` +
          `endpoint timed out. Please try again later.`;
        const e: Error = {
          name: "OperationTimeoutError",
          message: desc
        };
        return reject(translate(e));
      }, timeoutInMs);

      this._responsesMap.set(request.message_id as string, {
        resolve: resolve,
        reject: reject,
        cleanupBeforeResolveOrReject: () => {
          if (aborter) aborter.removeEventListener("abort", onAbort);
          clearTimeout(timer);
        }
      });

      logger.verbose(
        "[%s] %s request sent: %O",
        this.connection.id,
        request.to || "$management",
        request
      );
      this.sender.send(request);
    });
  }

  /**
   * Closes the sender, receiver link and the underlying session.
   * @returns {Promise<void>} Promise<void>
   */
  async close(): Promise<void> {
    await this.sender.close({ closeSession: false });
    await this.receiver.close({ closeSession: false });
    await this.session.close();
  }

  /**
   * Removes the sender, receiver link and it's underlying session.
   * @returns {void} void
   */
  remove(): void {
    this.sender.remove();
    this.receiver.remove();
    this.session.remove();
  }

  /**
   * Creates an amqp request/response link.
   *
   * @param {Connection} connection The amqp connection.
   * @param {SenderOptions} senderOptions Options that must be provided to create the sender link.
   * @param {ReceiverOptions} receiverOptions Options that must be provided to create the receiver link.
   * @returns {Promise<RequestResponseLink>} Promise<RequestResponseLink>
   */
  static async create(
    connection: Connection,
    senderOptions: SenderOptions,
    receiverOptions: ReceiverOptions
  ): Promise<RequestResponseLink> {
    const session = await connection.createSession();
    const sender = await session.createSender(senderOptions);
    const receiver = await session.createReceiver(receiverOptions);
    logger.verbose(
      "[%s] Successfully created the sender and receiver links on the same session.",
      connection.id
    );
    return new RequestResponseLink(session, sender, receiver);
  }
}
/**
 * @internal
 *
 * Type used in getCodeDescriptionAndError to get the normalized info from the responses emitted by EventHubs and ServiceBus.
 */
type NormalizedInfo = {
  statusCode: number;
  statusDescription: string;
  errorCondition: string;
};

/**
 * @internal
 *
 * Handle different variations of property names in responses emitted by EventHubs and ServiceBus.
 *
 * @param {*} props
 * @returns {NormalizedInfo}
 */
export const getCodeDescriptionAndError = (props: any): NormalizedInfo => {
  if (!props) props = {};
  return {
    statusCode: (props[Constants.statusCode] || props.statusCode) as number,
    statusDescription: (props[Constants.statusDescription] || props.statusDescription) as string,
    errorCondition: (props[Constants.errorCondition] || props.errorCondition) as string
  };
};

/**
 * This is used as the onMessage handler for the "message" event on the receiver.
 *
 * (This is inspired from the message settlement sequence in service-bus SDK which
 * relies on a single listener for settled event for all the messages.)
 * The sequence is as follows:
 * 1. User calls `await RequestResponseLink.sendRequest()`
 * 2. This creates a `Promise` that gets stored in the _responsesMap
 * 3. When the service acknowledges the response, this method gets called for that request.
 * 4. We resolve() the promise from the _responsesMap with the message.
 * 5. User's code after the sendRequest continues.
 *
 * @internal
 */
export function onMessageReceived(
  context: Pick<EventContext, "message">,
  connectionId: string,
  responsesMap: Map<string, DeferredPromiseWithCallback>
): void {
  const message = context.message;
  if (!message) {
    logger.verbose(
      `[${connectionId}] "message" property on the EventContext is "undefined" which is unexpected, ` +
        `returning from the "onMessageReceived" handler without resolving or rejecting the promise ` +
        `upon encountering the message event.`
    );
    return;
  }

  const responseCorrelationId = message.correlation_id;
  if (!responsesMap.has(responseCorrelationId as string)) {
    logger.verbose(
      `[${connectionId}] correlationId "${responseCorrelationId}" property on the response does not match with ` +
        `any of the "request-id"s in the map, returning from the "onMessageReceived" handler without resolving ` +
        `or rejecting the promise upon encountering the message event.`
    );
    return;
  }

  const promise = responsesMap.get(responseCorrelationId as string) as DeferredPromiseWithCallback;
  promise.cleanupBeforeResolveOrReject();

  const deleteResult = responsesMap.delete(responseCorrelationId as string);
  logger.verbose(
    `[${connectionId}] Successfully deleted the response with id ${responseCorrelationId} from the map. ` +
      `Delete result - ${deleteResult}`
  );

  const info = getCodeDescriptionAndError(message.application_properties);
  let error;
  if (!info.statusCode) {
    error = new Error(
      `[${connectionId}] No statusCode in the "application_properties" in the returned response with correlation-id: ${responseCorrelationId}`
    );
  }
  if (info.statusCode > 199 && info.statusCode < 300) {
    logger.verbose(
      `[${connectionId}] Resolving the response with correlation-id: ${responseCorrelationId}`
    );
    return promise.resolve(message);
  }
  if (!error) {
    const condition =
      info.errorCondition || ConditionStatusMapper[info.statusCode] || "amqp:internal-error";
    error = translate({
      condition: condition,
      description: info.statusDescription
    });
    logger.warning(`${error?.name}: ${error?.message}`);
  }
  logErrorStackTrace(error);
  return promise.reject(error);
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenType } from "./auth/token";
import {
  Message as RheaMessage,
  Connection,
  EventContext,
  ReceiverEvents,
  ReceiverOptions,
  SenderEvents,
  SenderOptions,
  generate_uuid
} from "rhea-promise";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";
import { Constants } from "./util/constants";
import { logErrorStackTrace, logger } from "./log";
import { StandardAbortMessage, translate } from "./errors";
import { defaultCancellableLock } from "./util/utils";
import { RequestResponseLink } from "./requestResponseLink";

/**
 * Describes the CBS Response.
 */
export interface CbsResponse {
  correlationId: string;
  statusCode: string;
  statusDescription: string;
}

/**
 * Describes the EventHub/ServiceBus Cbs client that talks to the $cbs endpoint over AMQP connection.
 */
export class CbsClient {
  /**
   * CBS endpoint - "$cbs"
   */
  readonly endpoint: string = Constants.cbsEndpoint;
  /**
   * CBS replyTo - The receiver link name that the service should reply to.
   */
  readonly replyTo: string = `${Constants.cbsReplyTo}-${generate_uuid()}`;
  /**
   * The unique lock name per $cbs session per connection that is used to
   * acquire the lock for establishing a cbs session if one does not exist for an amqp connection.
   */
  readonly cbsLock: string = `${Constants.negotiateCbsKey}-${generate_uuid()}`;
  /**
   * The unique lock name per connection that is used to
   * acquire the lock for establishing an amqp connection if one does not exist.
   */
  readonly connectionLock: string;
  /**
   * The AMQP connection.
   */
  connection: Connection;

  /**
   * CBS sender, receiver on the same session.
   */
  private _cbsSenderReceiverLink?: RequestResponseLink;

  /**
   * @param connection - The AMQP connection.
   * @param connectionLock - A unique string (usually a guid) per connection.
   */
  constructor(connection: Connection, connectionLock: string) {
    this.connection = connection;
    this.connectionLock = connectionLock;
  }

  /**
   * Creates a singleton instance of the CBS session if it hasn't been initialized previously on
   * the given connection.
   * @param options - Optional parameters that can be used to affect this method's behavior.
   *    For example, `abortSignal` can be passed to allow cancelling an in-progress `init` invocation.
   * @returns Promise<void>.
   */
  async init(options: { abortSignal?: AbortSignalLike; timeoutInMs?: number } = {}): Promise<void> {
    const { abortSignal, timeoutInMs } = options;

    try {
      if (abortSignal?.aborted) {
        throw new AbortError(StandardAbortMessage);
      }

      // Acquire the lock and establish an amqp connection if it does not exist.
      if (!this.connection.isOpen()) {
        logger.verbose("The CBS client is trying to establish an AMQP connection.");
        await defaultCancellableLock.acquire(
          this.connectionLock,
          () => {
            return this.connection.open({ abortSignal });
          },
          { abortSignal: abortSignal, timeoutInMs: timeoutInMs }
        );
      }

      if (!this.isOpen()) {
        const rxOpt: ReceiverOptions = {
          source: {
            address: this.endpoint
          },
          name: this.replyTo,
          onSessionError: (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.session!.error!);
            logger.verbose(
              "[%s] An error occurred on the session for request/response links " + "for $cbs: %O",
              id,
              ehError
            );
          }
        };
        const srOpt: SenderOptions = { target: { address: this.endpoint } };
        logger.verbose(
          "[%s] Creating sender/receiver links on a session for $cbs endpoint.",
          this.connection.id
        );
        this._cbsSenderReceiverLink = await RequestResponseLink.create(
          this.connection,
          srOpt,
          rxOpt,
          { abortSignal }
        );
        this._cbsSenderReceiverLink.sender.on(SenderEvents.senderError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.sender!.error!);
          logger.verbose("[%s] An error occurred on the cbs sender link.. %O", id, ehError);
        });
        this._cbsSenderReceiverLink.receiver.on(
          ReceiverEvents.receiverError,
          (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.receiver!.error!);
            logger.verbose("[%s] An error occurred on the cbs receiver link.. %O", id, ehError);
          }
        );
        logger.verbose(
          "[%s] Successfully created the cbs sender '%s' and receiver '%s' " +
            "links over cbs session.",
          this.connection.id,
          this._cbsSenderReceiverLink.sender.name,
          this._cbsSenderReceiverLink.receiver.name
        );
      } else {
        logger.verbose(
          "[%s] CBS session is already present. Reusing the cbs sender '%s' " +
            "and receiver '%s' links over cbs session.",
          this.connection.id,
          this._cbsSenderReceiverLink!.sender.name,
          this._cbsSenderReceiverLink!.receiver.name
        );
      }
    } catch (err) {
      const translatedError = translate(err);
      logger.warning(
        "[%s] An error occurred while establishing the cbs links: %s",
        this.connection.id,
        `${translatedError?.name}: ${translatedError?.message}`
      );
      logErrorStackTrace(translatedError);
      throw translatedError;
    }
  }

  /**
   * Negotiates the CBS claim with the EventHub/ServiceBus Service.
   * @param audience - The entity token audience for which the token is requested in one
   * of the following forms:
   *
   * - **ServiceBus**
   *    - **Sender**
   *        - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
   *        - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
   *
   *    - **Receiver**
   *         - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
   *         - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
   *
   *    - **ManagementClient**
   *         - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
   *         - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
   *
   * - **EventHubs**
   *     - **Sender**
   *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
   *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
   *
   *     - **Receiver**
   *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
   *
   *     - **ManagementClient**
   *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
   * @param token - The token that needs to be sent in the put-token request.
   * @param tokenType - The type of token being used. For example, 'jwt' or 'servicebus.windows.net:sastoken'.
   * @param options - Optional parameters that can be used to affect this method's behavior.
   *    For example, `abortSignal` can be passed to allow cancelling an in-progress `negotiateClaim` invocation.
   * @returns A Promise that resolves when $cbs authentication is successful
   * and rejects when an error occurs during $cbs authentication.
   */
  async negotiateClaim(
    audience: string,
    token: string,
    tokenType: TokenType,
    options: { abortSignal?: AbortSignalLike; timeoutInMs?: number } = {}
  ): Promise<CbsResponse> {
    const { abortSignal, timeoutInMs } = options;
    try {
      if (abortSignal?.aborted) {
        throw new AbortError(StandardAbortMessage);
      }

      if (!this._cbsSenderReceiverLink) {
        throw new Error("Attempted to negotiate a claim but the CBS link does not exist.");
      }

      const request: RheaMessage = {
        body: token,
        message_id: generate_uuid(),
        reply_to: this.replyTo,
        to: this.endpoint,
        application_properties: {
          operation: Constants.operationPutToken,
          name: audience,
          type: tokenType
        }
      };
      const responseMessage = await this._cbsSenderReceiverLink.sendRequest(request, {
        abortSignal,
        timeoutInMs,
        requestName: "negotiateClaim"
      });
      logger.verbose("[%s] The CBS response is: %O", this.connection.id, responseMessage);
      return this._fromRheaMessageResponse(responseMessage);
    } catch (err) {
      logger.warning(
        "[%s] An error occurred while negotiating the cbs claim: %s",
        this.connection.id,
        `${err?.name}: ${err?.message}`
      );
      logErrorStackTrace(err);
      throw err;
    }
  }

  /**
   * Closes the AMQP cbs session to the EventHub/ServiceBus for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @returns
   */
  async close(): Promise<void> {
    try {
      if (this.isOpen()) {
        const cbsLink = this._cbsSenderReceiverLink;
        this._cbsSenderReceiverLink = undefined;
        await cbsLink!.close();
        logger.verbose("[%s] Successfully closed the cbs session.", this.connection.id);
      }
    } catch (err) {
      const msg = `An error occurred while closing the cbs link: ${err.stack ||
        JSON.stringify(err)}.`;
      logger.verbose("[%s] %s", this.connection.id, msg);
      throw new Error(msg);
    }
  }

  /**
   * Removes the AMQP cbs session to the EventHub/ServiceBus for this client,
   * @returns void
   */
  remove(): void {
    try {
      if (this._cbsSenderReceiverLink) {
        const cbsLink = this._cbsSenderReceiverLink;
        this._cbsSenderReceiverLink = undefined;
        cbsLink!.remove();
        logger.verbose("[%s] Successfully removed the cbs session.", this.connection.id);
      }
    } catch (err) {
      const msg = `An error occurred while removing the cbs link: ${err.stack ||
        JSON.stringify(err)}.`;
      logger.verbose("[%s] %s", this.connection.id, msg);
      throw new Error(msg);
    }
  }

  /**
   * Indicates whether the cbs sender receiver link is open or closed.
   * @returns `true` open, `false` closed.
   */
  public isOpen(): boolean {
    return Boolean(this._cbsSenderReceiverLink?.isOpen());
  }

  private _fromRheaMessageResponse(msg: RheaMessage): CbsResponse {
    const cbsResponse = {
      correlationId: msg.correlation_id! as string,
      statusCode: msg.application_properties ? msg.application_properties["status-code"] : "",
      statusDescription: msg.application_properties
        ? msg.application_properties["status-description"]
        : ""
    };
    logger.verbose("[%s] The deserialized CBS response is: %o", this.connection.id, cbsResponse);
    return cbsResponse;
  }
}

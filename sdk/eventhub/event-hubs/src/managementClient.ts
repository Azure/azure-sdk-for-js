// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import { AbortError } from "@azure/abort-controller";
import {
  defaultLock,
  translate,
  Constants,
  retry,
  RetryConfig,
  RetryOperationType,
  randomNumberFromInterval,
  ConditionStatusMapper,
  AmqpError
} from "@azure/core-amqp";
import { RequestResponseLink } from "./requestResponseLink";
import {
  Message as AmqpMessage,
  EventContext,
  SenderEvents,
  ReceiverEvents,
  SenderOptions,
  ReceiverOptions,
  generate_uuid
} from "rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import * as log from "./log";
import { RetryOptions, getRetryAttemptTimeoutInMs } from "./eventHubClient";
import { AbortSignalLike } from "@azure/abort-controller";
/**
 * Describes the runtime information of an Event Hub.
 * @interface HubRuntimeInformation
 */
export interface EventHubProperties {
  /**
   * @property The name of the event hub.
   */
  path: string;
  /**
   * @property The date and time the hub was created in UTC.
   */
  createdAt: Date;
  /**
   * @property The slice of string partition identifiers.
   */
  partitionIds: string[];
}

/**
 * Describes the runtime information of an EventHub Partition.
 * @interface PartitionProperties
 */
export interface PartitionProperties {
  /**
   * @property The name of the Event Hub.
   */
  eventHubPath: string;
  /**
   * @property Identifier of the partition within the Event Hub.
   */
  partitionId: string;
  /**
   * @property The starting sequence number of the partition's message log.
   */
  beginningSequenceNumber: number;
  /**
   * @property The last sequence number of the partition's message log.
   */
  lastEnqueuedSequenceNumber: number;
  /**
   * @property The offset of the last enqueued message in the partition's message log.
   */
  lastEnqueuedOffset: string;
  /**
   * @property The time of the last enqueued message in the partition's message log in UTC.
   */
  lastEnqueuedTimeUtc: Date;
}

/**
 * @internal
 * @ignore
 */
export interface ManagementClientOptions {
  address?: string;
  audience?: string;
}

/**
 * @class ManagementClient
 * @internal
 * @ignore
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient extends LinkEntity {
  readonly managementLock: string = `${Constants.managementRequestKey}-${uuid()}`;
  /**
   * @property entityPath - The name/path of the entity (hub name) for which the management
   * request needs to be made.
   */
  entityPath: string;
  /**
   * @property replyTo The reply to Guid for the management client.
   */
  replyTo: string = uuid();
  /**
   * $management sender, receiver on the same session.
   * @private
   */
  private _mgmtReqResLink?: RequestResponseLink;

  /**
   * Instantiates the management client.
   * @constructor
   * @ignore
   * @param context The connection context.
   * @param [address] The address for the management endpoint. For IotHub it will be
   * `/messages/events/$management`.
   */
  constructor(context: ConnectionContext, options?: ManagementClientOptions) {
    super(context, {
      address: options && options.address ? options.address : Constants.management,
      audience:
        options && options.audience ? options.audience : context.config.getManagementAudience()
    });
    this._context = context;
    this.entityPath = context.config.entityPath as string;
  }

  /**
   * Provides the eventhub runtime information.
   * @ignore
   * @param connection - The established amqp connection
   * @returns
   */
  async getHubRuntimeInformation(options?: {
    retryOptions?: RetryOptions;
    abortSignal?: AbortSignalLike;
  }): Promise<EventHubProperties> {
    if (!options) {
      options = {};
    }
    const request: Message = {
      body: Buffer.from(JSON.stringify([])),
      message_id: uuid(),
      reply_to: this.replyTo,
      application_properties: {
        operation: Constants.readOperation,
        name: this.entityPath as string,
        type: `${Constants.vendorString}:${Constants.eventHub}`
      }
    };

    const info: any = await this._makeManagementRequest(request, {
      ...options,
      requestName: "getHubRuntimeInformation"
    });
    const runtimeInfo: EventHubProperties = {
      path: info.name,
      createdAt: new Date(info.created_at),
      partitionIds: info.partition_ids
    };
    log.mgmt("[%s] The hub runtime info is: %O", this._context.connectionId, runtimeInfo);
    return runtimeInfo;
  }

  /**
   * Provides an array of partitionIds.
   * @ignore
   * @param connection - The established amqp connection
   * @returns
   */
  async getPartitionIds(): Promise<Array<string>> {
    const runtimeInfo = await this.getHubRuntimeInformation();
    return runtimeInfo.partitionIds;
  }

  /**
   * Provides information about the specified partition.
   * @ignore
   * @param connection - The established amqp connection
   * @param partitionId Partition ID for which partition information is required.
   */
  async getPartitionProperties(
    partitionId: string,
    options?: { retryOptions?: RetryOptions; abortSignal?: AbortSignalLike }
  ): Promise<PartitionProperties> {
    if (!options) {
      options = {};
    }
    const request: Message = {
      body: Buffer.from(JSON.stringify([])),
      message_id: uuid(),
      reply_to: this.replyTo,
      application_properties: {
        operation: Constants.readOperation,
        name: this.entityPath as string,
        type: `${Constants.vendorString}:${Constants.partition}`,
        partition: `${partitionId}`
      }
    };

    const info: any = await this._makeManagementRequest(request, {
      ...options,
      requestName: "getPartitionInformation"
    });
    const partitionInfo: PartitionProperties = {
      beginningSequenceNumber: info.begin_sequence_number,
      eventHubPath: info.name,
      lastEnqueuedOffset: info.last_enqueued_offset,
      lastEnqueuedTimeUtc: new Date(info.last_enqueued_time_utc),
      lastEnqueuedSequenceNumber: info.last_enqueued_sequence_number,
      partitionId: info.partition
    };
    log.mgmt("[%s] The partition info is: %O.", this._context.connectionId, partitionInfo);
    return partitionInfo;
  }

  /**
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   * @ignore
   * @returns
   */
  async close(): Promise<void> {
    try {
      if (this._isMgmtRequestResponseLinkOpen()) {
        const mgmtLink = this._mgmtReqResLink;
        this._mgmtReqResLink = undefined;
        clearTimeout(this._tokenRenewalTimer as NodeJS.Timer);
        await mgmtLink!.close();
        log.mgmt("Successfully closed the management session.");
      }
    } catch (err) {
      const msg = `An error occurred while closing the management session: ${err}`;
      log.error(msg);
      throw new Error(msg);
    }
  }

  private async _init(): Promise<void> {
    try {
      if (!this._isMgmtRequestResponseLinkOpen()) {
        await this._negotiateClaim();
        const rxopt: ReceiverOptions = {
          source: { address: this.address },
          name: this.replyTo,
          target: { address: this.replyTo },
          onSessionError: (context: EventContext) => {
            const id = context.connection.options.id;
            const ehError = translate(context.session!.error!);
            log.error(
              "[%s] An error occurred on the session for request/response links for " +
                "$management: %O",
              id,
              ehError
            );
          }
        };
        const sropt: SenderOptions = { target: { address: this.address } };
        log.mgmt(
          "[%s] Creating sender/receiver links on a session for $management endpoint with " +
            "srOpts: %o, receiverOpts: %O.",
          this._context.connectionId,
          sropt,
          rxopt
        );
        this._mgmtReqResLink = await RequestResponseLink.create(
          this._context.connection,
          sropt,
          rxopt
        );
        this._mgmtReqResLink.sender.on(SenderEvents.senderError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.sender!.error!);
          log.error("[%s] An error occurred on the $management sender link.. %O", id, ehError);
        });
        this._mgmtReqResLink.receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.receiver!.error!);
          log.error("[%s] An error occurred on the $management receiver link.. %O", id, ehError);
        });
        log.mgmt(
          "[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
          this._context.connectionId,
          this._mgmtReqResLink.sender.name,
          this._mgmtReqResLink.receiver.name
        );
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      log.error(
        "[%s] An error occured while establishing the $management links: %O",
        this._context.connectionId,
        err
      );
      throw err;
    }
  }

  /**
   * @private
   * Helper method to make the management request
   * @param request The AMQP message to send
   * @param options The options to use when sending a request over a $management link
   */
  private async _makeManagementRequest(
    request: Message,
    options?: { retryOptions?: RetryOptions; abortSignal?: AbortSignalLike; requestName?: string }
  ): Promise<any> {
    if (!options) options = {};

    let count: number = 0;

    const sendOperationPromise = () =>
      new Promise<void>((resolve, reject) => {
        let waitTimer: any;
        let timeOver: boolean = false;

        if (!options) options = {};
        const aborter: AbortSignalLike | undefined = options && options.abortSignal;

        count++;
        if (count !== 1) {
          // Generate a new message_id every time after the first attempt
          request.message_id = generate_uuid();
        } else if (!request.message_id) {
          // Set the message_id in the first attempt only if it is not set
          request.message_id = generate_uuid();
        }

        const rejectOnSendError = (err: Error) => {
          err = translate(err);
          log.error("An error occurred while making the request to $management endpoint: %O", err);
          reject(err);
        };

        log.mgmt(
          "[%s] Acquiring lock to get the management req res link.",
          this._context.connectionId
        );

        const actionAfterTimeout = () => {
          timeOver = true;
          this._mgmtReqResLink!.receiver.removeListener(ReceiverEvents.message, messageCallback);
          if (aborter) {
            aborter.removeEventListener("abort", onAbort);
          }
          const address = this._mgmtReqResLink!.receiver.address || "address";
          const desc: string =
            `The request with message_id "${request.message_id}" to "${address}" ` +
            `endpoint timed out. Please try again later.`;
          const e: AmqpError = {
            condition: ConditionStatusMapper[408],
            description: desc
          };
          return reject(translate(e));
        };

        const rejectOnAbort = () => {
          const address = this._mgmtReqResLink!.receiver.address || "address";
          const requestName = options!.requestName;
          const desc: string =
            `[${this._context.connectionId}] The request "${requestName}" ` +
            `to "${address}" has been cancelled by the user.`;
          log.error(desc);
          const error = new AbortError(
            `The ${requestName ? requestName + " " : ""}operation has been cancelled by the user.`
          );

          reject(error);
        };

        const onAbort = () => {
          if (!timeOver) {
            clearTimeout(waitTimer);
          }

          // remove the event listener as this will be registered next time someone makes a request.
          this._mgmtReqResLink!.receiver.removeListener(ReceiverEvents.message, messageCallback);
          // safe to clear the timeout if it hasn't already occurred.

          aborter!.removeEventListener("abort", onAbort);

          rejectOnAbort();
        };

        type NormalizedInfo = {
          statusCode: number;
          statusDescription: string;
          errorCondition: string;
        };

        // Handle different variations of property names in responses emitted by EventHubs and ServiceBus.
        const getCodeDescriptionAndError = (props: any): NormalizedInfo => {
          if (!props) props = {};
          return {
            statusCode: (props[Constants.statusCode] || props.statusCode) as number,
            statusDescription: (props[Constants.statusDescription] ||
              props.statusDescription) as string,
            errorCondition: (props[Constants.errorCondition] || props.errorCondition) as string
          };
        };

        const messageCallback = (context: EventContext) => {
          if (!timeOver) {
            clearTimeout(waitTimer);
          }
          // remove the event listeners as they will be registered next time when someone makes a request.
          this._mgmtReqResLink!.receiver.removeListener(ReceiverEvents.message, messageCallback);
          if (aborter) {
            aborter.removeEventListener("abort", onAbort);
          }
          const info = getCodeDescriptionAndError(context.message!.application_properties);
          const responseCorrelationId = context.message!.correlation_id;
          log.mgmt(
            "[%s] %s response: ",
            this._context.connectionId,
            request.to || "$management",
            context.message
          );
          if (info.statusCode > 199 && info.statusCode < 300) {
            if (
              request.message_id === responseCorrelationId ||
              request.correlation_id === responseCorrelationId
            ) {
              log.mgmt(
                "[%s] request-messageId | '%s' == '%s' | response-correlationId.",
                this._context.connectionId,
                request.message_id,
                responseCorrelationId
              );
              return resolve(context.message);
            } else {
              log.error(
                "[%s] request-messageId | '%s' != '%s' | response-correlationId. " +
                  "Hence dropping this response and waiting for the next one.",
                this._context.connectionId,
                request.message_id,
                responseCorrelationId
              );
            }
          } else {
            const condition =
              info.errorCondition ||
              ConditionStatusMapper[info.statusCode] ||
              "amqp:internal-error";
            const e: AmqpError = {
              condition: condition,
              description: info.statusDescription
            };
            const error = translate(e);
            log.error(error);
            return reject(error);
          }
        };

        waitTimer = setTimeout(
          actionAfterTimeout,
          getRetryAttemptTimeoutInMs(options!.retryOptions)
        );

        defaultLock
          .acquire(this.managementLock, () => {
            return this._init();
          })
          .then(() => {
            if (aborter) {
              // the aborter may have been triggered between request attempts
              // so check if it was triggered and reject if needed.
              if (aborter.aborted) {
                return rejectOnAbort();
              }
              aborter.addEventListener("abort", onAbort);
            }

            this._mgmtReqResLink!.receiver.on(ReceiverEvents.message, messageCallback);

            log.mgmt(
              "[%s] %s request sent: %O",
              this._context.connectionId,
              request.to || "$managment",
              request
            );
            this._mgmtReqResLink!.sender.send(request);
          })
          .catch((err: Error) => {
            rejectOnSendError(err);
          });
      });

    const jitterInSeconds = randomNumberFromInterval(1, 4);
    const maxRetries = options.retryOptions && options.retryOptions.maxRetries;
    const delayInSeconds =
      options.retryOptions &&
      options.retryOptions.retryInterval &&
      options.retryOptions.retryInterval >= 0
        ? options.retryOptions.retryInterval / 1000
        : Constants.defaultDelayBetweenOperationRetriesInSeconds;
    const config: RetryConfig<void> = {
      operation: sendOperationPromise,
      connectionId: this._context.connectionId,
      operationType: RetryOperationType.sendMessage,
      maxRetries: maxRetries,
      delayInSeconds: delayInSeconds + jitterInSeconds
    };
    return retry<AmqpMessage>(config).body;
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}

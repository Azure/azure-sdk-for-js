// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import uuid from "uuid/v4";
import {
  RequestResponseLink,
  defaultLock,
  translate,
  Constants,
  SendRequestOptions,
  retry,
  RetryConfig,
  RetryOptions,
  RetryOperationType,
  SharedKeyCredential
} from "@azure/core-amqp";
import {
  Message,
  EventContext,
  SenderEvents,
  ReceiverEvents,
  SenderOptions,
  ReceiverOptions,
  generate_uuid
} from "rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { LinkEntity } from "./linkEntity";
import { logger, logErrorStackTrace } from "./log";
import { getRetryAttemptTimeoutInMs } from "./util/retries";
import { AbortSignalLike, AbortError } from "@azure/abort-controller";
/**
 * Describes the runtime information of an Event Hub.
 * @interface HubRuntimeInformation
 */
export interface EventHubProperties {
  /**
   * @property The name of the event hub.
   */
  name: string;
  /**
   * @property The date and time the hub was created in UTC.
   */
  createdOn: Date;
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
  eventHubName: string;
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
  lastEnqueuedOffset: number;
  /**
   * @property The time of the last enqueued message in the partition's message log in UTC.
   */
  lastEnqueuedOnUtc: Date;
  /**
   * @property Indicates whether the partition is empty.
   */
  isEmpty: boolean;
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
   * Gets the security token for the management application properties.
   * @ignore
   * @internal
   */
  async getSecurityToken() {
    if (this._context.tokenCredential instanceof SharedKeyCredential) {
      // the security_token has the $management address removed from the end of the audience
      // expected audience: sb://fully.qualified.namespace/event-hub-name/$management
      const audienceParts = this.audience.split("/");
      // for management links, address should be '$management'
      if (audienceParts[audienceParts.length - 1] === this.address) {
        audienceParts.pop();
      }
      const audience = audienceParts.join("/");
      return this._context.tokenCredential.getToken(audience);
    }

    // aad credentials use the aad scope
    return this._context.tokenCredential.getToken(Constants.aadEventHubsScope);
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
    const securityToken = await this.getSecurityToken();
    const request: Message = {
      body: Buffer.from(JSON.stringify([])),
      message_id: uuid(),
      reply_to: this.replyTo,
      application_properties: {
        operation: Constants.readOperation,
        name: this.entityPath as string,
        type: `${Constants.vendorString}:${Constants.eventHub}`,
        security_token: securityToken?.token
      }
    };

    const info: any = await this._makeManagementRequest(request, {
      ...options,
      requestName: "getHubRuntimeInformation"
    });
    const runtimeInfo: EventHubProperties = {
      name: info.name,
      createdOn: new Date(info.created_at),
      partitionIds: info.partition_ids
    };
    logger.verbose("[%s] The hub runtime info is: %O", this._context.connectionId, runtimeInfo);
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
    const securityToken = await this.getSecurityToken();
    const request: Message = {
      body: Buffer.from(JSON.stringify([])),
      message_id: uuid(),
      reply_to: this.replyTo,
      application_properties: {
        operation: Constants.readOperation,
        name: this.entityPath as string,
        type: `${Constants.vendorString}:${Constants.partition}`,
        partition: `${partitionId}`,
        security_token: securityToken?.token
      }
    };

    const info: any = await this._makeManagementRequest(request, {
      ...options,
      requestName: "getPartitionInformation"
    });

    const partitionInfo: PartitionProperties = {
      beginningSequenceNumber: info.begin_sequence_number,
      eventHubName: info.name,
      lastEnqueuedOffset: info.last_enqueued_offset,
      lastEnqueuedOnUtc: new Date(info.last_enqueued_time_utc),
      lastEnqueuedSequenceNumber: info.last_enqueued_sequence_number,
      partitionId: info.partition,
      isEmpty: info.is_partition_empty
    };
    logger.verbose("[%s] The partition info is: %O.", this._context.connectionId, partitionInfo);
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
        logger.info("Successfully closed the management session.");
      }
    } catch (err) {
      const msg = `An error occurred while closing the management session: ${err}`;
      logger.warning(msg);
      logErrorStackTrace(err);
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
            logger.verbose(
              "[%s] An error occurred on the session for request/response links for " +
                "$management: %O",
              id,
              ehError
            );
          }
        };
        const sropt: SenderOptions = { target: { address: this.address } };
        logger.verbose(
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
          logger.verbose("[%s] An error occurred on the $management sender link.. %O", id, ehError);
        });
        this._mgmtReqResLink.receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
          const id = context.connection.options.id;
          const ehError = translate(context.receiver!.error!);
          logger.verbose(
            "[%s] An error occurred on the $management receiver link.. %O",
            id,
            ehError
          );
        });
        logger.verbose(
          "[%s] Created sender '%s' and receiver '%s' links for $management endpoint.",
          this._context.connectionId,
          this._mgmtReqResLink.sender.name,
          this._mgmtReqResLink.receiver.name
        );
        await this._ensureTokenRenewal();
      }
    } catch (err) {
      err = translate(err);
      logger.warning(
        "[%s] An error occured while establishing the $management links: %O",
        this._context.connectionId,
        err
      );
      logErrorStackTrace(err);
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
    options: {
      retryOptions?: RetryOptions;
      abortSignal?: AbortSignalLike;
      requestName?: string;
    } = {}
  ): Promise<any> {
    const retryOptions = options.retryOptions || {};
    try {
      const abortSignal: AbortSignalLike | undefined = options && options.abortSignal;

      const sendOperationPromise = () =>
        new Promise<Message>(async (resolve, reject) => {
          let count = 0;

          const retryTimeoutInMs = getRetryAttemptTimeoutInMs(options.retryOptions);
          let timeTakenByInit = 0;

          const rejectOnAbort = () => {
            const requestName = options.requestName;
            const desc: string =
              `[${this._context.connectionId}] The request "${requestName}" ` +
              `to has been cancelled by the user.`;
            // Cancellation is user-intended behavior, so log to info instead of warning.
            logger.info(desc);
            const error = new AbortError(
              `The ${requestName ? requestName + " " : ""}operation has been cancelled by the user.`
            );

            reject(error);
          };

          if (abortSignal) {
            if (abortSignal.aborted) {
              return rejectOnAbort();
            }
          }

          if (!this._isMgmtRequestResponseLinkOpen()) {
            logger.verbose(
              "[%s] Acquiring lock to get the management req res link.",
              this._context.connectionId
            );

            const initOperationStartTime = Date.now();

            const actionAfterTimeout = () => {
              const desc: string = `The request with message_id "${request.message_id}" timed out. Please try again later.`;
              const e: Error = {
                name: "OperationTimeoutError",
                message: desc
              };

              return reject(translate(e));
            };

            const waitTimer = setTimeout(actionAfterTimeout, retryTimeoutInMs);

            try {
              await defaultLock.acquire(this.managementLock, () => {
                return this._init();
              });
            } catch (err) {
              return reject(translate(err));
            } finally {
              clearTimeout(waitTimer);
            }
            timeTakenByInit = Date.now() - initOperationStartTime;
          }

          const remainingOperationTimeoutInMs = retryTimeoutInMs - timeTakenByInit;

          const sendRequestOptions: SendRequestOptions = {
            abortSignal: options.abortSignal,
            requestName: options.requestName,
            timeoutInMs: remainingOperationTimeoutInMs
          };

          count++;
          if (count !== 1) {
            // Generate a new message_id every time after the first attempt
            request.message_id = generate_uuid();
          } else if (!request.message_id) {
            // Set the message_id in the first attempt only if it is not set
            request.message_id = generate_uuid();
          }

          try {
            const result = await this._mgmtReqResLink!.sendRequest(request, sendRequestOptions);
            resolve(result);
          } catch (err) {
            err = translate(err);
            const address =
              this._mgmtReqResLink || this._mgmtReqResLink!.sender.address
                ? "address"
                : this._mgmtReqResLink!.sender.address;
            logger.warning(
              "[%s] An error occurred during send on management request-response link with address " +
                "'%s': %O",
              this._context.connectionId,
              address,
              err
            );
            logErrorStackTrace(err);
            reject(err);
          }
        });

      const config: RetryConfig<Message> = {
        operation: sendOperationPromise,
        connectionId: this._context.connectionId,
        operationType: RetryOperationType.management,
        abortSignal: abortSignal,
        retryOptions: retryOptions
      };
      return (await retry<Message>(config)).body;
    } catch (err) {
      err = translate(err);
      logger.warning("An error occurred while making the request to $management endpoint: %O", err);
      logErrorStackTrace(err);
      throw err;
    }
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}

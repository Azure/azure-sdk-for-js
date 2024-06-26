// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Constants,
  RequestResponseLink,
  RetryConfig,
  RetryOperationType,
  RetryOptions,
  SendRequestOptions,
  defaultCancellableLock,
  isSasTokenProvider,
  retry,
  translate,
} from "@azure/core-amqp";
import {
  EventContext,
  Message,
  ReceiverEvents,
  ReceiverOptions,
  SenderEvents,
  SenderOptions,
} from "rhea-promise";
import {
  logErrorStackTrace,
  createSimpleLogger,
  logger,
  SimpleLogger,
  createManagementLogPrefix,
} from "./logger";
import { throwErrorIfConnectionClosed, throwTypeErrorIfParameterMissing } from "./util/error";
import { AbortSignalLike } from "@azure/abort-controller";
import { AccessToken } from "@azure/core-auth";
import { ConnectionContext } from "./connectionContext";
import { OperationOptions } from "./util/operationOptions";
import { toSpanOptions, tracingClient } from "./diagnostics/tracing";
import { getRetryAttemptTimeoutInMs } from "./util/retries";
import { TimerLoop } from "./util/timerLoop";
import { withAuth } from "./withAuth";
import { getRandomName } from "./util/utils";

/**
 * Describes the runtime information of an Event Hub.
 */
export interface EventHubProperties {
  /**
   * The name of the event hub.
   */
  name: string;
  /**
   * The date and time the hub was created in UTC.
   */
  createdOn: Date;
  /**
   * The slice of string partition identifiers.
   */
  partitionIds: string[];
  /**
   * Whether the hub has geographical disaster recovery enabled.
   */
  isGeoDrEnabled: boolean;
}

/**
 * Describes the runtime information of an EventHub Partition.
 */
export interface PartitionProperties {
  /**
   * The name of the Event Hub.
   */
  eventHubName: string;
  /**
   * Identifier of the partition within the Event Hub.
   */
  partitionId: string;
  /**
   * The starting sequence number of the partition's message log.
   */
  beginningSequenceNumber: number;
  /**
   * The last sequence number of the partition's message log.
   */
  lastEnqueuedSequenceNumber: number;
  /**
   * The offset of the last enqueued message in the partition's message log.
   */
  lastEnqueuedOffset: string;
  /**
   * The time of the last enqueued message in the partition's message log in UTC.
   */
  lastEnqueuedOnUtc: Date;
  /**
   * Indicates whether the partition is empty.
   */
  isEmpty: boolean;
}

/**
 * @internal
 */
export interface ManagementClientOptions {
  address?: string;
  audience?: string;
}

/**
 * @internal
 * Describes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export class ManagementClient {
  readonly managementLock: string = getRandomName(Constants.managementRequestKey);
  /**
   * The name/path of the entity (hub name) for which the management
   * request needs to be made.
   */
  private readonly entityPath: string;
  /**
   * The reply to Guid for the management client.
   */
  private readonly replyTo: string = getRandomName();
  /**
   * $management sender, receiver on the same session.
   */
  private _mgmtReqResLink?: RequestResponseLink;
  /**
   * The address in the following form:
   * `"$management"`.
   */
  private readonly address: string;
  /**
   * The token audience in the following form:
   * `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
   */
  private readonly audience: string;
  /**
   * Provides relevant information about the amqp connection,
   * cbs and $management sessions, token provider, sender and receivers.
   */
  private readonly _context: ConnectionContext;
  /**
   * The authentication loop that keeps the token refreshed.
   */
  private authLoop?: TimerLoop;
  private readonly logger: SimpleLogger;

  /**
   * Instantiates the management client.
   * @param context - The connection context.
   * @param address - The address for the management endpoint. For IotHub it will be
   * `/messages/events/$management`.
   */
  constructor(context: ConnectionContext, { address, audience }: ManagementClientOptions = {}) {
    this.address = address ?? Constants.management;
    this.audience = audience ?? context.config.getManagementAudience();
    this._context = context;
    const logPrefix = createManagementLogPrefix(this._context.connectionId);
    this.logger = createSimpleLogger(logger, logPrefix);
    this.entityPath = context.config.entityPath as string;
  }

  /**
   * Gets the security token for the management application properties.
   * @internal
   */
  async getSecurityToken(): Promise<AccessToken | null> {
    if (isSasTokenProvider(this._context.tokenCredential)) {
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
   */
  async getEventHubProperties(
    options: OperationOptions & { retryOptions?: RetryOptions } = {},
  ): Promise<EventHubProperties> {
    throwErrorIfConnectionClosed(this._context);
    return tracingClient.withSpan(
      "ManagementClient.getEventHubProperties",
      options,
      async (updatedOptions) => {
        try {
          const securityToken = await this.getSecurityToken();

          const request: Message = {
            body: Buffer.from(JSON.stringify([])),
            message_id: getRandomName(),
            reply_to: this.replyTo,
            application_properties: {
              operation: Constants.readOperation,
              name: this.entityPath as string,
              type: `${Constants.vendorString}:${Constants.eventHub}`,
              security_token: securityToken?.token,
            },
          };

          const info: any = await this._makeManagementRequest(request, {
            ...updatedOptions,
            requestName: "getHubRuntimeInformation",
          });
          const runtimeInfo: EventHubProperties = {
            name: info.name,
            createdOn: new Date(info.created_at),
            partitionIds: info.partition_ids,
            isGeoDrEnabled: info.georeplication_factor > 1,
          };
          logger.verbose("the hub runtime info is: %O", runtimeInfo);

          return runtimeInfo;
        } catch (error: any) {
          logger.warning(
            `an error occurred while getting the hub runtime information: ${error?.name}: ${error?.message}`,
          );
          logErrorStackTrace(error);
          throw error;
        }
      },
      toSpanOptions(this._context.config),
    );
  }

  /**
   * Provides information about the specified partition.
   * @param partitionId - Partition ID for which partition information is required.
   */
  async getPartitionProperties(
    partitionId: string,
    options: OperationOptions & { retryOptions?: RetryOptions } = {},
  ): Promise<PartitionProperties> {
    throwErrorIfConnectionClosed(this._context);
    throwTypeErrorIfParameterMissing(
      this._context.connectionId,
      "getPartitionProperties",
      "partitionId",
      partitionId,
    );
    partitionId = String(partitionId);

    return tracingClient.withSpan(
      "ManagementClient.getPartitionProperties",
      options,
      async (updatedOptions) => {
        try {
          const securityToken = await this.getSecurityToken();
          const request: Message = {
            body: Buffer.from(JSON.stringify([])),
            message_id: getRandomName(),
            reply_to: this.replyTo,
            application_properties: {
              operation: Constants.readOperation,
              name: this.entityPath as string,
              type: `${Constants.vendorString}:${Constants.partition}`,
              partition: `${partitionId}`,
              security_token: securityToken?.token,
            },
          };

          const info: any = await this._makeManagementRequest(request, {
            ...updatedOptions,
            requestName: "getPartitionInformation",
          });

          const partitionInfo: PartitionProperties = {
            beginningSequenceNumber: info.begin_sequence_number,
            eventHubName: info.name,
            lastEnqueuedOffset: info.last_enqueued_offset,
            lastEnqueuedOnUtc: new Date(info.last_enqueued_time_utc),
            lastEnqueuedSequenceNumber: info.last_enqueued_sequence_number,
            partitionId: info.partition,
            isEmpty: info.is_partition_empty,
          };
          logger.verbose("the partition info is: %O.", partitionInfo);
          return partitionInfo;
        } catch (error: any) {
          logger.warning(
            `an error occurred while getting the partition information: ${error?.name}: ${error?.message}`,
          );
          logErrorStackTrace(error);
          throw error;
        }
      },
      toSpanOptions(this._context.config),
    );
  }

  /**
   * Closes the AMQP management session to the Event Hub for this client,
   * returning a promise that will be resolved when disconnection is completed.
   */
  async close(): Promise<void> {
    try {
      // Always stop the auth loop when closing the management link.
      this.authLoop?.stop();
      if (this._isMgmtRequestResponseLinkOpen()) {
        const mgmtLink = this._mgmtReqResLink;
        this._mgmtReqResLink = undefined;
        await mgmtLink!.close();
        logger.info("successfully closed the management session.");
      }
    } catch (err: any) {
      const msg = `an error occurred while closing the management session: ${err?.name}: ${err?.message}`;
      logger.warning(msg);
      logErrorStackTrace(err);
      throw new Error(msg);
    }
  }

  private async _init({
    abortSignal,
    timeoutInMs,
  }: {
    abortSignal: AbortSignalLike | undefined;
    timeoutInMs: number;
  }): Promise<void> {
    const createLink = async () => {
      const rxopt: ReceiverOptions = {
        source: { address: this.address },
        name: this.replyTo,
        target: { address: this.replyTo },
        onSessionError: (context: EventContext) => {
          const ehError = translate(context.session!.error!);
          logger.verbose(
            "an error occurred on the session for request/response links for " + "$management: %O",
            ehError,
          );
        },
      };
      const sropt: SenderOptions = {
        target: { address: this.address },
      };
      logger.verbose(
        "creating sender/receiver links with " + "srOpts: %o, receiverOpts: %O.",
        sropt,
        rxopt,
      );
      this._mgmtReqResLink = await RequestResponseLink.create(
        this._context.connection,
        sropt,
        rxopt,
        { abortSignal },
      );
      this._mgmtReqResLink.sender.on(SenderEvents.senderError, (context: EventContext) => {
        const ehError = translate(context.sender!.error!);
        logger.verbose("an error occurred on the $management sender link.. %O", ehError);
      });
      this._mgmtReqResLink.receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
        const ehError = translate(context.receiver!.error!);
        logger.verbose("an error occurred on the $management receiver link.. %O", ehError);
      });
      logger.verbose(
        "created sender '%s' and receiver '%s' links",
        this._mgmtReqResLink.sender.name,
        this._mgmtReqResLink.receiver.name,
      );
    };
    try {
      if (!this._isMgmtRequestResponseLinkOpen()) {
        // Wait for the connectionContext to be ready to open the link.
        await this._context.readyToOpenLink();
        this.authLoop = await withAuth(
          createLink,
          this._context,
          this.audience,
          timeoutInMs,
          this.logger,
          { abortSignal },
        );
      }
    } catch (err) {
      const translatedError = translate(err);
      logger.warning(
        `an error occurred while establishing the links: ${translatedError?.name}: ${translatedError?.message}`,
      );
      logErrorStackTrace(translatedError);
      throw translatedError;
    }
  }

  /**
   * Helper method to make the management request
   * @param request - The AMQP message to send
   * @param options - The options to use when sending a request over a $management link
   */
  private async _makeManagementRequest(
    request: Message,
    options: {
      retryOptions?: RetryOptions;
      abortSignal?: AbortSignalLike;
      requestName?: string;
    } = {},
  ): Promise<any> {
    const retryOptions = options.retryOptions || {};
    try {
      const abortSignal: AbortSignalLike | undefined = options && options.abortSignal;

      const sendOperationPromise = async (): Promise<Message> => {
        let count = 0;

        const retryTimeoutInMs = getRetryAttemptTimeoutInMs(options.retryOptions);
        let timeTakenByInit = 0;

        if (!this._isMgmtRequestResponseLinkOpen()) {
          logger.verbose("acquiring lock to get the management req res link.");

          const initOperationStartTime = Date.now();
          try {
            await defaultCancellableLock.acquire(
              this.managementLock,
              () => {
                const acquireLockEndTime = Date.now();
                const timeoutInMs =
                  retryTimeoutInMs - (acquireLockEndTime - initOperationStartTime);
                return this._init({ abortSignal, timeoutInMs });
              },
              { abortSignal, timeoutInMs: retryTimeoutInMs },
            );
          } catch (err) {
            const translatedError = translate(err);
            logger.warning(
              "an error occurred while creating the link: %s",
              `${translatedError?.name}: ${translatedError?.message}`,
            );
            logErrorStackTrace(translatedError);
            throw translatedError;
          }
          timeTakenByInit = Date.now() - initOperationStartTime;
        }

        const remainingOperationTimeoutInMs = retryTimeoutInMs - timeTakenByInit;

        const sendRequestOptions: SendRequestOptions = {
          abortSignal: options.abortSignal,
          requestName: options.requestName,
          timeoutInMs: remainingOperationTimeoutInMs,
        };

        count++;
        if (count !== 1) {
          // Generate a new message_id every time after the first attempt
          request.message_id = getRandomName();
        } else if (!request.message_id) {
          // Set the message_id in the first attempt only if it is not set
          request.message_id = getRandomName();
        }

        return this._mgmtReqResLink!.sendRequest(request, sendRequestOptions);
      };

      const config: RetryConfig<Message> = Object.defineProperties(
        {
          operation: sendOperationPromise,
          operationType: RetryOperationType.management,
          abortSignal: abortSignal,
          retryOptions: retryOptions,
        },
        {
          connectionId: {
            enumerable: true,
            get: () => {
              return this._context.connectionId;
            },
          },
        },
      ) as RetryConfig<Message>;
      return (await retry<Message>(config)).body;
    } catch (err) {
      const translatedError = translate(err);
      logger.warning(
        "an error occurred during send on management request-response link with address: %s",
        `${translatedError?.name}: ${translatedError?.message}`,
      );
      logErrorStackTrace(translatedError);
      throw translatedError;
    }
  }

  private _isMgmtRequestResponseLinkOpen(): boolean {
    return this._mgmtReqResLink! && this._mgmtReqResLink!.isOpen();
  }
}

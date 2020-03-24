// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { logger, logErrorStackTrace } from "../log";
import {
  TokenCredential,
  EventHubConnectionConfig,
  SharedKeyCredential,
  ConnectionConfig,
  parseConnectionString,
  EventHubConnectionStringModel
} from "@azure/core-amqp";

import { ConnectionContext } from "../connectionContext";
import { PartitionProperties, EventHubProperties } from "../managementClient";
import { throwTypeErrorIfParameterMissing, throwErrorIfConnectionClosed } from "../util/error";
import { getTracer } from "@azure/core-tracing";
import { SpanContext, Span, SpanKind, CanonicalCode } from "@opentelemetry/types";
import { getParentSpan } from "../util/operationOptions";
import { OperationNames } from "../models/private";
import {
  GetEventHubPropertiesOptions,
  GetPartitionIdsOptions,
  GetPartitionPropertiesOptions,
  EventHubClientOptions
} from "../models/public";

export function createAmqpContextWithTokenCredential(
  host: string,
  eventHubName: string,
  credential: TokenCredential,
  options?: EventHubClientOptions
): ConnectionContext {
  if (!eventHubName) {
    throw new TypeError(`"eventHubName" is missing`);
  }

  if (!host.endsWith("/")) host += "/";
  const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;EntityPath=${eventHubName}`;
  const config = EventHubConnectionConfig.create(connectionString);

  ConnectionConfig.validate(config);
  return ConnectionContext.create(config, credential, options);
}

export function createAmqpContextUsingConnectionString(
  connectionString: string,
  options: EventHubClientOptions
): ConnectionContext;
export function createAmqpContextUsingConnectionString(
  connectionString: string,
  eventHubName: string,
  options: EventHubClientOptions
): ConnectionContext;
export function createAmqpContextUsingConnectionString(
  connectionString: string,
  eventHubNameOrOptions: string | EventHubClientOptions,
  optionsArg?: EventHubClientOptions
): ConnectionContext {
  let config;
  let credential: SharedKeyCredential;
  connectionString = String(connectionString);

  let actualEventHubClientOptions: EventHubClientOptions;

  const parsedCS = parseConnectionString<EventHubConnectionStringModel>(connectionString);
  if (
    !(parsedCS.EntityPath || (typeof eventHubNameOrOptions === "string" && eventHubNameOrOptions))
  ) {
    throw new TypeError(
      `Either provide "eventHubName" or the "connectionString": "${connectionString}", ` +
        `must contain "EntityPath=<your-event-hub-name>".`
    );
  }
  if (
    parsedCS.EntityPath &&
    typeof eventHubNameOrOptions === "string" &&
    eventHubNameOrOptions &&
    parsedCS.EntityPath !== eventHubNameOrOptions
  ) {
    throw new TypeError(
      `The entity path "${parsedCS.EntityPath}" in connectionString: "${connectionString}" ` +
        `doesn't match with eventHubName: "${eventHubNameOrOptions}".`
    );
  }
  connectionString = connectionString;

  if (typeof eventHubNameOrOptions !== "string") {
    // connectionstring and/or options were passed to constructor
    config = EventHubConnectionConfig.create(connectionString);
    actualEventHubClientOptions = eventHubNameOrOptions;
  } else {
    // connectionstring, eventHubName and/or options were passed to constructor
    const eventHubName = eventHubNameOrOptions;
    config = EventHubConnectionConfig.create(connectionString, eventHubName);
    actualEventHubClientOptions = optionsArg!;
  }
  // Since connectionstring was passed, create a SharedKeyCredential
  credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);

  ConnectionConfig.validate(config);

  return ConnectionContext.create(config, credential, actualEventHubClientOptions);
}

/**
 * Closes the AMQP connection to the Event Hub instance,
 * returning a promise that will be resolved when disconnection is completed.
 * @returns Promise<void>
 * @throws Error if the underlying connection encounters an error while closing.
 */
export async function close(context: ConnectionContext): Promise<void> {
  try {
    if (context.connection.isOpen()) {
      // Close all the senders.
      for (const senderName of Object.keys(context.senders)) {
        await context.senders[senderName].close();
      }
      // Close all the receivers.
      for (const receiverName of Object.keys(context.receivers)) {
        await context.receivers[receiverName].close();
      }
      // Close the cbs session;
      await context.cbsSession.close();
      // Close the management session
      await context.managementSession!.close();
      await context.connection.close();
      context.wasConnectionCloseCalled = true;
      logger.info("Closed the amqp connection '%s' on the client.", context.connectionId);
    } else {
      context.wasConnectionCloseCalled = true;
    }
  } catch (err) {
    err = err instanceof Error ? err : JSON.stringify(err);
    logger.warning(
      `An error occurred while closing the connection "${context.connectionId}":\n${err}`
    );
    logErrorStackTrace(err);
    throw err;
  }
}

/**
 * Provides the Event Hub runtime information.
 * @param [getEventHubPropertiesOptions] The set of options to apply to the operation call.
 * @returns A promise that resolves with EventHubProperties.
 * @throws Error if the underlying connection has been closed, create a new EventHubClient.
 * @throws AbortError if the operation is cancelled via the abortSignal.
 */
export async function getProperties(
  context: ConnectionContext,
  clientOptions: EventHubClientOptions,
  getEventHubPropertiesOptions: GetEventHubPropertiesOptions
): Promise<EventHubProperties> {
  throwErrorIfConnectionClosed(context);

  const clientSpan = _createClientSpan(
    "getEventHubProperties",
    context,
    getParentSpan(getEventHubPropertiesOptions)
  );
  try {
    const result = await context.managementSession!.getHubRuntimeInformation({
      retryOptions: clientOptions.retryOptions,
      abortSignal: getEventHubPropertiesOptions.abortSignal
    });
    clientSpan.setStatus({ code: CanonicalCode.OK });
    return result;
  } catch (err) {
    clientSpan.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: err.message
    });
    logger.warning("An error occurred while getting the hub runtime information: %O", err);
    logErrorStackTrace(err);
    throw err;
  } finally {
    clientSpan.end();
  }
}

/**
 * Provides an array of partitionIds.
 * @param [options] The set of options to apply to the operation call.
 * @param context The AMQP connection context.
 * @param clientOptions The `EventHubClientOptions` for your client.
 * @returns A promise that resolves with an Array of strings.
 * @throws Error if the underlying connection has been closed, create a new EventHubClient.
 * @throws AbortError if the operation is cancelled via the abortSignal.
 */
export async function getPartitionIds(
  context: ConnectionContext,
  clientOptions: EventHubClientOptions,
  options: GetPartitionIdsOptions
): Promise<Array<string>> {
  throwErrorIfConnectionClosed(context);

  const clientSpan = _createClientSpan("getPartitionIds", context, getParentSpan(options), true);
  try {
    const runtimeInfo = await getProperties(context, clientOptions, {
      ...options,
      tracingOptions: {
        spanOptions: {
          parent: clientSpan
        }
      }
    });
    clientSpan.setStatus({ code: CanonicalCode.OK });
    return runtimeInfo.partitionIds;
  } catch (err) {
    clientSpan.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: err.message
    });
    logger.warning("An error occurred while getting the partition ids: %O", err);
    logErrorStackTrace(err);
    throw err;
  } finally {
    clientSpan.end();
  }
}

/**
 * Provides information about the specified partition.
 * @param partitionId Partition ID for which partition information is required.
 * @param [options] The set of options to apply to the operation call.
 * @returns A promise that resoloves with PartitionProperties.
 * @throws Error if the underlying connection has been closed, create a new EventHubClient.
 * @throws AbortError if the operation is cancelled via the abortSignal.
 */
export async function getPartitionProperties(
  partitionId: string,
  context: ConnectionContext,
  clientOptions: EventHubClientOptions,
  options: GetPartitionPropertiesOptions
): Promise<PartitionProperties> {
  throwErrorIfConnectionClosed(context);
  throwTypeErrorIfParameterMissing(
    context.connectionId,
    "getPartitionProperties",
    "partitionId",
    partitionId
  );
  partitionId = String(partitionId);
  const clientSpan = _createClientSpan("getPartitionProperties", context, getParentSpan(options));
  try {
    const result = await context.managementSession!.getPartitionProperties(partitionId, {
      retryOptions: clientOptions.retryOptions,
      abortSignal: options.abortSignal
    });
    clientSpan.setStatus({ code: CanonicalCode.OK });
    return result;
  } catch (err) {
    clientSpan.setStatus({
      code: CanonicalCode.UNKNOWN,
      message: err.message
    });
    logger.warning("An error occurred while getting the partition information: %O", err);
    logErrorStackTrace(err);
    throw err;
  } finally {
    clientSpan.end();
  }
}

function _createClientSpan(
  operationName: OperationNames,
  context: ConnectionContext,
  parentSpan?: Span | SpanContext,
  internal: boolean = false
): Span {
  const tracer = getTracer();
  const span = tracer.startSpan(`Azure.EventHubs.${operationName}`, {
    kind: internal ? SpanKind.INTERNAL : SpanKind.CLIENT,
    parent: parentSpan
  });

  span.setAttribute("az.namespace", "Microsoft.EventHub");
  span.setAttribute("message_bus.destination", context.config.entityPath);
  span.setAttribute("peer.address", context.config.endpoint);

  return span;
}

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  IotHubConnectionConfig,
  IotSharedKeyCredential,
  MessagingError,
  translate
} from "@azure/core-amqp";
import { ConnectionContextOptions, ConnectionContext } from "../connectionContext";
import { logger, logErrorStackTrace } from "../log";

/**
 * Converts an IotHub connection string to an event hubs-compatible connection string.
 * @param connectionString An IotHub connection string.
 * @ignore
 * @internal
 */
export async function convertIotHubToEventHubsConnectionString(
  connectionString: string
): Promise<string> {
  const iotConnectionConfig = IotHubConnectionConfig.create(connectionString);
  const ehConnectionConfig = IotHubConnectionConfig.convertToEventHubConnectionConfig(
    iotConnectionConfig
  );

  const tokenProvider = new IotSharedKeyCredential(
    ehConnectionConfig.sharedAccessKeyName,
    ehConnectionConfig.sharedAccessKey
  );

  const contextOptions: ConnectionContextOptions = {};
  contextOptions.managementSessionAddress = `/messages/events/$management`;

  const context = ConnectionContext.create(ehConnectionConfig, tokenProvider, contextOptions);

  // Call a management API in order to get a redirect error.
  // The event-hubs compatible connection string can be built from the error's details.
  if (!context.managementSession) {
    throw new Error(
      `Unable to get the Event Hubs-compatible connection string from the Iot Hub connection string.`
    );
  }

  let eventHubConnectionString = "";
  try {
    logger.verbose(
      "Triggering a redirect error from IoT Hub to get an Event Hubs-compatible connection string."
    );
    await context.managementSession.getHubRuntimeInformation();
  } catch (err) {
    const error = translate(err);
    if (!isLinkRedirectError(error)) {
      throw error;
    }

    const { entityPath, hostname } = parseRedirectError(error);
    eventHubConnectionString = buildEventHubsConnectionString({
      entityPath,
      hostname,
      sharedAccessKey: ehConnectionConfig.sharedAccessKey,
      sharedAccessKeyName: ehConnectionConfig.sharedAccessKeyName
    });
  } finally {
    await close(context);
  }

  if (!eventHubConnectionString) {
    throw new Error(
      `Unable to get the Event Hubs-compatible connection string from the Iot Hub connection string.`
    );
  }
  return eventHubConnectionString;
}

async function close(context: ConnectionContext) {
  try {
    if (context.connection.isOpen()) {
      await context.cbsSession.close();
      if (context.managementSession) {
        await context.managementSession.close();
      }
      await context.connection.close();
    }
  } catch (err) {
    const message = `An error occurred while closing the Iothub connection "${context.connectionId}"`;
    logger.verbose(message);
    logErrorStackTrace(err);
  }
}

interface LinkRedirectError extends MessagingError {
  code: "LinkRedirectError";
  info: {
    hostname: string;
    address: string;
  };
}

function isLinkRedirectError(err: any): err is LinkRedirectError {
  if (!err || err.code !== "LinkRedirectError") {
    return false;
  }

  if (!err.info || typeof err.info.hostname !== "string" || typeof err.info.address !== "string") {
    return false;
  }

  return true;
}

function parseRedirectError(err: LinkRedirectError): { hostname: string; entityPath: string } {
  const { address, hostname } = err.info;

  const entityPathMatch = address.match(/5671\/(.*)\/\$management/i);
  if (!entityPathMatch || !entityPathMatch[1]) {
    const message = `
Cannot parse the EventHub name from the address "${address}" in the redirect error.
The parsed result is: ${JSON.stringify(entityPathMatch)}
`.trim();
    logger.verbose(message);
    throw new Error(message);
  }

  return {
    hostname,
    entityPath: entityPathMatch[1]
  };
}

function buildEventHubsConnectionString(config: {
  entityPath: string;
  hostname: string;
  sharedAccessKeyName: string;
  sharedAccessKey: string;
}): string {
  const { entityPath, hostname, sharedAccessKey, sharedAccessKeyName } = config;
  return `Endpoint=sb://${hostname}/;EntityPath=${entityPath};SharedAccessKeyName=${sharedAccessKeyName};SharedAccessKey=${sharedAccessKey}`;
}

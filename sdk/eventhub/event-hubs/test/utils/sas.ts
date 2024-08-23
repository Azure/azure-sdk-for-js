// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSasTokenProvider } from "@azure/core-amqp";
import {
  EventHubConnectionStringProperties,
  parseEventHubConnectionString,
} from "../../src/index.js";
import { getConnectionStringWithKey, getEventhubName, isMock } from "./vars.js";
import * as MOCKS from "./constants.js";

export async function getSasTokenFromConnectionStringWithKey(
  connectionString: string,
): Promise<string> {
  const parsed = parseEventHubConnectionString(connectionString);
  const eventhubName = parsed.eventHubName ?? getEventhubName();
  if (!eventhubName) {
    throw new Error(
      "Entity path is missing from the connection string and is not available in the environment.",
    );
  }
  return (
    await createSasTokenProvider(
      parsed as Required<
        | Pick<EventHubConnectionStringProperties, "sharedAccessKey" | "sharedAccessKeyName">
        | Pick<EventHubConnectionStringProperties, "sharedAccessSignature">
      >,
    ).getToken(`${parsed.endpoint}${eventhubName}`)
  ).token;
}

export async function getConnectionStringWithSasTokenFromConnectionStringWithKey(
  connectionString: string,
): Promise<string> {
  const parsed = parseEventHubConnectionString(connectionString);
  const token = await getSasTokenFromConnectionStringWithKey(connectionString);
  return `Endpoint=${parsed.endpoint};SharedAccessSignature=${token}`;
}

export async function getConnectionStringWithSAS(): Promise<string> {
  if (isMock()) {
    return MOCKS.EVENTHUB_CONNECTION_STRING_WITH_SAS;
  }
  return getConnectionStringWithSasTokenFromConnectionStringWithKey(getConnectionStringWithKey());
}

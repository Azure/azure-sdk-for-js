// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SasTokenProvider, createSasTokenProvider, parseConnectionString } from "@azure/core-amqp";

/**
 * The set of properties that comprise a Notification Hubs connection string.
 */
export interface NotificationHubsConnectionStringProperties {
  /**
   * The value for "Endpoint" in the connection string.
   */
  endpoint: string;
  /**
   * The value for "SharedAccessKey" in the connection string. This along with the "SharedAccessKeyName"
   * in the connection string is used to generate a SharedAccessSignature which can be used authorize
   * the connection to the service.
   */
  sharedAccessKey: string;
  /**
   * The value for "SharedAccessKeyName" in the connection string. This along with the "SharedAccessKey"
   * in the connection string is used to generate a SharedAccessSignature which can be used authorize
   * the connection to the service.
   */
  sharedAccessKeyName: string;
}

export function createTokenProviderFromConnection(
  sharedAccessKey: string,
  sharedAccessKeyName: string
): SasTokenProvider {
  return createSasTokenProvider({ sharedAccessKey, sharedAccessKeyName });
}

/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
export function parseNotificationHubsConnectionString(
  connectionString: string
): NotificationHubsConnectionStringProperties {
  const parsedResult = parseConnectionString<{
    Endpoint: string;
    SharedAccessKey?: string;
    SharedAccessKeyName?: string;
  }>(connectionString);
  if (!parsedResult.Endpoint) {
    throw new Error("Connection string should have an Endpoint key.");
  }

  if (parsedResult.SharedAccessKey && !parsedResult.SharedAccessKeyName) {
    throw new Error("Connection string with SharedAccessKey should have SharedAccessKeyName.");
  } else if (!parsedResult.SharedAccessKey && parsedResult.SharedAccessKeyName) {
    throw new Error(
      "Connection string with SharedAccessKeyName should have SharedAccessKey as well."
    );
  }

  const output: NotificationHubsConnectionStringProperties = {
    endpoint: parsedResult.Endpoint,
    sharedAccessKey: parsedResult.SharedAccessKey!,
    sharedAccessKeyName: parsedResult.SharedAccessKeyName!,
  };

  return output;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SasTokenCredential } from "./sasTokenCredential.js";

/**
 * Defines an object with possible properties defined in T.
 */
export type ParsedOutput<T> = { [P in keyof T]: T[P] };

/**
 * Parses the connection string and returns an object of type T.
 *
 * Connection strings have the following syntax:
 *
 * ConnectionString ::= `Part { ";" Part } [ ";" ] [ WhiteSpace ]`
 * Part             ::= [ PartLiteral [ "=" PartLiteral ] ]
 * PartLiteral      ::= [ WhiteSpace ] Literal [ WhiteSpace ]
 * Literal          ::= ? any sequence of characters except ; or = or WhiteSpace ?
 * WhiteSpace       ::= ? all whitespace characters including `\r` and `\n` ?
 *
 * @param connectionString - The connection string to be parsed.
 * @returns ParsedOutput<T>.
 */
function parseConnectionString<T>(connectionString: string): ParsedOutput<T> {
  const output: { [k: string]: string } = {};
  const parts = connectionString.trim().split(";");

  for (let part of parts) {
    part = part.trim();

    if (part === "") {
      // parts can be empty
      continue;
    }

    const splitIndex = part.indexOf("=");
    if (splitIndex === -1) {
      throw new Error(
        "Connection string malformed: each part of the connection string must have an `=` assignment.",
      );
    }

    const key = part.substring(0, splitIndex).trim();
    if (key === "") {
      throw new Error("Connection string malformed: missing key for assignment");
    }

    const value = part.substring(splitIndex + 1).trim();

    output[key] = value;
  }

  return output as any;
}

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

/**
 * Creates a SasTokenCredential from a shared access key and shared access key name.
 * @param sharedAccessKey - The shared access key value.
 * @param sharedAccessKeyName - The shared access key name.
 * @returns A SasTokenCredential with the given shared access token information.
 */
export function createTokenCredentialFromConnection(
  sharedAccessKey: string,
  sharedAccessKeyName: string,
): SasTokenCredential {
  return new SasTokenCredential({ sharedAccessKey, sharedAccessKeyName });
}

/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
export function parseNotificationHubsConnectionString(
  connectionString: string,
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
      "Connection string with SharedAccessKeyName should have SharedAccessKey as well.",
    );
  }

  const output: NotificationHubsConnectionStringProperties = {
    endpoint: parsedResult.Endpoint,
    sharedAccessKey: parsedResult.SharedAccessKey!,
    sharedAccessKeyName: parsedResult.SharedAccessKeyName!,
  };

  return output;
}

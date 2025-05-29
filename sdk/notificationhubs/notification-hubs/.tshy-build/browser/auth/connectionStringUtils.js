// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { SasTokenCredential } from "./sasTokenCredential.js";
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
function parseConnectionString(connectionString) {
    const output = {};
    const parts = connectionString.trim().split(";");
    for (let part of parts) {
        part = part.trim();
        if (part === "") {
            // parts can be empty
            continue;
        }
        const splitIndex = part.indexOf("=");
        if (splitIndex === -1) {
            throw new Error("Connection string malformed: each part of the connection string must have an `=` assignment.");
        }
        const key = part.substring(0, splitIndex).trim();
        if (key === "") {
            throw new Error("Connection string malformed: missing key for assignment");
        }
        const value = part.substring(splitIndex + 1).trim();
        output[key] = value;
    }
    return output;
}
/**
 * Creates a SasTokenCredential from a shared access key and shared access key name.
 * @param sharedAccessKey - The shared access key value.
 * @param sharedAccessKeyName - The shared access key name.
 * @returns A SasTokenCredential with the given shared access token information.
 */
export function createTokenCredentialFromConnection(sharedAccessKey, sharedAccessKeyName) {
    return new SasTokenCredential({ sharedAccessKey, sharedAccessKeyName });
}
/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
export function parseNotificationHubsConnectionString(connectionString) {
    const parsedResult = parseConnectionString(connectionString);
    if (!parsedResult.Endpoint) {
        throw new Error("Connection string should have an Endpoint key.");
    }
    if (parsedResult.SharedAccessKey && !parsedResult.SharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKey should have SharedAccessKeyName.");
    }
    else if (!parsedResult.SharedAccessKey && parsedResult.SharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKeyName should have SharedAccessKey as well.");
    }
    const output = {
        endpoint: parsedResult.Endpoint,
        sharedAccessKey: parsedResult.SharedAccessKey,
        sharedAccessKeyName: parsedResult.SharedAccessKeyName,
    };
    return output;
}
//# sourceMappingURL=connectionStringUtils.js.map
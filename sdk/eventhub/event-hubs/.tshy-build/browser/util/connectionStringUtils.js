// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { parseConnectionString } from "@azure/core-amqp";
/**
 * Parses given connection string into the different properties applicable to Azure Event Hubs.
 * The properties are useful to then construct an EventHubProducerClient or an EventHubConsumerClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Event Hubs namespace.
 */
export function parseEventHubConnectionString(connectionString) {
    const parsedResult = parseConnectionString(connectionString);
    validateProperties(parsedResult.Endpoint, parsedResult.SharedAccessSignature, parsedResult.SharedAccessKey, parsedResult.SharedAccessKeyName);
    const output = {
        fullyQualifiedNamespace: (parsedResult.Endpoint.match(".*://([^/]*)") || [])[1],
        endpoint: parsedResult.Endpoint,
    };
    if (parsedResult.EntityPath) {
        output.eventHubName = parsedResult.EntityPath;
    }
    if (parsedResult.SharedAccessSignature) {
        output.sharedAccessSignature = parsedResult.SharedAccessSignature;
    }
    if (parsedResult.SharedAccessKey && parsedResult.SharedAccessKeyName) {
        output.sharedAccessKey = parsedResult.SharedAccessKey;
        output.sharedAccessKeyName = parsedResult.SharedAccessKeyName;
    }
    return output;
}
/**
 * @internal
 */
function validateProperties(endpoint, sharedAccessSignature, sharedAccessKey, sharedAccessKeyName) {
    if (!endpoint) {
        throw new Error("Connection string should have an Endpoint key.");
    }
    if (sharedAccessSignature) {
        if (sharedAccessKey || sharedAccessKeyName) {
            throw new Error("Connection string cannot have both SharedAccessSignature and SharedAccessKey keys.");
        }
    }
    else if (sharedAccessKey && !sharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKey should have SharedAccessKeyName.");
    }
    else if (!sharedAccessKey && sharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKeyName should have SharedAccessKey as well.");
    }
}
//# sourceMappingURL=connectionStringUtils.js.map
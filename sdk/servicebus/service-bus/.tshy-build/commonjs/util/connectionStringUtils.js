"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseServiceBusConnectionString = parseServiceBusConnectionString;
const core_amqp_1 = require("@azure/core-amqp");
/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
function parseServiceBusConnectionString(connectionString) {
    const parsedResult = (0, core_amqp_1.parseConnectionString)(connectionString);
    if (!parsedResult.Endpoint) {
        throw new Error("Connection string should have an Endpoint key.");
    }
    if (parsedResult.SharedAccessSignature) {
        if (parsedResult.SharedAccessKey || parsedResult.SharedAccessKeyName) {
            throw new Error("Connection string cannot have both SharedAccessSignature and SharedAccessKey keys.");
        }
    }
    else if (parsedResult.SharedAccessKey && !parsedResult.SharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKey should have SharedAccessKeyName.");
    }
    else if (!parsedResult.SharedAccessKey && parsedResult.SharedAccessKeyName) {
        throw new Error("Connection string with SharedAccessKeyName should have SharedAccessKey as well.");
    }
    const fullyQualifiedNamespace = parsedResult.Endpoint.includes("0:0:0:0:0:0:0:1")
        ? "0:0:0:0:0:0:0:1"
        : parsedResult.Endpoint.includes("::1")
            ? "::1"
            : (parsedResult.Endpoint.match(".*://([^/:]*)") || [])[1];
    const output = {
        fullyQualifiedNamespace,
        endpoint: parsedResult.Endpoint,
    };
    if (parsedResult.EntityPath) {
        output.entityPath = parsedResult.EntityPath;
    }
    if (parsedResult.SharedAccessSignature) {
        output.sharedAccessSignature = parsedResult.SharedAccessSignature;
    }
    if (parsedResult.SharedAccessKey && parsedResult.SharedAccessKeyName) {
        output.sharedAccessKey = parsedResult.SharedAccessKey;
        output.sharedAccessKeyName = parsedResult.SharedAccessKeyName;
    }
    output.useDevelopmentEmulator = Boolean(parsedResult.UseDevelopmentEmulator);
    return output;
}
//# sourceMappingURL=connectionStringUtils.js.map
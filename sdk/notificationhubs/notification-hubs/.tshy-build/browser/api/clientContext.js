// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import * as constants from "../utils/constants.js";
import { RestError, createDefaultHttpClient, createHttpHeaders } from "@azure/core-rest-pipeline";
import { createTokenCredentialFromConnection, parseNotificationHubsConnectionString, } from "../auth/connectionStringUtils.js";
import { getClient } from "@azure-rest/core-client";
const API_VERSION = "2020-06";
/**
 * Creates a NotificationHubClient from the Access Policy connection string and hub name.
 * @param connectionString - The Access Policy connection string for the notification hub.
 * @param hubName - The notification hub name.
 * @returns A NotificationHubsClientContext initialized from the connection string and hub name.
 */
export function createClientContext(connectionString, hubName, options = {}) {
    return new NotificationHubsServiceClient(connectionString, hubName, options);
}
class NotificationHubsServiceClient {
    constructor(connectionString, hubName, 
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options = {}) {
        var _a, _b;
        this.hubName = hubName;
        const parsedConnection = parseNotificationHubsConnectionString(connectionString);
        // Node doesn't allow change in protocol but browsers do, so doing a string replace
        this.baseUrl = parsedConnection.endpoint.replace("sb://", "https://");
        this.sasTokenCredential = createTokenCredentialFromConnection(parsedConnection.sharedAccessKey, parsedConnection.sharedAccessKeyName);
        const packageDetails = `azsdk-js-notificationhubs/${constants.SDK_VERSION}`;
        const userAgentPrefix = ((_a = options.userAgentOptions) === null || _a === void 0 ? void 0 : _a.userAgentPrefix)
            ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
            : `${packageDetails}`;
        this.httpClient = (_b = options === null || options === void 0 ? void 0 : options.httpClient) !== null && _b !== void 0 ? _b : createDefaultHttpClient();
        this.client = getClient(this.baseUrl, Object.assign({ userAgentOptions: {
                userAgentPrefix,
            } }, options));
    }
    async createHeaders(operationName, rawHeaders) {
        const authorization = await this.sasTokenCredential.getToken(this.baseUrl);
        if (!authorization) {
            throw new RestError("Failed to get the authorization header", { statusCode: 401 });
        }
        const headers = createHttpHeaders(rawHeaders);
        headers.set("Authorization", authorization.token);
        headers.set("x-ms-version", API_VERSION);
        headers.set("x-ms-azsdk-telemetry", `class=NotificationHubsServiceClient;method=${operationName}`);
        return headers;
    }
    sendRequest(request) {
        return this.client.pipeline.sendRequest(this.httpClient, request);
    }
    requestUrl() {
        const url = new URL(this.baseUrl);
        url.pathname = this.hubName;
        url.searchParams.set("api-version", API_VERSION);
        return url;
    }
}
//# sourceMappingURL=clientContext.js.map
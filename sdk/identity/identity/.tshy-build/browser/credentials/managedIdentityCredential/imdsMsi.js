// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { isError } from "@azure/core-util";
import { credentialLogger } from "../../util/logging.js";
import { mapScopesToResource } from "./utils.js";
import { tracingClient } from "../../util/tracing.js";
const msiName = "ManagedIdentityCredential - IMDS";
const logger = credentialLogger(msiName);
const imdsHost = "http://169.254.169.254";
const imdsEndpointPath = "/metadata/identity/oauth2/token";
/**
 * Generates an invalid request options to get a response quickly from IMDS endpoint.
 * The response indicates the availability of IMSD service; otherwise the request would time out.
 */
function prepareInvalidRequestOptions(scopes) {
    var _a;
    const resource = mapScopesToResource(scopes);
    if (!resource) {
        throw new Error(`${msiName}: Multiple scopes are not supported.`);
    }
    // Pod Identity will try to process this request even if the Metadata header is missing.
    // We can exclude the request query to ensure no IMDS endpoint tries to process the ping request.
    const url = new URL(imdsEndpointPath, (_a = process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) !== null && _a !== void 0 ? _a : imdsHost);
    const rawHeaders = {
        Accept: "application/json",
        // intentionally leave out the Metadata header to invoke an error from IMDS endpoint.
    };
    return {
        // intentionally not including any query
        url: `${url}`,
        method: "GET",
        headers: createHttpHeaders(rawHeaders),
    };
}
/**
 * Defines how to determine whether the Azure IMDS MSI is available.
 *
 * Actually getting the token once we determine IMDS is available is handled by MSAL.
 */
export const imdsMsi = {
    name: "imdsMsi",
    async isAvailable(options) {
        const { scopes, identityClient, getTokenOptions } = options;
        const resource = mapScopesToResource(scopes);
        if (!resource) {
            logger.info(`${msiName}: Unavailable. Multiple scopes are not supported.`);
            return false;
        }
        // if the PodIdentityEndpoint environment variable was set no need to probe the endpoint, it can be assumed to exist
        if (process.env.AZURE_POD_IDENTITY_AUTHORITY_HOST) {
            return true;
        }
        if (!identityClient) {
            throw new Error("Missing IdentityClient");
        }
        const requestOptions = prepareInvalidRequestOptions(resource);
        return tracingClient.withSpan("ManagedIdentityCredential-pingImdsEndpoint", getTokenOptions !== null && getTokenOptions !== void 0 ? getTokenOptions : {}, async (updatedOptions) => {
            var _a, _b;
            requestOptions.tracingOptions = updatedOptions.tracingOptions;
            // Create a request with a timeout since we expect that
            // not having a "Metadata" header should cause an error to be
            // returned quickly from the endpoint, proving its availability.
            const request = createPipelineRequest(requestOptions);
            // Default to 1000 if the default of 0 is used.
            // Negative values can still be used to disable the timeout.
            request.timeout = ((_a = updatedOptions.requestOptions) === null || _a === void 0 ? void 0 : _a.timeout) || 1000;
            // This MSI uses the imdsEndpoint to get the token, which only uses http://
            request.allowInsecureConnection = true;
            let response;
            try {
                logger.info(`${msiName}: Pinging the Azure IMDS endpoint`);
                response = await identityClient.sendRequest(request);
            }
            catch (err) {
                // If the request failed, or Node.js was unable to establish a connection,
                // or the host was down, we'll assume the IMDS endpoint isn't available.
                if (isError(err)) {
                    logger.verbose(`${msiName}: Caught error ${err.name}: ${err.message}`);
                }
                // This is a special case for Docker Desktop which responds with a 403 with a message that contains "A socket operation was attempted to an unreachable network" or "A socket operation was attempted to an unreachable host"
                // rather than just timing out, as expected.
                logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
                return false;
            }
            if (response.status === 403) {
                if ((_b = response.bodyAsText) === null || _b === void 0 ? void 0 : _b.includes("unreachable")) {
                    logger.info(`${msiName}: The Azure IMDS endpoint is unavailable`);
                    logger.info(`${msiName}: ${response.bodyAsText}`);
                    return false;
                }
            }
            // If we received any response, the endpoint is available
            logger.info(`${msiName}: The Azure IMDS endpoint is available`);
            return true;
        });
    },
};
//# sourceMappingURL=imdsMsi.js.map
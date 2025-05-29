"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawResponse = getRawResponse;
exports.createSendPollRequest = createSendPollRequest;
/**
 * Extract several fields of the response to the rawResponse
 *
 * @param getResponse - A async function that actually call the backend API.
 * @param options - The options for the getResponse callback
 * @returns A promise for the API call.
 */
async function getRawResponse(getResponse, options) {
    const { onResponse } = options || {};
    let rawResponse;
    const flatResponse = await getResponse(Object.assign(Object.assign({}, options), { onResponse: (response, flatResponseParam) => {
            rawResponse = response;
            onResponse === null || onResponse === void 0 ? void 0 : onResponse(response, flatResponseParam);
        } }));
    return {
        flatResponse,
        rawResponse: {
            statusCode: rawResponse.status,
            headers: rawResponse.headers.toJSON(),
            body: rawResponse.parsedBody,
        },
    };
}
/**
 * Helper function to create a method that can be passed to sendPollRequest in createHttpPoller.
 *
 * @param settings - The settings of the poll request, including client, options and the spec
 * @returns A callback that accept the path as input and return the promise of Lro response.
 */
function createSendPollRequest(settings) {
    const { client, options, spec } = settings;
    return async (path) => getRawResponse((paramOptions) => client.sendOperationRequest({ options: paramOptions }, Object.assign({ path }, spec)), options);
}
//# sourceMappingURL=lro.js.map
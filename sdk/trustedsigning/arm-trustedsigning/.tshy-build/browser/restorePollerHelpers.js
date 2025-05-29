// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { _createDeserialize, _updateDeserialize, _$deleteDeserialize, } from "./api/codeSigningAccounts/index.js";
import { _createDeserialize as _createDeserializeCertificateProfiles, _$deleteDeserialize as _$deleteDeserializeCertificateProfiles, } from "./api/certificateProfiles/index.js";
import { getLongRunningPoller } from "./static-helpers/pollingHelpers.js";
import { deserializeState, } from "@azure/core-lro";
/**
 * Creates a poller from the serialized state of another poller. This can be
 * useful when you want to create pollers on a different host or a poller
 * needs to be constructed after the original one is not in scope.
 */
export function restorePoller(client, serializedState, sourceOperation, options) {
    var _a, _b, _c;
    const pollerConfig = deserializeState(serializedState).config;
    const { initialRequestUrl, requestMethod, metadata } = pollerConfig;
    if (!initialRequestUrl || !requestMethod) {
        throw new Error(`Invalid serialized state: ${serializedState} for sourceOperation ${sourceOperation === null || sourceOperation === void 0 ? void 0 : sourceOperation.name}`);
    }
    const resourceLocationConfig = metadata === null || metadata === void 0 ? void 0 : metadata["resourceLocationConfig"];
    const { deserializer, expectedStatuses = [] } = (_a = getDeserializationHelper(initialRequestUrl, requestMethod)) !== null && _a !== void 0 ? _a : {};
    const deserializeHelper = (_b = options === null || options === void 0 ? void 0 : options.processResponseBody) !== null && _b !== void 0 ? _b : deserializer;
    if (!deserializeHelper) {
        throw new Error(`Please ensure the operation is in this client! We can't find its deserializeHelper for ${sourceOperation === null || sourceOperation === void 0 ? void 0 : sourceOperation.name}.`);
    }
    return getLongRunningPoller((_c = client["_client"]) !== null && _c !== void 0 ? _c : client, deserializeHelper, expectedStatuses, {
        updateIntervalInMs: options === null || options === void 0 ? void 0 : options.updateIntervalInMs,
        abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
        resourceLocationConfig,
        restoreFrom: serializedState,
        initialRequestUrl,
    });
}
const deserializeMap = {
    "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}": { deserializer: _createDeserialize, expectedStatuses: ["200", "201"] },
    "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}": { deserializer: _updateDeserialize, expectedStatuses: ["200", "202"] },
    "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}": {
        deserializer: _$deleteDeserialize,
        expectedStatuses: ["202", "204", "200"],
    },
    "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}": {
        deserializer: _createDeserializeCertificateProfiles,
        expectedStatuses: ["200", "201"],
    },
    "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.CodeSigning/codeSigningAccounts/{accountName}/certificateProfiles/{profileName}": {
        deserializer: _$deleteDeserializeCertificateProfiles,
        expectedStatuses: ["202", "204", "200"],
    },
};
function getDeserializationHelper(urlStr, method) {
    var _a, _b, _c, _d;
    const path = new URL(urlStr).pathname;
    const pathParts = path.split("/");
    // Traverse list to match the longest candidate
    // matchedLen: the length of candidate path
    // matchedValue: the matched status code array
    let matchedLen = -1, matchedValue;
    // Iterate the responseMap to find a match
    for (const [key, value] of Object.entries(deserializeMap)) {
        // Extracting the path from the map key which is in format
        // GET /path/foo
        if (!key.startsWith(method)) {
            continue;
        }
        const candidatePath = getPathFromMapKey(key);
        // Get each part of the url path
        const candidateParts = candidatePath.split("/");
        // track if we have found a match to return the values found.
        let found = true;
        for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
            if (((_a = candidateParts[i]) === null || _a === void 0 ? void 0 : _a.startsWith("{")) && ((_b = candidateParts[i]) === null || _b === void 0 ? void 0 : _b.indexOf("}")) !== -1) {
                const start = candidateParts[i].indexOf("}") + 1, end = (_c = candidateParts[i]) === null || _c === void 0 ? void 0 : _c.length;
                // If the current part of the candidate is a "template" part
                // Try to use the suffix of pattern to match the path
                // {guid} ==> $
                // {guid}:export ==> :export$
                const isMatched = new RegExp(`${(_d = candidateParts[i]) === null || _d === void 0 ? void 0 : _d.slice(start, end)}`).test(pathParts[j] || "");
                if (!isMatched) {
                    found = false;
                    break;
                }
                continue;
            }
            // If the candidate part is not a template and
            // the parts don't match mark the candidate as not found
            // to move on with the next candidate path.
            if (candidateParts[i] !== pathParts[j]) {
                found = false;
                break;
            }
        }
        // We finished evaluating the current candidate parts
        // Update the matched value if and only if we found the longer pattern
        if (found && candidatePath.length > matchedLen) {
            matchedLen = candidatePath.length;
            matchedValue = value;
        }
    }
    return matchedValue;
}
function getPathFromMapKey(mapKey) {
    const pathStart = mapKey.indexOf("/");
    return mapKey.slice(pathStart);
}
//# sourceMappingURL=restorePollerHelpers.js.map
"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformsInfo = transformsInfo;
exports.removeCentralSanitizers = removeCentralSanitizers;
exports.addSanitizers = addSanitizers;
const log_js_1 = require("./log.js");
const connectionStringHelpers_js_1 = require("./utils/connectionStringHelpers.js");
const createRecordingRequest_js_1 = require("./utils/createRecordingRequest.js");
const paths_js_1 = require("./utils/paths.js");
const utils_js_1 = require("./utils/utils.js");
/**
 * Returns the html document of all the available transforms in the proxy-tool
 */
async function transformsInfo(httpClient, url, recordingId) {
    if (recordingId) {
        const infoUri = `${url}${paths_js_1.paths.info}${paths_js_1.paths.available}`;
        const req = (0, createRecordingRequest_js_1.createRecordingRequest)(infoUri, undefined, recordingId, "GET");
        if (!httpClient) {
            throw new utils_js_1.RecorderError(`Something went wrong, Sanitizer.httpClient should not have been undefined in ${(0, utils_js_1.getTestMode)()} mode.`);
        }
        const rsp = await httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
        if (rsp.status !== 200) {
            throw new utils_js_1.RecorderError("Info request failed.");
        }
        return rsp.bodyAsText;
    }
    else {
        throw new utils_js_1.RecorderError("Bad state, recordingId is not defined when called transformsInfo().");
    }
}
/**
 * Extract sanitizers for each key and make SanitizerRequestBody[] array out of them for /addSanitizers request
 */
function makeBatchSanitizerBody(sanitizers) {
    const { generalSanitizers, bodySanitizers, headerSanitizers, uriSanitizers, connectionStringSanitizers, bodyKeySanitizers, continuationSanitizers, removeHeaderSanitizer, oAuthResponseSanitizer, uriSubscriptionIdSanitizer, resetSanitizer, } = sanitizers;
    let connectionStringSanitizersBodies = [];
    for (const sanitizer of connectionStringSanitizers !== null && connectionStringSanitizers !== void 0 ? connectionStringSanitizers : []) {
        connectionStringSanitizersBodies = connectionStringSanitizersBodies.concat(makeConnectionStringSanitizerBody(sanitizer));
    }
    return [].concat(getSanitizerBodies(generalSanitizers, makeFindReplaceSanitizerBody("GeneralRegexSanitizer", "GeneralStringSanitizer")), getSanitizerBodies(bodySanitizers, makeFindReplaceSanitizerBody("BodyRegexSanitizer", "BodyStringSanitizer")), getSanitizerBodies(headerSanitizers, makeHeaderSanitizerBody), getSanitizerBodies(uriSanitizers, makeFindReplaceSanitizerBody("UriRegexSanitizer", "UriStringSanitizer")), connectionStringSanitizersBodies, getSanitizerBodies(bodyKeySanitizers, makeBodyKeySanitizerBody), getSanitizerBodies(continuationSanitizers, makeContinuationSanitizerBody), removeHeaderSanitizer
        ? [
            {
                Name: "RemoveHeaderSanitizer",
                Body: {
                    headersForRemoval: removeHeaderSanitizer.headersForRemoval.toString(),
                },
            },
        ]
        : [], oAuthResponseSanitizer ? [{ Name: "OAuthResponseSanitizer", Body: undefined }] : [], uriSubscriptionIdSanitizer
        ? [{ Name: "UriSubscriptionIdSanitizer", Body: uriSubscriptionIdSanitizer }]
        : [], resetSanitizer ? [{ Name: "Reset", Body: undefined }] : []);
}
/**
 * Makes a /removeSanitizers request to the test proxy
 * This API is meant to remove the central sanitizers that were added by the proxy-tool
 * You'd need to pass the sanitizer ids that you want the test-proxy to remove for your recording
 *
 * Read more at https://github.com/Azure/azure-sdk-tools/pull/8142/files
 */
async function removeCentralSanitizers(httpClient, url, recordingId, removalList) {
    const uri = `${url}${paths_js_1.paths.admin}${paths_js_1.paths.removeSanitizers}`;
    const req = (0, createRecordingRequest_js_1.createRecordingRequest)(uri, undefined, recordingId);
    req.headers.set("Content-Type", "application/json");
    req.body = JSON.stringify({
        Sanitizers: removalList,
    });
    log_js_1.logger.info("[removeSanitizers] Removing sanitizers", removalList);
    const rsp = await httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
    if (rsp.status !== 200) {
        log_js_1.logger.error("[removeSanitizers] removeSanitizers request failed", rsp);
        throw new utils_js_1.RecorderError("removeSanitizers request failed.");
    }
}
/**
 * Makes an /addSanitizers request to the test proxy
 */
async function addSanitizers(httpClient, url, recordingId, options) {
    const sanitizerBodies = makeBatchSanitizerBody(options);
    if (sanitizerBodies.length === 0)
        return;
    const uri = `${url}${paths_js_1.paths.admin}${paths_js_1.paths.addSanitizers}`;
    const req = (0, createRecordingRequest_js_1.createRecordingRequest)(uri, undefined, recordingId);
    req.headers.set("Content-Type", "application/json");
    req.body = JSON.stringify(sanitizerBodies);
    log_js_1.logger.info("[addSanitizers] Adding sanitizers", options);
    const rsp = await httpClient.sendRequest(Object.assign(Object.assign({}, req), { allowInsecureConnection: true }));
    if (rsp.status !== 200) {
        log_js_1.logger.error("[addSanitizers] addSanitizers request failed", rsp);
        throw new utils_js_1.RecorderError("addSanitizers request failed.");
    }
}
// Batch sanitizer body makers
/**
 * Makes a sanitizer-bodies array from the sanitizers provided that is sent over as the addSanitizers request body.
 * Also takes in the function that makes the body for each sanitizer.
 */
function getSanitizerBodies(sanitizers, func) {
    var _a;
    return (_a = sanitizers === null || sanitizers === void 0 ? void 0 : sanitizers.map(func)) !== null && _a !== void 0 ? _a : [];
}
/**
 * Makes a sanitizer-body array, part of the array that is sent over as the addSanitizers request body.
 * for a FindReplaceSanitizer, for example a bodySanitizer.
 *
 * Depending on the input FindReplaceSanitizer options, either adds a sanitizer named `regexSanitizerName`
 * or `stringSanitizerName`.
 */
function makeFindReplaceSanitizerBody(regexSanitizerName, stringSanitizerName) {
    return (sanitizer) => {
        if ((0, utils_js_1.isStringSanitizer)(sanitizer)) {
            return {
                Name: stringSanitizerName,
                Body: {
                    target: sanitizer.target,
                    value: sanitizer.value,
                },
            };
        }
        return {
            Name: regexSanitizerName,
            Body: {
                regex: sanitizer.target,
                value: sanitizer.value,
                groupForReplace: sanitizer.groupForReplace,
            },
        };
    };
}
/**
 * Adds a HeaderRegexSanitizer or HeaderStringSanitizer.
 *
 * HeaderSanitizer is a special case of FindReplaceSanitizer where a header name ('key') must be provided.
 * Additionally, the 'target' option is not required. If target is unspecified, the header's value will always
 * be replaced.
 */
function makeHeaderSanitizerBody(sanitizer) {
    if (sanitizer.regex || !sanitizer.target) {
        return {
            Name: "HeaderRegexSanitizer",
            Body: {
                key: sanitizer.key,
                value: sanitizer.value,
                regex: sanitizer.target,
                groupForReplace: sanitizer.groupForReplace,
            },
        };
    }
    return {
        Name: "HeaderStringSanitizer",
        Body: {
            key: sanitizer.key,
            target: sanitizer.target,
            value: sanitizer.value,
        },
    };
}
/**
 *  Internally,
 * - connection strings are parsed and
 * - each part of the connection string is mapped with its corresponding fake value
 * - GeneralStringSanitizer is applied for each of the parts with the real and fake values that are parsed
 */
function makeConnectionStringSanitizerBody(sanitizer) {
    if (!sanitizer.actualConnString) {
        throw new utils_js_1.RecorderError(`Attempted to add an invalid sanitizer - ${JSON.stringify({
            actualConnString: sanitizer.actualConnString,
            fakeConnString: sanitizer.fakeConnString,
        })}`);
    }
    const pairsMatched = (0, connectionStringHelpers_js_1.getRealAndFakePairs)(sanitizer.actualConnString, sanitizer.fakeConnString);
    return Object.entries(pairsMatched).map(([key, value]) => {
        return { Name: "GeneralStringSanitizer", Body: { value, target: key } };
    });
}
/**
 * Makes a sanitizer-body, part of the array that is sent over as the addSanitizers request body.
 */
function makeBodyKeySanitizerBody(sanitizer) {
    return {
        Name: "BodyKeySanitizer",
        Body: sanitizer,
    };
}
/**
 * Makes a sanitizer-body, part of the array that is sent over as the addSanitizers request body.
 */
function makeContinuationSanitizerBody(sanitizer) {
    return {
        Name: "ContinuationSanitizer",
        Body: Object.assign(Object.assign({}, sanitizer), { resetAfterFirst: sanitizer.resetAfterFirst.toString() }),
    };
}
//# sourceMappingURL=sanitizer.js.map
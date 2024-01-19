"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUnexpected = void 0;
var responseMap = {
    "GET /messages/streams/{id}": ["200"],
    "POST /messages/notifications:send": ["202"],
    "GET /messages/channels/{channelId}/templates": ["200"],
};
function isUnexpected(response) {
    var lroOriginal = response.headers["x-ms-original-url"];
    var url = new URL(lroOriginal !== null && lroOriginal !== void 0 ? lroOriginal : response.request.url);
    var method = response.request.method;
    var pathDetails = responseMap["".concat(method, " ").concat(url.pathname)];
    if (!pathDetails) {
        pathDetails = getParametrizedPathSuccess(method, url.pathname);
    }
    return !pathDetails.includes(response.status);
}
exports.isUnexpected = isUnexpected;
function getParametrizedPathSuccess(method, path) {
    var _a, _b, _c, _d;
    var pathParts = path.split("/");
    // Traverse list to match the longest candidate
    // matchedLen: the length of candidate path
    // matchedValue: the matched status code array
    var matchedLen = -1, matchedValue = [];
    // Iterate the responseMap to find a match
    for (var _i = 0, _e = Object.entries(responseMap); _i < _e.length; _i++) {
        var _f = _e[_i], key = _f[0], value = _f[1];
        // Extracting the path from the map key which is in format
        // GET /path/foo
        if (!key.startsWith(method)) {
            continue;
        }
        var candidatePath = getPathFromMapKey(key);
        // Get each part of the url path
        var candidateParts = candidatePath.split("/");
        // track if we have found a match to return the values found.
        var found = true;
        for (var i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
            if (((_a = candidateParts[i]) === null || _a === void 0 ? void 0 : _a.startsWith("{")) &&
                ((_b = candidateParts[i]) === null || _b === void 0 ? void 0 : _b.indexOf("}")) !== -1) {
                var start = candidateParts[i].indexOf("}") + 1, end = (_c = candidateParts[i]) === null || _c === void 0 ? void 0 : _c.length;
                // If the current part of the candidate is a "template" part
                // Try to use the suffix of pattern to match the path
                // {guid} ==> $
                // {guid}:export ==> :export$
                var isMatched = new RegExp("".concat((_d = candidateParts[i]) === null || _d === void 0 ? void 0 : _d.slice(start, end))).test(pathParts[j] || "");
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
    var pathStart = mapKey.indexOf("/");
    return mapKey.slice(pathStart);
}

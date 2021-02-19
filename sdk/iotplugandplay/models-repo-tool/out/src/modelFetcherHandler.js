// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelFetcher = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const url = tslib_1.__importStar(require("url"));
const localFetchers = tslib_1.__importStar(require("./localModelFetchers"));
const remoteFetchers = tslib_1.__importStar(require("./remoteModelFetchers"));
function isLocalPath(p) {
    if (p.startsWith('https://') || p.startsWith('http://')) {
        return false;
    }
    else if (p.startsWith('file://')) {
        return true;
    }
    else {
        try {
            fs.accessSync(p);
            return true;
        }
        catch (_a) {
            return false;
        }
    }
}
function modelFetcher(dtmi, endpoint, resolveDependencies, tryFromExpanded) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (isLocalPath(endpoint)) {
            const formattedDirectory = endpoint.includes('file://') ? url.fileURLToPath(endpoint) : endpoint;
            if (tryFromExpanded || resolveDependencies) {
                return localFetchers.recursiveFetcher(dtmi, formattedDirectory, tryFromExpanded);
            }
            else {
                console.log(`Fetching: ${dtmi}`);
                return localFetchers.fetcher(dtmi, formattedDirectory, false);
            }
        }
        else {
            if (tryFromExpanded || resolveDependencies) {
                return remoteFetchers.recursiveFetcher(dtmi, endpoint, tryFromExpanded);
            }
            console.log(`Fetching: ${dtmi}`);
            return remoteFetchers.fetcher(dtmi, endpoint, false);
        }
    });
}
exports.modelFetcher = modelFetcher;
//# sourceMappingURL=modelFetcherHandler.js.map
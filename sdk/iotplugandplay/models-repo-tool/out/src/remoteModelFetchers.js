// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveFetcher = exports.fetcher = void 0;
const tslib_1 = require("tslib");
const dtmiConventions = tslib_1.__importStar(require("./dtmiConventions"));
const modelMetadata = tslib_1.__importStar(require("./modelMetadata"));
const coreHttp = tslib_1.__importStar(require("@azure/core-http"));
const modelFetcherHelper_1 = require("./modelFetcherHelper");
function recursiveFetcher(dtmi, endpoint, tryFromExpanded) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let dependencyModels = {};
        let fetchedModels;
        try {
            console.log(`Fetching: ${dtmi}`);
            fetchedModels = yield fetcher(dtmi, endpoint, tryFromExpanded);
        }
        catch (error) {
            if (tryFromExpanded && (error.code === 'ENOENT' || !(error.statusCode >= 200 && error.statusCode < 400))) {
                console.log('Fetching from expanded failed. Trying without.');
                console.log(`Fetching: ${dtmi}`);
                fetchedModels = yield fetcher(dtmi, endpoint, false);
            }
            else {
                throw error;
            }
        }
        const dtmis = Object.keys(fetchedModels);
        for (let i = 0; i < dtmis.length; i++) {
            const currentDtdl = fetchedModels[dtmis[i]];
            const deps = modelMetadata.getModelMetadata(currentDtdl).componentSchemas;
            if (deps && deps.length > 0) {
                for (let j = 0; j < deps.length; j++) {
                    if (Object.keys(dependencyModels).includes(deps[j]) || Object.keys(fetchedModels).includes(deps[j])) {
                        // do nothing
                    }
                    else {
                        const fetchedDependencies = yield recursiveFetcher(deps[j], endpoint, tryFromExpanded);
                        dependencyModels = Object.assign(Object.assign({}, dependencyModels), fetchedDependencies);
                    }
                }
            }
        }
        if (Object.keys(dependencyModels).length > 0) {
            fetchedModels = Object.assign(Object.assign({}, fetchedModels), dependencyModels);
        }
        return fetchedModels;
    });
}
exports.recursiveFetcher = recursiveFetcher;
function fetcher(dtmi, endpoint, tryFromExpanded) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const client = new coreHttp.ServiceClient();
        const req = {
            url: dtmiConventions.dtmiToQualifiedPath(dtmi, endpoint, tryFromExpanded),
            method: 'GET'
        };
        const res = yield client.sendRequest(req);
        if (res.status >= 200 && res.status < 400) {
            const dtdlAsString = res.bodyAsText || '';
            const parsedDtdl = JSON.parse(dtdlAsString);
            if (Array.isArray(parsedDtdl)) {
                const result = modelFetcherHelper_1.flattenDtdlResponse(parsedDtdl);
                return result;
            }
            else {
                const result = { [dtmi]: parsedDtdl };
                return result;
            }
        }
        else {
            throw new coreHttp.RestError('Error on HTTP Request in remote model fetcher', '404', 404, undefined, res);
        }
    });
}
exports.fetcher = fetcher;
//# sourceMappingURL=remoteModelFetchers.js.map
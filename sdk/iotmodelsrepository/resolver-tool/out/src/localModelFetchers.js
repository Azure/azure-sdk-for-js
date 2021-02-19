// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveFetcher = exports.fetcher = void 0;
const tslib_1 = require("tslib");
const dtmiConventions = tslib_1.__importStar(require("./dtmiConventions"));
const modelMetadata = tslib_1.__importStar(require("./modelMetadata"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const path = tslib_1.__importStar(require("path"));
const modelFetcherHelper_1 = require("./modelFetcherHelper");
function recursiveFetcher(dtmi, directory, tryFromExpanded) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    let dependencyModels = {};
    let fetchedModels;
    try {
      console.log(`Fetching: ${dtmi}`);
      fetchedModels = yield fetcher(dtmi, directory, tryFromExpanded);
    } catch (error) {
      if (tryFromExpanded && error.code === "ENOENT") {
        console.log("Fetching from expanded failed. Trying without.");
        fetchedModels = yield fetcher(dtmi, directory, false);
      } else {
        throw error;
      }
    }
    const dtmis = Object.keys(fetchedModels);
    for (let i = 0; i < dtmis.length; i++) {
      const currentDtdl = fetchedModels[dtmis[i]];
      const metaModelData = modelMetadata.getModelMetadata(currentDtdl);
      const deps = metaModelData.componentSchemas.concat(metaModelData.extends);
      if (deps && deps.length > 0) {
        for (let j = 0; j < deps.length; j++) {
          if (
            Object.keys(dependencyModels).includes(deps[j]) ||
            Object.keys(fetchedModels).includes(deps[j])
          ) {
            // do nothing
          } else {
            const fetchedDependencies = yield recursiveFetcher(deps[j], directory, tryFromExpanded);
            dependencyModels = Object.assign(
              Object.assign({}, dependencyModels),
              fetchedDependencies
            );
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
function fetcher(dtmi, directory, tryFromExpanded) {
  return tslib_1.__awaiter(this, void 0, void 0, function*() {
    const dtmiPath = dtmiConventions.dtmiToPath(dtmi);
    const dtmiPathFormatted = tryFromExpanded
      ? dtmiPath.replace(".json", ".expanded.json")
      : dtmiPath;
    const targetPath = path.join(directory, dtmiPathFormatted);
    const dtdlFile = fs_1.default.readFileSync(targetPath, "utf8");
    const parsedDtdl = JSON.parse(dtdlFile);
    if (Array.isArray(parsedDtdl)) {
      const result = modelFetcherHelper_1.flattenDtdlResponse(parsedDtdl);
      return result;
    } else {
      const result = { [dtmi]: parsedDtdl };
      return result;
    }
  });
}
exports.fetcher = fetcher;
//# sourceMappingURL=localModelFetchers.js.map

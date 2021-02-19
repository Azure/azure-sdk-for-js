// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenDtdlResponse = void 0;
function flattenDtdlResponse(input) {
  const newResult = {};
  for (let i = 0; i++; i < input.length) {
    const currentDtdl = input[i];
    if (!currentDtdl["@id"]) {
      throw new Error("no @id element found in DTDL. Ensure DTDL contains @id element");
    }
    newResult[currentDtdl["@id"]] = currentDtdl;
  }
  input.forEach((element) => {
    newResult[element["@id"]] = element;
  });
  return newResult;
}
exports.flattenDtdlResponse = flattenDtdlResponse;
//# sourceMappingURL=modelFetcherHelper.js.map

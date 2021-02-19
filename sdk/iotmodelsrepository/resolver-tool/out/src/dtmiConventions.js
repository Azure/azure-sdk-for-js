// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtmiToQualifiedPath = exports.dtmiToPath = exports.isValidDtmi = void 0;
function isValidDtmi(dtmi) {
  if (dtmi) {
    const re = /^dtmi:[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?(?::[A-Za-z](?:[A-Za-z0-9_]*[A-Za-z0-9])?)*;[1-9][0-9]{0,8}$/;
    return re.test(dtmi); // true if dtmi matches regular expression, false otherwise
  }
  return false; // if not a string return false.
}
exports.isValidDtmi = isValidDtmi;
function dtmiToPath(dtmi) {
  // presently this dtmi to path function does not return the path with a
  // file format at the end, i.e. does not append .json or .expanded.json.
  // that happens in the dtmiToQualifiedPath function
  if (isValidDtmi(dtmi)) {
    return `${dtmi
      .toLowerCase()
      .replace(/:/gm, "/")
      .replace(/;/gm, "-")}.json`;
  } else {
    throw new Error("DTMI provided is invalid. Ensure it follows DTMI conventions.");
  }
}
exports.dtmiToPath = dtmiToPath;
function ensureStartsWithProtocol(text) {
  const re = /^http[s]?:\/\//;
  if (text.search(re) !== -1) {
    return text;
  } else {
    return `https://${text}`;
  }
}
function dtmiToQualifiedPath(dtmi, endpoint, isExpanded) {
  const dtmiAsPath = dtmiToPath(dtmi);
  const endpointWithSlash = endpoint.endsWith("/") ? endpoint : `${endpoint}/`;
  const urlEndpoint = ensureStartsWithProtocol(endpointWithSlash);
  if (isExpanded) {
    return `${urlEndpoint}${dtmiAsPath.replace(/json$/, "expanded.json")}`;
  } else {
    return `${urlEndpoint}${dtmiAsPath}`;
  }
}
exports.dtmiToQualifiedPath = dtmiToQualifiedPath;
//# sourceMappingURL=dtmiConventions.js.map

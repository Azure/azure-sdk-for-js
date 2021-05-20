// Copyright (c) Microsoft.
// Licensed under the MIT license.

const fs = require('fs');

const pkg = fs.readFileSync('./databases.json', 'utf8');

const isBrowser = new Function("try {return this===self;}catch(e){ return false;}");
const isNode = new Function("try {return this===global;}catch(e){return false;}");

const currentPlatform = isBrowser ? "browser" : isNode ? "node" : "undefined";

export const SDK_VERSION = pkg.version;
export const DEFAULT_USER_AGENT = `azsdk-node-modelsrepository/${SDK_VERSION} (${currentPlatform})`;
export const DEFAULT_REPOSITORY_LOCATION = "https://devicemodels.azure.com";
export const DEFAULT_API_VERSION = "2021-02-11";

export const DEPENDENCY_MODE_DISABLED = "disabled";
export const DEPENDENCY_MODE_ENABLED = "enabled";
export const DEPENDENCY_MODE_TRY_FROM_EXPANDED = "tryFromExpanded";

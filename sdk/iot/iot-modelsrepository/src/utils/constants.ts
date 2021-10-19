// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";

const currentPlatform = isNode ? "node" : "browser";

export const SDK_VERSION: string = "1.0.0-beta.3";
export const DEFAULT_USER_AGENT = `azsdk-node-modelsrepository/${SDK_VERSION} (${currentPlatform})`;
export const DEFAULT_REPOSITORY_LOCATION = "https://devicemodels.azure.com";
export const DEFAULT_API_VERSION = "2021-02-11";

export const DEPENDENCY_MODE_DISABLED = "disabled";
export const DEPENDENCY_MODE_ENABLED = "enabled";

export const METADATA_PATH = "metadata.json";

export const DEFAULT_CLIENT_METADATA_ENABLED = true;
export const DEFAULT_CLIENT_METADATA_EXPIRATION = Number.MAX_VALUE;

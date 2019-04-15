// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { version } from "../../package.json";

export const packageJsonInfo = {
  name: "@azure/service-bus",
  version: version
};

export const messageDispositionTimeout = 20000;

export const max32BitNumber = Math.pow(2, 31) - 1;

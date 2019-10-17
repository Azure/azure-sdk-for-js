// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const logFunction = console.debug || console.log;
export function log(...args: any[]) {
  logFunction(...args);
}

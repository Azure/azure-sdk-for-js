// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const logFunction = console.debug || console.log;
export function log(...args: any[]): void {
  logFunction(...args);
}

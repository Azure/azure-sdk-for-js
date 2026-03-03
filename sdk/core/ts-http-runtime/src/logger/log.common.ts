// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export function log(message: unknown, ...args: any[]): void {
  const firstArg = String(message);
  if (firstArg.includes(":error")) {
    console.error(message, ...args);
  } else if (firstArg.includes(":warning")) {
    console.warn(message, ...args);
  } else if (firstArg.includes(":info")) {
    console.info(message, ...args);
  } else if (firstArg.includes(":verbose")) {
    console.debug(message, ...args);
  } else {
    console.debug(message, ...args);
  }
}

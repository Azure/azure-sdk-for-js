// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { styleText } from "node:util";

import { baseCommand } from "./commands/index.ts";

// The main command is implemented using the same `subCommand` method.
baseCommand(...process.argv.slice(2)).catch((err) => {
  const format = (value: unknown): string => {
    if (value instanceof Error) {
      return value.stack ?? value.message;
    }
    if (typeof value === "object" && value !== null) {
      try {
        return JSON.stringify(value);
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  console.error(styleText("red", ["[Internal Error]", format(err)].join(" ")));
  if (err && typeof err === "object" && "cause" in err && err.cause !== undefined) {
    console.error(styleText("red", ["[Internal Error Cause]", format(err.cause)].join(" ")));
  }
  process.exit(255);
});

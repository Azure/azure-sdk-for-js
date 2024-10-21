// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("source-map-support").install();
import util from "util";

process.on("unhandledRejection", (error: any) => {
  if (error.body) {
    try {
      error.body = JSON.parse(error.body);
    } catch (err: any) {
      /* NO OP */
    }
  }
  const nestedError = new Error("Unhandled exception found");
  Object.defineProperty(nestedError, "errors", { value: [error] });
  console.error(
    util.formatWithOptions({ colors: true, compact: true, depth: 6 }, "%O", nestedError),
  );
});

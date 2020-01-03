// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
require("source-map-support").install();

process.on("unhandledRejection", (error: any) => {
  if (error.body) {
    try {
      error.body = JSON.parse(error.body);
    } catch (err) {
      /* NO OP */
    }
  }
  console.error(new Error("Unhandled exception found"));
  console.error(JSON.stringify(error, null, " "));
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This node built-in must be shimmed for the browser.
import EventEmitter from "events";
// This is a node dependency that needs to be replaced with a
// different implementation in the browser.
import print from "./print";
export { print };

export { AzureKeyCredential, KeyCredential } from "@azure/core-auth";

// this is a utility function from a library that should be external
// for both node and web
import { isNode } from "@azure/core-http";

// exporting some value from a dependency
export { URLBuilder } from "@azure/core-http";

export function createEventEmitter(): EventEmitter {
  // use event emitter
  const e = new EventEmitter();

  // Dynamic Node and browser-specific code
  if (isNode) {
    console.log("Node 👊");
  } else {
    console.log("Browser ❤");
  }

  print("Created event emitter");

  return e;
}

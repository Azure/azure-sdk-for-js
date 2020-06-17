// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// This node built-in must be shimmed for the browser.

// This is a node dependency that needs to be replaced with a
// different implementation in the browser.


// this is a utility function from a library that should be external
// for both node and web
import { isNode } from "@azure/core-http";

export function helloWorld(): string {
  if (isNode) {
    console.log("Node 👊");
  } else {
    console.log("Browser ❤");
  }

  return "Hello world!";

}

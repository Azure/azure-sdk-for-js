// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export class StringRestriction {
  constructor() {
    throw new Error(
      "StringRestriction is no necessary in the Node.js Parser since JSON objects are supported in JS."
    );
  }
}

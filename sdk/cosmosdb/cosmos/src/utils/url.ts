// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function checkURL(testString: string): URL {
  let _URL;
  // TODO: Remove this when we drop Node 8 support. URL is global in Node 10+
  if (typeof URL === "undefined") {
    // tslint:disable-next-line:no-var-requires
    _URL = require("url").URL;
  } else {
    _URL = URL;
  }
  return new _URL(testString);
}

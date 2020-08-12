// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function checkURL(testString: string): URL {
  let _URL;
  if (typeof URL === "undefined") {
    // tslint:disable-next-line:no-var-requires
    _URL = require("url").URL;
  } else {
    _URL = URL;
  }
  return new _URL(testString);
}

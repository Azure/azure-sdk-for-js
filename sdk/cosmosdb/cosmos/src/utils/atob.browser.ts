// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

if ("function" !== typeof atob) {
  throw new Error("Your browser environment is missing the global `atob` function");
}

export default atob;

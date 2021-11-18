// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Instrumenter } from "./interfaces";

// eslint-disable-next-line @azure/azure-sdk/ts-no-namespaces
declare global {
  // eslint-disable-next-line no-var
  var instrumenterImplementation: Instrumenter;
}

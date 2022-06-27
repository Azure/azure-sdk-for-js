// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { Constants } from "../common/constants";

/**
 * Creates a span using the global tracer.\
 * 
 */
export const tracingClient = createTracingClient({
  namespace: Constants.AzureNamespace,
  packageName: Constants.SDKName,
  packageVersion: Constants.SDKVersion,
});

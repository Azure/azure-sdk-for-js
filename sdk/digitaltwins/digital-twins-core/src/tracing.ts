// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { SDK_VERSION } from "./constants";

/**
 * Creates a tracing client to manage tracing spans.
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.DigitalTwins",
  packageName: "@azure/digital-twins-core",
  packageVersion: SDK_VERSION,
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";
import { Constants } from "../common/constants";

/**
 * Creates a span using the global tracer.
 *
 * @param name - The name of the operation being performed.
 * @param tracingOptions - The options for the underlying http request.
 *
 * @internal
 */
export const tracingClient = createTracingClient({
  namespace: Constants.Namespace,
  packageName: Constants.SDKName,
  packageVersion: Constants.SDKVersion,
});

/** @internal */
export const knownContextKeys = {
  span: Symbol.for("@azure/core-tracing span"),
  namespace: Symbol.for("@azure/core-tracing namespace"),
};

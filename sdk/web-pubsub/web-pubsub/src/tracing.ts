// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTracingClient } from "@azure/core-tracing";

/** @internal */
export const tracingClient = createTracingClient({
  namespace: "Microsoft.WebPubSub",
  packageName: "@azure/web-pubsub",
});

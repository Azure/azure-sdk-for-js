// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction } from "@azure/core-tracing";

/** @internal */
export const createSpan = createSpanFunction({
  namespace: "Microsoft.WebPubSub",
  packagePrefix: "Azure.Messaging.WebPubSub"
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction } from "@azure/core-client";

/** @internal */
export const createSpan = createSpanFunction({
  namespace: "Microsoft.WebPubSub",
  packagePrefix: "Azure.Messaging.WebPubSub"
});

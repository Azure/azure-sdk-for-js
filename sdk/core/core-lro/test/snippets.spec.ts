// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PollerLike } from "@azure/core-lro";
import { describe, it } from "vitest";

const poller = {} as unknown as PollerLike<any, any>;
describe("snippets", () => {
  it("OperationStateExample", async () => {
    switch (poller.operationState.status) {
      case "succeeded": // return poller.getResult();
      case "failed": // throw poller.getOperationState().error;
      case "canceled": // throw new Error("Operation was canceled");
      case "running": // ...
      case "notStarted": // ...
    }
  });
});

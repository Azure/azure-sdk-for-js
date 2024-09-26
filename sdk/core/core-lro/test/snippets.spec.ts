// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";

describe("snippets", () => {
  it("operation_state", async () => {
    switch (poller.getOperationState().status) {
      case "succeeded": // return poller.getResult();
      case "failed": // throw poller.getOperationState().error;
      case "canceled": // throw new Error("Operation was canceled");
      case "running": // ...
      case "notStarted": // ...
    }
  });
});

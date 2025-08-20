// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import type { Client } from "@azure-rest/core-client";

interface GetOperationResult {}
interface DetectFromUrl {}
interface Routes {
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetOperationResult;
  /** Resource for '/detect' has methods for the following verbs: post */
  (path: "/detect"): DetectFromUrl;
}

describe("snippets", () => {
  it("PathExample", () => {
    type MyClient = Client & {
      path: Routes;
    };
  });
});

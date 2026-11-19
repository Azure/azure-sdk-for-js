// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { getClient } from "../src/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { ArmClientOptions, Client } from "../src/index.js";

interface GetOperationResult {}
interface DetectFromUrl {}
interface Routes {
  /** Resource for '/operations/\{operationId\}' has methods for the following verbs: get */
  (path: "/operations/{operationId}", operationId: string): GetOperationResult;
  /** Resource for '/detect' has methods for the following verbs: post */
  (path: "/detect"): DetectFromUrl;
}

describe("snippets", () => {
  it("ReadmeSampleArmClientOptions", () => {
    function createArmClient(
      endpoint: string,
      credential: TokenCredential,
      options: ArmClientOptions,
    ): ReturnType<typeof getClient> {
      const { disableExternalEvaluation, ...clientOptions } = options;
      return getClient(endpoint, credential, {
        ...clientOptions,
        internal: {
          ...clientOptions.internal,
          arm: {
            ...clientOptions.internal?.arm,
            disableExternalEvaluation,
          },
        },
      });
    }
  });

  it("PathExample", () => {
    type MyClient = Client & {
      path: Routes;
    };
  });
});

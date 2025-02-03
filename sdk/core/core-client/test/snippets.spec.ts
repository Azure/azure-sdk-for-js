// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { authorizeRequestOnClaimChallenge } from "../src/index.js";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("AuthorizeRequestOnClaimChallenge", () => {
    const policy = bearerTokenAuthenticationPolicy({
      challengeCallbacks: {
        authorizeRequestOnChallenge: authorizeRequestOnClaimChallenge,
      },
      scopes: ["https://service/.default"],
    });
  });
});

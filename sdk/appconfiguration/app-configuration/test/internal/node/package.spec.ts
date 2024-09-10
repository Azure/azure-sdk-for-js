// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import { assert } from "chai";
import { AppConfigurationClient } from "../../../src/appConfigurationClient";
import { TokenCredential } from "@azure/core-auth";
import { packageVersion } from "../../../src/internal/constants";

describe("packagejson related tests", () => {
  // if this test is failing you need to update the contant `packageVersion` referenced above
  // in the generated code.
  it("user agent string matches the package version", async function (this: Context) {
    let userAgent: string | undefined;
    const client = new AppConfigurationClient(
      "https://myresource.azconfig.io",
      {
        getToken: (_scopes) => {
          return Promise.resolve({
            token: "fakevalue",
            expiresOnTimestamp: new Date().getTime() + 24 * 60 * 60 * 1000,
          });
        },
      } as TokenCredential,
      {
        httpClient: {
          sendRequest: async (request) => {
            userAgent = request.headers.get("user-agent") ?? request.headers.get("x-ms-useragent");
            throw new Error("only a test");
          },
        },
      },
    );

    try {
      await client.getSnapshot("name");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.include(userAgent!, `azsdk-js-app-configuration/${packageVersion}`);
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-http";

import { Context } from "mocha";
import { KeyClient } from "../../src";
import { SDK_VERSION } from "../../src/constants";
import { assert } from "@azure/test-utils";
import fs from "fs";
import path from "path";
import { env } from "@azure-tools/test-recorder";
import { ClientSecretCredential } from "@azure/identity";

describe("Keys client's user agent", () => {
  it("SDK_VERSION and user-agent should match", async function () {
    let userAgent: string | undefined;
    const client = new KeyClient(
      "https://myvault.vault.azure.net",
      new ClientSecretCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, env.AZURE_CLIENT_SECRET),
      {
        httpClient: {
          sendRequest: async (request) => {
            userAgent = request.headers.get("user-agent") ?? request.headers.get("x-ms-useragent");
            throw new Error("only a test");
          },
        },
      }
    );

    try {
      await client.getKey("foo");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.include(userAgent!, `azsdk-js-keyvault-keys/${SDK_VERSION}`);
  });

  it("the version should also match with the one available in the package.json  (only in Node, because of fs)", async function (this: Context) {
    if (!isNode) {
      this.skip();
    }
    let version: string;
    try {
      // The unit-test script has this test file at: test/internal/userAgent.spec.ts
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    } catch {
      // The integration-test script has this test file in a considerably different place,
      // Along the lines of: dist-esm/keyvault-keys/test/internal/userAgent.spec.ts
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    }
    assert.equal(version, SDK_VERSION);
  });
});

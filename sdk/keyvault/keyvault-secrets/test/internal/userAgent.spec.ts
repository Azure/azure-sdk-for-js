// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential } from "@azure/identity";
import { Context } from "mocha";
import { SDK_VERSION } from "../../src/constants";
import { SecretClient } from "../../src";
import { assert } from "@azure/test-utils";
import { env } from "@azure-tools/test-recorder";
import fs from "fs";
import { isNode } from "@azure/core-http";
import path from "path";

describe("Secrets client's user agent (only in Node, because of fs)", () => {
  it("SDK_VERSION and user-agent should match", async function () {
    let userAgent: string | undefined;
    const client = new SecretClient(
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
      await client.getSecret("foo");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent, "Expected a User-Agent header to be sent");
    assert.include(userAgent!, `azsdk-js-keyvault-secrets/${SDK_VERSION}`);
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

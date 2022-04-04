// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyVaultAccessControlClient, SDK_VERSION } from "../../src";

import { TokenCredential } from "@azure/core-auth";
import { assert } from "@azure/test-utils";
import fs from "fs";
import { isNode } from "@azure/core-util";
import path from "path";

describe("Key Vault Admin's user agent (only in Node, because of fs)", function () {
  beforeEach(function () {
    if (!isNode) {
      this.skip();
    }
  });

  it("SDK_VERSION and packageVersion should match", async function () {
    let userAgent: string | undefined;
    const client = new KeyVaultAccessControlClient(
      "https://myvault.vault.azure.net",
      {} as TokenCredential,
      {
        additionalPolicies: [
          {
            policy: {
              name: "fetchUserAgent",
              sendRequest: (request, next) => {
                userAgent = request.headers.get("user-agent");
                return next(request);
              },
            },
            position: "perCall",
          },
        ],
      }
    );
    try {
      await client.getRoleAssignment("/", "");
    } catch {
      // no-op, we don't care about the response, only the user-agent header
    }
    assert.exists(userAgent);
    assert.include(userAgent!, `azsdk-js-keyvault-admin/${SDK_VERSION}`);
  });

  it("the version should also match with the one available in the package.json  (only in Node, because of fs)", async function () {
    let version: string;
    try {
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    } catch {
      const fileContents = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../../../../package.json"), { encoding: "utf-8" })
      );
      version = fileContents.version;
    }
    assert.equal(version, SDK_VERSION);
  });
});

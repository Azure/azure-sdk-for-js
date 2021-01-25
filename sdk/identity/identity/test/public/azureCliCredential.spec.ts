// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import { MockAzureCliCredentialClient } from "../mockAzureCliCredentialClient";

describe("AzureCliCredential", function() {
  it("get access token without error", async function() {
    const mockCliCredentialClient = new MockAzureCliCredentialClient({
      stdout: '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}',
      stderr: ""
    });
    const actualToken = await mockCliCredentialClient.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
  });

  it("get access token when azure cli not installed", async () => {
    if (process.platform === "linux" || process.platform === "darwin") {
      const mockCliCredentialClient = new MockAzureCliCredentialClient({
        stdout: "",
        stderr: "az: command not found"
      });

      try {
        await mockCliCredentialClient.getToken("https://service/.default");
      } catch (error) {
        assert.equal(
          error.message,
          "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
        );
      }
    } else {
      const mockCliCredentialClient = new MockAzureCliCredentialClient({
        stdout: "",
        stderr: "'az' is not recognized"
      });

      try {
        await mockCliCredentialClient.getToken("https://service/.default");
      } catch (error) {
        assert.equal(
          error.message,
          "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
        );
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    const mockCliCredentialClient = new MockAzureCliCredentialClient({
      stdout: "",
      stderr:
        "Please run 'az login' from a command prompt to authenticate before using this credential."
    });
    try {
      await mockCliCredentialClient.getToken("https://service/.default");
    } catch (error) {
      assert.equal(
        error.message,
        "Please run 'az login' from a command prompt to authenticate before using this credential."
      );
    }
  });

  it("get access token when having other access token error", async () => {
    const mockCliCredentialClient = new MockAzureCliCredentialClient({
      stdout: "",
      stderr: "mock other access token error"
    });
    try {
      await mockCliCredentialClient.getToken("https://service/.default");
    } catch (error) {
      assert.equal(error.message, "mock other access token error");
    }
  });
});

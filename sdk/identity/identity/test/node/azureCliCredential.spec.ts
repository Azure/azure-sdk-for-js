// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import {
  MockAzureCliCredentialClient,
  MockAzureCliCredentialClientOptions
} from "../mockAzureCliCredentialClient";
import { AzureCliCredential } from "../../src/credentials/azureCliCredential";

describe("AzureCliCredential", function() {
  it("get access token without error", async function() {
    var mockCliCredentialClient = new MockAzureCliCredentialClient({
      stdout: '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}',
      stderr: ""
    });
    let credential = new AzureCliCredential(
      new MockAzureCliCredentialClientOptions(mockCliCredentialClient)
    );
    let actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken.token, "token");
  });

  it("get access token when azure cli not installed", async () => {
    if (process.platform == "linux" || process.platform == "darwin") {
      var mockCliCredentialClient = new MockAzureCliCredentialClient({
        stdout: "",
        stderr: "az: command not found"
      });
      let credential = new AzureCliCredential(
        new MockAzureCliCredentialClientOptions(mockCliCredentialClient)
      );

      try {
        await credential.getToken("https://service/.default");
      } catch (error) {
        assert.equal(error.message, "Azure CLI not Installed");
      }
    } else {
      var mockCliCredentialClient = new MockAzureCliCredentialClient({
        stdout: "",
        stderr: "'az' is not recognized"
      });
      let credential = new AzureCliCredential(
        new MockAzureCliCredentialClientOptions(mockCliCredentialClient)
      );

      try {
        await credential.getToken("https://service/.default");
      } catch (error) {
        assert.equal(error.message, "Azure CLI not Installed");
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    var mockCliCredentialClient = new MockAzureCliCredentialClient({
      stdout: "",
      stderr: "Please run 'az login' to setup account"
    });
    let credential = new AzureCliCredential(
      new MockAzureCliCredentialClientOptions(mockCliCredentialClient)
    );
    try {
      await credential.getToken("https://service/.default");
    } catch (error) {
      assert.equal(error.message, "Azure user is not logged in");
    }
  });

  it("get access token when having other access token error", async () => {
    var mockCliCredentialClient = new MockAzureCliCredentialClient({
      stdout: "",
      stderr: "mock other access token error"
    });
    let credential = new AzureCliCredential(
      new MockAzureCliCredentialClientOptions(mockCliCredentialClient)
    );
    try {
      await credential.getToken("https://service/.default");
    } catch (error) {
      assert.equal(error.message, "mock other access token error");
    }
  });
});

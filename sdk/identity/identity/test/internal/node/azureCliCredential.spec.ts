// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import Sinon, { createSandbox } from "sinon";
import {
  AzureCliCredential,
  cliCredentialInternals
} from "../../../src/credentials/azureCliCredential";

describe("AzureCliCredential (internal)", function() {
  let sandbox: Sinon.SinonSandbox | undefined;
  let stdout: string = "";
  let stderr: string = "";

  beforeEach(async function() {
    sandbox = createSandbox();
    sandbox
      .stub(cliCredentialInternals, "getAzureCliAccessToken")
      .callsFake(async function(
        _resource: string
      ): Promise<{ stdout: string; stderr: string; error: Error | null }> {
        return new Promise((resolve) => {
          resolve({ stdout, stderr, error: null });
        });
      });
  });

  afterEach(async function() {
    sandbox?.restore();
  });

  it("get access token without error", async function() {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
  });

  it("get access token when azure cli not installed", async () => {
    if (process.platform === "linux" || process.platform === "darwin") {
      stdout = "";
      stderr = "az: command not found";
      const credential = new AzureCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error) {
        assert.equal(
          error.message,
          "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
        );
      }
    } else {
      stdout = "";
      stderr = "'az' is not recognized";
      const credential = new AzureCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error) {
        assert.equal(
          error.message,
          "Azure CLI could not be found.  Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
        );
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    stdout = "";
    stderr =
      "Please run 'az login' from a command prompt to authenticate before using this credential.";
    const credential = new AzureCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error) {
      assert.equal(
        error.message,
        "Please run 'az login' from a command prompt to authenticate before using this credential."
      );
    }
  });

  it("get access token when having other access token error", async () => {
    stdout = "";
    stderr = "mock other access token error";
    const credential = new AzureCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error) {
      assert.equal(error.message, "mock other access token error");
    }
  });
});

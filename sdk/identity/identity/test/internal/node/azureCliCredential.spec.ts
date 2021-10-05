// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import child_process from "child_process";
import { assert } from "chai";
import Sinon, { createSandbox } from "sinon";
import { AzureCliCredential } from "../../../src/credentials/azureCliCredential";

describe("AzureCliCredential (internal)", function() {
  let sandbox: Sinon.SinonSandbox | undefined;
  let stdout: string = "";
  let stderr: string = "";
  let azParams: string[][] = [];

  beforeEach(async function() {
    sandbox = createSandbox();
    azParams = [];
    sandbox.stub(child_process, "execFile").callsFake(
      (_file, args, _options, callback): child_process.ChildProcess => {
        azParams.push(args as string[]);
        if (callback) {
          callback(null, stdout, stderr);
        }
        // Bypassing the type check. We don't use this return value in our code.
        return {} as child_process.ChildProcess;
      }
    );
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
    assert.deepEqual(azParams, [
      ["account", "get-access-token", "--output", "json", "--resource", "https://service"]
    ]);
  });

  it("get access token with custom tenantId without error", async function() {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential({
      tenantId: "tenantId"
    });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azParams, [
      [
        "account",
        "get-access-token",
        "--output",
        "json",
        "--resource",
        "https://service",
        "--tenant",
        "tenantId"
      ]
    ]);
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

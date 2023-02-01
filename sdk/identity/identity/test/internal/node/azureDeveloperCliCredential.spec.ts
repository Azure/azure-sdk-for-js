// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Sinon, { createSandbox } from "sinon";
import { AzureDeveloperCliCredential } from "../../../src/credentials/azureDeveloperCliCredential";
import { GetTokenOptions } from "@azure/core-auth";
import { assert } from "chai";
import child_process from "child_process";

describe("AzureDeveloperCliCredential (internal)", function () {
  let sandbox: Sinon.SinonSandbox | undefined;
  let stdout: string = "";
  let stderr: string = "";
  let azdArgs: string[][] = [];
  let azdOptions: { cwd: string; shell: boolean }[] = [];

  beforeEach(async function () {
    sandbox = createSandbox();
    azdArgs = [];
    azdOptions = [];
    sandbox
      .stub(child_process, "execFile")
      .callsFake((_file, args, options, callback): child_process.ChildProcess => {
        azdArgs.push(args as string[]);
        azdOptions.push(options as { cwd: string; shell: boolean });
        if (callback) {
          callback(null, stdout, stderr);
        }
        // Bypassing the type check. We don't use this return value in our code.
        return {} as child_process.ChildProcess;
      });
  });

  afterEach(async function () {
    sandbox?.restore();
  });

  it("get access token without error", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdArgs, [
      ["auth", "token", "--output", "json", "--scope", "https://service/.default"],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azdOptions[0].cwd),
        shell: azdOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });

  it("authenticates with tenantId on getToken", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken("https://service/.default", {
      tenantId: "TENANT-ID",
    } as GetTokenOptions);
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdArgs, [
      [
        "auth",
        "token",
        "--output",
        "json",
        "--scope",
        "https://service/.default",
        "--tenant-id",
        "TENANT-ID",
      ],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azdOptions[0].cwd),
        shell: azdOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });

  it("get access token with custom tenantId without error", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const credential = new AzureDeveloperCliCredential({
      tenantId: "tenantId",
    });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdArgs, [
      [
        "auth",
        "token",
        "--output",
        "json",
        "--scope",
        "https://service/.default",
        "--tenant-id",
        "tenantId",
      ],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azdOptions[0].cwd),
        shell: azdOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });

  it("get access token when azure cli not installed", async () => {
    if (process.platform === "linux" || process.platform === "darwin") {
      stdout = "";
      stderr = "azd: command not found";
      const credential = new AzureDeveloperCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Azure Developer CLI could not be found. Please visit https://aka.ms/azure-dev for installation instructions and then, once installed, authenticate to your Azure account using 'azd login'."
        );
      }
    } else {
      stdout = "";
      stderr = "'azd' is not recognized";
      const credential = new AzureDeveloperCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Azure Developer CLI could not be found. Please visit https://aka.ms/azure-dev for installation instructions and then, once installed, authenticate to your Azure account using 'azd login'."
        );
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    stdout = "";
    stderr =
      "Please run 'azd login' from a command prompt to authenticate before using this credential.";
    const credential = new AzureDeveloperCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(
        error.message,
        "Please run 'azd login' from a command prompt to authenticate before using this credential."
      );
    }
  });

  it("get access token when having other access token error", async () => {
    stdout = "";
    stderr = "mock other access token error";
    const credential = new AzureDeveloperCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(error.message, "mock other access token error");
    }
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import child_process from "child_process";
import Sinon, { createSandbox } from "sinon";
import { GetTokenOptions } from "@azure/core-auth";
import { AzureCliCredential } from "../../../src/credentials/azureCliCredential";

describe("AzureCliCredential (internal)", function () {
  let sandbox: Sinon.SinonSandbox | undefined;
  let stdout: string = "";
  let stderr: string = "";
  let azArgs: string[][] = [];
  let azOptions: { cwd: string; shell: boolean }[] = [];

  beforeEach(async function () {
    sandbox = createSandbox();
    azArgs = [];
    azOptions = [];
    sandbox
      .stub(child_process, "execFile")
      .callsFake((_file, args, options, callback): child_process.ChildProcess => {
        azArgs.push(args as string[]);
        azOptions.push(options as { cwd: string; shell: boolean });
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
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azArgs, [
      ["account", "get-access-token", "--output", "json", "--resource", "https://service"],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
        shell: azOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });

  it("authenticates with tenantId on getToken", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default", {
      tenantId: "TENANT-ID",
    } as GetTokenOptions);
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azArgs, [
      [
        "account",
        "get-access-token",
        "--output",
        "json",
        "--resource",
        "https://service",
        "--tenant",
        "TENANT-ID",
      ],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
        shell: azOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });

  it("get access token with custom tenantId without error", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential({
      tenantId: "tenantId",
    });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azArgs, [
      [
        "account",
        "get-access-token",
        "--output",
        "json",
        "--resource",
        "https://service",
        "--tenant",
        "tenantId",
      ],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
        shell: azOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });

  it("get access token when azure cli not installed", async () => {
    if (process.platform === "linux" || process.platform === "darwin") {
      stdout = "";
      stderr = "az: command not found";
      const credential = new AzureCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
        );
      }
    } else {
      stdout = "";
      stderr = "'az' is not recognized";
      const credential = new AzureCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error: any) {
        assert.equal(
          error.message,
          "Azure CLI could not be found. Please visit https://aka.ms/azure-cli for installation instructions and then, once installed, authenticate to your Azure account using 'az login'."
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
    } catch (error: any) {
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
    } catch (error: any) {
      assert.equal(error.message, "mock other access token error");
    }
  });

  // Reported by https://github.com/Azure/azure-sdk-for-js/issues/21151
  it("get access token when having an error about an unknown platform", async () => {
    stdout = "";
    stderr = `ERROR: AADSTS50005: User tried to log in to a device from a platform (Unknown) that's currently not supported through Conditional Access policy. Supported device platforms are: iOS, Android, Mac, and Windows flavors.
Trace ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
Correlation ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
Timestamp: 2022-02-22 10:11:12Z
To re-authenticate, please run:
az login --scope https://database.windows.net//.default`;
    const credential = new AzureCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(error.message, stderr);
    }
  });

  it("get access token when having an error about a resource principal not found", async () => {
    stdout = "";
    stderr = `ERROR: AADSTS500011: The resource principal named https://test.windows.net was not found in the tenant named Default Directory. This can happen if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. You might have sent your authentication request to the wrong tenant.
Trace ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
Correlation ID: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
Timestamp: 2022-04-20 22:10:51Z
To re-authenticate, please run:
az login --scope https://test.windows.net/.default`;
    const credential = new AzureCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(error.message, stderr);
    }
  });

  it("get access token when having a warning on stderr", async () => {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "Argument '--tenant' is in preview. It may be changed/removed in a future release.";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azArgs, [
      ["account", "get-access-token", "--output", "json", "--resource", "https://service"],
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
        shell: azOptions[0].shell,
      },
      { cwd: true, shell: true }
    );
  });
});

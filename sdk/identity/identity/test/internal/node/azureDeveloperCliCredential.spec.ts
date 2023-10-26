// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Sinon, { createSandbox } from "sinon";
import { AzureDeveloperCliCredential } from "../../../src/credentials/azureDeveloperCliCredential";
import { GetTokenOptions } from "@azure/core-auth";
import { assert } from "@azure/test-utils";
import child_process from "child_process";

describe("AzureDeveloperCliCredential (internal)", function () {
  let sandbox: Sinon.SinonSandbox | undefined;
  let stdout: string = "";
  let stderr: string = "";
  let azdArgs: string[][] = [];
  let azdOptions: { cwd: string }[] = [];

  beforeEach(async function () {
    sandbox = createSandbox();
    azdArgs = [];
    azdOptions = [];
    sandbox
      .stub(child_process, "execFile")
      .callsFake((_file, args, options, callback): child_process.ChildProcess => {
        azdArgs.push(args as string[]);
        azdOptions.push(options as { cwd: string });
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
      },
      { cwd: true }
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
      },
      { cwd: true }
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
      },
      { cwd: true }
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
          "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot."
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
          "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot."
        );
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    stdout = "";
    stderr =
      "Please run 'azd auth login' from a command prompt to authenticate before using this credential. For more information, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.";
    const credential = new AzureDeveloperCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(error.message, stderr);
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

  for (const tenantId of [
    "&quot;invalid-tenant-id&quot;",
    " ",
    "12345678-1234-1234-1234-123456789012|",
    "12345678-1234-1234-1234-123456789012 |",
    "<",
    ">",
    "\0",
    "<12345678-1234-1234-1234-123456789012>",
    "12345678-1234-1234-1234-123456789012&",
    "12345678-1234-1234-1234-123456789012;",
    "12345678-1234-1234-1234-123456789012'",
  ]) {
    const tenantIdErrorMessage =
      "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.";
    const testCase =
      tenantId === " " ? "whitespace" : tenantId === "\0" ? "null character" : `"${tenantId}"`;
    it(`rejects invalid tenant id of ${testCase} in getToken`, async function () {
      const credential = new AzureDeveloperCliCredential();
      await assert.isRejected(
        credential.getToken("https://service/.default", {
          tenantId: tenantId,
        }),
        tenantIdErrorMessage
      );
    });
    it(`rejects invalid tenant id of ${testCase} in constructor`, function () {
      assert.throws(() => {
        new AzureDeveloperCliCredential({ tenantId: tenantId });
      }, tenantIdErrorMessage);
    });
  }

  for (const inputScope of ["scope |", "", "\0", "scope;", "scope,", "scope'", "scope&"]) {
    const testCase =
      inputScope === ""
        ? "empty string"
        : inputScope === "\0"
        ? "null character"
        : `"${inputScope}"`;
    it(`rejects invalid scope of ${testCase}`, async function () {
      const credential = new AzureDeveloperCliCredential();
      await assert.isRejected(
        credential.getToken(inputScope),
        "Invalid scope was specified by the user or calling client"
      );
    });
  }
});

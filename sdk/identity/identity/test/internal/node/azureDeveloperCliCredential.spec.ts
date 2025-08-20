// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureDeveloperCliCredential } from "@azure/identity";
import type { GetTokenOptions } from "@azure/core-auth";
import child_process, { type ChildProcess } from "node:child_process";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("AzureDeveloperCliCredential (internal)", function () {
  let stdout: string = "";
  let stderr: string = "";
  let azdCommands: string[] = [];
  let azdOptions: { cwd: string; timeout?: number }[] = [];

  beforeEach(async function () {
    azdCommands = [];
    azdOptions = [];
    vi.spyOn(child_process, "exec").mockImplementation(
      (command, options, callback): ChildProcess => {
        azdCommands.push(command as string);
        azdOptions.push(options as { cwd: string; timeout?: number });
        if (callback) {
          callback(null, stdout, stderr);
        }
        // Bypassing the type check. We don't use this return value in our code.
        return {} as ChildProcess;
      },
    );
  });

  afterEach(async function () {
    vi.restoreAllMocks();
  });

  it("get access token without error", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdCommands, [
      "azd auth token --output json --no-prompt --scope https://service/.default",
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azdOptions[0].cwd),
      },
      { cwd: true },
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
    assert.deepEqual(azdCommands, [
      "azd auth token --output json --no-prompt --scope https://service/.default --tenant-id TENANT-ID",
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azdOptions[0].cwd),
      },
      { cwd: true },
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
    assert.deepEqual(azdCommands, [
      "azd auth token --output json --no-prompt --scope https://service/.default --tenant-id tenantId",
    ]);
    // Used a working directory, and a shell
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azdOptions[0].cwd),
      },
      { cwd: true },
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
          "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
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
          "Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.",
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

  it("includes --no-prompt flag to prevent interactive prompts", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const credential = new AzureDeveloperCliCredential();
    await credential.getToken("https://service/.default");
    
    // Verify the command includes --no-prompt to prevent hanging on debug prompts
    const command = azdCommands[0];
    assert.ok(command.includes("--no-prompt"), "Command should include --no-prompt flag");
    assert.deepEqual(azdCommands, [
      "azd auth token --output json --no-prompt --scope https://service/.default",
    ]);
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
      await expect(
        credential.getToken("https://service/.default", {
          tenantId: tenantId,
        }),
      ).rejects.toThrow(tenantIdErrorMessage);
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
      await expect(credential.getToken(inputScope)).rejects.toThrow(
        "Invalid scope was specified by the user or calling client",
      );
    });
  }
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureDeveloperCliCredential } from "@azure/identity";
import {
  azureDeveloperCliPublicErrorMessages,
  developerCliCredentialInternals,
} from "$internal/credentials/azureDeveloperCliCredential.js";
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
        assert.equal(error.message, azureDeveloperCliPublicErrorMessages.notInstalled);
      }
    } else {
      stdout = "";
      stderr = "'azd' is not recognized";
      const credential = new AzureDeveloperCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error: any) {
        assert.equal(error.message, azureDeveloperCliPublicErrorMessages.notInstalled);
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    stdout = "";
    stderr = azureDeveloperCliPublicErrorMessages.login;
    const credential = new AzureDeveloperCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(error.message, azureDeveloperCliPublicErrorMessages.login);
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
    assert.isTrue(command.includes("--no-prompt"), "Command should include --no-prompt flag");
    assert.deepEqual(azdCommands, [
      "azd auth token --output json --no-prompt --scope https://service/.default",
    ]);
  });

  it("get access token with claims challenge", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const claimsChallenge = "fakeClaimChallenge";
    const encodedClaims = btoa(claimsChallenge);
    const scope = "https://service/.default";

    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken(scope, { claims: claimsChallenge });

    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdCommands, [
      `azd auth token --output json --no-prompt --scope ${scope} --claims ${encodedClaims}`,
    ]);
  });

  it("get access token with claims challenge and tenantId", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const claimsChallenge = "fakeClaimChallenge";
    const encodedClaims = btoa(claimsChallenge);
    const tenantId = "12345678-1234-1234-1234-123456789012";
    const scope = "https://service/.default";

    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken(scope, {
      claims: claimsChallenge,
      tenantId: tenantId,
    });

    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdCommands, [
      `azd auth token --output json --no-prompt --scope ${scope} --tenant-id ${tenantId} --claims ${encodedClaims}`,
    ]);
  });

  it("get access token with claims challenge and multiple scopes", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const claimsChallenge = "fakeClaimChallenge";
    const encodedClaims = btoa(claimsChallenge);
    const scopes = ["https://service/.default", "https://management.azure.com/.default"];

    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken(scopes, { claims: claimsChallenge });

    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdCommands, [
      `azd auth token --output json --no-prompt --scope ${scopes[0]} --scope ${scopes[1]} --claims ${encodedClaims}`,
    ]);
  });

  it("does not include claims when empty string", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const scope = "https://service/.default";

    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken(scope, { claims: "" });

    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdCommands, [`azd auth token --output json --no-prompt --scope ${scope}`]);
  });

  it("does not include claims when undefined", async function () {
    stdout = '{"token": "token","expiresOn": "1900/01/01T00:00:00Z"}';
    stderr = "";
    const scope = "https://service/.default";

    const credential = new AzureDeveloperCliCredential();
    const actualToken = await credential.getToken(scope, { claims: undefined });

    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azdCommands, [`azd auth token --output json --no-prompt --scope ${scope}`]);
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

  describe("parseAzdStderr", () => {
    it("parses valid JSON with data.message", () => {
      const json = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
        data: { message: "\nERROR: fetching token: authentication failed\n" },
      });
      const result = developerCliCredentialInternals.parseAzdStderr(json);
      assert.equal(result, "ERROR: fetching token: authentication failed");
    });

    it("trims whitespace from data.message", () => {
      const json = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
        data: { message: "  \n  ERROR: test error  \n  " },
      });
      const result = developerCliCredentialInternals.parseAzdStderr(json);
      assert.equal(result, "ERROR: test error");
    });

    it("returns raw stderr when JSON parsing fails", () => {
      const invalidJson = "not valid json";
      const result = developerCliCredentialInternals.parseAzdStderr(invalidJson);
      assert.equal(result, "not valid json");
    });

    it("returns raw stderr when data.message is missing", () => {
      const json = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
        data: {},
      });
      const result = developerCliCredentialInternals.parseAzdStderr(json);
      assert.equal(result, json);
    });

    it("returns raw stderr when data.message is empty", () => {
      const json = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
        data: { message: "" },
      });
      const result = developerCliCredentialInternals.parseAzdStderr(json);
      assert.equal(result, json);
    });

    it("returns raw stderr when data.message is only whitespace", () => {
      const json = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
        data: { message: "   \n  \n  " },
      });
      const result = developerCliCredentialInternals.parseAzdStderr(json);
      assert.equal(result, json);
    });

    it("returns raw stderr when data is missing", () => {
      const json = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
      });
      const result = developerCliCredentialInternals.parseAzdStderr(json);
      assert.equal(result, json);
    });
  });

  describe("error message parsing integration", () => {
    it("parses JSON error message from stderr", async () => {
      stdout = "";
      stderr = JSON.stringify({
        type: "consoleMessage",
        timestamp: "2024-01-01T00:00:00Z",
        data: { message: "\nERROR: fetching token: authentication failed\n" },
      });
      const credential = new AzureDeveloperCliCredential();
      try {
        await credential.getToken("https://service/.default");
        assert.fail("Expected error to be thrown");
      } catch (error: any) {
        assert.equal(error.message, "ERROR: fetching token: authentication failed");
      }
    });

    it("uses raw stderr when JSON parsing fails", async () => {
      stdout = "";
      stderr = "plain text error message";
      const credential = new AzureDeveloperCliCredential();
      try {
        await credential.getToken("https://service/.default");
        assert.fail("Expected error to be thrown");
      } catch (error: any) {
        assert.equal(error.message, "plain text error message");
      }
    });
  });
});

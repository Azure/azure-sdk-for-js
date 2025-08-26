// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureCliCredential } from "@azure/identity";
import { azureCliPublicErrorMessages } from "$internal/credentials/azureCliCredential.js";
import type { GetTokenOptions } from "@azure/core-auth";
import child_process from "node:child_process";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("AzureCliCredential (internal)", function () {
  let stdout: string = "";
  let stderr: string = "";
  let azCommands: string[] = [];
  let azOptions: { cwd: string; timeout?: number }[] = [];

  beforeEach(async function () {
    azCommands = [];
    azOptions = [];
    vi.spyOn(child_process, "exec").mockImplementation(
      (command, options, callback): child_process.ChildProcess => {
        azCommands.push(command as string);
        azOptions.push(options as { cwd: string; timeout?: number });
        if (callback) {
          callback(null, stdout, stderr);
        }
        // Bypassing the type check. We don't use this return value in our code.
        return {} as child_process.ChildProcess;
      },
    );
  });

  afterEach(async function () {
    vi.restoreAllMocks();
  });

  it("get access token without error", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service",
    ]);
    // Used a working directory
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
      },
      { cwd: true },
    );
  });

  it("authenticates with tenantId on getToken", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default", {
      tenantId: "12345678-1234-1234-1234-123456789012",
    } as GetTokenOptions);
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service --tenant 12345678-1234-1234-1234-123456789012",
    ]);
    // Used a working directory
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
      },
      { cwd: true },
    );
  });

  it("get access token with custom tenantId without error", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential({
      tenantId: "12345678-1234-1234-1234-123456789012",
    });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service --tenant 12345678-1234-1234-1234-123456789012",
    ]);
    // Used a working directory
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
      },
      { cwd: true },
    );
  });

  it("get access token with custom subscription without error", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential({
      subscription: "12345678-1234-1234-1234-123456789012",
    });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      'az account get-access-token --output json --resource https://service --subscription "12345678-1234-1234-1234-123456789012"',
    ]);
    // Used a working directory
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
      },
      { cwd: true },
    );
  });

  it("get access token with custom subscription with special character without error", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential({
      subscription: "Example of a subscription_string",
    });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      'az account get-access-token --output json --resource https://service --subscription "Example of a subscription_string"',
    ]);
    // Used a working directory
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
      },
      { cwd: true },
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
        assert.equal(error.message, azureCliPublicErrorMessages.notInstalled);
      }
    } else {
      stdout = "";
      stderr = "'az' is not recognized";
      const credential = new AzureCliCredential();

      try {
        await credential.getToken("https://service/.default");
      } catch (error: any) {
        assert.equal(error.message, azureCliPublicErrorMessages.notInstalled);
      }
    }
  });

  it("get access token when azure cli not login in", async () => {
    stdout = "";
    stderr = azureCliPublicErrorMessages.login;
    const credential = new AzureCliCredential();
    try {
      await credential.getToken("https://service/.default");
    } catch (error: any) {
      assert.equal(error.message, azureCliPublicErrorMessages.login);
    }
  });

  it("throws an expected error when claims challenge is provided", async function () {
    const credential = new AzureCliCredential();
    const claimsChallenge = "fakeClaimChallenge";
    const scope = "https://service/.default";

    let error: Error | null = null;
    try {
      await credential.getToken(scope, { claims: claimsChallenge });
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `${azureCliPublicErrorMessages.claim} az login --claims-challenge ${claimsChallenge} --scope ${scope}`,
    );
  });

  it("throws an expected error when claims challenge is provided with tenant", async function () {
    const credential = new AzureCliCredential();
    const claimsChallenge = "fakeClaimChallenge";
    const tenantId = "12345678-1234-1234-1234-123456789012";
    const scope = "https://service/.default";

    let error: Error | null = null;
    try {
      await credential.getToken(scope, {
        claims: claimsChallenge,
        tenantId: tenantId,
      });
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `${azureCliPublicErrorMessages.claim} az login --claims-challenge ${claimsChallenge} --scope ${scope} --tenant ${tenantId}`,
    );
  });

  it("does not throw error when claims is empty string", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const scope = "https://service/.default";

    const credential = new AzureCliCredential();

    // Should not throw an error for empty claims
    const actualToken = await credential.getToken(scope, { claims: "" });
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service",
    ]);
  });

  it("does not throw error when claims is undefined", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const scope = "https://service/.default";
    const credential = new AzureCliCredential();

    // Should not throw an error for undefined claims
    const actualToken = await credential.getToken(scope, { claims: undefined });
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service",
    ]);
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
    stderr = `CredentialUnavailableError: ERROR: AADSTS50005: User tried to log in to a device from a platform (Unknown) that's currently not supported through Conditional Access policy. Supported device platforms are: iOS, Android, Mac, and Windows flavors.
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
    stderr = `CredentialUnavailableError: ERROR: AADSTS500011: The resource principal named https://test.windows.net was not found in the tenant named Default Directory. This can happen if the application has not been installed by the administrator of the tenant or consented to by any user in the tenant. You might have sent your authentication request to the wrong tenant.
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
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service",
    ]);
    // Used a working directory
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
      },
      { cwd: true },
    );
  });

  it("gets the timeout passed correctly", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential({ processTimeoutInMs: 50 });
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
    assert.deepEqual(azCommands, [
      "az account get-access-token --output json --resource https://service",
    ]);
    // Used a working directory, and timeout
    assert.deepEqual(
      {
        cwd: [process.env.SystemRoot, "/bin"].includes(azOptions[0].cwd),
        timeout: azOptions[0].timeout,
      },
      { cwd: true, timeout: 50 },
    );
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
      const credential = new AzureCliCredential();
      await expect(
        credential.getToken("https://service/.default", {
          tenantId: tenantId,
        }),
      ).rejects.toThrow(tenantIdErrorMessage);
    });

    it(`rejects invalid tenant id of ${testCase} in constructor`, function () {
      assert.throws(() => {
        new AzureCliCredential({ tenantId: tenantId });
      }, tenantIdErrorMessage);
    });
  }

  for (const subscription of [
    "&quot;invalid-subscription-string&quot;",
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
    const subscriptionErrorMessage =
      `Subscription '${subscription}' contains invalid characters. If this is the name of a subscription, use ` +
      `its ID instead. You can locate your subscription by following the instructions listed here: ` +
      `https://learn.microsoft.com/azure/azure-portal/get-subscription-tenant-id`;
    const testCase = subscription === "\0" ? "null character" : `"${subscription}"`;
    it(`rejects invalid subscription string of ${testCase} in constructor`, function () {
      assert.throws(() => {
        new AzureCliCredential({ subscription });
      }, subscriptionErrorMessage);
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
      const credential = new AzureCliCredential();
      await expect(credential.getToken(inputScope)).rejects.toThrow(
        "Invalid scope was specified by the user or calling client",
      );
    });
  }

  it("validates correct scope", async function () {
    stdout = '{"accessToken": "token","expiresOn": "01/01/1900 00:00:00 +00:00"}';
    stderr = "";
    const credential = new AzureCliCredential();
    const actualToken = await credential.getToken("https://service/.default");
    assert.equal(actualToken!.token, "token");
  });

  describe("expiresOnTimestamp", function () {
    const testData = {
      expires_on: {
        inputValue: 1705963934,
        expected: 1705963934000,
      },
      expiresOn: {
        inputValue: "1999-01-22 14:52:14.000000",
        expected: new Date("1999-01-22 14:52:14.000000").getTime(),
      },
    };

    it("uses expires_on when provided", async function () {
      stdout = `
        {
          "accessToken": "token",
          "expires_on": ${testData.expires_on.inputValue}
        }`;
      stderr = "";
      const credential = new AzureCliCredential();
      const actualToken = await credential.getToken("https://service/.default");
      assert.equal(actualToken.expiresOnTimestamp, testData.expires_on.expected);
    });

    it("uses expiresOn when expires_on is empty", async function () {
      stdout = `
        {
          "accessToken": "token",
          "expiresOn": "${testData.expiresOn.inputValue}"
        }`;
      stderr = "";
      const credential = new AzureCliCredential();
      const actualToken = await credential.getToken("https://service/.default");
      assert.equal(actualToken.expiresOnTimestamp, testData.expiresOn.expected);
    });

    it("prefers expires_on when both expires_on and expiresOn are provided", async function () {
      stdout = `
        {
          "accessToken": "token",
          "expiresOn": "${testData.expiresOn.inputValue}",
          "expires_on": ${testData.expires_on.inputValue}
        }`;
      stderr = "";
      const credential = new AzureCliCredential();
      const actualToken = await credential.getToken("https://service/.default");
      assert.equal(actualToken.expiresOnTimestamp, testData.expires_on.expected);
    });

    it("uses expiresOn when expires_on is invalid", async function () {
      stdout = `
        {
          "accessToken": "token",
          "expiresOn": "${testData.expiresOn.inputValue}",
          "expires_on": "not-a-number"
        }`;
      stderr = "";
      const credential = new AzureCliCredential();
      const actualToken = await credential.getToken("https://service/.default");
      assert.equal(actualToken.expiresOnTimestamp, testData.expiresOn.expected);
    });

    it("throws when both are invalid", async function () {
      stdout = `
        {
          "accessToken": "token",
          "expiresOn": "not-a-date",
          "expires_on": "not-a-number"
        }`;
      stderr = "";
      const credential = new AzureCliCredential();
      await expect(credential.getToken("https://service/.default")).rejects.toThrow(
        /Expected "expiresOn" to be a RFC3339 date string. Got: "not-a-date"$/,
      );
    });
  });
});

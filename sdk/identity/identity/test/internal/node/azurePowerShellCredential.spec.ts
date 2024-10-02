// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import {
  formatCommand,
  parseJsonToken,
  powerShellErrors,
  powerShellPublicErrorMessages,
} from "../../../src/credentials/azurePowerShellCredential";
import { AzurePowerShellCredential } from "../../../src";
import { GetTokenOptions } from "@azure/core-auth";
import Sinon from "sinon";
import { assert } from "@azure-tools/test-utils";
import { commandStack } from "../../../src/credentials/azurePowerShellCredential";
import { processUtils } from "../../../src/util/processUtils";

function resetCommandStack(): void {
  commandStack[0] = formatCommand("pwsh");
  if (process.platform === "win32") {
    commandStack[1] = formatCommand("powershell");
  } else {
    delete commandStack[1];
  }
}

describe("AzurePowerShellCredential", function () {
  const scope = "https://vault.azure.net/.default";
  const tenantIdErrorMessage =
    "Invalid tenant id provided. You can locate your tenant id by following the instructions listed here: https://learn.microsoft.com/partner-center/find-ids-and-domain-names.";
  let sandbox: Sinon.SinonSandbox;
  beforeEach(() => {
    sandbox = Sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
    resetCommandStack();
  });

  it("command stack is configured correctly by platform", function () {
    assert.deepStrictEqual(
      commandStack,
      process.platform === "win32" ? ["pwsh.exe", "powershell.exe"] : ["pwsh"],
    );
  });

  it("throws an expected error if the user hasn't logged in through PowerShell", async function () {
    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).throws(new Error(`Get-AzAccessToken: ${powerShellErrors.login}`));

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(error?.message, powerShellPublicErrorMessages.login);
  });

  it("throws an expected error if the user hasn't installed the Az.Account module", async function () {
    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).throws(new Error(powerShellErrors.installed));

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(error?.message, powerShellPublicErrorMessages.installed);
  });

  it("throws an expected error if PowerShell isn't installed", async function () {
    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).throws(new Error());

    // Additionally stub the second call on windows, for the fallback to Windows PowerShell
    if (process.platform === "win32") {
      stub.onCall(1).throws(new Error());
    }

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `Error: Unable to execute PowerShell. Ensure that it is installed in your system. To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`,
    );
  });

  it("throws an expected error if PowerShell returns something that isn't valid JSON", async function () {
    const stub = sandbox.stub(processUtils, "execFile");
    let idx = 0;
    stub.onCall(idx++).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(idx++).returns(Promise.resolve("Not valid JSON"));

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e: any) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `Error: No access token found in the output. Received output: Not valid JSON. To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`,
    );
  });

  if (process.platform === "win32") {
    it("throws an expected error if PowerShell returns something that isn't valid JSON (Windows PowerShell fallback)", async function () {
      const stub = sandbox.stub(processUtils, "execFile");
      let idx = 0;
      stub.onCall(idx++).throws(new Error());
      stub.onCall(idx++).returns(Promise.resolve("")); // The first call checks that the command is available.
      stub.onCall(idx++).returns(Promise.resolve("Not valid JSON"));

      const credential = new AzurePowerShellCredential();

      let error: Error | null = null;
      try {
        await credential.getToken(scope);
      } catch (e: any) {
        error = e;
      }

      assert.ok(error);
      assert.equal(error?.name, "CredentialUnavailableError");
      assert.equal(
        error?.message,
        `Error: No access token found in the output. Received output: Not valid JSON. To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.`,
      );
    });
  }

  it("authenticates", async function () {
    const tokenResponse = {
      Token: "token",
      ExpiresOn: "2021-04-21T20:52:16+00:00",
      TenantId: "tenant-id",
      Type: "Bearer",
    };

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).returns(Promise.resolve(JSON.stringify(tokenResponse)));

    const credential = new AzurePowerShellCredential();

    const token = await credential.getToken(scope);
    assert.equal(token?.token, tokenResponse.Token);
    assert.equal(token?.expiresOnTimestamp!, new Date(tokenResponse.ExpiresOn).getTime());
  });

  it("authenticates with tenantId on getToken", async function () {
    const tokenResponse = {
      Token: "token",
      ExpiresOn: "2021-04-21T20:52:16+00:00",
      TenantId: "tenant-id",
      Type: "Bearer",
    };

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).returns(Promise.resolve(JSON.stringify(tokenResponse)));

    const credential = new AzurePowerShellCredential();

    const token = await credential.getToken(scope, { tenantId: "TENANT-ID" } as GetTokenOptions);
    assert.equal(token?.token, tokenResponse.Token);
    assert.equal(token?.expiresOnTimestamp!, new Date(tokenResponse.ExpiresOn).getTime());
  });

  /**
   * I'm leaving this test only to make it easier to do manual tests.
   */
  it.skip("authenticates without mocks", async function () {
    const credential = new AzurePowerShellCredential();
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp!);
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
    "12345678-1234-1234-1234-123456789012,",
  ]) {
    const testCase =
      tenantId === " " ? "whitespace" : tenantId === "\0" ? "null character" : `"${tenantId}"`;
    it(`rejects invalid tenant id of ${testCase} in getToken`, async function () {
      const credential = new AzurePowerShellCredential();
      await assert.isRejected(
        credential.getToken("https://service/.default", {
          tenantId: tenantId,
        }),
        tenantIdErrorMessage,
      );
    });
    it(`rejects invalid tenant id of ${testCase} in constructor`, function () {
      assert.throws(() => {
        new AzurePowerShellCredential({ tenantId: tenantId });
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
      const credential = new AzurePowerShellCredential();
      await assert.isRejected(
        credential.getToken(inputScope),
        "Invalid scope was specified by the user or calling client",
      );
    });
  }

  it("parses JSON correctly from an output of multiple JSON objects from AzurePowerShell", async function () {
    const tokenResponse = {
      Token: "token",
      ExpiresOn: "2024-07-19T05:35:37+00:00",
      TenantId: "***",
      UserId: "***",
      Type: "Bearer",
    };
    const completeResponse = `Note : Go to https://aka.ms/azps-changewarnings for steps to suppress this breaking change warning, and other information on breaking changes in Azure PowerShell.
{"afasf"}
{
"fsdf": 
{
  "Token": "token",
  "ExpiresOn": "2024-07-19T05:35:37+00:00",
  "TenantId": "***",
  "UserId": "***",
  "Type": "Bearer"
},
  }`;
    const token = await parseJsonToken(completeResponse);
    assert.equal(token?.Token, tokenResponse.Token);
  });

  it("parses JSON correctly from an output of errors from AzurePowerShell", async function () {
    const tokenResponse = {
      Token: "token",
      ExpiresOn: "2024-07-19T05:35:37+00:00",
      TenantId: "***",
      UserId: "***",
      Type: "Bearer",
    };
    const completeResponse = `AggregateAuthenticationError: ChainedTokenCredential authentication failed.
CredentialUnavailableError: Error: Unable to parse the output of PowerShell. Received output: WARNING: Upcoming breaking changes in the cmdlet 'Get-AzAccessToken' :
The Token property of the output type will be changed from String to SecureString. Add the [-AsSecureString] switch to avoid the impact of this upcoming breaking change.
- The change is expected to take effect in Az version : '13.0.0'
- The change is expected to take effect in Az.Accounts version : '4.0.0'
Note : Go to https://aka.ms/azps-changewarnings for steps to suppress this breaking change warning, and other information on breaking changes in Azure PowerShell.
{
  "Token": "token",
  "ExpiresOn": "2024-07-19T05:35:37+00:00",
  "TenantId": "***",
  "UserId": "***",
  "Type": "Bearer"
}

. To troubleshoot, visit https://aka.ms/azsdk/js/identity/powershellcredential/troubleshoot.
CredentialUnavailableError: Please run 'az login' from a command prompt to authenticate before using this credential.
CredentialUnavailableError: Azure Developer CLI couldn't be found. To mitigate this issue, see the troubleshooting guidelines at https://aka.ms/azsdk/js/identity/azdevclicredential/troubleshoot.
CredentialUnavailableError: EnvironmentCredential is unavailable. No underlying credential could be used. To troubleshoot, visit https://aka.ms/azsdk/js/identity/environmentcredential/troubleshoot.
      at /Users/runner/work/1/s/common/temp/node_modules/.pnpm/@azure+identity@4.4.0/node_modules/@azure/identity/src/credentials/chainedTokenCredential.ts:85:23
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at Object.withSpan (/Users/runner/work/1/s/common/temp/node_modules/.pnpm/@azure+core-tracing@1.1.2/node_modules/@azure/core-tracing/src/tracingClient.ts:70:22)
      at ChainedTokenCredential.getToken (/Users/runner/work/1/s/common/temp/node_modules/.pnpm/@azure+identity@4.4.0/node_modules/@azure/identity/src/credentials/chainedTokenCredential.ts:51:23)
      at tryGetAccessToken (/Users/runner/work/1/s/sdk/core/core-rest-pipeline/src/util/tokenCycler.ts:71:26)
      at beginRefresh (/Users/runner/work/1/s/sdk/core/core-rest-pipeline/src/util/tokenCycler.ts:82:35)
      at Object.defaultAuthorizeRequest [as authorizeRequest] (/Users/runner/work/1/s/sdk/core/core-rest-pipeline/src/policies/bearerTokenAuthenticationPolicy.ts:114:23)
      at Object.sendRequest (/Users/runner/work/1/s/sdk/core/core-rest-pipeline/src/policies/bearerTokenAuthenticationPolicy.ts:179:7)
      at sendRequest (/Users/runner/work/1/s/common/temp/node_modules/.pnpm/@azure-rest+core-client@1.4.0/node_modules/@azure-rest/core-client/src/sendRequest.ts:40:20)
     at Context.<anonymous> (/Users/runner/work/1/s/sdk/maps/maps-geolocation-rest/test/public/MapsGeolocation.spec.ts:2:35)`;
    const token = await parseJsonToken(completeResponse);
    assert.equal(token?.Token, tokenResponse.Token);
  });
});

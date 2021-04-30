// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";
import Sinon from "sinon";
import { AzurePowerShellCredential } from "../../../src";
import {
  formatCommand,
  powerShellErrors,
  powerShellPublicErrorMessages
} from "../../../src/credentials/azurePowerShellCredential";
import { processUtils } from "../../../src/util/processUtils";

describe.skip("AzurePowerShellCredential", function() {
  const scope = "https://vault.azure.net/.default";

  it("throws an expected error if the user hasn't logged in through PowerShell", async function() {
    const sandbox = Sinon.createSandbox();

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).throws(new Error(`Get-AzAccessToken: ${powerShellErrors.login}`));

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(error?.message, powerShellPublicErrorMessages.login);

    sandbox.restore();
  });

  it("throws an expected error if the user hasn't installed the Az.Account module", async function() {
    const sandbox = Sinon.createSandbox();

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).throws(new Error(powerShellErrors.installed));

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(error?.message, powerShellPublicErrorMessages.installed);

    sandbox.restore();
  });

  it("throws an expected error if PowerShell isn't installed", async function() {
    const sandbox = Sinon.createSandbox();
    const pwshCommand = formatCommand("pwsh");

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).throws(new Error());

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `Error: Unable to execute "${pwshCommand}". Ensure that it is installed in your system.`
    );

    sandbox.restore();
  });

  it("throws an expected error if PowerShell isn't installed (legacy mode)", async function() {
    const sandbox = Sinon.createSandbox();
    const pwshCommand = formatCommand("powershell");

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).throws(new Error());

    const credential = new AzurePowerShellCredential({ useLegacyPowerShell: true });

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `Error: Unable to execute "${pwshCommand}". Ensure that it is installed in your system.`
    );

    sandbox.restore();
  });

  it("throws an expected error if PowerShell returns something that isn't valid JSON", async function() {
    const sandbox = Sinon.createSandbox();

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).returns(Promise.resolve("This one we ignore."));
    stub.onCall(2).returns(Promise.resolve("Not valid JSON"));

    const credential = new AzurePowerShellCredential();

    let error: Error | null = null;
    try {
      await credential.getToken(scope);
    } catch (e) {
      error = e;
    }

    assert.ok(error);
    assert.equal(error?.name, "CredentialUnavailableError");
    assert.equal(
      error?.message,
      `Error: Unable to parse the output of PowerShell. Received output: Not valid JSON`
    );

    sandbox.restore();
  });

  it("authenticates", async function() {
    const sandbox = Sinon.createSandbox();

    const tokenResponse = {
      Token: "token",
      ExpiresOn: "2021-04-21T20:52:16+00:00",
      TenantId: "tenant-id",
      Type: "Bearer"
    };

    const stub = sandbox.stub(processUtils, "execFile");
    stub.onCall(0).returns(Promise.resolve("")); // The first call checks that the command is available.
    stub.onCall(1).returns(Promise.resolve("This one we ignore."));
    stub.onCall(2).returns(Promise.resolve(JSON.stringify(tokenResponse)));

    const credential = new AzurePowerShellCredential();

    const token = await credential.getToken(scope);
    assert.equal(token?.token, tokenResponse.Token);
    assert.equal(token?.expiresOnTimestamp!, new Date(tokenResponse.ExpiresOn).getTime());

    sandbox.restore();
  });

  /**
   * I'm leaving this test only to make it easier to do manual tests.
   */
  it.skip("authenticates without mocks", async function() {
    const credential = new AzurePowerShellCredential();
    const token = await credential.getToken(scope);
    assert.ok(token?.token);
    assert.ok(token?.expiresOnTimestamp!);
  });
});

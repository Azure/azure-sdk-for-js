// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import assert from "assert";
import Sinon from "sinon";
import * as childProcess from "child_process";
import { processUtils } from "../../../src/util/processUtils";
import { AzurePowerShellCredential } from "../../../src";
import {
  powerShellErrors,
  powerShellPublicErrorMessages
} from "../../../src/credentials/azurePowerShellCredential";

describe("AzurePowerShellCredential", function() {
  const scope = "https://vault.azure.net/.default";

  it("throws an expected error if the user hasn't logged in through PowerShell", async function() {
    const sandbox = Sinon.createSandbox();

    const stub = sandbox.stub(childProcess, "execSync");
    stub.throws(Buffer.from(`Get-AzAccessToken: ${powerShellErrors.login}`));

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

    const stub = sandbox.stub(childProcess, "execSync");
    stub.throws(Buffer.from(powerShellErrors.installed));

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
    const pwshCommand = "pwsh";

    const stub = sandbox.stub(processUtils, "exists");
    stub.throws();

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
    const pwshCommand = "powershell";

    const stub = sandbox.stub(processUtils, "exists");
    stub.throws();

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

  it("authenticates", async function() {
    const sandbox = Sinon.createSandbox();

    const tokenResponse = {
      Token: "token",
      ExpiresOn: "2021-04-21T20:52:16+00:00",
      TenantId: "tenant-id",
      Type: "Bearer"
    };

    const stub = sandbox.stub(childProcess, "execSync");
    stub.returns(Buffer.from(JSON.stringify(tokenResponse)));

    const credential = new AzurePowerShellCredential();

    const token = await credential.getToken(scope);
    assert.equal(token?.token, tokenResponse.Token);
    assert.equal(token?.expiresOnTimestamp!, new Date(tokenResponse.ExpiresOn).getTime());

    sandbox.restore();
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedIdentityCredential } from "@azure/identity";
import type { AccessToken, TokenCredential } from "@azure/core-auth";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import { getAuthenticationCredential } from "../../../../src/metrics/quickpulse/credentialUtils.js";
import { LiveMetrics } from "../../../../src/metrics/quickpulse/liveMetrics.js";
import { InternalConfig } from "../../../../src/shared/index.js";

const AUTH_STRING_ENV_VAR = "APPLICATIONINSIGHTS_AUTHENTICATION_STRING";

describe("#getAuthenticationCredential", () => {
  let originalAuthString: string | undefined;

  beforeEach(() => {
    originalAuthString = process.env[AUTH_STRING_ENV_VAR];
    delete process.env[AUTH_STRING_ENV_VAR];
  });

  afterEach(() => {
    if (originalAuthString === undefined) {
      delete process.env[AUTH_STRING_ENV_VAR];
    } else {
      process.env[AUTH_STRING_ENV_VAR] = originalAuthString;
    }
  });

  it("resolves a ManagedIdentityCredential with clientId from the auth-string env var", () => {
    process.env[AUTH_STRING_ENV_VAR] = "Authorization=AAD;ClientId=test-client-id";
    const credential = getAuthenticationCredential();
    assert.instanceOf(credential, ManagedIdentityCredential);
    assert.strictEqual((credential as unknown as { clientId?: string }).clientId, "test-client-id");
  });

  it("resolves a ManagedIdentityCredential without clientId when only AAD is specified", () => {
    process.env[AUTH_STRING_ENV_VAR] = "Authorization=AAD";
    const credential = getAuthenticationCredential();
    assert.instanceOf(credential, ManagedIdentityCredential);
    assert.isUndefined((credential as unknown as { clientId?: string }).clientId);
  });

  it("gives an explicit credential precedence over the env var", () => {
    process.env[AUTH_STRING_ENV_VAR] = "Authorization=AAD;ClientId=test-client-id";
    const explicit: TokenCredential = {
      getToken: (): Promise<AccessToken> =>
        Promise.resolve({ token: "fake", expiresOnTimestamp: 9999999999 }),
    };
    const credential = getAuthenticationCredential(explicit);
    assert.strictEqual(credential, explicit);
  });

  it("returns undefined without an explicit credential or env var", () => {
    const credential = getAuthenticationCredential();
    assert.isUndefined(credential);
  });

  it("returns undefined when the env var does not request AAD authorization", () => {
    process.env[AUTH_STRING_ENV_VAR] = "Authorization=Basic;ClientId=test-client-id";
    const credential = getAuthenticationCredential();
    assert.isUndefined(credential);
  });

  it("returns undefined when the env var is malformed", () => {
    process.env[AUTH_STRING_ENV_VAR] = "not-a-valid-auth-string";
    const credential = getAuthenticationCredential();
    assert.isUndefined(credential);
  });
});

describe("#LiveMetrics credential resolution", () => {
  let originalAuthString: string | undefined;
  let autoCollect: LiveMetrics | undefined;

  beforeEach(() => {
    originalAuthString = process.env[AUTH_STRING_ENV_VAR];
    delete process.env[AUTH_STRING_ENV_VAR];
  });

  afterEach(() => {
    void autoCollect?.shutdown();
    autoCollect = undefined;
    if (originalAuthString === undefined) {
      delete process.env[AUTH_STRING_ENV_VAR];
    } else {
      process.env[AUTH_STRING_ENV_VAR] = originalAuthString;
    }
  });

  it("wires the auth-string credential into the ping sender and exporter", () => {
    process.env[AUTH_STRING_ENV_VAR] = "Authorization=AAD;ClientId=test-client-id";
    const config = new InternalConfig();
    config.azureMonitorExporterOptions.connectionString =
      "InstrumentationKey=1aa11111-bbbb-1ccc-8ddd-eeeeffff3333;";
    autoCollect = new LiveMetrics(config);

    const pingCredential = autoCollect["pingSender"]["credential"];
    const exporterCredential = autoCollect["quickpulseExporter"].getSender()["credential"];
    assert.instanceOf(pingCredential, ManagedIdentityCredential);
    assert.instanceOf(exporterCredential, ManagedIdentityCredential);
    assert.strictEqual(
      (pingCredential as unknown as { clientId?: string }).clientId,
      "test-client-id",
    );
  });
});

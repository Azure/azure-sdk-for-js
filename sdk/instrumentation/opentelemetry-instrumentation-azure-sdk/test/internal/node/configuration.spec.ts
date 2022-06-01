// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KnownEnvironmentKey, envVarToBoolean, environmentCache } from "../../../src/configuration";

import { assert } from "chai";

describe("#envVarToBoolean", () => {
  const key = "FOO" as KnownEnvironmentKey;

  it("is false when env var is blank or missing", () => {
    environmentCache.set(key, "");
    assert.isFalse(envVarToBoolean(key));
    environmentCache.delete(key);
    assert.isFalse(envVarToBoolean(key));
  });

  it("is false when env var is 'false'", () => {
    environmentCache.set(key, "false");
    assert.isFalse(envVarToBoolean(key));
    environmentCache.set(key, "False");
    assert.isFalse(envVarToBoolean(key));
    environmentCache.set(key, "FALSE");
    assert.isFalse(envVarToBoolean(key));
  });

  it("is false when env var is 0", () => {
    environmentCache.set(key, "0");
    assert.isFalse(envVarToBoolean(key));
  });

  it("is true otherwise", () => {
    environmentCache.set(key, "true");
    assert.isTrue(envVarToBoolean(key));
    environmentCache.set(key, "1");
    assert.isTrue(envVarToBoolean(key));
  });

  it("reads from the environment on first access", () => {
    const keyName = `caches-on-first-access-${Date.now()}`;
    process.env[keyName] = "true";
    assert.isTrue(envVarToBoolean(keyName as KnownEnvironmentKey));
    delete process.env[keyName];
  });

  it("supports lowercase and uppercase search", () => {
    const keyName = `is-case-insensitive-${Date.now()}`;
    process.env[keyName] = "true";
    assert.isTrue(envVarToBoolean(keyName.toUpperCase() as KnownEnvironmentKey));
  });
});

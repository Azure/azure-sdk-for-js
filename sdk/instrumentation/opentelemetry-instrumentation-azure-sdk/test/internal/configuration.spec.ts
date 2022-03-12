// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KnownEnvironmentKey, envVarToBoolean, environment } from "../../src/configuration";

import { assert } from "chai";

describe("#envVarToBoolean", () => {
  const key = "FOO" as KnownEnvironmentKey;

  it("is false when env var is blank or missing", () => {
    environment.set(key, "");
    assert.isFalse(envVarToBoolean(key));
    environment.delete(key);
    assert.isFalse(envVarToBoolean(key));
  });

  it("is false when env var is 'false'", () => {
    environment.set(key, "false");
    assert.isFalse(envVarToBoolean(key));
    environment.set(key, "False");
    assert.isFalse(envVarToBoolean(key));
    environment.set(key, "FALSE");
    assert.isFalse(envVarToBoolean(key));
  });

  it("is false when env var is 0", () => {
    environment.set(key, "0");
    assert.isFalse(envVarToBoolean(key));
  });

  it("is true otherwise", () => {
    environment.set(key, "true");
    assert.isTrue(envVarToBoolean(key));
    environment.set(key, "1");
    assert.isTrue(envVarToBoolean(key));
  });
});

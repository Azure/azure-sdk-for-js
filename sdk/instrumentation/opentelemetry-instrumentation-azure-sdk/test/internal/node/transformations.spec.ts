// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { environmentVariableToBoolean } from "../../../src/transformations";

describe("#environmentVariableToBoolean", () => {
  afterEach(() => {
    delete process.env.FOO;
  });

  it("is false when env var is blank or missing", () => {
    process.env.FOO = "";
    assert.isFalse(environmentVariableToBoolean("FOO"));
    delete process.env.FOO;
    assert.isFalse(environmentVariableToBoolean("FOO"));
  });

  it("is false when env var is 'false'", () => {
    process.env.FOO = "false";
    assert.isFalse(environmentVariableToBoolean("FOO"));
    process.env.FOO = "False";
    assert.isFalse(environmentVariableToBoolean("FOO"));
    process.env.FOO = "FALSE";
    assert.isFalse(environmentVariableToBoolean("FOO"));
  });

  it("is false when env var is 0", () => {
    process.env.FOO = "0";
    assert.isFalse(environmentVariableToBoolean("FOO"));
  });

  it("is true otherwise", () => {
    process.env.FOO = "true";
    assert.isTrue(environmentVariableToBoolean("FOO"));
    process.env.FOO = "1";
    assert.isTrue(environmentVariableToBoolean("FOO"));
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  isBrowser,
  isBun,
  isDeno,
  isNodeLike,
  isNodeRuntime,
  isReactNative,
  isWebWorker,
} from "../../../src/util/internal.js";
import { describe, it, assert } from "vitest";

describe("checkEnvironment (react-native)", function () {
  it("isBrowser should return false", function () {
    assert.isFalse(isBrowser);
  });

  it("isBun should return false", function () {
    assert.isFalse(isBun);
  });

  it("isDeno should return false", function () {
    assert.isFalse(isDeno);
  });

  it("isNodeRuntime should return false", function () {
    assert.isFalse(isNodeRuntime);
  });

  it("isNodeLike should return false", function () {
    assert.isFalse(isNodeLike);
  });

  it("isReactNative should return true", function () {
    assert.isTrue(isReactNative);
  });

  it("isWebWorker should return false", function () {
    assert.isFalse(isWebWorker);
  });
});

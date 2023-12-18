// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { isBrowser, isBun, isDeno, isNode, isReactNative, isWebWorker } from "../../src/index.js";

describe("checkEnvironment (browser)", function () {
  describe("isBun (browser)", function () {
    it("should return false", async function () {
      assert.isFalse(isBun);
    });
  });

  describe("isBrowser (browser)", function () {
    it("should return true", async function () {
      assert.isTrue(isBrowser);
    });
  });

  describe("isDeno (browser)", function () {
    it("should return false", async function () {
      assert.isFalse(isDeno);
    });
  });

  describe("isNode (browser)", function () {
    it("should return true", async function () {
      assert.isFalse(isNode);
    });
  });

  describe("isReactNative (browser)", function () {
    it("should return false", async function () {
      assert.isFalse(isReactNative);
    });
  });

  describe("isWebWorker (browser)", function () {
    it("should return false", async function () {
      assert.isFalse(isWebWorker);
    });
  });
});

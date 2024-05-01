// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isBrowser, isBun, isDeno, isNode, isReactNative, isWebWorker } from "../../src";
import { assert } from "chai";

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

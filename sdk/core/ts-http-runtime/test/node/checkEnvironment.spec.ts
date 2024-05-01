// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isBrowser, isBun, isDeno, isNode, isReactNative, isWebWorker } from "../../src";
import { assert } from "chai";

describe("checkEnvironment (node)", function () {
  describe("isBun (node)", function () {
    it("should return false", async function () {
      assert.isFalse(isBun);
    });
  });

  describe("isBrowser (node)", function () {
    it("should return false", async function () {
      assert.isFalse(isBrowser);
    });
  });

  describe("isDeno (node)", function () {
    it("should return false", async function () {
      assert.isFalse(isDeno);
    });
  });

  describe("isNode (node)", function () {
    it("should return true", async function () {
      assert.isTrue(isNode);
    });
  });

  describe("isReactNative (node)", function () {
    it("should return false", async function () {
      assert.isFalse(isReactNative);
    });
  });

  describe("isWebWorker (node)", function () {
    it("should return false", async function () {
      assert.isFalse(isWebWorker);
    });
  });
});

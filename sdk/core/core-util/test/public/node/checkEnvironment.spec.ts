// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  isBrowser,
  isBun,
  isDeno,
  isNode,
  isNodeLike,
  isNodeRuntime,
  isReactNative,
  isWebWorker,
} from "../../../src/index.js";
import { describe, it, assert } from "vitest";

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

  describe("isNodeLike (node)", function () {
    it("should return true", async function () {
      assert.isTrue(isNodeLike);
    });
  });

  describe("isNodeRuntime (node)", function () {
    it("should return true", async function () {
      assert.isTrue(isNodeRuntime);
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

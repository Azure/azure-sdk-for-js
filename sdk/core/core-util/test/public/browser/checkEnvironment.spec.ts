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

  describe("isNode(browser)", function () {
    it("should return true", async function () {
      assert.isFalse(isNode);
    });
  });

  describe("isNodeRuntime (browser)", function () {
    it("should return true", async function () {
      assert.isFalse(isNodeRuntime);
    });
  });

  describe("isNodeLike (browser)", function () {
    it("should return false", async function () {
      assert.isFalse(isNodeLike);
    });
  });

  describe("isNodeRuntime (browser)", function () {
    it("should return false", async function () {
      assert.isFalse(isNodeRuntime);
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

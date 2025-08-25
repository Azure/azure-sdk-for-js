// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import {
  isBrowser,
  isBun,
  isDeno,
  isNodeLike,
  isNodeRuntime,
  isReactNative,
  isWebWorker,
} from "$internal/util/checkEnvironment.js";

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

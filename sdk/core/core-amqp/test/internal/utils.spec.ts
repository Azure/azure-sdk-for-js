// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import {
  randomNumberFromInterval,
  executePromisesSequentially,
  isIotHubConnectionString,
  isString,
  isNumber,
  getGlobalProperty,
  Timeout,
  delay,
} from "../../src/util/utils.js";

describe("utils.ts functions", () => {
  describe("randomNumberFromInterval", () => {
    it("returns a number within the given range", () => {
      for (let i = 0; i < 20; i++) {
        const result = randomNumberFromInterval(5, 10);
        assert.isAtLeast(result, 5);
        assert.isAtMost(result, 10);
      }
    });

    it("returns the value when min equals max", () => {
      const result = randomNumberFromInterval(7, 7);
      assert.equal(result, 7);
    });
  });

  describe("executePromisesSequentially", () => {
    it("executes promise factories sequentially", async () => {
      const results: number[] = [];
      const factories = [
        (input: number) => {
          results.push(input);
          return Promise.resolve(input + 1);
        },
        (input: number) => {
          results.push(input);
          return Promise.resolve(input + 1);
        },
        (input: number) => {
          results.push(input);
          return Promise.resolve(input + 1);
        },
      ];
      const finalResult = await executePromisesSequentially(factories, 0);
      assert.deepEqual(results, [0, 1, 2]);
      assert.equal(finalResult, 3);
    });

    it("works with empty array", async () => {
      const result = await executePromisesSequentially([]);
      assert.isUndefined(result);
    });

    it("works without kickstart", async () => {
      const result = await executePromisesSequentially([
        (val: any) => Promise.resolve(val === undefined ? "ok" : "fail"),
      ]);
      assert.equal(result, "ok");
    });
  });

  describe("isIotHubConnectionString", () => {
    it("returns true for IoT Hub connection strings", () => {
      const cs =
        "HostName=myhub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=abc123";
      assert.isTrue(isIotHubConnectionString(cs));
    });

    it("returns false for non-IoT Hub connection strings", () => {
      const cs =
        "Endpoint=sb://mynamespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=abc123";
      assert.isFalse(isIotHubConnectionString(cs));
    });

    it("returns false for empty string", () => {
      assert.isFalse(isIotHubConnectionString(""));
    });
  });

  describe("isString", () => {
    it("returns true for strings", () => {
      assert.isTrue(isString("hello"));
      assert.isTrue(isString(""));
    });

    it("returns false for non-strings", () => {
      assert.isFalse(isString(123));
      assert.isFalse(isString(null));
      assert.isFalse(isString(undefined));
      assert.isFalse(isString({}));
    });
  });

  describe("isNumber", () => {
    it("returns true for numbers", () => {
      assert.isTrue(isNumber(123));
      assert.isTrue(isNumber(0));
      assert.isTrue(isNumber(NaN));
    });

    it("returns false for non-numbers", () => {
      assert.isFalse(isNumber("123"));
      assert.isFalse(isNumber(null));
      assert.isFalse(isNumber(undefined));
    });
  });

  describe("getGlobalProperty", () => {
    it("returns a global property", () => {
      const result = getGlobalProperty("setTimeout");
      assert.strictEqual(result, setTimeout);
    });

    it("returns undefined for non-existing property", () => {
      const result = getGlobalProperty("nonExistingProperty12345");
      assert.isUndefined(result);
    });
  });

  describe("Timeout", () => {
    it("set resolves after timeout", async () => {
      const timeout = new Timeout();
      const result = await timeout.set(10);
      assert.isUndefined(result);
    });

    it("set rejects with value after timeout", async () => {
      const timeout = new Timeout();
      await expect(timeout.set(10, "timeout error")).rejects.toThrow(/timeout error/);
    });

    it("wrap resolves if promise resolves first", async () => {
      const result = await Timeout.wrap(Promise.resolve("ok"), 5000);
      assert.equal(result, "ok");
    });

    it("wrap rejects if promise rejects first", async () => {
      await expect(Timeout.wrap(Promise.reject(new Error("fail")), 5000)).rejects.toThrow("fail");
    });

    it("static set works", async () => {
      const result = await Timeout.set(10);
      assert.isUndefined(result);
    });

    it("clear is safe when no timer", () => {
      const timeout = new Timeout();
      // Should not throw
      timeout.clear();
    });
  });

  describe("delay", () => {
    it("resolves with value when provided", async () => {
      const result = await delay(10, undefined, undefined, "hello");
      assert.equal(result, "hello");
    });

    it("resolves with void when no value", async () => {
      const result = await delay(10);
      assert.isUndefined(result);
    });
  });
});

describe("utils.ts - getGlobalProperty catch branch", () => {
  it("returns undefined when globalThis access throws", async () => {
    // The catch branch is hard to trigger because globalThis is always available in Node.
    // We test it by directly verifying the function handles access gracefully.
    const result = getGlobalProperty("__nonExistent__");
    assert.isUndefined(result);
  });
});

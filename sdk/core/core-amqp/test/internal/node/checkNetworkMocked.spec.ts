// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This test file uses vi.mock to mock node:dns before checkNetworkConnection.ts imports it.
 * This is necessary because ESM modules don't allow vi.spyOn on module exports.
 */
import { describe, it, assert, vi, beforeEach } from "vitest";

const { mockResolve } = vi.hoisted(() => ({
  mockResolve: vi.fn(),
}));

vi.mock("node:dns", () => ({
  CONNREFUSED: "ECONNREFUSED",
  TIMEOUT: "ETIMEOUT",
  resolve: mockResolve,
}));

import { checkNetworkConnection } from "../../../src/util/checkNetworkConnection.js";

describe("checkNetworkConnection - mocked DNS", () => {
  it("returns false when DNS fails with ECONNREFUSED", async () => {
    mockResolve.mockImplementation((_host: string, cb: (err: any) => void) => {
      cb({ code: "ECONNREFUSED" });
    });
    const result = await checkNetworkConnection("example.com");
    assert.isFalse(result);
  });

  it("returns false when DNS fails with ETIMEOUT", async () => {
    mockResolve.mockImplementation((_host: string, cb: (err: any) => void) => {
      cb({ code: "ETIMEOUT" });
    });
    const result = await checkNetworkConnection("example.com");
    assert.isFalse(result);
  });

  it("returns true when DNS fails with other error", async () => {
    mockResolve.mockImplementation((_host: string, cb: (err: any) => void) => {
      cb({ code: "ENOTFOUND" });
    });
    const result = await checkNetworkConnection("example.com");
    assert.isTrue(result);
  });

  it("returns true when DNS resolves successfully", async () => {
    mockResolve.mockImplementation((_host: string, cb: (err: any) => void) => {
      cb(null);
    });
    const result = await checkNetworkConnection("example.com");
    assert.isTrue(result);
  });
});

describe("checkNetworkConnection (Node.js)", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("returns true when DNS resolves successfully", async () => {
    vi.doMock("node:dns", async (importOriginal) => {
      const actual = await importOriginal<typeof import("node:dns")>();
      return {
        ...actual,
        resolve: vi.fn((_hostname: string, callback: (err: Error | null) => void) =>
          callback(null),
        ),
      };
    });

    const { checkNetworkConnection } = await import("../../../src/util/checkNetworkConnection.js");
    const result = await checkNetworkConnection("localhost");
    assert.isTrue(result);
  });

  it("returns true when DNS fails with non-network error", async () => {
    vi.doMock("node:dns", async (importOriginal) => {
      const actual = await importOriginal<typeof import("node:dns")>();
      return {
        ...actual,
        resolve: vi.fn(
          (_hostname: string, callback: (err: NodeJS.ErrnoException | null) => void) => {
            const error = Object.assign(new Error("getaddrinfo ENOTFOUND"), { code: "ENOTFOUND" });
            callback(error);
          },
        ),
      };
    });

    const { checkNetworkConnection } = await import("../../../src/util/checkNetworkConnection.js");
    const result = await checkNetworkConnection("thishostdoesnotexist12345.invalid");
    assert.isTrue(result);
  });
});

describe("checkNetworkConnection - DNS error codes", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it("returns true when DNS resolves successfully", async () => {
    vi.doMock("node:dns", () => ({
      CONNREFUSED: "ECONNREFUSED",
      TIMEOUT: "ETIMEOUT",
      resolve: (_host: string, cb: (err: any) => void) => {
        cb(null);
      },
    }));
    const { checkNetworkConnection } = await import("../../../src/util/checkNetworkConnection.js");
    const result = await checkNetworkConnection("example.com");
    assert.isTrue(result);
  });

  it("returns false when DNS fails with ECONNREFUSED", async () => {
    vi.doMock("node:dns", () => ({
      CONNREFUSED: "ECONNREFUSED",
      TIMEOUT: "ETIMEOUT",
      resolve: (_host: string, cb: (err: any) => void) => {
        cb({ code: "ECONNREFUSED" });
      },
    }));
    const { checkNetworkConnection } = await import("../../../src/util/checkNetworkConnection.js");
    const result = await checkNetworkConnection("example.com");
    assert.isFalse(result);
  });

  it("returns true when DNS fails with ENOTFOUND", async () => {
    vi.doMock("node:dns", () => ({
      CONNREFUSED: "ECONNREFUSED",
      TIMEOUT: "ETIMEOUT",
      resolve: (_host: string, cb: (err: any) => void) => {
        cb({ code: "ENOTFOUND" });
      },
    }));
    const { checkNetworkConnection } = await import("../../../src/util/checkNetworkConnection.js");
    const result = await checkNetworkConnection("example.com");
    assert.isTrue(result);
  });
});

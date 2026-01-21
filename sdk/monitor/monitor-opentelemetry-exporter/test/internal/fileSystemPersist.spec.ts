// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, beforeEach, vi, afterEach } from "vitest";

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type * as fsPromises from "node:fs/promises";
import {
  FileSystemPersist,
  getStorageDirectory,
} from "../../src/platform/nodejs/persist/fileSystemPersist.js";
import type { TelemetryItem as Envelope } from "../../src/generated/index.js";
import { promisify } from "node:util";
import { FileAccessControl } from "../../src/platform/nodejs/persist/fileAccessControl.js";
import { DropCode } from "../../src/export/statsbeat/types.js";

const statAsync = promisify(fs.stat);
const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

const instrumentationKey = "abc";
const tempDir = getStorageDirectory(instrumentationKey, os.tmpdir());

const deleteFolderRecursive = (dirPath: string): void => {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = `${dirPath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
};

const assertFirstFile = async (tempDirectory: string, expectation: unknown): Promise<void> => {
  // Assert that tempDir is a directory
  const stats = await statAsync(tempDirectory);
  assert.strictEqual(stats.isDirectory(), true);

  // Read the first file in tempDir
  const origFiles = await readdirAsync(tempDirectory);
  const files = origFiles.filter((f) =>
    path.basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
  );
  assert.isTrue(files.length > 0);

  // Assert file matches expectation
  const firstFile = files[0];
  const filePath = path.join(tempDirectory, firstFile);
  const payload = await readFileAsync(filePath);
  assert.deepStrictEqual(JSON.parse(payload.toString()), JSON.parse(JSON.stringify(expectation)));

  // Cleanup
  await unlinkAsync(filePath);
};

describe("FileSystemPersist", () => {
  beforeEach(() => {
    deleteFolderRecursive(tempDir);
  });

  describe("#configuration", () => {
    it("disableOfflineStorage", async () => {
      const envelope: Envelope = {
        name: "name",
        time: new Date(),
      };
      const envelopes = [envelope];
      const persister = new FileSystemPersist(instrumentationKey, { disableOfflineStorage: true });
      const success = await persister.push(envelopes);
      // Should not send a persister failure if offline storage is disabled
      assert.strictEqual(success, true);
      const fileValue = await persister.shift();
      assert.deepStrictEqual(fileValue, null, "File is present"); // File should not exist
    });

    it("custom storageDirectory", async () => {
      const customPath = path.join(os.tmpdir(), "TestFolder");
      const tempDirectory = getStorageDirectory(instrumentationKey, customPath);

      deleteFolderRecursive(tempDirectory);
      const envelope: Envelope = {
        name: "name",
        time: new Date(),
      };
      const envelopes = [envelope];
      const persister = new FileSystemPersist(instrumentationKey, { storageDirectory: customPath });
      const success = await persister.push(envelopes);
      assert.strictEqual(success, true);
      await assertFirstFile(tempDirectory, JSON.parse(JSON.stringify(envelopes)));
    });

    it("should disable the perister if OS_PROVIDES_FILE_PROTECTION is disabled", () => {
      FileAccessControl.OS_PROVIDES_FILE_PROTECTION = false;
      const persister = new FileSystemPersist(instrumentationKey);
      assert.strictEqual(persister["_enabled"], false);
      FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
    });

    it("should disable the perister if no instrumentation key is provided", () => {
      const persister = new FileSystemPersist("");
      assert.strictEqual(persister["_enabled"], false);
    });
  });

  describe("#push()", () => {
    it("should store to disk the value provided", async () => {
      const envelope: Envelope = {
        name: "name",
        time: new Date(),
      };
      const persister = new FileSystemPersist(instrumentationKey);
      const envelopes = [envelope];
      const success = await persister.push(envelopes);
      assert.strictEqual(success, true);

      /**
       * Note: parse(stringify(envelopes)) is because we are storing an Envelope class instance.
       * When writing a class instance to file, it does not store class constructors,
       * functions, etc. So we are asserting on a serialized "object" here.
       * */
      await assertFirstFile(tempDir, JSON.parse(JSON.stringify(envelopes)));
    });

    it("should store to disk several values", async () => {
      const envelopes: Envelope[] = new Array(10).fill({
        name: "name",
        time: new Date(),
      });
      const persister = new FileSystemPersist(instrumentationKey);

      const success = (
        await Promise.all(new Array(50).fill(null).map(() => persister.push(envelopes)))
      ).reduce((count, v) => (v === true ? count + 1 : count), 0);
      assert.strictEqual(success, 50);
      deleteFolderRecursive(tempDir);
    });

    it("should allow later lookup by timestamp prefix", async () => {
      const envelopes: Envelope[] = [{ name: "lookup", time: new Date() }];
      const persister = new FileSystemPersist(instrumentationKey);

      vi.useFakeTimers();
      const timestamp = 1700000000000;
      vi.setSystemTime(new Date(timestamp));

      const success = await persister.push(envelopes);
      expect(success).toBe(true);

      // Simulate a later login/session
      vi.setSystemTime(new Date(timestamp + 60_000));
      const laterPersister = new FileSystemPersist(instrumentationKey);
      expect(laterPersister).toBeDefined();

      const origFiles = await readdirAsync(tempDir);
      const files = origFiles.filter((f) =>
        path.basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
      );
      expect(files.length).toBeGreaterThan(0);
      expect(files.some((f) => f.startsWith(`${timestamp}-`))).toBe(true);

      vi.useRealTimers();
      deleteFolderRecursive(tempDir);
    });

    it("should fail on filename collision when using exclusive create and preserve original file", async () => {
      const envelopes: Envelope[] = [{ name: "collision", time: new Date() }];
      const persister = new FileSystemPersist(instrumentationKey);

      vi.useFakeTimers();
      vi.setSystemTime(new Date(1700000000000));
      const hrSpy = vi.spyOn(process.hrtime, "bigint").mockReturnValue(1234n);

      const first = await persister.push(envelopes);
      const second = await persister.push([{ name: "second", time: new Date() }]);

      expect(first).toBe(true);
      expect(second).toBe(false);

      const origFiles = await readdirAsync(tempDir);
      const files = origFiles.filter((f) =>
        path.basename(f).includes(FileSystemPersist.FILENAME_SUFFIX),
      );
      expect(files.length).toBe(1);
      const payload = await readFileAsync(path.join(tempDir, files[0]));
      expect(JSON.parse(payload.toString()).map((e: any) => e.name)).toEqual(["collision"]);

      hrSpy.mockRestore();
      vi.useRealTimers();
      deleteFolderRecursive(tempDir);
    });
  });

  describe("#shift()", () => {
    it("should not crash if folder does not exist", () => {
      const persister = new FileSystemPersist(instrumentationKey);
      expect(() => persister.shift()).not.toThrow();
    });

    it("should not crash if file does not exist", () => {
      const persister = new FileSystemPersist(instrumentationKey);
      const mkdirAsync = promisify(fs.mkdir);
      expect(async () => {
        await mkdirAsync(tempDir);
        await persister.shift();
      }).not.toThrow();
    });

    it("should get the first file on disk and return it", async () => {
      const sleep = promisify(setTimeout);
      const persister = new FileSystemPersist(instrumentationKey);

      const firstBatch = [{ batch: "first" }];
      const secondBatch = [{ batch: "second" }];
      const success1 = await persister.push(firstBatch);
      assert.strictEqual(success1, true);
      // wait 100 ms so that we don't overwrite previous file
      await sleep(100);

      const success2 = await persister.push(secondBatch);
      assert.strictEqual(success2, true);
      const value1 = await persister.shift();
      assert.deepStrictEqual(value1, firstBatch);
      const value2 = await persister.shift();
      assert.deepStrictEqual(value2, secondBatch);
    });
  });

  describe("#fileCleanupTask()", () => {
    it("must clean old files from temp location", async () => {
      const sleep = promisify(setTimeout);
      const persister = new FileSystemPersist("something");
      const firstBatch = [{ batch: "first" }];
      const success1 = await persister.push(firstBatch);
      assert.strictEqual(success1, true);
      persister.fileRetemptionPeriod = 1;
      // wait 100 ms
      await sleep(100);
      const cleanup = await persister["_fileCleanupTask"]();
      assert.strictEqual(cleanup, true);
      const fileValue = await persister.shift();
      assert.deepStrictEqual(fileValue, null, "File is still present"); // File doesn't exist anymore
    });
  });

  describe("#CLIENT_READONLY scenarios", () => {
    let mockCustomerSDKStats: any;
    let originalOSFileProtection: boolean;

    beforeEach(() => {
      mockCustomerSDKStats = {
        countDroppedItems: vi.fn(),
      };

      // Store original value and enable file protection for tests
      originalOSFileProtection = FileAccessControl.OS_PROVIDES_FILE_PROTECTION;
      FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
    });

    afterEach(() => {
      vi.restoreAllMocks();
      // Restore original value
      FileAccessControl.OS_PROVIDES_FILE_PROTECTION = originalOSFileProtection;
    });

    it("should have CLIENT_READONLY logic implemented", () => {
      const persister = new FileSystemPersist(instrumentationKey, {}, mockCustomerSDKStats);
      expect(persister).toBeDefined();
      expect(DropCode.CLIENT_READONLY).toBeDefined();

      // Verify that our mock is properly set up
      expect(mockCustomerSDKStats.countDroppedItems).toBeDefined();
    });

    it("should track CLIENT_READONLY when permission errors occur", async () => {
      const envelope: Envelope = {
        name: "test",
        time: new Date(),
      };

      // Import the module dynamically to mock before usage
      const helpersMod = await import("../../src/platform/nodejs/persist/fileSystemHelpers.js");

      // Mock confirmDirExists to throw EACCES permission error
      const error = new Error("EACCES: permission denied, mkdir") as NodeJS.ErrnoException;
      error.code = "EACCES";
      const mockConfirmDirExists = vi
        .spyOn(helpersMod, "confirmDirExists")
        .mockRejectedValue(error);

      const persister = new FileSystemPersist(instrumentationKey, {}, mockCustomerSDKStats);

      const result = await persister.push([envelope]);

      // Should return false due to permission error
      expect(result).toBe(false);

      // Should have called countDroppedItems with CLIENT_READONLY
      expect(mockCustomerSDKStats.countDroppedItems).toHaveBeenCalledWith(
        [envelope],
        DropCode.CLIENT_READONLY,
      );

      // Restore the spy
      mockConfirmDirExists.mockRestore();
    });
  });

  describe("#confirmDirExists ownership enforcement", () => {
    const directory = "/tmp/azure-monitor-test";
    const originalGetuid = (process as any).getuid;

    const restoreGetuid = (): void => {
      if (originalGetuid === undefined) {
        delete (process as any).getuid;
      } else {
        (process as any).getuid = originalGetuid;
      }
    };

    afterEach(() => {
      vi.restoreAllMocks();
      vi.resetModules();
      vi.unmock("node:fs/promises");
      restoreGetuid();
    });

    it("does not warn when directory is owned by current user", async () => {
      (process as any).getuid = () => 4242;
      vi.doMock("node:fs/promises", async () => {
        const actual = await vi.importActual<typeof fsPromises>("node:fs/promises");
        return {
          ...actual,
          lstat: vi.fn().mockResolvedValue(<any>{ isDirectory: () => true, uid: 4242 }),
        };
      });

      const { confirmDirExists } = await import(
        "../../src/platform/nodejs/persist/fileSystemHelpers.js"
      );

      await confirmDirExists(directory);
    });

    it("does not warn when directory is owned by admin (uid 0)", async () => {
      (process as any).getuid = () => 4242;
      vi.doMock("node:fs/promises", async () => {
        const actual = await vi.importActual<typeof fsPromises>("node:fs/promises");
        return {
          ...actual,
          lstat: vi.fn().mockResolvedValue(<any>{ isDirectory: () => true, uid: 0 }),
        };
      });

      const { confirmDirExists } = await import(
        "../../src/platform/nodejs/persist/fileSystemHelpers.js"
      );

      await confirmDirExists(directory);
    });

    it("throws when directory is owned by another user", async () => {
      (process as any).getuid = () => 4242;
      vi.doMock("node:fs/promises", async () => {
        const actual = await vi.importActual<typeof fsPromises>("node:fs/promises");
        return {
          ...actual,
          lstat: vi.fn().mockResolvedValue(<any>{ isDirectory: () => true, uid: 9999 }),
        };
      });

      const { confirmDirExists } = await import(
        "../../src/platform/nodejs/persist/fileSystemHelpers.js"
      );

      await expect(confirmDirExists(directory)).rejects.toThrow("owned by uid 9999");
    });
  });

  describe("#getStorageDirectory", () => {
    it("should handle userInfo failure and use empty string for user segment", async () => {
      const originalUserInfo = os.userInfo;

      vi.spyOn(os, "userInfo").mockImplementation(() => {
        throw new Error("Unable to get user info");
      });

      const testInstrumentationKey = "test-ikey";
      const customStorageDir = os.tmpdir();

      try {
        const result = getStorageDirectory(testInstrumentationKey, customStorageDir);

        expect(result).toBeDefined();
        expect(typeof result).toBe("string");
        expect(result.length).toBeGreaterThan(0);

        expect(result).toContain(customStorageDir);

        expect(result).toContain("Microsoft-AzureMonitor-");

        expect(result).toContain(FileSystemPersist.TEMPDIR_PREFIX + testInstrumentationKey);

        const result2 = getStorageDirectory(testInstrumentationKey, customStorageDir);
        expect(result).toBe(result2);
      } finally {
        os.userInfo = originalUserInfo;
        vi.restoreAllMocks();
      }
    });

    it("should create different paths for different instrumentation keys", () => {
      const storageDir = os.tmpdir();
      const path1 = getStorageDirectory("ikey1", storageDir);
      const path2 = getStorageDirectory("ikey2", storageDir);

      expect(path1).not.toBe(path2);

      expect(path1).toContain("Microsoft-AzureMonitor-");
      expect(path2).toContain("Microsoft-AzureMonitor-");
      expect(path1).toContain(FileSystemPersist.TEMPDIR_PREFIX + "ikey1");
      expect(path2).toContain(FileSystemPersist.TEMPDIR_PREFIX + "ikey2");
    });
  });
});

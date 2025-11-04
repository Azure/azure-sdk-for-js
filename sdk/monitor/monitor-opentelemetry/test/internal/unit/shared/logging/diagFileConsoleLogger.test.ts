// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";

import * as fileHelper from "../../../../../src/utils/fileSystem.js";
import { DiagFileConsoleLogger } from "../../../../../src/shared/logging/diagFileConsoleLogger.js";
import { vi, assert, describe, beforeEach, afterEach, it, expect } from "vitest";

describe("Library/DiagFileConsoleLogger", () => {
  let originalEnv: NodeJS.ProcessEnv;
  let logger: DiagFileConsoleLogger;

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
    (logger as any) = null;
  });

  describe("Set logDesitination", () => {
    it("should set file+console logDestination", () => {
      process.env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file+console";
      logger = new DiagFileConsoleLogger();
      assert.strictEqual(logger["_logDestination"], "file+console");
    });

    it("should set file logDestination", () => {
      process.env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file";
      logger = new DiagFileConsoleLogger();
      assert.strictEqual(logger["_logDestination"], "file");
    });
  });

  describe("Set logDesitination", () => {
    it("should set absolute path for log dir", () => {
      process.env["APPLICATIONINSIGHTS_LOGDIR"] = "/tmp/example/test";
      logger = new DiagFileConsoleLogger();
      assert.strictEqual(logger["_tempDir"], "/tmp/example/test");
    });
    it("should set relative path for log dir", () => {
      process.env["APPLICATIONINSIGHTS_LOGDIR"] = "./tmp/example/test";
      logger = new DiagFileConsoleLogger();
      assert.strictEqual(logger["_tempDir"], path.join(process.cwd(), "tmp/example/test"));
    });
  });

  describe("Write to file", () => {
    beforeEach(() => {
      logger = new DiagFileConsoleLogger();
    });

    it("should log message to new file", async () => {
      const confirmDirStub = vi
        .spyOn(fileHelper, "confirmDirExists")
        .mockImplementation(async () => {
          // Fake directory creation
        });
      const appendFileAsyncStub = vi.spyOn(fileHelper, "appendFileAsync");
      logger["_logToFile"] = true;

      await logger["logMessage"]("testMessage");
      expect(confirmDirStub).toHaveBeenCalled();
      expect(appendFileAsyncStub).toHaveBeenCalled();
      expect(appendFileAsyncStub.mock.lastCall![1]).toEqual("testMessage\r\n");
    });

    it("should create backup file", async () => {
      vi.spyOn(fileHelper, "confirmDirExists").mockImplementation(async () => {});
      vi.spyOn(fileHelper, "accessAsync").mockImplementation(async () => {});
      vi.spyOn(fileHelper, "getShallowFileSize").mockImplementation(
        // eslint-disable-next-line @typescript-eslint/require-await
        async () =>
          // Fake file size check
          123,
      );
      logger["_maxSizeBytes"] = 122;

      const writeStub = vi.spyOn(fileHelper, "writeFileAsync").mockImplementation(async () => {});
      const appendStub = vi.spyOn(fileHelper, "appendFileAsync").mockImplementation(async () => {});
      const readStub = vi.spyOn(fileHelper, "readFileAsync").mockImplementation(
        // eslint-disable-next-line @typescript-eslint/require-await
        async () => Buffer.from("existing content"),
      );
      logger["_logToFile"] = true;

      await logger["logMessage"]("backupTestMessage");
      expect(readStub).toHaveBeenCalledOnce();
      expect(appendStub).not.toHaveBeenCalled();
      expect(writeStub).toHaveBeenCalledTimes(2);
      // assert.equal(writeSpy.args[0][0], "C:\Users\hectorh\AppData\Local\Temp\appInsights-node\1636481017787.applicationinsights.log"); // Backup file format
      assert.ok(
        writeStub.mock.calls[0][0].toString().indexOf(".applicationinsights.log") > 0,
        ".applicationinsights.log present in backup file name",
      ); // First call is for backup file
      // assert.equal(writeSpy.args[1][1], "C:\Users\hectorh\AppData\Local\Temp\appInsights-node\applicationinsights.log"); // Main file format
      assert.equal(writeStub.mock.calls[1][1], "backupTestMessage\r\n");
    });

    it("should create multiple backup files", async () => {
      vi.spyOn(fileHelper, "confirmDirExists").mockImplementation(async () => {});
      vi.spyOn(fileHelper, "accessAsync").mockImplementation(async () => {});
      vi.spyOn(fileHelper, "getShallowFileSize").mockImplementation(
        // eslint-disable-next-line @typescript-eslint/require-await
        async () =>
          // Fake file size check
          123,
      );
      const writeStub = vi.spyOn(fileHelper, "writeFileAsync").mockImplementation(async () => {});
      const readStub = vi.spyOn(fileHelper, "readFileAsync").mockImplementation(
        // eslint-disable-next-line @typescript-eslint/require-await
        async () => Buffer.from("existing content"),
      );
      logger["_maxSizeBytes"] = 122;
      logger["_logToFile"] = true;
      await logger["logMessage"]("backupTestMessage");
      await logger["logMessage"]("backupTestMessage");
      expect(writeStub).toHaveBeenCalledTimes(4);
      expect(readStub).toHaveBeenCalledTimes(2);
    });

    it("should start file cleanup task", () => {
      (logger as any) = null;
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file";
      process.env = env;
      const setIntervalSpy = vi.spyOn(global, "setInterval");
      logger = new DiagFileConsoleLogger();
      expect(setIntervalSpy).toHaveBeenCalled();
      assert.ok(logger["_fileCleanupTimer"]);
    });

    it("should remove backup files", async () => {
      vi.spyOn(fileHelper, "readdirAsync").mockImplementation(
        // eslint-disable-next-line @typescript-eslint/require-await
        async () =>
          [
            "applicationinsights.log",
            "123.applicationinsights.log",
            "456.applicationinsights.log",
          ] as never,
      );
      logger["_maxHistory"] = 0;
      const unlinkStub = vi.spyOn(fileHelper, "unlinkAsync").mockImplementation(async () => {});
      await logger["_fileCleanupTask"]();
      expect(unlinkStub).toHaveBeenCalledTimes(2);
    });

    it("cleanup should keep configured number of backups", async () => {
      vi.spyOn(fileHelper, "readdirAsync").mockImplementation(
        // eslint-disable-next-line @typescript-eslint/require-await
        async () =>
          [
            "applicationinsights.log",
            "123.applicationinsights.log",
            "456.applicationinsights.log",
          ] as never,
      );
      logger["_maxHistory"] = 1;
      const unlinkStub = vi.spyOn(fileHelper, "unlinkAsync").mockImplementation(async () => {});
      await logger["_fileCleanupTask"]();
      expect(unlinkStub).toHaveBeenCalledTimes(1);
      assert.ok(
        unlinkStub.mock.calls[0][0].toString().indexOf("123.applicationinsights.log") > 0,
        "Oldest file is deleted",
      );
    });
  });
});

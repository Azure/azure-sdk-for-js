// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import * as sinon from "sinon";

import { InternalAzureLogger } from "../../../../src/shared/logging/internal";
import * as fileHelper from "../../../../src/utils/fileSystem";

describe("Library/InternalAzureLogger", () => {
  let sandbox: sinon.SinonSandbox;
  let originalEnv: NodeJS.ProcessEnv;
  let internalLogger: InternalAzureLogger;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  beforeEach(() => {
    originalEnv = process.env;
    internalLogger = new InternalAzureLogger();
  });

  afterEach(() => {
    process.env = originalEnv;
    sandbox.restore();
    (internalLogger as any) = null;
  });

  describe("Write to file", () => {
    it("should log message to new file", (done) => {
      const confirmDirStub = sandbox.stub(fileHelper, "confirmDirExists").callsFake(async () => {
        // Fake directory creation
      });
      const appendFileAsyncStub = sandbox.stub(fileHelper, "appendFileAsync");
      internalLogger["_logToFile"] = true;

      internalLogger
        .logMessage("testMessage")
        .then(() => {
          assert.ok(confirmDirStub.called, "confirmDirStub called");
          assert.ok(appendFileAsyncStub.called, "writeStub called"); // File creation was called
          assert.ok(
            appendFileAsyncStub.lastCall.args[0].toString().indexOf("applicationinsights.log") > 0
          );
          assert.equal(appendFileAsyncStub.lastCall.args[1], "testMessage\r\n");
          done();
        })
        .catch((error: Error) => {
          done(error);
        });
    });

    it("should create backup file", (done) => {
      sandbox.stub(fileHelper, "confirmDirExists").callsFake(async () => {});
      sandbox.stub(fileHelper, "accessAsync").callsFake(async () => {});
      sandbox.stub(fileHelper, "getShallowFileSize").callsFake(
        async () =>
          // Fake file size check
          123
      );
      internalLogger["_maxSizeBytes"] = 122;

      const writeStub = sandbox.stub(fileHelper, "writeFileAsync");
      const appendStub = sandbox.stub(fileHelper, "appendFileAsync");
      const readStub = sandbox.stub(fileHelper, "readFileAsync");
      internalLogger["_logToFile"] = true;

      internalLogger
        .logMessage("backupTestMessage")
        .then(() => {
          assert.ok(readStub.calledOnce, "readStub calledOnce"); // Read content to create backup
          assert.ok(appendStub.notCalled, "appendStub notCalled");
          assert.ok(writeStub.calledTwice, "writeStub calledTwice");
          //assert.equal(writeSpy.args[0][0], "C:\Users\hectorh\AppData\Local\Temp\appInsights-node\1636481017787.applicationinsights.log"); // Backup file format
          assert.ok(
            writeStub.args[0][0].toString().indexOf(".applicationinsights.log") > 0,
            ".applicationinsights.log present in backup file name"
          ); // First call is for backup file
          //assert.equal(writeSpy.args[1][1], "C:\Users\hectorh\AppData\Local\Temp\appInsights-node\applicationinsights.log"); // Main file format
          assert.equal(writeStub.args[1][1], "backupTestMessage\r\n");
          done();
        })
        .catch((error: Error) => {
          done(error);
        });
    });

    it("should create multiple backup files", (done) => {
      sandbox.stub(fileHelper, "confirmDirExists").callsFake(async () => {});
      sandbox.stub(fileHelper, "accessAsync").callsFake(async () => {});
      sandbox.stub(fileHelper, "getShallowFileSize").callsFake(
        async () =>
          // Fake file size check
          123
      );
      const writeStub = sandbox.stub(fileHelper, "writeFileAsync");
      const readStub = sandbox.stub(fileHelper, "readFileAsync");
      internalLogger["_maxSizeBytes"] = 122;
      internalLogger["_logToFile"] = true;
      internalLogger
        .logMessage("backupTestMessage")
        .then(() => {
          internalLogger
            .logMessage("backupTestMessage")
            .then(() => {
              assert.equal(writeStub.callCount, 4);
              assert.ok(readStub.calledTwice);
              done();
            })
            .catch((error: Error) => {
              done(error);
            });
        })

        .catch((error: Error) => {
          done(error);
        });
    });

    it("should start file cleanup task", () => {
      (internalLogger as any) = null;
      const env = <{ [id: string]: string }>{};
      env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file";
      process.env = env;
      const setIntervalSpy = sandbox.spy(global, "setInterval");
      internalLogger = new InternalAzureLogger();
      assert.ok(setIntervalSpy.called);
      assert.ok(internalLogger["_fileCleanupTimer"]);
    });

    it("should remove backup files", (done) => {
      sandbox
        .stub(fileHelper, "readdirAsync")
        .callsFake(
          async () =>
            [
              "applicationinsights.log",
              "123.applicationinsights.log",
              "456.applicationinsights.log",
            ] as any
        );
      internalLogger["_maxHistory"] = 0;
      const unlinkStub = sandbox.stub(fileHelper, "unlinkAsync");
      internalLogger["_fileCleanupTask"]()
        .then(() => {
          assert.ok(unlinkStub.calledTwice, "unlinkStub calledTwice");
          done();
        })
        .catch((error: Error) => {
          done(error);
        });
    });

    it("cleanup should keep configured number of backups", (done) => {
      sandbox
        .stub(fileHelper, "readdirAsync")
        .callsFake(
          async () =>
            [
              "applicationinsights.log",
              "123.applicationinsights.log",
              "456.applicationinsights.log",
            ] as any
        );
      internalLogger["_maxHistory"] = 1;
      const unlinkStub = sandbox.stub(fileHelper, "unlinkAsync");
      internalLogger["_fileCleanupTask"]()
        .then(() => {
          assert.ok(unlinkStub.calledOnce, "unlinkStub calledOnce");
          assert.ok(
            unlinkStub.args[0][0].toString().indexOf("123.applicationinsights.log") > 0,
            "Oldest file is deleted"
          );
          done();
        })
        .catch((error: Error) => {
          done(error);
        });
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  platformToFilePath,
  validateKeyFile,
} from "../../../../src/credentials/managedIdentityCredential/arcMsi";

import { Context } from "mocha";
import Sinon from "sinon";
import { assert } from "chai";
import fs from "node:fs";
import path from "node:path";

describe("arcMsi", function () {
  afterEach(function () {
    Sinon.restore();
  });

  describe("validateKeyFile", function () {
    let expectedDirectory: string;

    beforeEach(function () {
      if (process.platform !== "win32" && process.platform !== "linux") {
        // Not supported on this platform
        this.skip();
      }
      expectedDirectory = platformToFilePath();
    });

    it("succeeds if the file is valid", function (this: Context) {
      const filePath = path.join(expectedDirectory, "file.key");
      Sinon.stub(fs, "statSync").returns({ size: 4096 } as any);
      assert.doesNotThrow(() => validateKeyFile(filePath));
    });

    it("throws if file path is empty", function () {
      assert.throws(() => validateKeyFile(""), /Failed to find/);
      assert.throws(() => validateKeyFile(undefined), /Failed to find/);
    });

    describe("on Windows", function () {
      it("throws when the file is not in the expected path", function () {
        Sinon.stub(process, "platform").value("win32");
        Sinon.stub(process, "env").get(() => {
          return {
            PROGRAMDATA: "C:\\ProgramData",
          };
        });
        assert.throws(() => validateKeyFile("C:\\Users\\user\\file.key"), /unexpected file path/);
      });

      it("throws if ProgramData is undefined", function () {
        Sinon.stub(process, "platform").value("win32");
        Sinon.stub(process, "env").get(() => {
          return {
            PROGRAMDATA: undefined,
          };
        });
        assert.throws(
          () => validateKeyFile("C:\\Users\\user\\file.key"),
          /PROGRAMDATA environment variable/,
        );
      });
    });

    describe("on Linux", function () {
      it("throws when the file is not in the expected path", function () {
        Sinon.stub(process, "platform").value("linux");
        assert.throws(() => validateKeyFile("/home/user/file.key"), /unexpected file path/);
      });
    });

    it("throws if the file extension is not .key", function () {
      const filePath = path.join(expectedDirectory, "file.pem");
      assert.throws(() => validateKeyFile(filePath), /unexpected file path/);
    });

    it("throws if the file size is invalid", function () {
      const filePath = path.join(expectedDirectory, "file.key");
      Sinon.stub(fs, "statSync").returns({ size: 4097 } as any);
      assert.throws(() => validateKeyFile(filePath), /larger than expected/);
    });
  });
});

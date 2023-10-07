// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { Logger } from "../../../../../src/shared/logging/logger";
import * as path from "path";

describe("#InternalLogger", () => {
  describe("#SetLogLevel", () => {
    let originalEnv: NodeJS.ProcessEnv;
    beforeEach(() => {
      originalEnv = process.env;
      // @ts-ignore Need to set the static Logger instance to undefined to reset the singleton
      Logger["_instance"] = undefined;
    });

    afterEach(() => {
      process.env = originalEnv;
    });

    describe("Set logDesitination", () => {
      it("should set file+console logDestination", () => {
        process.env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file+console";
        assert.strictEqual(
          Logger.getInstance()["_internalLogger"]["_logDestination"],
          "file+console"
        );
      });

      it("should set file logDestination", () => {
        process.env["APPLICATIONINSIGHTS_LOG_DESTINATION"] = "file";
        assert.strictEqual(Logger.getInstance()["_internalLogger"]["_logDestination"], "file");
      });
    });

    describe("Set logDesitination", () => {
      it("should set absolute path for log dir", () => {
        process.env["APPLICATIONINSIGHTS_LOGDIR"] = "/tmp/example/test";
        assert.strictEqual(
          Logger.getInstance()["_internalLogger"]["_tempDir"],
          "/tmp/example/test"
        );
      });
      it("should set relative path for log dir", () => {
        process.env["APPLICATIONINSIGHTS_LOGDIR"] = "./tmp/example/test";
        assert.strictEqual(
          Logger.getInstance()["_internalLogger"]["_tempDir"],
          path.join(process.cwd(), "tmp/example/test")
        );
      });
    });
  });
});

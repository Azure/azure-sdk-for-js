// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { credentialFlatLogger, credentialLogger } from "../../src/util/logging";

describe("Identity logging utilities", function() {
  describe("nestedLogger", function() {
    it("info", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialFlatLogger("title", undefined, fakeLogger as any);
      logger.info("message");
      assert.equal(allParams[0].join(" "), "title => message");
    });

    it("warning", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        warning: (...params: any) => allParams.push(params)
      };
      const logger = credentialFlatLogger("title", undefined, fakeLogger as any);
      logger.warning("message");
      assert.equal(allParams[0].join(" "), "title => message");
    });

    it("success", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialFlatLogger("title", undefined, fakeLogger as any);
      logger.success("message");
      assert.equal(allParams[0].join(" "), "title => Success: message");
    });

    it("error", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        error: (...params: any) => allParams.push(params)
      };
      const logger = credentialFlatLogger("title", undefined, fakeLogger as any);
      logger.error(new Error("message"));
      assert.equal(allParams[0].join(" "), "title => Error: message");
    });

    it("throwError", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        error: (...params: any) => allParams.push(params)
      };
      const logger = credentialFlatLogger("title", undefined, fakeLogger as any);
      let error: Error | undefined;
      try {
        logger.throwError(new Error("message"));
      } catch (e) {
        error = e;
      }
      assert.equal(allParams[0].join(" "), "title => Error: message");
      assert.equal(error!.message, "message");
    });
  });

  describe("credentialLogger", function() {
    it("info", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLogger("title", fakeLogger as any);
      logger.info("message");
      assert.equal(allParams[0].join(" "), "title => message");
    });

    it("getToken.info", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLogger("title", fakeLogger as any);
      logger.getToken.info("message");
      assert.equal(allParams[0].join(" "), "title => getToken => message");
    });
  });
});

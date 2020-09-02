// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import assert from "assert";
import {
  credentialLoggerInstance,
  credentialLogger,
  CredentialLogger,
  formatSuccess,
  formatError
} from "../../src/util/logging";
import { TokenCredential, GetTokenOptions, AccessToken } from "../../src";

describe("Identity logging utilities", function() {
  describe("credentialLoggerInstance", function() {
    it("info", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.info("message");
      assert.equal(allParams[0].join(" "), "title => message");
    });

    it("success", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.info(formatSuccess("scope"));
      assert.equal(allParams[0].join(" "), "title => SUCCESS: scope");
    });

    it("success with multiple scopes", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.info(formatSuccess(["scope 1", "scope 2"]));
      assert.equal(allParams[0].join(" "), "title => SUCCESS: scope 1, scope 2");
    });

    it("error (with formatError)", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.info(formatError(new Error("message")));
      assert.equal(allParams[0].join(" "), "title => ERROR: message");
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
      assert.equal(allParams[0].join(" "), "title => getToken() => message");
    });
  });

  it("credentialLogger with a fake credential", async function() {
    const allInfoParams: any[] = [];
    const fakeLogger = {
      info: (...params: any) => allInfoParams.push(params)
    };

    class FakeCredential implements TokenCredential {
      private logger: CredentialLogger;

      constructor() {
        this.logger = credentialLogger(this.constructor.name, fakeLogger as any);
        this.logger.info("test constructor info");
      }

      public async getToken(
        scopes: string | string[],
        _options?: GetTokenOptions
      ): Promise<AccessToken | null> {
        if (scopes.length) {
          this.logger.getToken.info(formatSuccess(scopes));
          return null;
        }
        const error = new Error("test getToken error");
        this.logger.getToken.info(formatError(error));
        throw error;
      }
    }

    const fakeCredential = new FakeCredential();
    assert.equal(allInfoParams[0].join(" "), "FakeCredential => test constructor info");

    await fakeCredential.getToken(["Scope 1", "Scope 2"]);
    assert.equal(
      allInfoParams[1].join(" "),
      "FakeCredential => getToken() => SUCCESS: Scope 1, Scope 2"
    );

    try {
      await fakeCredential.getToken([]);
    } catch {
      // Nothing to do here
    }

    assert.equal(
      allInfoParams[2].join(" "),
      "FakeCredential => getToken() => ERROR: test getToken error"
    );
  });
});

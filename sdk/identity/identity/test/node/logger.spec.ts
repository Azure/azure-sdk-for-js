// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import {
  credentialLoggerInstance,
  credentialLogger,
  CredentialLogger,
  success
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

    it("warning", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        warning: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.warning("message");
      assert.equal(allParams[0].join(" "), "title => message");
    });

    it("success", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.info(success("scope"));
      assert.equal(allParams[0].join(" "), "title => Success: scope");
    });

    it("success with multiple scopes", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        info: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.info(success(["scope 1", "scope 2"]));
      assert.equal(allParams[0].join(" "), "title => Success: scope 1, scope 2");
    });

    it("error", async function() {
      const allParams: any[] = [];
      const fakeLogger = {
        error: (...params: any) => allParams.push(params)
      };
      const logger = credentialLoggerInstance("title", undefined, fakeLogger as any);
      logger.error(new Error("message"));
      assert.equal(allParams[0].join(" "), "title => Error: message");
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
    const allErrorParams: any[] = [];
    const fakeLogger = {
      info: (...params: any) => allInfoParams.push(params),
      error: (...params: any) => allErrorParams.push(params)
    };

    class FakeCredential implements TokenCredential {
      private logger: CredentialLogger;

      constructor() {
        this.logger = credentialLogger(this.constructor.name, fakeLogger as any);
        this.logger.info("test constructor info");
      }

      public async getToken(
        scopes: string | string[],
        options?: GetTokenOptions
      ): Promise<AccessToken | null> {
        if (scopes.length) {
          this.logger.getToken.info(success(scopes));
          return null;
        }
        const error = new Error("test getToken error");
        this.logger.getToken.error(error);
        throw error;
      }
    }

    const fakeCredential = new FakeCredential();
    assert.equal(allInfoParams[0].join(" "), "FakeCredential => test constructor info");

    await fakeCredential.getToken(["Scope 1", "Scope 2"]);
    assert.equal(
      allInfoParams[1].join(" "),
      "FakeCredential => getToken() => Success: Scope 1, Scope 2"
    );

    let error: Error | undefined;
    try {
      await fakeCredential.getToken([]);
    } catch (e) {
      error = e;
    }

    assert.equal(
      allErrorParams[0].join(" "),
      "FakeCredential => getToken() => Error: test getToken error"
    );
  });
});

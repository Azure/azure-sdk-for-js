// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import { retry, RetryConfig } from "../src/util/utils";
import chaiAsPromised from "chai-as-promised";
import { delay } from "@azure/event-hubs";
chai.use(chaiAsPromised);
import debugModule from "debug";
const should = chai.should();
const debug = debugModule("azure:eph:retry-spec");

describe("retry function", function(): void {
  it("should succeed if the operation succeeds.", function(done: Mocha.Done): void {
    const test = async () => {
      let counter = 0;
      try {
        const config: RetryConfig<any> = {
          operation: async () => {
            debug("counter: %d", ++counter);
            await delay(200);
            return {
              code: 200,
              description: "OK"
            };
          },
          hostName: "eph-1",
          action: "Succeed",
          maxRetries: 5,
          retryMessage: "Retry",
          finalFailureMessage: "Out of retry attempts, still failing!!"
        };
        const result = await retry(config);
        result.code.should.equal(200);
        result.description.should.equal("OK");
        counter.should.equal(1);
      } catch (err) {
        debug("An error occurred in a test that should have succeeded: %O", err);
        throw err;
      }
    };
    test()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should succeed if the operation initially fails and then succeeds.", function(done: Mocha.Done): void {
    const test = async () => {
      let counter = 0;
      try {
        const config: RetryConfig<any> = {
          operation: async () => {
            await delay(200);
            debug("counter: %d", ++counter);
            if (counter === 1) {
              throw new Error("The server is busy right now. Retry later.");
            } else {
              return ["0", "1"];
            }
          },
          hostName: "eph-1",
          action: "Initially fail then suceed",
          maxRetries: 5,
          retryMessage: "Retry",
          finalFailureMessage: "Out of retry attempts, still failing!!"
        };
        const result = await retry(config);
        should.equal(Array.isArray(result), true);
        result.toString().should.equal("0,1");
        counter.should.equal(2);
      } catch (err) {
        debug("An error occurred in a test that should have succeeded: %O", err);
        throw err;
      }
    };
    test()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should succeed in the last attempt.", function(done: Mocha.Done): void {
    const test = async () => {
      let counter = 0;
      try {
        const config: RetryConfig<any> = {
          operation: async () => {
            await delay(200);
            debug("counter: %d", ++counter);
            if (counter === 1) {
              const e = new Error("Error in attempt 1.");
              throw e;
            } else if (counter === 2) {
              const e = new Error("Error in attempt 2.");
              throw e;
            } else {
              return {
                code: 200,
                description: "OK"
              };
            }
          },
          hostName: "eph-1",
          action: "Success in last attempt",
          maxRetries: 3,
          retryMessage: "Retry",
          finalFailureMessage: "Out of retry attempts, still failing!!"
        };
        const result = await retry(config);
        result.code.should.equal(200);
        result.description.should.equal("OK");
        counter.should.equal(3);
      } catch (err) {
        debug("An error occurred in a test that should have succeeded: %O", err);
        throw err;
      }
    };
    test()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("should fail if all attempts return an error", function(done: Mocha.Done): void {
    const test = async () => {
      let counter = 0;
      try {
        const config: RetryConfig<any> = {
          operation: async () => {
            debug("counter: %d", ++counter);
            await delay(200);
            const e = new Error("I would always like to fail, keep retrying.");
            throw e;
          },
          hostName: "eph-1",
          action: "Fail after 5 attempts",
          maxRetries: 5,
          retryMessage: "Retry",
          partitionId: "1",
          finalFailureMessage: "Out of retry attempts, still failing!!"
        };
        await retry(config);
      } catch (err) {
        counter.should.equal(5);
        should.exist(err);
        err.action.should.equal("Fail after 5 attempts");
        err.hostName.should.equal("eph-1");
        err.partitionId.should.equal("1");
        should.exist(err.error);
        err.error.message.should.match(
          /Out of retry attempts, still failing!! while performing the action "Fail after 5 attempts" due to Error\: I would always like to fail, keep retrying.*/gi
        );
      }
    };
    test()
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

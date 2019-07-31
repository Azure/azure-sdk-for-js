// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {
  retry,
  translate,
  RetryConfig,
  RetryOperationType,
  Constants,
  delay,
  MessagingError,
  RetryPolicy
} from "../src";
import * as chai from "chai";
import debugModule from "debug";
const debug = debugModule("azure:core-amqp:retry-spec");
const should = chai.should();
import * as dotenv from "dotenv";
dotenv.config();

[RetryPolicy.ExponentialRetryPolicy, RetryPolicy.LinearRetryPolicy].forEach(
  () =>
    function(retryPolicy: RetryPolicy): void {
      const retryPolicyName =
        retryPolicy === RetryPolicy.ExponentialRetryPolicy ? "Exponential" : "Linear";
      describe(`retry function for ${retryPolicyName}`, function() {
        it("should succeed if the operation succeeds.", async function() {
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
              connectionId: "connection-1",
              operationType: RetryOperationType.cbsAuth,
              delayInMs: 15000,
              minExponentialRetryDelayInMs: 0,
              retryPolicy: retryPolicy
            };
            const result = await retry(config);
            result.code.should.equal(200);
            result.description.should.equal("OK");
            counter.should.equal(1);
          } catch (err) {
            debug("An error occurred in a test that should have succeeded: %O", err);
            throw err;
          }
        });

        it("should fail if the operation returns a non retryable error", async function() {
          let counter = 0;
          try {
            const config: RetryConfig<any> = {
              operation: async () => {
                debug("counter: %d", ++counter);
                await delay(200);
                throw translate({
                  condition: "amqp:precondition-failed",
                  description: "I would like to fail, not retryable."
                });
              },
              connectionId: "connection-1",
              operationType: RetryOperationType.management,
              delayInMs: 15000,
              minExponentialRetryDelayInMs: 0,
              retryPolicy: retryPolicy
            };
            await retry(config);
          } catch (err) {
            should.exist(err);
            should.equal(true, err instanceof MessagingError);
            err.message.should.equal("I would like to fail, not retryable.");
            counter.should.equal(1);
          }
        });

        it("should succeed if the operation initially fails with a retryable error and then succeeds.", async function() {
          let counter = 0;
          try {
            const config: RetryConfig<any> = {
              operation: async () => {
                await delay(200);
                debug("counter: %d", ++counter);
                if (counter == 1) {
                  throw translate({
                    condition: "com.microsoft:server-busy",
                    description: "The server is busy right now. Retry later."
                  });
                } else {
                  return {
                    code: 200,
                    description: "OK"
                  };
                }
              },
              connectionId: "connection-1",
              operationType: RetryOperationType.receiverLink,
              maxRetries: 2,
              delayInMs: 500,
              minExponentialRetryDelayInMs: 0,
              retryPolicy: retryPolicy
            };
            const result = await retry(config);
            result.code.should.equal(200);
            result.description.should.equal("OK");
            counter.should.equal(2);
          } catch (err) {
            debug("An error occurred in a test that should have succeeded: %O", err);
            throw err;
          }
        });

        it("should succeed in the last attempt.", async function() {
          let counter = 0;
          try {
            const config: RetryConfig<any> = {
              operation: async () => {
                await delay(200);
                debug("counter: %d", ++counter);
                if (counter == 1) {
                  const e = new MessagingError("A retryable error.");
                  e.retryable = true;
                  throw e;
                } else if (counter == 2) {
                  const e = new MessagingError("A retryable error.");
                  e.retryable = true;
                  throw e;
                } else {
                  return {
                    code: 200,
                    description: "OK"
                  };
                }
              },
              connectionId: "connection-1",
              operationType: RetryOperationType.senderLink,
              maxRetries: 2,
              delayInMs: 500,
              minExponentialRetryDelayInMs: 0,
              retryPolicy: retryPolicy
            };
            const result = await retry(config);
            result.code.should.equal(200);
            result.description.should.equal("OK");
            counter.should.equal(3);
          } catch (err) {
            debug("An error occurred in a test that should have succeeded: %O", err);
            throw err;
          }
        });

        it("should fail if the last attempt return a non-retryable error", async function() {
          let counter = 0;
          try {
            const config: RetryConfig<any> = {
              operation: async () => {
                await delay(200);
                debug("counter: %d", ++counter);
                if (counter == 1) {
                  const e = new MessagingError("A retryable error.");
                  e.retryable = true;
                  throw e;
                } else if (counter == 2) {
                  const e = new MessagingError("A retryable error.");
                  e.retryable = true;
                  throw e;
                } else {
                  const x: any = {
                    condition: "com.microsoft:message-lock-lost",
                    description: "I would like to fail."
                  };
                  throw x;
                }
              },
              connectionId: "connection-1",
              operationType: RetryOperationType.sendMessage,
              maxRetries: 2,
              delayInMs: 500,
              minExponentialRetryDelayInMs: 0,
              retryPolicy: retryPolicy
            };
            await retry(config);
          } catch (err) {
            should.exist(err);
            should.equal(true, err instanceof MessagingError);
            err.message.should.equal("I would like to fail.");
            counter.should.equal(3);
          }
        });

        it("should fail if all attempts return a retryable error", async function() {
          let counter = 0;
          try {
            const config: RetryConfig<any> = {
              operation: async () => {
                debug("counter: %d", ++counter);
                await delay(200);
                const e = new MessagingError("I would always like to fail, keep retrying.");
                e.retryable = true;
                throw e;
              },
              connectionId: "connection-1",
              operationType: RetryOperationType.session,
              maxRetries: 4,
              delayInMs: 500,
              minExponentialRetryDelayInMs: 0,
              retryPolicy: retryPolicy
            };
            await retry(config);
          } catch (err) {
            should.exist(err);
            should.equal(true, err instanceof MessagingError);
            err.message.should.equal("I would always like to fail, keep retrying.");
            counter.should.equal(5);
          }
        });

        describe("with config.maxRetries set to Infinity", function() {
          it("should succeed if the operation succeeds.", async function() {
            let counter = 0;
            try {
              const config: RetryConfig<any> = {
                maxRetries: Infinity,
                operation: async () => {
                  debug("counter: %d", ++counter);
                  await delay(200);
                  return {
                    code: 200,
                    description: "OK"
                  };
                },
                connectionId: "connection-1",
                operationType: RetryOperationType.cbsAuth,
                delayInMs: 500,
                minExponentialRetryDelayInMs: 0,
                retryPolicy: retryPolicy
              };
              const result = await retry(config);
              result.code.should.equal(200);
              result.description.should.equal("OK");
              counter.should.equal(1);
            } catch (err) {
              debug("An error occurred in a test that should have succeeded: %O", err);
              throw err;
            }
          });

          it("should fail if the operation returns a non retryable error", async function() {
            let counter = 0;
            try {
              const config: RetryConfig<any> = {
                operation: async () => {
                  debug("counter: %d", ++counter);
                  await delay(200);
                  throw translate({
                    condition: "amqp:precondition-failed",
                    description: "I would like to fail, not retryable."
                  });
                },
                connectionId: "connection-1",
                operationType: RetryOperationType.management,
                maxRetries: Infinity,
                delayInMs: 500,
                minExponentialRetryDelayInMs: 0,
                retryPolicy: retryPolicy
              };
              await retry(config);
            } catch (err) {
              should.exist(err);
              should.equal(true, err instanceof MessagingError);
              err.message.should.equal("I would like to fail, not retryable.");
              counter.should.equal(1);
            }
          });

          it("should succeed if the operation initially fails with a retryable error and then succeeds.", async function() {
            let counter = 0;
            try {
              const config: RetryConfig<any> = {
                operation: async () => {
                  await delay(200);
                  debug("counter: %d", ++counter);
                  if (counter == 1) {
                    throw translate({
                      condition: "com.microsoft:server-busy",
                      description: "The server is busy right now. Retry later."
                    });
                  } else {
                    return {
                      code: 200,
                      description: "OK"
                    };
                  }
                },
                connectionId: "connection-1",
                operationType: RetryOperationType.receiverLink,
                maxRetries: Infinity,
                delayInMs: 500,
                minExponentialRetryDelayInMs: 0,
                retryPolicy: retryPolicy
              };
              const result = await retry(config);
              result.code.should.equal(200);
              result.description.should.equal("OK");
              counter.should.equal(2);
            } catch (err) {
              debug("An error occurred in a test that should have succeeded: %O", err);
              throw err;
            }
          });

          it("should succeed in the last attempt.", async function() {
            let counter = 0;
            try {
              const config: RetryConfig<any> = {
                operation: async () => {
                  await delay(200);
                  debug("counter: %d", ++counter);
                  if (counter == 1) {
                    const e = new MessagingError("A retryable error.");
                    e.retryable = true;
                    throw e;
                  } else if (counter == 2) {
                    const e = new MessagingError("A retryable error.");
                    e.retryable = true;
                    throw e;
                  } else {
                    return {
                      code: 200,
                      description: "OK"
                    };
                  }
                },
                connectionId: "connection-1",
                operationType: RetryOperationType.senderLink,
                maxRetries: Infinity,
                delayInMs: 500,
                minExponentialRetryDelayInMs: 0,
                retryPolicy: retryPolicy
              };
              const result = await retry(config);
              result.code.should.equal(200);
              result.description.should.equal("OK");
              counter.should.equal(3);
            } catch (err) {
              debug("An error occurred in a test that should have succeeded: %O", err);
              throw err;
            }
          });

          it("should fail if the last attempt return a non-retryable error", async function() {
            let counter = 0;
            try {
              const config: RetryConfig<any> = {
                operation: async () => {
                  await delay(200);
                  debug("counter: %d", ++counter);
                  if (counter == 1) {
                    const e = new MessagingError("A retryable error.");
                    e.retryable = true;
                    throw e;
                  } else if (counter == 2) {
                    const e = new MessagingError("A retryable error.");
                    e.retryable = true;
                    throw e;
                  } else {
                    const x: any = {
                      condition: "com.microsoft:message-lock-lost",
                      description: "I would like to fail."
                    };
                    throw x;
                  }
                },
                connectionId: "connection-1",
                operationType: RetryOperationType.sendMessage,
                maxRetries: Constants.defaultMaxRetriesForConnection,
                delayInMs: 1,
                minExponentialRetryDelayInMs: 0,
                retryPolicy: retryPolicy
              };
              await retry(config);
            } catch (err) {
              should.exist(err);
              should.equal(true, err instanceof MessagingError);
              err.message.should.equal("I would like to fail.");
              counter.should.equal(3);
            }
          });
        });
      });
    }
);

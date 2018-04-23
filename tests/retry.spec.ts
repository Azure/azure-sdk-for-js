// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { retry } from "../lib/retry";
import * as chai from "chai";
import { delay, EventHubsError } from "../lib";
import * as debugModule from "debug";
import { translate } from "../lib/errors";
const debug = debugModule("azure:event-hubs:retry-spec");
const should = chai.should();

describe("retry function", function () {
  it("should succeed if the operation succeeds.", async function () {
    let counter = 0;
    try {
      const operation = async () => {
        debug("counter: %d", ++counter);
        await delay(200);
        return {
          code: 200,
          description: "OK"
        }
      };
      const result = await retry(operation);
      result.code.should.equal(200);
      result.description.should.equal("OK");
      counter.should.equal(1);
    } catch (err) {
      debug("An error occurred in a test that should have succeeded: %O", err);
      throw err;
    }
  });

  it("should fail if the operation returns a non retryable error", async function () {
    let counter = 0;
    try {
      const operation = async () => {
        debug("counter: %d", ++counter);
        await delay(200);
        throw new Error("I would like to fail.");
      };
      await retry(operation);
    } catch (err) {
      should.exist(err);
      should.equal(true, err instanceof EventHubsError);
      err.message.should.equal("I would like to fail.");
      counter.should.equal(1);
    }
  });

  it.only("should succeed if the operation initially fails with a retryable error and then succeeds.", async function () {
    let counter = 0;
    try {
      const operation = async () => {
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
      };
      const result = await retry(operation, 3, 0.5);
      result.code.should.equal(200);
      result.description.should.equal("OK");
      counter.should.equal(2);
    } catch (err) {
      debug("An error occurred in a test that should have succeeded: %O", err);
      throw err;
    }
  });

  it("should succeed in the last attempt.", async function () {
    let counter = 0;
    try {
      const operation = async () => {
        await delay(200);
        debug("counter: %d", ++counter);
        if (counter == 1) {
          const e = new EventHubsError("A retryable error.");
          e.retryable = true;
          throw e;
        } else if (counter == 2) {
          const e = new EventHubsError("A retryable error.");
          e.retryable = true;
          throw e;
        } else {
          return {
            code: 200,
            description: "OK"
          };
        }
      };
      const result = await retry(operation, 3, 0.5);
      result.code.should.equal(200);
      result.description.should.equal("OK");
      counter.should.equal(3);
    } catch (err) {
      debug("An error occurred in a test that should have succeeded: %O", err);
      throw err;
    }
  });

  it("should fail if the last attempt return a non-retryable error", async function () {
    let counter = 0;
    try {
      const operation = async () => {
        await delay(200);
        debug("counter: %d", ++counter);
        if (counter == 1) {
          const e = new EventHubsError("A retryable error.");
          e.retryable = true;
          throw e;
        } else if (counter == 2) {
          const e = new EventHubsError("A retryable error.");
          e.retryable = true;
          throw e;
        } else {
          throw new Error("I would like to fail.");
        }
      };
      await retry(operation, 3, 0.5);
    } catch (err) {
      should.exist(err);
      should.equal(true, err instanceof EventHubsError);
      err.message.should.equal("I would like to fail.");
      counter.should.equal(3);
    }
  });

  it("should fail if all attempts return a retryable error", async function () {
    let counter = 0;
    try {
      const operation = async () => {
        debug("counter: %d", ++counter);
        await delay(200);
        const e = new EventHubsError("I would always like to fail, keep retrying.");
        e.retryable = true;
        throw e;
      };
      await retry(operation, 4, 0.5);
    } catch (err) {
      should.exist(err);
      should.equal(true, err instanceof EventHubsError);
      err.message.should.equal("I would always like to fail, keep retrying.");
      counter.should.equal(4);
    }
  });
});

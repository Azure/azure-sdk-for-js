// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import "mocha";
import * as chai from "chai";
const should = chai.should();
import * as chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import { Namespace } from "../lib";

describe("Errors when receive from non existing Queue/Topic/Subscription", function() {
  let namespace: Namespace;
  let errorWasThrown: boolean;
  beforeEach(() => {
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests.";
    }
    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error, entityPath: string) => {
    should.equal(err.name, "MessagingEntityNotFoundError");
    should.equal(
      err.message.startsWith(
        `The messaging entity '${namespace.name}${entityPath}' could not be found.`
      ),
      true
    );
    errorWasThrown = true;
  };

  it("throws when receiving batch data from a non existing queue", async function() {
    const client = namespace.createQueueClient("some-name");
    const receivePromise = client.receiveBatch(1).catch((err) => testError(err, "some-name"));

    return receivePromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when receiving batch data from a non existing subscription", function() {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receivePromise = client
      .receiveBatch(1)
      .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

    return receivePromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when receving streaming data from a non existing queue", function() {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    const receiveHandler = client.receive(onMessage, (err) => testError(err, "some-name"));

    const testPromise = new Promise((resolve) => {
      setTimeout(() => {
        should.equal(errorWasThrown, true);
        receiveHandler.stop();
        resolve();
      }, 1000);
    });

    return testPromise;
  });

  it("throws when receving streaming data from a non existing subscription", function() {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    const receiveHandler = client.receive(onMessage, (err) =>
      testError(err, "some-topic-name/Subscriptions/some-subscription-name")
    );

    const testPromise = new Promise((resolve) => {
      setTimeout(() => {
        should.equal(errorWasThrown, true);
        receiveHandler.stop();
        resolve();
      }, 1000);
    });

    return testPromise;
  });
});

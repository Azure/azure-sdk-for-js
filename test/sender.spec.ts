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

describe("Errors when send to non existing Queue/Topic", function() {
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

  const testError = (err: Error) => {
    should.equal(err.name, "MessagingEntityNotFoundError");
    should.equal(err.message.startsWith(`The messaging entity '${namespace.name}some-name'`), true);
    errorWasThrown = true;
  };

  it("throws when sending data to a non existing queue", async function() {
    const client = namespace.createQueueClient("some-name");
    const sendPromise = client.send({ body: "hello" }).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when sending data to a non existing topic", function() {
    const client = namespace.createTopicClient("some-name");
    const sendPromise = client.send({ body: "hello" }).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when sending batch data to a non existing queue", async function() {
    const client = namespace.createQueueClient("some-name");
    const sendPromise = client.sendBatch([{ body: "hello" }]).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when sending batch data to a non existing topic", function() {
    const client = namespace.createTopicClient("some-name");
    const sendPromise = client.sendBatch([{ body: "hello" }]).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });
});

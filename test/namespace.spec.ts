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

function testFalsyValues(testFn: Function) {
  [null, undefined, "", 0].forEach(function(value) {
    testFn(value);
  });
}

describe("Create Namespace", function() {
  describe(".fromConnectionString", function() {
    it("throws when there is no connection string", function() {
      testFalsyValues(function(value: any) {
        const test = function() {
          return Namespace.createFromConnectionString(value);
        };
        test.should.throw(
          Error,
          "'connectionString' is a required parameter and must be of type: 'string'."
        );
      });
    });

    it("creates an Namespace from a connection string", function() {
      const namespace = Namespace.createFromConnectionString(
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
      );
      namespace.should.be.an.instanceof(Namespace);
      should.equal(namespace.name, "sb://a/");
    });
  });
});

describe("Create Queue/Topic/Subscription Clients with no name", function() {
  let namespace: Namespace;
  beforeEach(() => {
    namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
  });
  afterEach(() => {
    return namespace.close();
  });

  it("throws when creating queue client with no name", function() {
    testFalsyValues(function(value: any) {
      const test = function() {
        return namespace.createQueueClient(value);
      };
      test.should.throw(Error, "'queueName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws when creating topic client with no name", function() {
    testFalsyValues(function(value: any) {
      const test = function() {
        return namespace.createTopicClient(value);
      };
      test.should.throw(Error, "'topicName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws when creating subscription client with no topic name", function() {
    testFalsyValues(function(value: any) {
      const test = function() {
        return namespace.createSubscriptionClient(value, "some-name");
      };
      test.should.throw(Error, "'topicName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws when creating subscription client with no subscription name", function() {
    testFalsyValues(function(value: any) {
      const test = function() {
        return namespace.createSubscriptionClient("some-name", value);
      };
      test.should.throw(
        Error,
        "'subscriptionName' is a required parameter and must be of type 'string'."
      );
    });
  });
});

describe("Errors when send/receive to/from non existing Namespace", function() {
  let namespace: Namespace;
  let errorWasThrown: boolean;
  beforeEach(() => {
    namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error) => {
    should.equal(err.name, "ServiceCommunicationError");
    should.equal(err.message, "getaddrinfo ENOTFOUND a a:5671");
    errorWasThrown = true;
  };

  it("throws when sending data via a queueClient to a non existing namespace", function() {
    const client = namespace.createQueueClient("some-name");
    const sendPromise = client.send({ body: "hello" }).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when sending data via a topicClient to a non existing namespace", function() {
    const client = namespace.createTopicClient("some-name");
    const sendPromise = client.send({ body: "hello" }).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when sending batch data via a queueClient to a non existing namespace", function() {
    const client = namespace.createQueueClient("some-name");
    const sendPromise = client.sendBatch([{ body: "hello" }]).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when sending batch data via a topicClient to a non existing namespace", function() {
    const client = namespace.createTopicClient("some-name");
    const sendPromise = client.sendBatch([{ body: "hello" }]).catch(testError);

    return sendPromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when receving batch data via a queueClient from a non existing namespace", function() {
    const client = namespace.createQueueClient("some-name");
    const receivePromise = client.receiveBatch(10).catch(testError);

    return receivePromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when receving batch data via a subscriptionClient from a non existing namespace", function() {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receivePromise = client.receiveBatch(10).catch(testError);

    return receivePromise.then(() => should.equal(errorWasThrown, true));
  });

  it("throws when receving streaming data via a queueClient from a non existing namespace", function() {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };

    const receiveHandler = client.receive(onMessage, testError);

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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import { ServiceBusMessageBatchImpl } from "../../../src/serviceBusMessageBatch";
import { ConnectionContext } from "../../../src/connectionContext";
import { ServiceBusMessage } from "../../../src";
import { isServiceBusMessageBatch, ServiceBusSenderImpl } from "../../../src/sender";
import { createConnectionContextForTests } from "./unittestUtils";
import {
  errorInvalidMessageTypeSingleOrArray,
  errorInvalidMessageTypeSingle,
  PartitionKeySessionIdMismatchError,
} from "../../../src/util/errors";

const assert = chai.assert;

describe("Sender helper unit tests", () => {
  it("isServiceBusMessageBatch", () => {
    assert.isTrue(
      isServiceBusMessageBatch(new ServiceBusMessageBatchImpl({} as ConnectionContext, 100))
    );

    assert.isFalse(isServiceBusMessageBatch(undefined));
    assert.isFalse(isServiceBusMessageBatch(4 as any as ServiceBusMessage));
    assert.isFalse(isServiceBusMessageBatch({} as any as ServiceBusMessage));
  });
});

describe("sender unit tests", () => {
  const fakeContext = createConnectionContextForTests();
  const sender = new ServiceBusSenderImpl(fakeContext, "fakeEntityPath");
  sender["_sender"].createBatch = async () => {
    return new ServiceBusMessageBatchImpl(fakeContext, 100);
  };

  const partitionKeySessionIdMismatchMsg = {
    body: "boooo",
    sessionId: "my-sessionId",
    partitionKey: "my-partitionKey",
  };
  const badMessages = [
    "hello",
    {},
    123,
    null,
    undefined,
    ["hello"],
    partitionKeySessionIdMismatchMsg,
  ];

  badMessages.forEach((invalidValue) => {
    it(`don't allow Sender.sendMessages(${invalidValue})`, async () => {
      let expectedErrorMsg = errorInvalidMessageTypeSingleOrArray;
      if (invalidValue === null || invalidValue === undefined) {
        expectedErrorMsg = `Missing parameter "messages"`;
      }
      if (invalidValue === partitionKeySessionIdMismatchMsg) {
        expectedErrorMsg = PartitionKeySessionIdMismatchError;
      }

      try {
        await sender.sendMessages(
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          invalidValue
        );
        assert.fail("You should not be seeing this.");
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(err.message, expectedErrorMsg);
      }
    });
  });

  badMessages.forEach((invalidValue) => {
    it(`don't allow tryAdd(${invalidValue})`, async () => {
      const batch = await sender.createMessageBatch();
      let expectedErrorMsg = errorInvalidMessageTypeSingle;
      if (invalidValue === null || invalidValue === undefined) {
        expectedErrorMsg = `Missing parameter "message"`;
      }
      if (invalidValue === partitionKeySessionIdMismatchMsg) {
        expectedErrorMsg = PartitionKeySessionIdMismatchError;
      }

      try {
        batch.tryAddMessage(
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          invalidValue
        );
        assert.fail("You should not be seeing this.");
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(err.message, expectedErrorMsg);
      }
    });
  });

  badMessages.forEach((invalidValue) => {
    it(`don't allow Sender.scheduleMessages(${invalidValue})`, async () => {
      let expectedErrorMsg = errorInvalidMessageTypeSingleOrArray;
      if (invalidValue === null || invalidValue === undefined) {
        expectedErrorMsg = `Missing parameter "messages"`;
      }
      if (invalidValue === partitionKeySessionIdMismatchMsg) {
        expectedErrorMsg = PartitionKeySessionIdMismatchError;
      }

      try {
        await sender.scheduleMessages(
          // @ts-expect-error We are trying invalid types on purpose to test the error thrown
          invalidValue,
          new Date()
        );
        assert.fail("You should not be seeing this.");
      } catch (err) {
        assert.equal(err.name, "TypeError");
        assert.equal(err.message, expectedErrorMsg);
      }
    });
  });
});

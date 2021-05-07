// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessagingError, ServiceBusReceiver, ServiceBusSender } from "../../../src";
import { ConnectionContext } from "../../../src/connectionContext";
import { ReceiveOptions } from "../../../src/core/messageReceiver";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";
import { TestClientType } from "../../public/utils/testUtils";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests
} from "../../public/utils/testutils2";

/**
 * Create and initialize a streaming receiver using a given context and entityPath.
 *
 * Defaults to peekLock, with no auto lock renewal.
 */
export async function createAndInitStreamingReceiverForTest(
  context: ConnectionContext,
  entityPath: string,
  receiveOptions?: ReceiveOptions
): Promise<StreamingReceiver> {
  const streamingReceiver = new StreamingReceiver(
    context,
    entityPath,
    receiveOptions ?? {
      receiveMode: "peekLock",
      lockRenewer: undefined
    }
  );

  let err: Error | MessagingError | undefined;

  await streamingReceiver.init({
    useNewName: false,
    connectionId: context.connectionId,
    onError: (args) => {
      err = args.error;
    }
  });

  if (err) {
    throw err;
  }

  return streamingReceiver;
}

export function addServiceBusClientForLiveTesting(
  testClientType: TestClientType
): {
  client(): ServiceBusClientForTests;
  sender(): ServiceBusSender;
  receiver(): ServiceBusReceiver;
} {
  let client: ServiceBusClientForTests;
  let sender: ServiceBusSender;
  let receiver: ServiceBusReceiver;

  before(() => {
    client = createServiceBusClientForTests();
  });

  beforeEach(async () => {
    const testEntities = await client.test.createTestEntities(testClientType);
    sender = await client.test.createSender(testEntities);
    receiver = await client.test.createReceiveAndDeleteReceiver(testEntities);
  });

  afterEach(() => client.test.afterEach());
  after(() => client.test.after());

  return {
    client: () => client,
    sender: () => sender,
    receiver: () => receiver
  };
}

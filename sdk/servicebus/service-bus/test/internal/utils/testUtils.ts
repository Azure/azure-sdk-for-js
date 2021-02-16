// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessagingError } from "../../../src";
import { ConnectionContext } from "../../../src/connectionContext";
import { ReceiveOptions } from "../../../src/core/messageReceiver";
import { StreamingReceiver } from "../../../src/core/streamingReceiver";

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

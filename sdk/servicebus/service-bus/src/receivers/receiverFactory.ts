// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  Connection,
  Receiver as RheaReceiver,
  ReceiverOptionsWithSession,
  ReceiverOptions,
  ReceiverEvents,
  EventContext,
  SessionEvents
} from "rhea-promise";
import { getUniqueName } from "../util/utils";

/**
 * @internal
 * @ignore
 */
export type ReceiverFactory = (
  connection: Connection,
  options: ReceiverOptionsWithSession
) => Promise<RheaReceiver>;

/**
 * Creates a function that can be used to create rhea receivers.
 *
 * @internal
 * @ignore
 */
export async function createReceiverFactory(
  connection: Connection,
  receiveMode: "peekLock" | "receiveAndDelete",
  entityPath: string
): Promise<ReceiverFactory> {
  let preinitializedReceiver: RheaReceiver | undefined = await _createBasicReceiver(
    connection,
    receiveMode,
    entityPath
  );

  return async (connection, options) => {
    let receiver: RheaReceiver;

    if (preinitializedReceiver) {
      receiver = preinitializedReceiver;
      preinitializedReceiver = undefined;
    } else {
      receiver = await _createBasicReceiver(connection, receiveMode, entityPath);
    }

    _initializeExistingReceiver(receiver, options);
    return receiver;
  };
}

async function _createBasicReceiver(
  connection: Connection,
  receiveMode: "peekLock" | "receiveAndDelete",
  entityPath: string
) {
  const rheaReceiverOptions: ReceiverOptions = {
    name: getUniqueName(entityPath),
    autoaccept: receiveMode === "receiveAndDelete" ? true : false,
    // receiveAndDelete -> first(0), peekLock -> second (1)
    rcv_settle_mode: receiveMode === "receiveAndDelete" ? 0 : 1,
    // receiveAndDelete -> settled (1), peekLock -> unsettled (0)
    snd_settle_mode: receiveMode === "receiveAndDelete" ? 1 : 0,
    source: {
      // MessageReceiver does this mapping internally anyways.
      address: entityPath
    },
    credit_window: 0
  };

  return await connection.createReceiver(rheaReceiverOptions);
}

async function _initializeExistingReceiver(
  receiver: RheaReceiver,
  options: Pick<
    ReceiverOptionsWithSession,
    "onClose" | "onError" | "onMessage" | "onSessionClose" | "onSessionError" | "onSettled"
  >
) {
  receiver.on(ReceiverEvents.message, (context: EventContext) => {
    if (options.onMessage) {
      options.onMessage(context);
    }
  });

  receiver.on(ReceiverEvents.receiverClose, (context: EventContext) => {
    if (options.onClose) {
      options.onClose(context);
    }
  });

  receiver.session.on(SessionEvents.sessionClose, (context: EventContext) => {
    if (options?.onSessionClose) {
      options?.onSessionClose(context);
    }
  });

  receiver.session.on(SessionEvents.sessionError, (context: EventContext) => {
    if (options?.onSessionError) {
      options?.onSessionError(context);
    }
  });

  receiver.on(ReceiverEvents.receiverError, (context: EventContext) => {
    if (options?.onError) {
      options?.onError(context);
    }
  });

  receiver.on(ReceiverEvents.settled, (context: EventContext) => {
    if (options?.onSettled) {
      options?.onSettled(context);
    }
  });

  receiver.on(ReceiverEvents.receiverClose, (context: EventContext) => {
    if (options?.onClose) {
      options?.onClose(context);
    }
  });
}

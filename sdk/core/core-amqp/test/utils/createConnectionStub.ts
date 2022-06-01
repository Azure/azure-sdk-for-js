// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Connection } from "rhea-promise";
import EventEmitter from "events";
import { stub } from "sinon";

/**
 * Creates a stubbed rhea-promise Connection object.
 */
export function createConnectionStub(): Connection {
  const connectionStub = new Connection();
  stub(connectionStub, "open").resolves({} as any);
  stub(connectionStub, "createSession").resolves({
    connection: {
      id: "connection-1",
    },
    createSender: () => {
      const sender = new EventEmitter() as any;
      sender.send = () => {
        /* no-op */
      };
      return Promise.resolve(sender);
    },
    createReceiver: () => {
      return Promise.resolve(new EventEmitter());
    },
  } as any);
  stub(connectionStub, "id").get(() => "connection-1");
  return connectionStub;
}

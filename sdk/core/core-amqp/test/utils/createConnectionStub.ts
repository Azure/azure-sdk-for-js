// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Connection } from "rhea-promise";
import EventEmitter from "events";
import { vi } from "vitest";

/**
 * Creates a stubbed rhea-promise Connection object.
 */
export function createConnectionStub(): Connection {
  const connectionStub = new Connection();
  vi.spyOn(connectionStub, "open").mockResolvedValue({} as any);
  vi.spyOn(connectionStub, "createSession").mockResolvedValue({
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
  vi.spyOn(connectionStub, "id", "get").mockReturnValue("connection-1");
  return connectionStub;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Session, Sender, Receiver, Connection as RheaConnection } from "rhea-promise";
import EventEmitter from "events";
import { Connection } from "rhea-promise";
import { vi } from "vitest";

/**
 * Creates a mock rhea-promise Session with EventEmitter behavior.
 */
export function createMockSession(overrides?: Partial<Session>): Session {
  const base: Partial<Session> = {
    connection: {
      id: "connection-1",
    } as RheaConnection,
    createSender: () => {
      return Promise.resolve(createMockSender());
    },
    createReceiver: () => {
      return Promise.resolve(createMockReceiver());
    },
  };
  return { ...base, ...overrides } as Session;
}

/**
 * Creates a mock rhea-promise Sender with send as a no-op and EventEmitter behavior.
 */
export function createMockSender(overrides?: Record<string, unknown>): Sender {
  const sender = new EventEmitter();
  Object.assign(sender, {
    send: () => {
      /* no-op */
    },
    ...overrides,
  });
  return sender as unknown as Sender;
}

/**
 * Creates a mock rhea-promise Receiver with EventEmitter behavior.
 */
export function createMockReceiver(overrides?: Record<string, unknown>): Receiver {
  const receiver = new EventEmitter();
  Object.assign(receiver, overrides);
  return receiver as Receiver;
}

/**
 * Mocks `connectionStub.createSession` to resolve with a mock session.
 */
export function mockCreateSession(
  connectionStub: RheaConnection,
  sessionOverrides?: Partial<Session>,
): void {
  vi.mocked(connectionStub.createSession).mockResolvedValue(createMockSession(sessionOverrides));
}

/**
 * Creates a stubbed rhea-promise Connection object.
 */
export function createConnectionStub(): RheaConnection {
  const connectionStub = new Connection();
  vi.spyOn(connectionStub, "open").mockResolvedValue(
    undefined as unknown as Awaited<ReturnType<RheaConnection["open"]>>,
  );
  vi.spyOn(connectionStub, "createSession").mockResolvedValue(createMockSession());
  vi.spyOn(connectionStub, "id", "get").mockReturnValue("connection-1");
  return connectionStub;
}

/**
 * Creates a connection stub with full-featured session/sender/receiver mocks
 * that include isOpen() and remove() methods.
 */
export function createFullConnectionStub(): RheaConnection {
  const connectionStub = new Connection();
  vi.spyOn(connectionStub, "open").mockResolvedValue(
    undefined as unknown as Awaited<ReturnType<RheaConnection["open"]>>,
  );
  vi.spyOn(connectionStub, "createSession").mockResolvedValue(
    createMockSession({
      isOpen: () => true,
      remove: vi.fn(),
      close: vi.fn(),
      createSender: () => {
        return Promise.resolve(
          createMockSender({
            isOpen: () => true,
            remove: vi.fn(),
            close: vi.fn(),
          }),
        );
      },
      createReceiver: () => {
        return Promise.resolve(
          createMockReceiver({
            isOpen: () => true,
            remove: vi.fn(),
            close: vi.fn(),
          }),
        );
      },
    } as Partial<Session>),
  );
  vi.spyOn(connectionStub, "id", "get").mockReturnValue("connection-1");
  return connectionStub;
}

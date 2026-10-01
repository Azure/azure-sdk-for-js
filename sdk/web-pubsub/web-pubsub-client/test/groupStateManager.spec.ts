// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { GroupStateManager } from "../src/groupStateManager.js";

describe("GroupStateManager", () => {
  it("applies updates before snapshot and preserves newer entries", () => {
    const manager = new GroupStateManager();

    expect(
      manager.applyUpdates(
        [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "typing" },
            updatedAt: 20,
          },
          {
            connectionId: "conn2",
            userId: "user2",
            updatedAt: 25,
          },
        ],
        1000,
      ),
    ).toBe(true);

    expect(manager.listStates()).toEqual([
      {
        connectionId: "conn1",
        userId: "user1",
        state: { status: "typing" },
        updatedAt: 20,
      },
    ]);

    expect(
      manager.applySnapshot([
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "idle" },
          updatedAt: 10,
        },
        {
          connectionId: "conn3",
          userId: "user3",
          state: { hand: "raised" },
          updatedAt: 15,
        },
      ]),
    ).toBe(true);

    expect(manager.listStates()).toEqual([
      {
        connectionId: "conn1",
        userId: "user1",
        state: { status: "typing" },
        updatedAt: 20,
      },
      {
        connectionId: "conn3",
        userId: "user3",
        state: { hand: "raised" },
        updatedAt: 15,
      },
    ]);
  });

  it("keeps recent real-time updates that are missing from a snapshot", () => {
    const manager = new GroupStateManager();

    manager.applySnapshot([
      {
        connectionId: "snapshotConn",
        userId: "snapshotUser",
        state: { status: "snapshot" },
        updatedAt: 10,
      },
    ]);

    manager.applyUpdates(
      [
        {
          connectionId: "updatedConn",
          userId: "updatedUser",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ],
      1000,
    );

    manager.applySnapshot([], 1001);

    expect(manager.listStates()).toEqual([
      {
        connectionId: "updatedConn",
        userId: "updatedUser",
        state: { status: "typing" },
        updatedAt: 20,
      },
    ]);
  });

  it("prunes recent real-time updates after the retention window", () => {
    const manager = new GroupStateManager();

    manager.applyUpdates(
      [
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ],
      1000,
    );

    manager.applySnapshot([], 1000 + 5 * 60 * 1000);

    expect(manager.listStates()).toEqual([]);
  });

  it("keeps clears hidden so stale snapshots do not resurrect state", () => {
    const manager = new GroupStateManager();

    manager.applyUpdates(
      [
        {
          connectionId: "conn1",
          userId: "user1",
          updatedAt: 30,
        },
      ],
      1000,
    );

    manager.applySnapshot(
      [
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ],
      1001,
    );

    expect(manager.listStates()).toEqual([]);
  });

  it("allows snapshots after an expired clear marker", () => {
    const manager = new GroupStateManager();

    manager.applyUpdates(
      [
        {
          connectionId: "conn1",
          userId: "user1",
          updatedAt: 30,
        },
      ],
      1000,
    );

    manager.applySnapshot(
      [
        {
          connectionId: "conn1",
          userId: "user1",
          state: { status: "typing" },
          updatedAt: 20,
        },
      ],
      1000 + 5 * 60 * 1000,
    );

    expect(manager.listStates()).toEqual([
      {
        connectionId: "conn1",
        userId: "user1",
        state: { status: "typing" },
        updatedAt: 20,
      },
    ]);
  });

  it("ignores stale updates and hides clears", () => {
    const manager = new GroupStateManager();

    manager.applySnapshot([
      {
        connectionId: "conn1",
        userId: "user1",
        state: { status: "typing" },
        updatedAt: 20,
      },
      {
        connectionId: "conn2",
        userId: "user2",
        state: { hand: "raised" },
        updatedAt: 21,
      },
    ]);

    expect(
      manager.applyUpdates(
        [
          {
            connectionId: "conn1",
            userId: "user1",
            state: { status: "idle" },
            updatedAt: 19,
          },
          {
            connectionId: "conn2",
            userId: "user2",
            updatedAt: 22,
          },
        ],
        1000,
      ),
    ).toBe(true);

    expect(manager.listStates()).toEqual([
      {
        connectionId: "conn1",
        userId: "user1",
        state: { status: "typing" },
        updatedAt: 20,
      },
    ]);
  });

  it("does not expose mutable state records", () => {
    const manager = new GroupStateManager();

    manager.applySnapshot([
      {
        connectionId: "conn1",
        userId: "user1",
        state: { status: "typing" },
        updatedAt: 20,
      },
    ]);

    const states = manager.listStates();
    states[0].state!.status = "mutated";

    expect(manager.listStates()[0].state).toEqual({ status: "typing" });
  });

  it("caps retained clear records and trims the oldest clear records first", () => {
    const manager = new GroupStateManager();

    for (let index = 0; index < 201; index++) {
      manager.applyUpdates(
        [
          {
            connectionId: `conn${index}`,
            updatedAt: 1000 + index,
          },
        ],
        1000 + index,
      );
    }

    manager.applySnapshot(
      [
        {
          connectionId: "conn0",
          state: { status: "oldest" },
          updatedAt: 1,
        },
        {
          connectionId: "conn200",
          state: { status: "newest" },
          updatedAt: 1,
        },
      ],
      1201,
    );

    expect(manager.listStates()).toEqual([
      {
        connectionId: "conn0",
        userId: undefined,
        state: { status: "oldest" },
        updatedAt: 1,
      },
    ]);
  });
});

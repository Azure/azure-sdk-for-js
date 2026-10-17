// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assertEnvironmentVariable, type Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import {
  BuiltInChatRoles,
  KnownChatTopicState,
  WebPubSubChatServiceClient,
} from "@azure/web-pubsub-chat";
import { createRecorder } from "./utils/recordedClient.js";
import { afterEach, assert, beforeEach, describe, expect, it } from "vitest";

describe("2026-08-01-preview operations", () => {
  let recorder: Recorder;
  let client: WebPubSubChatServiceClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    const endpoint = assertEnvironmentVariable("WPS_CHAT_ENDPOINT");
    const credential = createTestCredential();
    client = new WebPubSubChatServiceClient(
      endpoint,
      credential,
      "test_hub",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    await recorder?.stop();
  });

  it("lists rooms and users, and resumes their pages", async () => {
    const suffix = recorder.variable("suffix", String(Date.now()));
    const roomIds = [`list-room-a-${suffix}`, `list-room-b-${suffix}`];
    const userIds = [`list-user-a-${suffix}`, `list-user-b-${suffix}`];
    try {
      for (const roomId of roomIds) {
        await client.createOrReplaceRoom(roomId, { title: roomId });
      }
      for (const userId of userIds) {
        await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: userId,
          roleName: BuiltInChatRoles.UserNormal,
        });
      }

      const rooms = [];
      for await (const room of client.listRooms({ maxPageSize: 1 })) {
        rooms.push(room.id);
      }
      assert.includeMembers(rooms, roomIds);
      const users = [];
      for await (const user of client.listUsers({ maxPageSize: 1 })) {
        users.push(user.id);
        assert.equal(user.kind, "Human");
      }
      assert.includeMembers(users, userIds);

      const roomPage = await client.listRooms({ maxPageSize: 1 }).byPage().next();
      assert.lengthOf(roomPage.value, 1);
      assert.isString(roomPage.value.continuationToken);
      const nextRoomPage = await client
        .listRooms({ maxPageSize: 1 })
        .byPage({ continuationToken: roomPage.value.continuationToken })
        .next();
      assert.lengthOf(nextRoomPage.value, 1);
      assert.notEqual(nextRoomPage.value[0].id, roomPage.value[0].id);

      const userPage = await client.listUsers({ maxPageSize: 1 }).byPage().next();
      assert.lengthOf(userPage.value, 1);
      assert.isString(userPage.value.continuationToken);
      const nextUserPage = await client
        .listUsers({ maxPageSize: 1 })
        .byPage({ continuationToken: userPage.value.continuationToken })
        .next();
      assert.lengthOf(nextUserPage.value, 1);
      assert.notEqual(nextUserPage.value[0].id, userPage.value[0].id);
    } finally {
      for (const roomId of roomIds) {
        await client.deleteRoom(roomId);
      }
      for (const userId of userIds) {
        await client.deleteUser(userId);
      }
    }
  });

  it("lists rooms for a user with empty results and continuation", async () => {
    const suffix = recorder.variable("suffix", String(Date.now()));
    const userId = `member-${suffix}`;
    const roomIds = [`member-room-a-${suffix}`, `member-room-b-${suffix}`];
    try {
      await client.createOrReplaceUser(userId, {
        kind: "Human",
        nickname: "Member",
        roleName: BuiltInChatRoles.UserNormal,
      });
      const empty = await client.listRoomsForUser(userId).byPage().next();
      assert.lengthOf(empty.value, 0);
      for (const roomId of roomIds) {
        await client.createOrReplaceRoom(roomId, { title: roomId });
        await client.createOrReplaceRoomMember(roomId, userId, {
          roleName: BuiltInChatRoles.RoomMember,
        });
      }
      const rooms = [];
      for await (const room of client.listRoomsForUser(userId, { maxPageSize: 1 })) {
        rooms.push(room.id);
      }
      assert.sameMembers(rooms, roomIds);
      const first = await client.listRoomsForUser(userId, { maxPageSize: 1 }).byPage().next();
      assert.lengthOf(first.value, 1);
      assert.isString(first.value.continuationToken);
      const second = await client
        .listRoomsForUser(userId, { maxPageSize: 1 })
        .byPage({ continuationToken: first.value.continuationToken })
        .next();
      assert.lengthOf(second.value, 1);
      assert.notEqual(second.value[0].id, first.value[0].id);
      const continuationToken = new URL(first.value.continuationToken!).searchParams.get(
        "continuationToken",
      );
      assert.isString(continuationToken);
      const resumed = await client
        .listRoomsForUser(userId, {
          maxPageSize: 1,
          continuationToken: continuationToken!,
        })
        .byPage()
        .next();
      assert.equal(resumed.value[0].id, second.value[0].id);
    } finally {
      for (const roomId of roomIds) {
        await client.deleteRoom(roomId);
      }
      await client.deleteUser(userId);
    }
  });

  it("creates, gets, replaces, updates, lists, and soft deletes topics", async () => {
    const roomId = recorder.variable("roomId", `topic-room-${Date.now()}`);
    try {
      await client.createOrReplaceRoom(roomId, { title: "Topics" });
      const initial = await client.listTopics(roomId).byPage().next();
      assert.lengthOf(initial.value, 1);
      assert.equal(initial.value[0].title, "Topics");
      const created = await client.createOrReplaceTopic(roomId, "first", { title: "First" });
      assert.equal(created.id, "first");
      assert.equal(created.title, "First");
      assert.equal(created.state, KnownChatTopicState.Normal);
      assert.instanceOf(created.createdAt, Date);
      assert.match(created.conversationId, /^c\./);
      const fetched = await client.getTopic(roomId, "first");
      assert.equal(fetched.etag, created.etag);
      const replaced = await client.createOrReplaceTopic(
        roomId,
        "first",
        { title: "Replaced" },
        { ifMatch: created.etag },
      );
      assert.equal(replaced.title, "Replaced");
      const updated = await client.updateTopic(
        roomId,
        "first",
        { state: KnownChatTopicState.Archived },
        { ifMatch: replaced.etag },
      );
      assert.equal(updated.title, "Replaced");
      assert.equal(updated.state, KnownChatTopicState.Archived);
      await client.createOrReplaceTopic(roomId, "second", { title: "Second" });
      const topics = [];
      for await (const topic of client.listTopics(roomId, { maxPageSize: 1 })) {
        topics.push(topic.id);
      }
      assert.includeMembers(topics, ["first", "second", initial.value[0].id]);
      const first = await client.listTopics(roomId, { maxPageSize: 1 }).byPage().next();
      assert.lengthOf(first.value, 1);
      assert.isString(first.value.continuationToken);
      const second = await client
        .listTopics(roomId, { maxPageSize: 1 })
        .byPage({ continuationToken: first.value.continuationToken })
        .next();
      assert.lengthOf(second.value, 1);
      assert.notEqual(second.value[0].id, first.value[0].id);
      await client.deleteTopic(roomId, "first", { ifMatch: updated.etag });
      await expect(client.getTopic(roomId, "first")).rejects.toMatchObject({ statusCode: 404 });
      await client.deleteTopic(roomId, "second");
    } finally {
      await client.deleteRoom(roomId);
    }
  });

  it("rejects missing topics and conditional writes", async () => {
    const roomId = recorder.variable("roomId", `topic-errors-${Date.now()}`);
    try {
      await client.createOrReplaceRoom(roomId, { title: "Conditional topics" });
      await expect(client.getTopic(roomId, "missing")).rejects.toMatchObject({ statusCode: 404 });
      const created = await client.createOrReplaceTopic(
        roomId,
        "conditional",
        { title: "Original" },
        { ifNoneMatch: "*" },
      );
      await expect(
        client.createOrReplaceTopic(
          roomId,
          "conditional",
          { title: "Duplicate" },
          { ifNoneMatch: "*" },
        ),
      ).rejects.toMatchObject({ statusCode: 412 });
      const updated = await client.updateTopic(
        roomId,
        "conditional",
        { title: "Updated" },
        { ifMatch: created.etag },
      );
      assert.equal(updated.title, "Updated");
      assert.equal(updated.state, KnownChatTopicState.Normal);
      await expect(
        client.updateTopic(roomId, "conditional", { title: "Stale" }, { ifMatch: created.etag }),
      ).rejects.toMatchObject({ statusCode: 412 });
      await expect(
        client.deleteTopic(roomId, "conditional", { ifMatch: created.etag }),
      ).rejects.toMatchObject({ statusCode: 412 });
      await client.deleteTopic(roomId, "conditional", { ifMatch: updated.etag });
    } finally {
      await client.deleteRoom(roomId);
    }
  });
});

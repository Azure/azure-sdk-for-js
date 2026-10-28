// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  assertEnvironmentVariable,
  isPlaybackMode,
  type Recorder,
} from "@azure-tools/test-recorder";
import {
  BuiltInChatRoles,
  KnownChatPermission,
  KnownChatTopicState,
  WebPubSubChatServiceClient,
} from "@azure/web-pubsub-chat";
import { createRecorder } from "./utils/recordedClient.js";
import { createChatMessage } from "./utils/chatClient.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, beforeEach, afterEach, expect } from "vitest";

describe("", () => {
  let client: WebPubSubChatServiceClient;
  let recorder: Recorder;
  const isLocalAuthEnabled = process.env.WPS_CHAT_DISABLE_LOCAL_AUTH !== "true";

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = new WebPubSubChatServiceClient(
      assertEnvironmentVariable("WPS_CHAT_ENDPOINT"),
      createTestCredential(),
      "test_hub",
      recorder.configureClientOptions({}),
    );
  });

  afterEach(async () => {
    if (recorder) {
      await recorder.stop();
    }
  });

  describe("roles", () => {
    const roleName = "user.test_role";

    it.runIf(isPlaybackMode() || isLocalAuthEnabled)(
      "lists roles using a connection string",
      async () => {
        const connectionStringClient = new WebPubSubChatServiceClient(
          assertEnvironmentVariable("WPS_CHAT_CONNECTION_STRING"),
          "test_hub",
          recorder.configureClientOptions({}),
        );
        const roles: string[] = [];
        for await (const role of connectionStringClient.listRoles()) {
          roles.push(role.name!);
        }
        assert.isArray(roles);
      },
    );

    it("creates, gets, and deletes a role", async () => {
      // Create
      const created = await client.createOrReplaceRole(roleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });
      assert.equal(created.name, roleName);

      // Get
      const fetched = await client.getRole(roleName);
      assert.equal(fetched.name, roleName);

      // Delete
      await client.deleteRole(roleName);
    });

    it("creates a role only when it does not exist", async () => {
      const createOnlyRoleName = "user.create_only_test_role";

      try {
        const created = await client.createOrReplaceRole(
          createOnlyRoleName,
          { permissions: [KnownChatPermission.UserCreateRoom] },
          { ifNoneMatch: "*" },
        );
        assert.equal(created.name, createOnlyRoleName);

        await expect(
          client.createOrReplaceRole(
            createOnlyRoleName,
            { permissions: [KnownChatPermission.UserFetchAllRooms] },
            { ifNoneMatch: "*" },
          ),
        ).rejects.toMatchObject({ statusCode: 412 });
      } finally {
        await client.deleteRole(createOnlyRoleName).catch(() => undefined);
      }
    });

    it("rejects replacing a role with a stale ETag", async () => {
      const etagRoleName = "user.etag_test_role";

      try {
        const created = await client.createOrReplaceRole(etagRoleName, {
          permissions: [KnownChatPermission.UserCreateRoom],
        });
        const replaced = await client.createOrReplaceRole(
          etagRoleName,
          {
            permissions: [
              KnownChatPermission.UserCreateRoom,
              KnownChatPermission.UserFetchAllRooms,
            ],
          },
          { ifMatch: created.etag },
        );
        assert.notEqual(replaced.etag, created.etag);

        await expect(
          client.createOrReplaceRole(
            etagRoleName,
            { permissions: [KnownChatPermission.UserCreateRoom] },
            { ifMatch: created.etag },
          ),
        ).rejects.toMatchObject({ statusCode: 412 });
      } finally {
        await client.deleteRole(etagRoleName).catch(() => undefined);
      }
    });

    it("lists roles", async () => {
      const userRoleName = "user.list_test_role";
      const roomRoleName = "room.list_test_role";

      await client.createOrReplaceRole(userRoleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });
      await client.createOrReplaceRole(roomRoleName, {
        permissions: [KnownChatPermission.RoomPublishMessage],
      });

      try {
        const roles: string[] = [];
        for await (const role of client.listRoles()) {
          roles.push(role.name!);
        }

        assert.include(roles, userRoleName);
        assert.include(roles, roomRoleName);
      } finally {
        await client.deleteRole(userRoleName);
        await client.deleteRole(roomRoleName);
      }
    });

    it("lists roles by page and resumes from a continuation token", async () => {
      const firstRoleName = "user.pagination_test_role";
      const secondRoleName = "room.pagination_test_role";

      await client.createOrReplaceRole(firstRoleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });
      await client.createOrReplaceRole(secondRoleName, {
        permissions: [KnownChatPermission.RoomPublishMessage],
      });

      try {
        const firstPage = await client.listRoles({ maxPageSize: 1 }).byPage().next();
        assert.lengthOf(firstPage.value!, 1);
        assert.isDefined(firstPage.value!.continuationToken);

        const secondPage = await client
          .listRoles({ maxPageSize: 1 })
          .byPage({ continuationToken: firstPage.value!.continuationToken })
          .next();
        assert.lengthOf(secondPage.value!, 1);
        assert.notEqual(secondPage.value![0].name, firstPage.value![0].name);
      } finally {
        await client.deleteRole(firstRoleName);
        await client.deleteRole(secondRoleName);
      }
    });
  });

  describe("rooms", () => {
    const roomId = "test-room";

    it("creates, gets, and deletes a room", async () => {
      try {
        const created = await client.createOrReplaceRoom(roomId, {
          title: "Test Room",
        });
        assert.equal(created.id, roomId);
        assert.equal(created.title, "Test Room");

        const fetched = await client.getRoom(roomId);
        assert.equal(fetched.id, roomId);
      } finally {
        await client.deleteRoom(roomId);
      }
    });

    it("gets the room conversation and lists its messages", async () => {
      try {
        const room = await client.createOrReplaceRoom(roomId, {
          title: "Conversation Test Room",
        });

        const conversation = await client.getConversation(room.defaultConversation);
        assert.equal(conversation.id, room.defaultConversation);
        assert.equal(conversation.parentRoom, roomId);

        const messages = [];
        for await (const message of client.listMessages(room.defaultConversation)) {
          messages.push(message);
        }
        assert.isArray(messages);
      } finally {
        await client.deleteRoom(roomId);
      }
    });

    it("returns empty message and member pages for a new room", async () => {
      const emptyRoomId = recorder.variable("emptyPageRoomId", `empty-page-room-${Date.now()}`);
      try {
        const room = await client.createOrReplaceRoom(emptyRoomId, {
          title: "Empty Page Test Room",
        });

        const messages = await client.listMessages(room.defaultConversation).byPage().next();
        const members = await client.listRoomMembers(emptyRoomId).byPage().next();

        assert.deepEqual(messages.value, []);
        assert.deepEqual(members.value, []);
      } finally {
        await client.deleteRoom(emptyRoomId).catch(() => undefined);
      }
    });

    it("creates, updates, and deletes a message", async () => {
      const userId = "test-message-user";
      const userRoleName = "user.test_message_role";
      const roomRoleName = "room.test_message_role";
      const messageText = recorder.variable("messageText", `test message ${Date.now()}`);
      const updatedMessageText = `${messageText} updated`;
      const binaryContent = new Uint8Array([0, 1, 2, 254, 255]);
      let roomId2: string | undefined;
      let conversationId: string | undefined;
      let messageId: string | undefined;

      try {
        await client.createOrReplaceRole(userRoleName, {
          permissions: [KnownChatPermission.UserCreateRoom],
        });
        await client.createOrReplaceRole(roomRoleName, {
          permissions: [KnownChatPermission.RoomPublishMessage],
        });
        await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: "TestMessageUser",
          roleName: userRoleName,
        });
        roomId2 = recorder.variable("messageRoomId", `test-message-room-${Date.now()}`);
        const room = await client.createOrReplaceRoom(roomId2, { title: "Message Test Room" });
        conversationId = room.defaultConversation;

        await client.createOrReplaceRoomMember(roomId2, userId, {
          roleName: roomRoleName,
        });

        // Use the chat client to send a message via WebSocket.
        // Skipped in playback — the recorded REST responses already contain the message.
        if (!isPlaybackMode()) {
          const accessToken = await client.getClientAccessToken({ userId });
          await createChatMessage(accessToken.url, roomId2, messageText);
        }

        const messages = [];
        for await (const message of client.listMessages(conversationId)) {
          messages.push(message);
        }
        const createdMessage = messages.find(
          (message) => message.createdBy === userId && message.content.text === messageText,
        );
        assert.isDefined(createdMessage);
        messageId = createdMessage!.id;

        const updated = await client.updateMessage(conversationId, messageId, {
          createdBy: userId,
          content: { text: updatedMessageText },
        });
        assert.equal(updated.content.text, updatedMessageText);

        const binaryUpdated = await client.updateMessage(conversationId, messageId, {
          createdBy: userId,
          content: { binary: binaryContent },
        });
        assert.deepEqual(binaryUpdated.content.binary, binaryContent);

        await client.deleteMessage(conversationId, messageId);
      } finally {
        if (roomId2) {
          await client.deleteRoom(roomId2).catch(() => undefined);
        }
        await client.deleteUser(userId).catch(() => undefined);
        await client.deleteRole(userRoleName).catch(() => undefined);
        await client.deleteRole(roomRoleName).catch(() => undefined);
      }
    });
  });

  describe("room members", () => {
    const roomId = "test-member-room";
    const userId = "test-member-user";
    const userRoleName = "user.test_member_role";
    const roomRoleName = "room.test_member_role";

    it("creates, lists, and deletes a room member", async () => {
      try {
        await client.createOrReplaceRole(userRoleName, {
          permissions: [KnownChatPermission.UserCreateRoom],
        });
        await client.createOrReplaceRole(roomRoleName, {
          permissions: [KnownChatPermission.RoomPublishMessage],
        });
        await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: "TestMemberUser",
          roleName: userRoleName,
        });
        await client.createOrReplaceRoom(roomId, { title: "Member Test Room" });

        const created = await client.createOrReplaceRoomMember(roomId, userId, {
          roleName: roomRoleName,
        });
        assert.equal(created.userId, userId);
        assert.equal(created.roleName, roomRoleName);

        const members = [];
        for await (const member of client.listRoomMembers(roomId)) {
          members.push(member);
        }
        assert.isTrue(
          members.some((member) => member.userId === userId && member.roleName === roomRoleName),
        );

        await client.deleteRoomMember(roomId, userId);
      } finally {
        await client.deleteRoom(roomId).catch(() => undefined);
        await client.deleteUser(userId).catch(() => undefined);
        await client.deleteRole(userRoleName).catch(() => undefined);
        await client.deleteRole(roomRoleName).catch(() => undefined);
      }
    });
  });

  describe("users", () => {
    const userId = "test-user";
    const roleName = "user.test_user_role";

    it("creates, gets, and deletes a user", async () => {
      await client.createOrReplaceRole(roleName, {
        permissions: [KnownChatPermission.UserCreateRoom],
      });

      try {
        const created = await client.createOrReplaceUser(userId, {
          kind: "Human",
          nickname: "TestUser",
          roleName,
        });
        assert.equal(created.id, userId);
        assert.equal(created.kind, "Human");

        const fetched = await client.getUser(userId);
        assert.equal(fetched.id, userId);
      } finally {
        await client.deleteUser(userId).catch(() => undefined);
        await client.deleteRole(roleName).catch(() => undefined);
      }
    });
  });
});

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

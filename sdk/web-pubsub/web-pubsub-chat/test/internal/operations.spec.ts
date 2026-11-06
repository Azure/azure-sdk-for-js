// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  WebPubSubChatServiceClient,
  KnownChatTopicState,
  type ChatConversation,
  type ChatRoleCreateOrReplace,
  type ChatRoomCreateOrReplace,
  type ChatRoomMemberCreateOrReplace,
  type HumanChatUserCreateOrReplace,
  type ChatMessageUpdate,
  type ChatTopicCreateOrReplace,
  type ChatTopic,
  type ChatTopicState,
  type ChatTopicUpdate,
  type MessageContent,
} from "@azure/web-pubsub-chat";
import {
  createHttpHeaders,
  type HttpClient,
  type PipelineRequest,
} from "@azure/core-rest-pipeline";
import { assert, describe, expect, expectTypeOf, it } from "vitest";

const topic = {
  id: "topic",
  title: "Topic",
  createdAt: "2026-10-09T00:00:00Z",
  createdBy: "user",
  state: "Normal",
  conversationId: "c.room.topic",
  etag: '"one"',
};

function createClient(
  respond: (request: PipelineRequest) => { status?: number; body?: unknown },
  apiVersion?: string,
): WebPubSubChatServiceClient {
  const httpClient: HttpClient = {
    async sendRequest(request) {
      const { status = 200, body } = respond(request);
      return {
        request,
        status,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: body === undefined ? undefined : JSON.stringify(body),
      };
    },
  };
  return new WebPubSubChatServiceClient(
    "https://example.webpubsub.azure.com",
    new AzureKeyCredential("fake-key"),
    "hub",
    { httpClient, apiVersion, retryOptions: { maxRetries: 0 } },
  );
}

describe("operation requests", () => {
  it("maps the conversation parentRoom wire property to roomId", async () => {
    expectTypeOf<keyof ChatConversation>().toEqualTypeOf<"id" | "roomId" | "etag">();
    const client = createClient(() => ({
      body: { id: "c.room.default", parentRoom: "room", etag: '"one"' },
    }));

    const conversation = await client.getConversation("c.room.default");

    assert.deepEqual(conversation, {
      id: "c.room.default",
      roomId: "room",
      etag: '"one"',
    });
    assert.notProperty(conversation, "parentRoom");
  });

  it("follows message-ID next links and resumes message pages with the returned token", async () => {
    const requests: PipelineRequest[] = [];
    const conversationId = "c.room.default";
    const nextLink =
      `https://example.webpubsub.azure.com/api/hubs/hub/chat/conversations/${conversationId}/messages` +
      "?latestMessageId=message%2B2%2F%3D&earliestMessageId=message0&maxpagesize=1";
    const client = createClient((request) => {
      requests.push(request);
      const resumed = new URL(request.url).searchParams.get("latestMessageId") === "message+2/=";
      return {
        body: {
          value: [
            {
              id: resumed ? "message1" : "message+2/=",
              createdBy: "user",
              createdAt: "2026-10-29T00:00:00Z",
              content: { text: resumed ? "Older" : "Newer" },
              etag: '"one"',
            },
          ],
          ...(resumed ? {} : { nextLink }),
        },
      };
    });
    const options = {
      latestMessageId: "message3",
      earliestMessageId: "message0",
      maxPageSize: 1,
      requestOptions: { headers: { "x-test-header": "messages" } },
    };
    const pages = client.listMessages(conversationId, options).byPage();
    const first = await pages.next();
    assert.equal(first.value[0].id, "message+2/=");
    assert.instanceOf(first.value[0].createdAt, Date);
    assert.equal(first.value.continuationToken, nextLink);
    const second = await pages.next();
    assert.equal(second.value[0].id, "message1");
    assert.isUndefined(second.value.continuationToken);
    assert.isTrue((await pages.next()).done);

    const resumed = await client
      .listMessages(conversationId, options)
      .byPage({ continuationToken: first.value.continuationToken })
      .next();
    assert.equal(resumed.value[0].id, "message1");
    const ids: string[] = [];
    for await (const message of client.listMessages(conversationId, options)) {
      ids.push(message.id);
    }
    assert.deepEqual(ids, ["message+2/=", "message1"]);
    assert.lengthOf(requests, 5);
    assert.equal(new URL(requests[0].url).searchParams.get("latestMessageId"), "message3");
    for (const index of [1, 2, 4]) {
      assert.equal(new URL(requests[index].url).searchParams.get("latestMessageId"), "message+2/=");
    }
    for (const request of requests) {
      const url = new URL(request.url);
      assert.equal(url.searchParams.get("api-version"), "2026-08-01-preview");
      assert.equal(url.searchParams.get("earliestMessageId"), "message0");
      assert.equal(url.searchParams.get("maxpagesize"), "1");
      assert.equal(request.headers.get("x-test-header"), "messages");
    }
  });

  it("accepts write inputs without any read-only response properties", async () => {
    expectTypeOf<keyof ChatRoleCreateOrReplace>().toEqualTypeOf<"permissions">();
    expectTypeOf<keyof ChatRoomCreateOrReplace>().toEqualTypeOf<"title">();
    expectTypeOf<keyof ChatRoomMemberCreateOrReplace>().toEqualTypeOf<"roleName">();
    expectTypeOf<keyof HumanChatUserCreateOrReplace>().toEqualTypeOf<
      "kind" | "nickname" | "roleName"
    >();
    expectTypeOf<keyof ChatMessageUpdate>().toEqualTypeOf<"createdBy" | "content">();
    expectTypeOf<keyof ChatTopicCreateOrReplace>().toEqualTypeOf<"title" | "state">();
    expectTypeOf<keyof ChatTopicUpdate>().toEqualTypeOf<"title" | "state">();
    expectTypeOf<ChatMessageUpdate>().toEqualTypeOf<{
      createdBy?: string;
      content?: MessageContent;
    }>();
    expectTypeOf<
      Parameters<WebPubSubChatServiceClient["createOrReplaceUser"]>[1]
    >().toEqualTypeOf<HumanChatUserCreateOrReplace>();
    expectTypeOf<{
      kind: "Human";
      nickname: string;
    }>().not.toMatchTypeOf<HumanChatUserCreateOrReplace>();
    expectTypeOf<{
      kind: "Bot";
      nickname: string;
      roleName: string;
    }>().not.toMatchTypeOf<HumanChatUserCreateOrReplace>();

    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return {
        body: {
          ...topic,
          name: "user.role",
          permissions: [],
          defaultConversation: "c.room.default",
          userId: "user",
          kind: "Human",
          nickname: "User",
          roleName: "user.normal",
          content: { text: "Message" },
        },
      };
    });
    await client.createOrReplaceRole("user.role", { permissions: [] });
    await client.createOrReplaceRoom("room", { title: "Room" });
    await client.createOrReplaceRoomMember("room", "user", { roleName: "room.member" });
    await client.createOrReplaceUser("user", {
      kind: "Human",
      nickname: "User",
      roleName: "user.normal",
    });
    const message = await client.updateMessage("c.room.default", "1", {
      createdBy: "user",
      content: { text: "Message" },
    });
    const created = await client.createOrReplaceTopic("room", "topic", { title: "Topic" });
    await client.updateTopic("room", "topic", { title: "Updated" });
    await client.updateTopic("room", "topic", { state: KnownChatTopicState.Archived });
    assert.deepEqual(
      requests.map((request) => JSON.parse(String(request.body))),
      [
        { permissions: [] },
        { title: "Room" },
        { roleName: "room.member" },
        { kind: "Human", nickname: "User", roleName: "user.normal" },
        { createdBy: "user", content: { text: "Message" } },
        { title: "Topic" },
        { title: "Updated" },
        { state: "Archived" },
      ],
    );
    assert.instanceOf(message.createdAt, Date);
    assert.instanceOf(created.createdAt, Date);
    assert.equal(created.createdBy, topic.createdBy);
    assert.equal(created.conversationId, topic.conversationId);
  });

  it.each([{ title: "Topic" }, { title: "Topic", state: KnownChatTopicState.Archived }])(
    "accepts optional state in topic PUT requests: %j",
    async (input) => {
      expectTypeOf<ChatTopicCreateOrReplace>().toEqualTypeOf<{
        title: string;
        state?: ChatTopicState;
      }>();
      expectTypeOf<{ state: ChatTopicState }>().not.toMatchTypeOf<ChatTopicCreateOrReplace>();
      const requests: PipelineRequest[] = [];
      const client = createClient((request) => {
        requests.push(request);
        return { body: { ...topic, ...input } };
      });
      const result = await client.createOrReplaceTopic("room", "topic", input, {
        ifMatch: '"one"',
      });

      assert.lengthOf(requests, 1);
      assert.equal(requests[0].method, "PUT");
      assert.equal(requests[0].headers.get("if-match"), '"one"');
      assert.deepEqual(JSON.parse(String(requests[0].body)), input);
      assert.equal(result.state, input.state ?? topic.state);
      assert.instanceOf(result.createdAt, Date);
    },
  );

  it("serializes partial message patches without omitted fields", async () => {
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return {
        body: {
          id: "1",
          createdBy: "user",
          content: { text: "Updated" },
          createdAt: "2026-10-14T00:00:00Z",
          etag: '"two"',
        },
      };
    });
    const result = await client.updateMessage(
      "c.room.default",
      "1",
      { content: { text: "Updated" } },
      { ifMatch: '"one"' },
    );
    await client.updateMessage("c.room.default", "1", { createdBy: "user" });
    await client.updateMessage("c.room.default", "1", {
      content: { binary: new Uint8Array([1, 2, 3, 255]) },
    });
    assert.deepEqual(
      requests.map((request) => JSON.parse(String(request.body))),
      [
        { content: { text: "Updated" } },
        { createdBy: "user" },
        { content: { binary: "AQID/w==" } },
      ],
    );
    for (const request of requests) {
      assert.equal(request.method, "PATCH");
      assert.equal(request.headers.get("content-type"), "application/merge-patch+json");
    }
    assert.equal(requests[0].headers.get("if-match"), '"one"');
    assert.equal(result.etag, '"two"');
    assert.instanceOf(result.createdAt, Date);
  });

  it.each([
    { title: "Renamed" },
    { state: KnownChatTopicState.Archived },
    { title: "Renamed", state: KnownChatTopicState.Archived },
  ])("keeps topic PATCH fields optional and response fields required: %j", async (patch) => {
    expectTypeOf<ChatTopicUpdate>().toEqualTypeOf<{
      title?: string;
      state?: ChatTopicState;
    }>();
    expectTypeOf<Pick<ChatTopic, "title" | "state">>().toEqualTypeOf<{
      title: string;
      state: ChatTopicState;
    }>();
    expectTypeOf<{}>().not.toMatchTypeOf<ChatTopicCreateOrReplace>();

    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return { body: { ...topic, ...patch } };
    });
    const result = await client.updateTopic("room", "topic", patch, { ifMatch: '"one"' });

    assert.lengthOf(requests, 1);
    assert.equal(requests[0].method, "PATCH");
    assert.equal(requests[0].headers.get("content-type"), "application/merge-patch+json");
    assert.equal(requests[0].headers.get("if-match"), '"one"');
    assert.deepEqual(JSON.parse(String(requests[0].body)), patch);
    assert.equal(result.title, patch.title ?? topic.title);
    assert.equal(result.state, patch.state ?? topic.state);
    assert.equal(result.etag, topic.etag);
    assert.instanceOf(result.createdAt, Date);
  });

  it("preserves unknown user kinds in resource responses", async () => {
    const client = createClient(() => ({
      body: { id: "user", kind: "FutureKind", nickname: "User", etag: '"one"' },
    }));
    const user = await client.getUser("user");
    assert.equal(user.kind, "FutureKind");
    assert.equal(user.id, "user");
    assert.equal(user.nickname, "User");
  });

  it("omits read-only properties when response objects are reused in write requests", async () => {
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return {
        body: {
          ...topic,
          name: "user.role",
          permissions: [],
          defaultConversation: "c.room.default",
          userId: "user",
          kind: "Human",
          nickname: "User",
          roleName: "user.normal",
          content: { text: "Message" },
        },
      };
    });
    const etag = '"one"';
    await client.createOrReplaceRole("user.role", {
      ...{ name: "user.role", etag },
      permissions: [],
    });
    await client.createOrReplaceRoom("room", {
      ...{ id: "room", defaultConversation: "c.room.default", etag },
      title: "Room",
    });
    await client.createOrReplaceRoomMember("room", "user", {
      ...{ userId: "user", etag },
      roleName: "room.member",
    });
    await client.createOrReplaceUser("user", {
      ...{ id: "user", etag },
      kind: "Human",
      nickname: "User",
      roleName: "user.normal",
    });
    await client.updateMessage("c.room.default", "1", {
      ...{ id: "1", createdAt: new Date(), etag },
      createdBy: "user",
      content: { text: "Message" },
    });
    const response = { ...topic, createdAt: new Date(topic.createdAt) };
    await client.createOrReplaceTopic("room", "topic", response);
    await client.updateTopic("room", "topic", response);
    assert.deepEqual(
      requests.map((request) => JSON.parse(String(request.body))),
      [
        { permissions: [] },
        { title: "Room" },
        { roleName: "room.member" },
        { kind: "Human", nickname: "User", roleName: "user.normal" },
        { createdBy: "user", content: { text: "Message" } },
        { title: "Topic", state: "Normal" },
        { title: "Topic", state: "Normal" },
      ],
    );
  });

  it("uses the default API version for room and topic operations and supports override", async () => {
    for (const apiVersion of [undefined, "2026-02-01-preview"]) {
      const urls: URL[] = [];
      const client = createClient((request) => {
        urls.push(new URL(request.url));
        return { body: { ...topic, title: "Room", defaultConversation: "c.room.default" } };
      }, apiVersion);
      await client.getRoom("room");
      await client.getTopic("room", "topic");
      assert.lengthOf(urls, 2);
      for (const url of urls) {
        assert.equal(url.searchParams.get("api-version"), apiVersion ?? "2026-08-01-preview");
      }
    }
  });

  it("serializes create and partial update bodies and conditional headers", async () => {
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      return { status: request.method === "DELETE" ? 204 : 200, body: topic };
    });
    const created = await client.createOrReplaceTopic(
      "room",
      "topic",
      { title: "Topic" },
      { ifNoneMatch: "*" },
    );
    assert.instanceOf(created.createdAt, Date);
    assert.equal(requests[0].body, '{"title":"Topic"}');
    assert.equal(requests[0].headers.get("if-none-match"), "*");
    await client.updateTopic(
      "room",
      "topic",
      { state: KnownChatTopicState.Archived },
      { ifMatch: created.etag },
    );
    assert.equal(requests[1].body, '{"state":"Archived"}');
    assert.equal(requests[1].headers.get("content-type"), "application/merge-patch+json");
    assert.equal(requests[1].headers.get("if-match"), created.etag);
    await client.deleteTopic("room", "topic", { ifMatch: created.etag });
    assert.equal(requests[2].method, "DELETE");
    assert.equal(requests[2].headers.get("if-match"), created.etag);
  });

  it("paginates room, user, user room, and topic lists and preserves the API version on continuation links", async () => {
    const paths = [
      "/api/hubs/hub/chat/rooms",
      "/api/hubs/hub/chat/users",
      "/api/hubs/hub/chat/users/user/rooms",
      "/api/hubs/hub/chat/rooms/room/topics",
    ];
    const requests: PipelineRequest[] = [];
    const client = createClient((request) => {
      requests.push(request);
      const url = new URL(request.url);
      const value = url.pathname.endsWith("topics")
        ? topic
        : url.pathname.endsWith("users")
          ? { id: "user", kind: "Human", nickname: "User", roleName: "user.normal", etag: '"one"' }
          : { id: "room", title: "Room", defaultConversation: "c.room.default", etag: '"one"' };
      return {
        body: {
          value: [value],
          ...(url.searchParams.has("continuationToken")
            ? {}
            : { nextLink: `${url.origin}${url.pathname}?continuationToken=next&maxpagesize=1` }),
        },
      };
    });
    const iterators = [
      client.listRooms({ maxPageSize: 1 }),
      client.listUsers({ maxPageSize: 1 }),
      client.listRoomsForUser("user", { maxPageSize: 1 }),
      client.listTopics("room", { maxPageSize: 1 }),
    ];
    for (const [index, iterator] of iterators.entries()) {
      const first = await iterator.byPage().next();
      assert.lengthOf(first.value, 1);
      assert.isString(first.value.continuationToken);
      const next = await iterator
        .byPage({ continuationToken: first.value.continuationToken })
        .next();
      assert.lengthOf(next.value, 1);
      assert.equal(new URL(requests[index * 2].url).pathname, paths[index]);
    }
    for (const request of requests) {
      const url = new URL(request.url);
      assert.equal(url.searchParams.get("api-version"), "2026-08-01-preview");
      assert.equal(url.searchParams.get("maxpagesize"), "1");
    }
  });

  it("returns empty pages for room, user, user room, and topic lists", async () => {
    const client = createClient(() => ({ body: { value: [] } }));
    for (const iterator of [
      client.listRooms(),
      client.listUsers(),
      client.listRoomsForUser("user"),
      client.listTopics("room"),
    ]) {
      const page = await iterator.byPage().next();
      assert.lengthOf(page.value, 0);
      assert.isUndefined(page.value.continuationToken);
    }
  });

  it("sends corrected listRoomsForUser query parameters with encoded user IDs", async () => {
    let requestUrl: URL | undefined;
    const client = createClient((request) => {
      requestUrl = new URL(request.url);
      return { body: { value: [] } };
    });
    await client
      .listRoomsForUser("user with spaces", {
        maxPageSize: 2,
        continuationToken: "token+/=",
      })
      .next();
    assert.equal(requestUrl?.pathname, "/api/hubs/hub/chat/users/user%20with%20spaces/rooms");
    assert.equal(requestUrl?.searchParams.get("maxpagesize"), "2");
    assert.equal(requestUrl?.searchParams.get("continuationToken"), "token+/=");
    assert.equal(requestUrl?.searchParams.get("api-version"), "2026-08-01-preview");
  });

  it("surfaces service errors for topic and list operations", async () => {
    const client = createClient(() => ({
      status: 404,
      body: { error: { code: "NotFound", message: "Missing" } },
    }));
    for (const operation of [
      () => client.getTopic("room", "topic"),
      () => client.createOrReplaceTopic("room", "topic", { title: "Topic" }),
      () => client.updateTopic("room", "topic", { title: "Updated" }),
      () => client.deleteTopic("room", "topic"),
      () => client.listRooms().next(),
      () => client.listUsers().next(),
      () => client.listRoomsForUser("user").next(),
      () => client.listTopics("room").next(),
    ]) {
      await expect(operation()).rejects.toMatchObject({ statusCode: 404, code: "NotFound" });
    }
  });

  it("forwards cancellation for topic and list operations", async () => {
    const controller = new AbortController();
    const options = { abortSignal: controller.signal };
    let calls = 0;
    const client = createClient((request) => {
      calls++;
      assert.strictEqual(request.abortSignal, controller.signal);
      return { body: topic };
    });
    await client.getTopic("room", "topic", options);
    controller.abort();
    const operations = [
      () => client.getTopic("room", "topic", options),
      () => client.createOrReplaceTopic("room", "topic", { title: "Topic" }, options),
      () => client.updateTopic("room", "topic", { title: "Updated" }, options),
      () => client.deleteTopic("room", "topic", options),
      () => client.listRooms(options).next(),
      () => client.listUsers(options).next(),
      () => client.listRoomsForUser("user", options).next(),
      () => client.listTopics("room", options).next(),
    ];
    for (const operation of operations) {
      await expect(operation()).rejects.toMatchObject({ name: "AbortError" });
    }
    assert.equal(calls, 9);
  });

  it("forwards request options and cancellation between list pages", async () => {
    for (const list of [
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listRooms(options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listUsers(options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listRoomsForUser("user", options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listTopics("room", options),
      (
        client: WebPubSubChatServiceClient,
        options: { abortSignal: AbortSignal; requestOptions: { headers: Record<string, string> } },
      ) => client.listMessages("c.room.default", options),
    ]) {
      const controller = new AbortController();
      let calls = 0;
      const client = createClient((request) => {
        calls++;
        assert.strictEqual(request.abortSignal, controller.signal);
        assert.equal(request.headers.get("x-test-header"), "value");
        const url = new URL(request.url);
        return {
          body: { value: [], nextLink: `${url.origin}${url.pathname}?continuationToken=next` },
        };
      });
      const pages = list(client, {
        abortSignal: controller.signal,
        requestOptions: { headers: { "x-test-header": "value" } },
      }).byPage();
      await pages.next();
      await pages.next();
      assert.equal(calls, 2);
      controller.abort();
      await expect(pages.next()).rejects.toMatchObject({ name: "AbortError" });
    }
  });
});

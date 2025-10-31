// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type {
  EmailNotificationHook,
  EmailNotificationHookPatch,
  MetricsAdvisorAdministrationClient,
  WebNotificationHook,
  WebNotificationHookPatch,
} from "../../src/index.js";
import {
  createRecordedAdminClient,
  getRecorderUniqueVariable,
  makeCredential,
} from "./util/recordedClients.js";
import type { Recorder } from "@azure-tools/test-recorder";
import {
  fakeTestPassPlaceholder,
  fakeTestSecretPlaceholder,
  getYieldedValue,
  matrix,
} from "@azure-tools/test-utils-vitest";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}]`, () => {
    describe("MetricsAdvisorClient hooks", () => {
      let client: MetricsAdvisorAdministrationClient;
      let recorder: Recorder;
      let createdWebHookId: string;
      let createdEmailHookId: string;
      let emailHookName: string;
      let webHookName: string;

      beforeEach(async (ctx) => {
        ({ recorder, client } = await createRecordedAdminClient(ctx, makeCredential(useAad)));
        if (recorder && !emailHookName) {
          emailHookName = getRecorderUniqueVariable(recorder, "js-test-emailHook-");
        }
        if (recorder && !webHookName) {
          webHookName = getRecorderUniqueVariable(recorder, "js-test-webHook-");
        }
      });

      afterEach(async () => {
        if (recorder) {
          await recorder.stop();
        }
      });

      it("creates email Hook", async () => {
        const hook: EmailNotificationHook = {
          hookType: "Email",
          name: emailHookName,
          description: "description",
          hookParameter: {
            toList: ["test@example.com"],
          },
        };
        const created = await client.createHook(hook);
        assert.isDefined(created.id, "Expecting valid created.id");
        createdEmailHookId = created.id!;
      });

      it("creates web Hook", async () => {
        const hook: WebNotificationHook = {
          hookType: "Webhook",
          name: webHookName,
          description: "description",
          hookParameter: {
            endpoint: "https://httpbin.org/post",
            username: "user",
            password: fakeTestPassPlaceholder,
          },
        };
        const created = await client.createHook(hook);
        assert.isDefined(created.id, "Expecting valid created.id");
        createdWebHookId = created.id!;
      });

      it("updates email Hook", async () => {
        const emailPatch: EmailNotificationHookPatch = {
          hookType: "Email",
          hookParameter: {
            toList: ["test2@example.com", "test3@example.com"],
          },
        };
        const updated = await client.updateHook(createdEmailHookId, emailPatch);
        assert.equal(updated.hookType, emailPatch.hookType);
        const emailHook = updated as EmailNotificationHook;
        assert.deepEqual(emailHook.hookParameter?.toList, [
          "test2@example.com",
          "test3@example.com",
        ]);
      });

      it("updates Web Hook", async () => {
        const webPatch: WebNotificationHookPatch = {
          hookType: "Webhook",
          hookParameter: {
            endpoint: "https://httpbin.org/post",
            username: "user1",
            password: fakeTestSecretPlaceholder,
          },
        };
        const updated = await client.updateHook(createdWebHookId, webPatch);
        assert.equal(updated.hookType, webPatch.hookType);
        const webHook = updated as WebNotificationHook;
        assert.equal(webHook.hookParameter?.username, "user1");
        assert.equal(webHook.hookParameter?.endpoint, "https://httpbin.org/post");
        assert.equal(webHook.hookParameter?.password, "SecretPlaceholder");
      });

      it("lists hooks", async () => {
        const iterator = client.listHooks({
          hookName: "js-test",
        });
        let result = getYieldedValue(await iterator.next());
        assert.isDefined(result.name, "Expecting first definition");
        result = getYieldedValue(await iterator.next());
        assert.isDefined(result.name, "Expecting second definition");
      });

      it("lists hooks by page", async () => {
        const iterator = client
          .listHooks({
            hookName: "js-test",
          })
          .byPage({ maxPageSize: 2 });
        let result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two hooks in first page");
        result = await iterator.next();
        assert.equal(result.value.length, 2, "Expecting two hooks in second page");
      });

      it("deletes email hook", async () => {
        await client.deleteHook(createdEmailHookId);
        try {
          await client.getHook(createdEmailHookId);
          assert.fail("Expecting error getting hook");
        } catch (error: any) {
          assert.equal((error as any).code, "404 NOT_FOUND");
          assert.equal((error as any).message, "hookId is invalid.");
        }
      });

      it("deletes web hook", async () => {
        await client.deleteHook(createdWebHookId);
        try {
          await client.getHook(createdWebHookId);
          assert.fail("Expecting error getting hook");
        } catch (error: any) {
          assert.equal((error as any).code, "404 NOT_FOUND");
          assert.equal((error as any).message, "hookId is invalid.");
        }
      });
    });
  });
});

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { Context } from "mocha";

import {
  MetricsAdvisorAdministrationClient,
  WebNotificationHook,
  EmailNotificationHook,
  EmailNotificationHookPatch,
  WebNotificationHookPatch
} from "../../src";
import { createRecordedAdminClient, makeCredential } from "./util/recordedClients";
import { Recorder } from "@azure-tools/test-recorder";
import { matrix } from "./util/matrix";

matrix([[true, false]] as const, async (useAad) => {
  describe(`[${useAad ? "AAD" : "API Key"}]`, () => {
    describe("MetricsAdvisorClient hooks", () => {
      let client: MetricsAdvisorAdministrationClient;
      let recorder: Recorder;
      let createdWebHookId: string;
      let createdEmailHookId: string;
      let emailHookName: string;
      let webHookName: string;

      beforeEach(function(this: Context) {
        ({ recorder, client } = createRecordedAdminClient(this, makeCredential(useAad)));
        if (recorder && !emailHookName) {
          emailHookName = recorder.getUniqueName("js-test-emailHook-");
        }
        if (recorder && !webHookName) {
          webHookName = recorder.getUniqueName("js-test-webHook-");
        }
      });

      afterEach(async function() {
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
            toList: ["test@example.com"]
          }
        };
        const created = await client.createHook(hook);
        assert.ok(created.id, "Expecting valid created.id");
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
            password: "pass"
          }
        };
        const created = await client.createHook(hook);
        assert.ok(created.id, "Expecting valid created.id");
        createdWebHookId = created.id!;
      });

      it("updates email Hook", async () => {
        const emailPatch: EmailNotificationHookPatch = {
          hookType: "Email",
          hookParameter: {
            toList: ["test2@example.com", "test3@example.com"]
          }
        };
        const updated = await client.updateHook(createdEmailHookId, emailPatch);
        assert.equal(updated.hookType, emailPatch.hookType);
        const emailHook = updated as EmailNotificationHook;
        assert.deepEqual(emailHook.hookParameter?.toList, [
          "test2@example.com",
          "test3@example.com"
        ]);
      });

      it("updates Web Hook", async () => {
        const webPatch: WebNotificationHookPatch = {
          hookType: "Webhook",
          hookParameter: {
            endpoint: "https://httpbin.org/post",
            username: "user1",
            password: "SecretPlaceholder"
          }
        };
        const updated = await client.updateHook(createdWebHookId, webPatch);
        assert.equal(updated.hookType, webPatch.hookType);
        const webHook = updated as WebNotificationHook;
        assert.equal(webHook.hookParameter?.username, "user1");
        assert.equal(webHook.hookParameter?.endpoint, "https://httpbin.org/post");
        assert.equal(webHook.hookParameter?.password, "SecretPlaceholder");
      });

      it("lists hooks", async function() {
        const iterator = client.listHooks({
          hookName: "js-test"
        });
        let result = await iterator.next();
        assert.ok(result.value.name, "Expecting first definition");
        result = await iterator.next();
        assert.ok(result.value.name, "Expecting second definition");
      });

      it("lists hooks by page", async function() {
        const iterator = client
          .listHooks({
            hookName: "js-test"
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
        } catch (error) {
          assert.equal((error as any).code, "404 NOT_FOUND");
          assert.equal((error as any).message, "hookId is invalid.");
        }
      });

      it("deletes web hook", async () => {
        await client.deleteHook(createdWebHookId);
        try {
          await client.getHook(createdWebHookId);
          assert.fail("Expecting error getting hook");
        } catch (error) {
          assert.equal((error as any).code, "404 NOT_FOUND");
          assert.equal((error as any).message, "hookId is invalid.");
        }
      });
    }).timeout(60000);
  });
});

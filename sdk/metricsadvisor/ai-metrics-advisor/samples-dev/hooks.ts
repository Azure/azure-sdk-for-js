// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates Metrics Advisor Hooks CRUD operations.
 * @azsdk-weight 50
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  EmailNotificationHook,
  WebNotificationHook,
  EmailNotificationHookPatch,
} from "@azure/ai-metrics-advisor";

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const existingHookId = process.env["METRICS_ADVISOR_HOOK_ID"] || "<hook id>";

  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);
  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  await getHook(adminClient, existingHookId);

  const createdEmailHook = await createEmailHook(adminClient);
  await updateEmailHook(adminClient, createdEmailHook.id!);

  const createdWebHook = await createWebHook(adminClient);

  await listHooks(adminClient);

  await deleteHook(adminClient, createdEmailHook.id!);
  await deleteHook(adminClient, createdWebHook.id!);
}

async function createWebHook(client: MetricsAdvisorAdministrationClient) {
  console.log("Creating a new web hook...");
  const hook: WebNotificationHook = {
    hookType: "Webhook",
    name: "js web hook example" + new Date().getTime().toString(),
    description: "description",
    hookParameter: {
      endpoint: "https://httpbin.org/post",
      username: "user",
      password: "pass",
      headers: {
        name1: "value1",
        name2: "value2",
      },
      // certificateKey: "k",
      // certificatePassword: "kp"
    },
  };
  const created = await client.createHook(hook);
  console.log(` hook created: ${created.id}`);
  return created;
}

async function createEmailHook(client: MetricsAdvisorAdministrationClient) {
  console.log("Creating a new email hook...");
  const hook: EmailNotificationHook = {
    hookType: "Email",
    name: "js email hook example" + new Date().getTime().toString(),
    description: "description",
    hookParameter: { toList: ["test@example.com"] },
  };
  const created = await client.createHook(hook);
  console.log(` hook created: ${created.id}`);
  return created;
}

async function getHook(client: MetricsAdvisorAdministrationClient, hookId: string) {
  console.log(`Retrieving an existing hook for id ${hookId}...`);
  const result = await client.getHook(hookId);
  console.log(result.name);
  console.log(result.description);
  console.log(result.admins);
}

async function updateEmailHook(client: MetricsAdvisorAdministrationClient, hookId: string) {
  console.log(`Updating hook ${hookId}`);
  const emailPatch: EmailNotificationHookPatch = {
    hookType: "Email",
    hookParameter: {
      toList: ["test2@example.com", "test3@example.com"],
    },
  };
  const response = await client.updateHook(hookId, emailPatch);
  console.log(response);
  return response;
}

async function listHooks(client: MetricsAdvisorAdministrationClient) {
  console.log("Listing existing hooks");
  console.log("  using for-await-of syntax");
  let i = 1;
  const iterator = client.listHooks({
    hookName: "js ",
  });
  for await (const hook of iterator) {
    console.log(`hook ${i++} - type ${hook.hookType}`);
    console.log(`  description: ${hook.description}`);
    if (hook.hookType === "Email") {
      console.log(`  TO: list ${hook.hookParameter.toList}`);
    } else {
      console.log(`  endpoint: ${hook.hookParameter.endpoint}`);
      console.log(`  username: ${hook.hookParameter.username}`);
      if (hook.hookParameter.headers) {
        console.log(`  headers:`);
        for (const key of Object.keys(hook.hookParameter.headers)) {
          console.log(`    ${key}: ${hook.hookParameter.headers[key]}`);
        }
      }
      console.log(`  certificate key: ${hook.hookParameter.certificateKey}`);
    }
  }
  console.log("  by pages");
  i = 1;
  const pages = client.listHooks({ hookName: "js " }).byPage({ maxPageSize: 5 });
  let page = await pages.next();
  while (!(page.done === true)) {
    for (const hook of page.value) {
      console.log(`    hook ${i++} - type ${hook.hookType}`);
      console.log(`      id: ${hook.id}`);
      console.log(`      description: ${hook.description}`);
      if (hook.hookType === "Email") {
        console.log(`      TO: list ${hook.hookParameter.toList}`);
      } else {
        console.log(`      endpoint: ${hook.hookParameter.endpoint}`);
        console.log(`      username: ${hook.hookParameter.username}`);
        if (hook.hookParameter.headers) {
          console.log(`      headers:`);
          for (const key of Object.keys(hook.hookParameter.headers)) {
            console.log(`        ${key}: ${hook.hookParameter.headers[key]}`);
          }
        }
        console.log(`      certificate key: ${hook.hookParameter.certificateKey}`);
      }
    }
    console.log(`    next: ${page.value.continuationToken}`);
    page = await pages.next();
  }
  console.log("  resume paging using continuation token");
  const pageIterator = client.listHooks({ hookName: "js " }).byPage({ maxPageSize: 5 });
  const firstPage = await pageIterator.next();
  if (firstPage.done !== true) {
    const newIterator = client
      .listHooks({ hookName: "js " })
      .byPage({ continuationToken: firstPage.value.continuationToken });
    const secondPage = await newIterator.next();
    console.log("    Second page:");
    for (const hook of secondPage.value) {
      console.log(`    id: ${hook.id}`);
    }
  }
}

async function deleteHook(client: MetricsAdvisorAdministrationClient, hookId: string) {
  console.log(`Deleting hook ${hookId}`);
  await client.deleteHook(hookId);
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });

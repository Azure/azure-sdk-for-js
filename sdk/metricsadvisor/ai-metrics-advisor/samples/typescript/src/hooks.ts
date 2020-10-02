import * as dotenv from "dotenv";
dotenv.config();
import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  EmailHook,
  WebhookHook,
  EmailHookPatch
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
  const updatedEmailHook = await updateEmailHook(adminClient, createdEmailHook.id!);

  const createdWebHook = await createWebHook(adminClient);

  await listHooks(adminClient);

  await deleteHook(adminClient, updatedEmailHook.id!);
  await deleteHook(adminClient, createdWebHook.id!);
}

async function createWebHook(client: MetricsAdvisorAdministrationClient) {
  console.log("Creating a new web hook...");
  const hook: WebhookHook = {
    hookType: "Webhook",
    hookName: "js web hook example" + new Date().getTime().toFixed(),
    description: "description",
    hookParameter: {
      endpoint: "https://httpbin.org/post",
      username: "user",
      password: "pass"
      // certificateKey: "k",
      // certificatePassword: "kp"
    }
  };
  const created = await client.createHook(hook);
  console.log(` hook created: ${created.id}`);
  return created;
}

async function createEmailHook(client: MetricsAdvisorAdministrationClient) {
  console.log("Creating a new email hook...");
  const hook: EmailHook = {
    hookType: "Email",
    hookName: "js email hook example" + new Date().getTime().toFixed(),
    description: "description",
    hookParameter: { toList: ["test@example.com"] }
  };
  const created = await client.createHook(hook);
  console.log(` hook created: ${created.id}`);
  return created;
}

async function getHook(client: MetricsAdvisorAdministrationClient, hookId: string) {
  console.log(`Retrieving an existing hook for id ${hookId}...`);
  const result = await client.getHook(hookId);
  console.log(result.hookName);
  console.log(result.description);
  console.log(result.admins);
}

async function updateEmailHook(client: MetricsAdvisorAdministrationClient, hookId: string) {
  console.log(`Updating hook ${hookId}`);
  const emailPatch: EmailHookPatch = {
    hookType: "Email",
    hookParameter: {
      toList: ["test2@example.com", "test3@example.com"]
    }
  };
  const response = await client.updateHook(hookId, emailPatch);
  console.log(response);
  return response;
}

async function listHooks(client: MetricsAdvisorAdministrationClient) {
  console.log("Listing existing hooks");
  let i = 1;
  for await (const hook of client.listHooks({
    hookName: "js "
  })) {
    console.log(`hook ${i++}`);
    console.log(hook);
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

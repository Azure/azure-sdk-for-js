// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates data feed management operations.
 * @azsdk-weight 80
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  GetCredentialEntityResponse,
  DatasourceCredentialUnion,
  DatasourceCredentialPatch
} from "@azure/ai-metrics-advisor";

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const created = await createDatasourceCredential(adminClient);
  if (created.id) {
    await getDatasourceCredential(adminClient, created.id);
    await updateDatasourceCredential(adminClient, created.id);
    await listDatasourceCredentials(adminClient);
    await deleteDatasourceCredential(adminClient, created.id);
  }
}

async function listDatasourceCredentials(client: MetricsAdvisorAdministrationClient) {
  console.log("Listing Datasource credentials ...");
  console.log("  using while loop");
  const iter = client.listDatasourceCredential();
  let result = await iter.next();
  while (!result.done) {
    console.log(`id :${result.value.id}, name: ${result.value.name}`);
    result = await iter.next();
  }

  // second approach
  console.log("  using for-await-of loop");
  const iterator = client.listDatasourceCredential();
  for await (const datasourceCredential of iterator) {
    console.log(
      `id :${datasourceCredential.id}, name: ${datasourceCredential.name}, type: ${datasourceCredential.type}`
    );
  }

  // by pages
  console.log("  by pages");
  const pages = client.listDatasourceCredential().byPage({ maxPageSize: 1 });
  let page = await pages.next();
  let i = 1;
  while (!page.done) {
    if (page.value) {
      console.log(`-- page ${i++}`);
      for (const credential of page.value) {
        console.log(`  ${credential.id} - ${credential.name}`);
      }
    }
    page = await pages.next();
  }
}

async function createDatasourceCredential(
  client: MetricsAdvisorAdministrationClient
): Promise<GetCredentialEntityResponse> {
  console.log("Creating Datasource credential...");
  const datasourceCredential: DatasourceCredentialUnion = {
    name: "Sql-server-cred",
    description: "an example sql server credential",
    type: "AzureSQLConnectionString",
    connectionString: "connection-string"
  };
  const result = await client.createDatasourceCredential(datasourceCredential);
  console.dir(result);
  return result;
}

async function getDatasourceCredential(
  client: MetricsAdvisorAdministrationClient,
  datasourceCredentialId: string
) {
  console.log("Retrieving datasourceCredential by id...");
  const result = await client.getDatasourceCredential(datasourceCredentialId);
  console.log("datasource credential result is as follows - ");
  console.log(`  id: ${result.id}`);
  console.log(`  datasource credential type: ${result.type}`);
  console.log(`  name: ${result.name}`);
}

async function updateDatasourceCredential(
  client: MetricsAdvisorAdministrationClient,
  credentialId: string
) {
  const patch = {
    name: "update-credential-name",
    description: "updated-description",
    type: "AzureSQLConnectionString",
    connectionString: "updated-connection-string"
  } as DatasourceCredentialPatch;

  try {
    console.log(`Updating credential ${credentialId}...`);
    const updated = await client.updateDatasourceCredential(credentialId, patch);
    console.dir(updated);
  } catch (err) {
    console.log("Error occurred when updating credential");
    console.log(err);
  }
}

async function deleteDatasourceCredential(
  client: MetricsAdvisorAdministrationClient,
  credentialId: string
) {
  console.log(`Deleting datasource credential ${credentialId}...`);
  await client.deleteDatasourceCredential(credentialId);
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });

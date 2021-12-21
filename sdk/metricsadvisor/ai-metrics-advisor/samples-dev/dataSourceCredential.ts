// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates data source credential operations
 * @azsdk-weight 80
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

import {
  MetricsAdvisorKeyCredential,
  MetricsAdvisorAdministrationClient,
  DataSourceCredentialEntityUnion,
  DataSourceCredentialPatch,
  DataSourceSqlConnectionString,
} from "@azure/ai-metrics-advisor";

export async function main() {
  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["METRICS_ADVISOR_ENDPOINT"] || "<service endpoint>";
  const subscriptionKey = process.env["METRICS_ADVISOR_SUBSCRIPTION_KEY"] || "<subscription key>";
  const apiKey = process.env["METRICS_ADVISOR_API_KEY"] || "<api key>";
  const credential = new MetricsAdvisorKeyCredential(subscriptionKey, apiKey);

  const adminClient = new MetricsAdvisorAdministrationClient(endpoint, credential);

  const created = await createDataSourceCredential(adminClient);
  if (created.id) {
    await getDataSourceCredential(adminClient, created.id);
    await updateDataSourceCredential(adminClient, created.id);
    await listDataSourceCredentials(adminClient);
    await deleteDataSourceCredential(adminClient, created.id);
  }
}

async function listDataSourceCredentials(client: MetricsAdvisorAdministrationClient) {
  console.log("Listing DataSource credentials ...");
  console.log("  using while loop");
  const iter = client.listDataSourceCredential();
  let result = await iter.next();
  while (!result.done) {
    console.log(`id :${result.value.id}, name: ${result.value.name}`);
    result = await iter.next();
  }

  // second approach
  console.log("  using for-await-of loop");
  const iterator = client.listDataSourceCredential();
  for await (const datasourceCredential of iterator) {
    console.log(
      `id :${datasourceCredential.id}, name: ${datasourceCredential.name}, type: ${datasourceCredential.type}`
    );
  }

  // by pages
  console.log("  by pages");
  const pages = client.listDataSourceCredential().byPage({ maxPageSize: 1 });
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

async function createDataSourceCredential(
  client: MetricsAdvisorAdministrationClient
): Promise<DataSourceCredentialEntityUnion> {
  console.log("Creating DataSource credential...");
  const datasourceCredential: DataSourceSqlConnectionString = {
    name: "Sql-server-cred",
    description: "an example sql server credential",
    type: "AzureSQLConnectionString",
    connectionString: "connection-string",
  };
  const result = await client.createDataSourceCredential(datasourceCredential);
  console.dir(result);
  return result;
}

async function getDataSourceCredential(
  client: MetricsAdvisorAdministrationClient,
  datasourceCredentialId: string
) {
  console.log("Retrieving datasourceCredential by id...");
  const result = await client.getDataSourceCredential(datasourceCredentialId);
  console.log("datasource credential result is as follows - ");
  console.log(`  id: ${result.id}`);
  console.log(`  datasource credential type: ${result.type}`);
  console.log(`  name: ${result.name}`);
}

async function updateDataSourceCredential(
  client: MetricsAdvisorAdministrationClient,
  credentialId: string
) {
  const patch = {
    name: "update-credential-name",
    description: "updated-description",
    type: "AzureSQLConnectionString",
    connectionString: "connection-string",
  } as DataSourceCredentialPatch;

  try {
    console.log(`Updating credential ${credentialId}...`);
    const updated = await client.updateDataSourceCredential(credentialId, patch);
    console.dir(updated);
  } catch (err) {
    console.log("Error occurred when updating credential");
    console.log(err);
  }
}

async function deleteDataSourceCredential(
  client: MetricsAdvisorAdministrationClient,
  credentialId: string
) {
  console.log(`Deleting datasource credential ${credentialId}...`);
  await client.deleteDataSourceCredential(credentialId);
}

main()
  .then((_) => {
    console.log("Succeeded");
  })
  .catch((err) => {
    console.log("Error occurred:");
    console.log(err);
  });

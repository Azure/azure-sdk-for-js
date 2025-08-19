// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Starts up the config tuning session.
 *
 * @summary Starts up the config tuning session.
 * x-ms-original-file: specification/postgresql/resource-manager/Microsoft.DBforPostgreSQL/preview/2025-01-01-preview/examples/TuningConfiguration_StartSession.json
 */

import {
  ConfigTuningRequestParameter,
  PostgreSQLManagementFlexibleServerClient,
} from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tuningConfigurationStartSession(): Promise<void> {
  const subscriptionId =
    process.env["POSTGRESQL_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["POSTGRESQL_RESOURCE_GROUP"] || "testrg";
  const serverName = "testserver";
  const tuningOption = "configuration";
  const configTuningRequest: ConfigTuningRequestParameter = {
    allowServerRestarts: false,
    targetImprovementMetric: "targetImprovementMetric",
  };
  const credential = new DefaultAzureCredential();
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.tuningConfiguration.beginStartSessionAndWait(
    resourceGroupName,
    serverName,
    tuningOption,
    configTuningRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tuningConfigurationStartSession();
}

main().catch(console.error);

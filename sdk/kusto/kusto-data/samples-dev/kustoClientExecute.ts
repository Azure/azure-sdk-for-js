// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a KustoClient to execute a query.
 */

import * as dotenv from "dotenv";
import {
  ClientRequestProperties,
  Client as KustoClient,
  KustoConnectionStringBuilder,
} from "@azure/kusto-data";
import { v4 as uuidv4 } from "uuid";

// Load the .env file if it exists
dotenv.config();

const cluster = process.env.KUSTO_CLUSTER_NAME || "<cluster>";
const database = process.env.KUSTO_DATABASE_NAME || "<database>";
const table = process.env.KUSTO_TABLE_NAME || "<table>";

const clusterConectionString = `https://${cluster}.<region>.kusto.windows.net`;

const kcs = KustoConnectionStringBuilder.withAadDeviceAuthentication(clusterConectionString);
const kustoClient = new KustoClient(kcs);

async function main() {
  let results = await kustoClient.execute(database, `['${table}'] | limit 1`);
  console.log(JSON.stringify(results));
  console.log(results.primaryResults[0].toString());

  // providing ClientRequestProperties
  // for a complete list of ClientRequestProperties
  // go to https://docs.microsoft.com/en-us/azure/kusto/api/netfx/request-properties#list-of-clientrequestproperties
  const clientRequestProps = new ClientRequestProperties();
  const oneMinute = 1000 * 60;
  clientRequestProps.setTimeout(oneMinute);

  // having client code provide its own clientRequestId is
  // highly recommended. It not only allows the caller to
  // cancel the query, but also makes it possible for the Kusto
  // team to investigate query failures end-to-end:
  clientRequestProps.clientRequestId = `MyApp.MyActivity;${uuidv4()}`;

  // `execute()` infers the type of command from the query, although you can also specify the type explicitly using the methods `excuteQuery()`,`executeQueryV1()` or `executeMgmt()`
  results = await kustoClient.execute(database, `['${table}'] | limit 1`, clientRequestProps);
  console.log(JSON.stringify(results));
  console.log(results.primaryResults[0].toString());
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

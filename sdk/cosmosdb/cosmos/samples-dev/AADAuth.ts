// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses AAD credentials to authenticate with the CosmosClient.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { UsernamePasswordCredential } from "@azure/identity";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CosmosClient } from "@azure/cosmos";
import { handleError, finish, logStep } from "./Shared/handleError";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const existingContainerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

async function run() {
  logStep("Create credential object from @azure/identity");
  const credentials = new UsernamePasswordCredential(
    "fake-tenant-id",
    "fake-client-id",
    "fakeUsername",
    "fakePassword"
  );
  logStep("Pass credentials to client object with key aadCredentials");
  const aadClient = new CosmosClient({
    endpoint,
    aadCredentials: credentials,
  });

  const genericClient = new CosmosClient({
    endpoint,
    key: key,
  });

  logStep(
    "Only certain operations are authorized. Reading databases/containers will throw errors, but reading items will work"
  );

  // fails
  await aadClient.databases.readAll({}).fetchAll();
  // succeeds
  await genericClient.databases.readAll({}).fetchAll();

  // succeeds
  await aadClient.database("example").container(existingContainerId).items.readAll();
  // succeeds
  await genericClient.database("example").container(existingContainerId).items.readAll();

  await finish();
}

run().catch(handleError);

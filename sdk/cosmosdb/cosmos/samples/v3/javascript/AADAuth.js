// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Uses AAD credentials to authenticate with the CosmosClient.
 */

const path = require("path");
require("dotenv").config();

const { UsernamePasswordCredential } = require("@azure/identity");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { CosmosClient } = require("../dist");
const { handleError, finish, logStep } = require("./Shared/handleError");

const endpoint = "your-endpoint";
const masterKey = "your-master-key";
const existingContainerId = "your-container-id";

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
    aadCredentials: credentials
  });

  const genericClient = new CosmosClient({
    endpoint,
    key: masterKey
  });

  logStep(
    "Only certain operations are authorized. Reading databases/containers will throw errors, but reading items will work"
  );

  // fails
  await aadClient.databases.readAll({}).fetchAll();
  // succeeds
  await genericClient.databases.readAll({}).fetchAll();

  // succeeds
  await aadClient
    .database("example")
    .container(existingContainerId)
    .items.readAll();
  // succeeds
  await genericClient
    .database("example")
    .container(existingContainerId)
    .items.readAll();

  await finish();
}

run().catch(handleError);

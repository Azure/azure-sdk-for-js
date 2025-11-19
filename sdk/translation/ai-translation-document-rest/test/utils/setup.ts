// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import * as MOCKS from "./constants.js";
import { BlobServiceClient } from "@azure/storage-blob";
import { containers, createContainer } from "./containerHelper.js";
import type { KnownContainers } from "./types.js";
import {
  documents1,
  documents10,
  documents2,
  documents3,
  documents4,
  documents5,
  documents6,
  documents7,
  documents8,
  documents9,
} from "./documents.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: string;
  };
  export interface ProvidedContext
    extends Omit<
      MyEnvVarKeys,
      | typeof EnvVarKeys.DISABLE_LOCAL_AUTH
      | typeof EnvVarKeys.TEST_MODE
      | typeof EnvVarKeys.CONTAINERS
    > {
    [EnvVarKeys.TEST_MODE]: string | undefined;
    [EnvVarKeys.DISABLE_LOCAL_AUTH]: boolean;
    [EnvVarKeys.CONTAINERS]: KnownContainers;
  }
}

function assertEnvironmentVariable<
  T extends (typeof EnvVarKeys)[keyof Pick<typeof EnvVarKeys, "TEST_MODE">],
>(key: T): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return value?.toLowerCase();
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = assertEnvironmentVariable(EnvVarKeys.TEST_MODE);
  if (["live", "record"].includes(testMode ?? "")) {
    const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
    const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
    const resourceName = assertEnvironmentVariable(EnvVarKeys.COGNITIVE_ACCOUNT_NAME);
    const region = assertEnvironmentVariable(EnvVarKeys.REGION);
    const blobEndpoint = assertEnvironmentVariable(EnvVarKeys.BLOB_ENDPOINT);
    const resourceId = assertEnvironmentVariable(EnvVarKeys.RESOURCE_ID);
    const cred = createLiveCredential();
    const cognitiveMgmtClient = new CognitiveServicesManagementClient(cred, subId);
    const account = await cognitiveMgmtClient.accounts.get(rgName, resourceName);
    const disableLocalAuth = account.properties?.disableLocalAuth ?? false;
    const translatorEndpoint = account.properties?.endpoints?.["DocumentTranslation"];
    if (!translatorEndpoint) {
      throw new Error("Endpoint is not defined.");
    }
    const { key1 } = await cognitiveMgmtClient.accounts.listKeys(rgName, resourceName);
    if (!key1) {
      throw new Error("Key is not defined.");
    }
    const blobClient = new BlobServiceClient(blobEndpoint, cred);
    await Promise.all([
      createContainer(blobClient, documents1, "source-container1"),
      createContainer(blobClient, documents1, "source-container2"),
      createContainer(blobClient, documents2, "source-container3"),
      createContainer(blobClient, documents3, "source-container4"),
      createContainer(blobClient, documents4, "source-container5"),
      createContainer(blobClient, documents5, "source-container6"),
      createContainer(blobClient, documents6, "source-container7"),
      createContainer(blobClient, documents7, "source-container8"),
      createContainer(blobClient, documents8, "source-container9"),
      createContainer(blobClient, documents9, "source-container10"),
      createContainer(blobClient, documents10, "source-container11"),
      createContainer(blobClient, [], "target-container1"),
      createContainer(blobClient, [], "target-container2"),
      createContainer(blobClient, [], "target-container3"),
      createContainer(blobClient, [], "target-container4"),
      createContainer(blobClient, [], "target-container5"),
      createContainer(blobClient, [], "target-container6"),
      createContainer(blobClient, [], "target-container7"),
      createContainer(blobClient, [], "target-container8"),
      createContainer(blobClient, [], "target-container9"),
      createContainer(blobClient, [], "target-container10"),
      createContainer(blobClient, [], "target-container11"),
      createContainer(blobClient, [], "target-container12"),
      createContainer(blobClient, [], "target-container13"),
      createContainer(blobClient, [], "target-container14"),
      createContainer(blobClient, [], "target-container15"),
      createContainer(blobClient, [], "target-container16"),
      createContainer(blobClient, [], "target-container17"),
      createContainer(blobClient, [], "target-container18"),
      createContainer(blobClient, [], "target-container19"),
      createContainer(blobClient, [], "target-container20"),
      createContainer(blobClient, [], "target-container21"),
      createContainer(blobClient, [], "target-container22"),
      createContainer(blobClient, [], "target-container23"),
      createContainer(blobClient, [], "target-container24"),
      createContainer(blobClient, [], "target-container25"),
      createContainer(blobClient, [], "target-container26"),
      createContainer(blobClient, [], "target-container27"),
      createContainer(blobClient, [], "target-container28"),
      createContainer(blobClient, [], "target-container29"),
      createContainer(blobClient, [], "target-container30"),
    ]);

    provide(EnvVarKeys.ENDPOINT, translatorEndpoint);
    provide(EnvVarKeys.BLOB_ENDPOINT, blobEndpoint);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, disableLocalAuth);
    provide(EnvVarKeys.KEY, key1);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.REGION, region);
    provide(EnvVarKeys.RESOURCE_ID, resourceId);
    provide(EnvVarKeys.BLOB_ENDPOINT, blobEndpoint);
    provide(EnvVarKeys.CONTAINERS, containers as KnownContainers);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.BLOB_ENDPOINT, MOCKS.BLOB_ENDPOINT);
    provide(EnvVarKeys.DISABLE_LOCAL_AUTH, MOCKS.DISABLE_LOCAL_AUTH);
    provide(EnvVarKeys.KEY, MOCKS.KEY);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.REGION, MOCKS.REGION);
    provide(EnvVarKeys.RESOURCE_ID, MOCKS.RESOURCE_ID);
    provide(EnvVarKeys.BLOB_ENDPOINT, MOCKS.BLOB_ENDPOINT);
    provide(EnvVarKeys.CONTAINERS, MOCKS.CONTAINERS as KnownContainers);
  }
}

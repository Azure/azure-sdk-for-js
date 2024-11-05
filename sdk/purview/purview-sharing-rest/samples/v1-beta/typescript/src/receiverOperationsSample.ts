// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import createPurviewSharingClient, {
  ReceivedSharesCreateOrReplaceParameters,
  getLongRunningPoller,
  paginate,
  InPlaceReceivedShareOutput,
  ReceivedSharesActivateTenantEmailRegistrationParameters,
  PurviewSharingClient,
  ReceivedShareOutput,
  isUnexpected,
} from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to list detached received shares
 *
 * @summary List detached received shares
 */
async function getAllDetachedReceivedShares(): Promise<InPlaceReceivedShareOutput[]> {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const initialResponse = await client.path("/receivedShares/detached").get();
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }

  const pageData = paginate(client, initialResponse);

  const result: InPlaceReceivedShareOutput[] = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);

  return result;
}

/**
 * This sample demonstrates how to update changes to a received share
 *
 * @summary Update changes to a received share
 */
async function createOrReplaceReceivedShare(
  client: PurviewSharingClient,
  receivedShareId: string,
  storageAccountResourceId: string,
  storeKind: "BlobAccount" | "AdlsGen2Account"
): Promise<ReceivedShareOutput> {
  const options: ReceivedSharesCreateOrReplaceParameters = {
    body: {
      properties: {
        displayName: `Sample-${storeKind}-Received-Share`,
        sink: {
          properties: {
            containerName: "receivingContainer",
            folder: "receivingFolder",
            mountPath: "path",
          },
          storeKind: storeKind,
          storeReference: {
            type: "ArmResourceReference",
            referenceName: storageAccountResourceId,
          },
        },
      },
      shareKind: "InPlace",
    },
  };

  const initialResponse = await client
    .path("/receivedShares/{receivedShareId}", receivedShareId)
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const receivedShareDetails = result.body;
  console.log(receivedShareDetails);
  return receivedShareDetails;
}

/**
 * This sample demonstrates how to register an email for the current tenant
 *
 * @summary Register an email for the current tenant
 */
async function registerTenantEmail(client: PurviewSharingClient): Promise<void> {
  const result = await client.path("/emails:register").post();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const tenantEmailRegistrationDetails = result.body;
  console.log(tenantEmailRegistrationDetails);
}

/**
 * This sample demonstrates how to activate an email registration for current tenant
 *
 * @summary Activates the email registration for current tenant
 */
async function activateTenantEmailRegistrationSample(
  client: PurviewSharingClient,
  activationCode: string
): Promise<void> {
  const options: ReceivedSharesActivateTenantEmailRegistrationParameters = {
    body: { properties: { activationCode } },
  };
  const result = await client.path("/emails:activate").post(options);

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  const tenantEmailRegistrationDetails = result.body;
  console.log(tenantEmailRegistrationDetails);
}

async function main() {
  const endpoint = process.env["ENDPOINT"] || "";
  const blobStorageAccountResourceId = process.env["BLOB_STORAGE_ACCOUNT_RESOURCE_ID"] || "";
  const adlsgen2StorageAccountResourceId =
    process.env["ADLSGEN2_STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  // One time tenant-email registration to be performed just for Guest User recipients in the Purview account's tenant.
  const activationCode = process.env["EMAIL_REGISTRATION_ACTIVATION_CODE"] || "";
  await registerTenantEmail(client);
  await activateTenantEmailRegistrationSample(client, activationCode);

  // Service principal identities and home tenant Users should skip tenant-email registration and start from here.
  const detachedReceivedShares = await getAllDetachedReceivedShares();

  const receivedShareIdForBlobAsset =
    detachedReceivedShares.find((r) => r.properties.assetStoreKind === "BlobAccount")?.id ?? "";

  const receivedShareIdForAdlsGen2Asset =
    detachedReceivedShares.find((r) => r.properties.assetStoreKind === "AdlsGen2Account")?.id ?? "";

  // Attach received share to target store
  const receivedShareForBlobAsset = await createOrReplaceReceivedShare(
    client,
    receivedShareIdForBlobAsset,
    blobStorageAccountResourceId,
    "BlobAccount"
  );
  console.log(receivedShareForBlobAsset);

  const receivedShareForAdlsGen2Asset = await createOrReplaceReceivedShare(
    client,
    receivedShareIdForAdlsGen2Asset,
    adlsgen2StorageAccountResourceId,
    "AdlsGen2Account"
  );
  console.log(receivedShareForAdlsGen2Asset);
}

main().catch(console.error);

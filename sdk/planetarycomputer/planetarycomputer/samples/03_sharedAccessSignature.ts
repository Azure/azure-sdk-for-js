// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates Shared Access Signature (SAS) operations including:
 * - Generating SAS tokens for collections
 * - Signing asset HREFs for authenticated access
 * - Revoking SAS tokens
 * - Downloading assets using signed URLs
 *
 * @description
 * USAGE:
 *   npx ts-node 03_sharedAccessSignature.ts
 *
 *   Set the environment variable PLANETARYCOMPUTER_ENDPOINT with your endpoint URL.
 *   Set the environment variable PLANETARYCOMPUTER_COLLECTION_ID with your collection ID.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";
import type { SharedAccessSignatureToken } from "@azure/planetarycomputer";

// Environment variables
const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT;
const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID;

if (!endpoint) {
  throw new Error("PLANETARYCOMPUTER_ENDPOINT environment variable must be set");
}

if (!collectionId) {
  throw new Error("PLANETARYCOMPUTER_COLLECTION_ID environment variable must be set");
}

/**
 * Generate a SAS token for a collection.
 */
async function generateSasToken(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<SharedAccessSignatureToken> {
  console.log(`Generating SAS token for collection: ${targetCollectionId}`);

  const tokenResponse = await client.sharedAccessSignature.getToken(targetCollectionId, {
    durationInMinutes: 60,
  });

  console.log(`Token generated successfully`);
  console.log(`  Expires on: ${tokenResponse.expiresOn}`);

  return tokenResponse;
}

/**
 * Sign an asset HREF to enable authenticated download.
 */
async function signAssetHref(
  client: PlanetaryComputerProClient,
  targetCollectionId: string,
): Promise<{ signedHref: string; unsignedHref: string }> {
  console.log(`Getting items from collection: ${targetCollectionId}`);

  // Search for items in the collection to get an asset
  const searchResult = await client.stac.search({
    collections: [targetCollectionId],
    limit: 1,
  });

  const items = searchResult.features || [];
  if (items.length === 0) {
    throw new Error(`No items found in collection '${targetCollectionId}'.`);
  }

  const item = items[0];
  console.log(`Found item: ${item.id}`);

  if (!item.assets) {
    throw new Error(`No assets found in item '${item.id}'.`);
  }

  let href: string | undefined;

  // Try to find an image asset
  const assetEntries = Object.entries(item.assets);
  for (const [assetKey, asset] of assetEntries) {
    if (asset && typeof asset === "object" && "href" in asset) {
      href = (asset as { href: string }).href;
      console.log(`Using asset '${assetKey}': ${href}`);
      break;
    }
  }

  if (!href) {
    throw new Error("No suitable asset found in item assets.");
  }

  console.log(`Signing asset href: ${href}`);

  const signResponse = await client.sharedAccessSignature.getSign(href, {
    durationInMinutes: 60,
  });

  console.log(`Signed href: ${signResponse.href}`);

  return { signedHref: signResponse.href!, unsignedHref: href };
}

/**
 * Download and verify an asset using a signed HREF.
 */
async function downloadAsset(signedHref: string): Promise<void> {
  console.log(`Downloading asset from: ${signedHref.substring(0, 80)}...`);

  const response = await fetch(signedHref);

  if (!response.ok) {
    throw new Error(`Failed to download asset: HTTP ${response.status}`);
  }

  const content = await response.arrayBuffer();
  const contentLength = content.byteLength;

  if (contentLength === 0) {
    throw new Error("Downloaded image has zero size");
  }

  // Check that it's a PNG by verifying the PNG magic bytes (89 50 4E 47)
  const bytes = new Uint8Array(content);
  const pngMagic = [0x89, 0x50, 0x4e, 0x47];
  const isPng = pngMagic.every((byte, index) => bytes[index] === byte);

  // Also check for JPEG magic bytes (FF D8 FF)
  const jpegMagic = [0xff, 0xd8, 0xff];
  const isJpeg = jpegMagic.every((byte, index) => bytes[index] === byte);

  if (!isPng && !isJpeg) {
    console.log(
      `Downloaded content is not a PNG or JPEG (magic bytes: ${Array.from(bytes.slice(0, 8))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join(" ")})`,
    );
  } else {
    const format = isPng ? "PNG" : "JPEG";
    console.log(`Successfully downloaded ${format} image (${contentLength} bytes)`);
  }
}

/**
 * Revoke the current SAS token.
 */
async function revokeToken(client: PlanetaryComputerProClient): Promise<void> {
  console.log("Revoking SAS token...");

  await client.sharedAccessSignature.revokeToken();

  console.log("SAS token revoked successfully");
}

/**
 * Main execution function.
 */
async function main(): Promise<void> {
  console.log(`Connected to: ${endpoint}`);
  console.log(`Collection ID: ${collectionId}\n`);

  // Create client
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(endpoint, credential);

  // Using API for signing a given URI
  const { signedHref, unsignedHref } = await signAssetHref(client, collectionId);

  // Using SAS token appended to unsigned URI
  const sasTokenResponse = await generateSasToken(client, collectionId);
  const sasToken = sasTokenResponse.token;
  const hrefWithSas = `${unsignedHref}?${sasToken}`;

  console.log("\nTesting signed URL download...");
  await downloadAsset(signedHref);

  console.log("\nTesting SAS token URL download...");
  await downloadAsset(hrefWithSas);

  // Revoke the token
  await revokeToken(client);

  console.log("\nShared Access Signature Operations Complete");
}

main().catch(console.error);

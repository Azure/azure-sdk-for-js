// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TServiceInformation } from "./deploy";
import { execSync } from "child_process";
import { getClient } from "@azure-rest/core-client";

function getAccessToken(): string {
  execSync(`az login`);
  const accessToken = execSync(
    `az account get-access-token --resource-type arm --output tsv --query accessToken`
  )
    .toString()
    .trim();
  return `Bearer ${accessToken}`;
}

/**
 * Function to get storage SAS URL.
 *
 * @returns storage SAS URL
 */
async function getStorageSasUrl({
  managementApiEndpoint,
  resourceId,
  apiVersion = "2019-01-01",
  tokenOverride,
}: TServiceInformation): Promise<string> {
  const httpClient = getClient(`${managementApiEndpoint}/${resourceId}`, { apiVersion });
  const response = await httpClient.pathUnchecked(`/portalSettings/mediaContent/listSecrets?apiVersion=${apiVersion}`).post({
    headers: {
      "If-Match": "*",
      "Content-Type": "application/json",
      Authorization: tokenOverride ?? getAccessToken(),
    },
  });

  if (!response?.body?.containerSasUrl) throw new Error("Could not get storage SAS URL");
  return response.body.containerSasUrl;
}

export default getStorageSasUrl;

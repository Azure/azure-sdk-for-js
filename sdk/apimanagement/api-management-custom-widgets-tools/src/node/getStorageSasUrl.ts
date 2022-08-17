// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InteractiveBrowserCredential } from "@azure/identity";
import { ServiceInformation } from "./deploy";
import { getClient } from "@azure-rest/core-client";

async function getAccessToken(managementApiEndpoint: string): Promise<string> {
  const credentials = new InteractiveBrowserCredential();
  const scope = `${managementApiEndpoint}/user_impersonation`;
  const { token } = await credentials.getToken(scope);
  return `Bearer ${token}`;
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
}: ServiceInformation): Promise<string> {
  const httpClient = getClient(`${managementApiEndpoint}/${resourceId}`, { apiVersion });
  const response = await httpClient
    .pathUnchecked(`/portalSettings/mediaContent/listSecrets?apiVersion=${apiVersion}`) // TODO
    .post({
      headers: {
        "If-Match": "*",
        "Content-Type": "application/json",
        Authorization: tokenOverride ?? (await getAccessToken(managementApiEndpoint)),
      },
    });

  if (!response?.body?.containerSasUrl) throw new Error("Could not get storage SAS URL");
  return response.body.containerSasUrl;
}

export default getStorageSasUrl;

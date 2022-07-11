// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {createDefaultHttpClient, createHttpHeaders} from "@azure/core-rest-pipeline"
import {TServiceInformation} from "./deploy"
import {execSync} from "child_process"

function getAccessToken(): string {
  execSync(`az login`)
  const accessToken = execSync(`az account get-access-token --resource-type arm --output tsv --query accessToken`).toString().trim()
  return `Bearer ${accessToken}`
}

/**
 * Function to get storage SAS URL.
 *
 * @returns storage SAS URL
 */
async function getStorageSasUrl({managementApiEndpoint, resourceId, apiVersion = "2019-01-01", tokenOverride}: TServiceInformation): Promise<string> {
  const httpClient = createDefaultHttpClient()
  const response = await httpClient.sendRequest({
    method: "POST",
    url: `${managementApiEndpoint}/${resourceId}/portalSettings/mediaContent/listSecrets?api-version=${apiVersion}`,
    headers: createHttpHeaders({
      "If-Match": "*",
      "Content-Type": "application/json",
      "Authorization": tokenOverride ?? getAccessToken(),
    }),
    timeout: 0, // TODO
    withCredentials: false, // TODO
    requestId: Math.random().toString(), // TODO
  })
  if (!response.bodyAsText) throw new Error("Could not get storage SAS URL")
  return JSON.parse(response.bodyAsText).containerSasUrl
}

export default getStorageSasUrl

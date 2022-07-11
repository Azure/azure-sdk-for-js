const {execSync} = require("child_process")
const {createDefaultHttpClient, createHttpHeaders} = require("@azure/core-rest-pipeline")

function getAccessToken() {
  execSync(`az login`)
  const accessToken = execSync(`az account get-access-token --resource-type arm --output tsv --query accessToken`).toString().trim()
  return `Bearer ${accessToken}`
}

/**
 * Function to get storage SAS URL.
 *
 * @param {string} managementApiEndpoint URL with protocol (e.g. https://management.azure.com)
 * @param {string} resourceId resource ID of API Management service "subscriptions/[subscription-id]/resourceGroups/[resource-group-name]/providers/Microsoft.ApiManagement/service/[service-name]"
 * @param {string} [apiVersion] optional to override default (e.g. "2019-01-01")
 * @param {string} [tokenOverride] optional way to override token to use for auth
 *
 * @returns {string} storage SAS URL
 */
async function getStorageSasUrl({managementApiEndpoint, resourceId, apiVersion = "2019-01-01", tokenOverride}) {
  const httpClient = createDefaultHttpClient()
  const response = await httpClient.sendRequest({
    method: "POST",
    url: `${managementApiEndpoint}/${resourceId}/portalSettings/mediaContent/listSecrets?api-version=${apiVersion}`,
    headers: createHttpHeaders({
      "If-Match": "*",
      "Content-Type": "application/json",
      "Authorization": tokenOverride ?? getAccessToken(),
    }),
  })
  return JSON.parse(response.bodyAsText).containerSasUrl
}

module.exports = getStorageSasUrl

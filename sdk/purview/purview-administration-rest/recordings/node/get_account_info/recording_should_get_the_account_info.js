let nock = require('nock');

module.exports.hash = "2ff3b5a65daf079dc2f7d73b5d58f0de";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '30de26ae-aea3-4b3c-8a27-cd0d537b1d00',
  'x-ms-ests-server',
  '2.1.12071.23 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=Amchb9QCC5BCnrTsTeEbCSv__1r8AQAAAL-05tgOAAAA; expires=Fri, 29-Oct-2021 19:25:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 19:25:52 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, {"sku":{"name":"Standard","capacity":1},"properties":{"cloudConnectors":{"awsExternalId":"2c7d73eb-7327-4166-b30c-96167c7b7271"},"friendlyName":"newpurviewllc","createdBy":"joheredi@microsoft.com","createdByObjectId":"35ac9d32-a8ca-4324-9393-d4000746f07c","createdAt":"2021-09-29T18:35:18.4761382Z","endpoints":{"catalog":"https://endpoint/catalog","scan":"https://endpoint/scan","guardian":"https://endpoint/guardian"},"provisioningState":"Succeeded","privateEndpointConnections":[],"managedResources":{"resourceGroup":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/managed-rg-newpurviewllc","storageAccount":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/managed-rg-newpurviewllc/providers/Microsoft.Storage/storageAccounts/scaneastusopeznna","eventHubNamespace":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/managed-rg-newpurviewllc/providers/Microsoft.EventHub/namespaces/Atlas-169658be-bf24-44f9-9873-fd914892a4f6"},"publicNetworkAccess":"Enabled","managedResourceGroupName":"managed-rg-newpurviewllc"},"id":"/subscriptions/faa080af-c1d8-40ad-9cce-e1a450ca5b57/resourceGroups/joheredi-test/providers/Microsoft.Purview/accounts/newpurviewllc","name":"newpurviewllc","type":"Microsoft.Purview/accounts","location":"eastus","identity":{"type":"SystemAssigned","principalId":"cb046a1b-cf5b-4a43-b188-322568afb9d4","tenantId":"88888888-8888-8888-8888-888888888888"},"tags":{},"systemData":{"createdBy":"joheredi@microsoft.com","createdByType":"User","createdAt":"2021-09-29T18:35:18.4761382Z","lastModifiedBy":"joheredi@microsoft.com","lastModifiedByType":"User","lastModifiedAt":"2021-09-29T18:35:18.4761382Z"}}, [
  'Date',
  'Wed, 29 Sep 2021 19:25:52 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  '4eee233c-08a5-400c-9dc7-0d1a28bc6bc0',
  'x-ms-account-status',
  'Succeeded'
]);

let nock = require('nock');

module.exports.hash = "8d7a5064193fd3abc88f4377ba6dc9cc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1318',
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
  'c2d476f7-a163-489f-b652-4edd4b3b1d00',
  'x-ms-ests-server',
  '2.1.11961.8 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkYP_YbTL4BNjQ60P4gX0UGqGAkBAQAAAPNirdgOAAAA; expires=Thu, 16-Sep-2021 07:57:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Tue, 17 Aug 2021 07:57:39 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, {"sku":{"name":"Standard","capacity":4},"properties":{"cloudConnectors":{"awsExternalId":"62987988-1c52-4bf0-900b-e4e721f62a49"},"friendlyName":"qiaozhatest","createdBy":"qiaozha@microsoft.com","createdByObjectId":"e0f63e9f-e67d-46b9-a50d-c5846cc99ed2","createdAt":"2021-08-11T09:24:28.626038Z","endpoints":{"catalog":"https://qiaozhatest.catalog.purview.azure.com","scan":"https://qiaozhatest.scan.purview.azure.com","guardian":"https://qiaozhatest.guardian.purview.azure.com"},"provisioningState":"Succeeded","privateEndpointConnections":[],"managedResources":{"resourceGroup":"/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/managed-rg-qiaozhatest","storageAccount":"/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/managed-rg-qiaozhatest/providers/Microsoft.Storage/storageAccounts/scaneastustyucqch","eventHubNamespace":"/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/managed-rg-qiaozhatest/providers/Microsoft.EventHub/namespaces/Atlas-d24a8b31-2b80-473f-b099-8af4e8138614"},"publicNetworkAccess":"Enabled","managedResourceGroupName":"managed-rg-qiaozhatest"},"id":"/subscriptions/92f95d8f-3c67-4124-91c7-8cf07cdbf241/resourceGroups/qiaozhatest/providers/Microsoft.Purview/accounts/qiaozhatest","name":"qiaozhatest","type":"Microsoft.Purview/accounts","location":"eastus","identity":{"type":"SystemAssigned","principalId":"8b374da7-4073-4560-8b96-43cfcb14a81b","tenantId":"88888888-8888-8888-8888-888888888888"},"tags":{},"systemData":{"createdBy":"qiaozha@microsoft.com","createdByType":"User","createdAt":"2021-08-11T09:24:28.626038Z","lastModifiedBy":"qiaozha@microsoft.com","lastModifiedByType":"User","lastModifiedAt":"2021-08-11T09:24:28.626038Z"}}, [
  'Date',
  'Tue, 17 Aug 2021 07:57:40 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Transfer-Encoding',
  'chunked',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  'b9355ce6-f27f-4cb7-a147-e1db32707907',
  'x-ms-account-status',
  'Succeeded'
]);

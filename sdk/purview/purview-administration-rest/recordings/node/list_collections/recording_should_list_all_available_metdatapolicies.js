let nock = require('nock');

module.exports.hash = "a1c2b41f0ee674e3f48aeab6e1cb4b00";

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
  '6e880cc2-24c0-4554-909d-ea6a83d60700',
  'x-ms-ests-server',
  '2.1.12071.23 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=As31ep5kVxtCgofVfjSB5JT__1r8AQAAAEyy5tgOAAAA; expires=Fri, 29-Oct-2021 19:15:24 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 29 Sep 2021 19:15:24 GMT',
  'Content-Length',
  '1318'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/policyStore/metadataRoles')
  .query(true)
  .reply(200, {"values":[{"id":"purviewmetadatarole_builtin_data-curator","name":"data-curator","type":"Microsoft.Purview/role","properties":{"provisioningState":"Provisioned","roleType":"BuiltIn","friendlyName":"Data Curator","cnfCondition":[[{"attributeName":"request.azure.dataAction","attributeValueIncludedIn":["Microsoft.Purview/accounts/data/read","Microsoft.Purview/accounts/data/write","Microsoft.Purview/accounts/collection/read"]}]],"version":1}},{"id":"purviewmetadatarole_builtin_data-source-administrator","name":"data-source-administrator","type":"Microsoft.Purview/role","properties":{"provisioningState":"Provisioned","roleType":"BuiltIn","friendlyName":"Data Source Administrator","cnfCondition":[[{"attributeName":"request.azure.dataAction","attributeValueIncludedIn":["Microsoft.Purview/accounts/scan/read","Microsoft.Purview/accounts/scan/write","Microsoft.Purview/accounts/collection/read"]}]],"version":1}},{"id":"purviewmetadatarole_builtin_collection-administrator","name":"collection-administrator","type":"Microsoft.Purview/role","properties":{"provisioningState":"Provisioned","roleType":"BuiltIn","friendlyName":"Collection Administrator","cnfCondition":[[{"attributeName":"request.azure.dataAction","attributeValueIncludedIn":["Microsoft.Purview/accounts/collection/read","Microsoft.Purview/accounts/collection/write"]}]],"version":1}},{"id":"purviewmetadatarole_builtin_purview-reader","name":"purview-reader","type":"Microsoft.Purview/role","properties":{"provisioningState":"Provisioned","roleType":"BuiltIn","friendlyName":"Purview Reader","cnfCondition":[[{"attributeName":"request.azure.dataAction","attributeValueIncludedIn":["Microsoft.Purview/accounts/data/read","Microsoft.Purview/accounts/collection/read"]}]],"version":1}}],"nextLink":"https://endpoint/policyStore/metadataRoles?api-version=2021-07-01&skipToken=%2BRID%3A~OCYSANC6p-wJCT0AAAAAAA%3D%3D%23RT%3A1%23TRC%3A5%23ISV%3A2%23IEO%3A65551%23QCF%3A4%23FPC%3AAgH09PQEAAmJBoA%3D"}, [
  'Date',
  'Wed, 29 Sep 2021 19:15:24 GMT',
  'Content-Type',
  'application/json; charset=utf-8',
  'Server',
  'Kestrel',
  'Content-Length',
  '1983',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-correlation-request-id',
  'df5ad4ff-bfac-4f2d-a9bf-728e423cdb72',
  'api-supported-versions',
  '2021-01-01-preview, 2021-07-01'
]);

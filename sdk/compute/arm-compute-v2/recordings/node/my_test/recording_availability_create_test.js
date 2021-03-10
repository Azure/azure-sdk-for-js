let nock = require('nock');

module.exports.hash = "89f631772808cbd92992cfcadefae5c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.azure.com%2F.default")
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
  'd4f4efa4-4295-4743-9e7b-da3f94700600',
  'x-ms-ests-server',
  '2.1.11562.6 - KRSLR1 ProdSlices',
  'Set-Cookie',
  'fpc=Alm28hT4j0hEijCI3BREpTOEnRgpAQAAAC9K2tcOAAAA; expires=Fri, 09-Apr-2021 05:03:44 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Mar 2021 05:03:43 GMT',
  'Content-Length',
  '1351'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .put('/subscriptions/azure_subscription_id/resourceGroups/qiaozhatest/providers/Microsoft.Compute/availabilitySets/jssdktest', {"location":"eastus"})
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8a79b66f6b6cd9bf6a3117f5eccf0e9dd663d69a675b16a8b6ad9dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9fb8b8aacfac13c03e8bbabbaba2c6679dddcfda298d655539db7e3936ab15ab7f9ddec322bca6c5294457bfd3a6f9bbb5d8cdaeb15637af3abfa42594d33e08d97f2ac69d7e60b426395d76d9137f41593011f96597b5ed58baf563342f669b5c88ae549b55eb6d4e63ebfe7357a96adcb366c730f4d7e0937fca879bba64f0c6443e293326b9a62fa113efe25bf71f24b","fe1fc8fef30781010000"], [
  'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json; charset=utf-8',
  'Content-Encoding',
  'gzip',
  'Expires',
  '-1',
  'Vary',
  'Accept-Encoding',
  'x-ms-ratelimit-remaining-resource',
  'Microsoft.Compute/PutVM3Min;239,Microsoft.Compute/PutVM30Min;1198',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '57dcb044-2b06-49ed-9210-caa2cf9ae9e0',
  'x-ms-ratelimit-remaining-subscription-writes',
  '1199',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  '6e64281f-7cd8-4d68-a2e9-b978c4236e70',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210310T050350Z:6e64281f-7cd8-4d68-a2e9-b978c4236e70',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 10 Mar 2021 05:03:49 GMT',
  'Connection',
  'close'
]);

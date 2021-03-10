let nock = require('nock');

module.exports.hash = "277a9a87059bbaae05bf08cb08b4a02f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/88888888-8888-8888-8888-888888888888/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fmanagement.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1351',
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
  '9f7c1fe5-81f7-47af-b6b8-baeb940a0100',
  'x-ms-ests-server',
  '2.1.11562.6 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=Alm28hT4j0hEijCI3BREpTOEnRgpAgAAAC9K2tcOAAAA; expires=Fri, 09-Apr-2021 05:03:50 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Mar 2021 05:03:49 GMT'
]);

nock('https://management.azure.com:443', {"encodedQueryParams":true})
  .get('/subscriptions/azure_subscription_id/resourceGroups/qiaozhatest/providers/Microsoft.Compute/availabilitySets/jssdktest')
  .query(true)
  .reply(200, ["1f8b0800000000000400edbd07601c499625262f6dca7b7f4af54ad7e074a10880601324d8904010ecc188cde692ec1d69472329ab2a81ca6556655d661640cced9dbcf7de7befbdf7de7befbdf7ba3b9d4e27f7dfff3f5c6664016cf6ce4adac99e2180aac81f3f7e7c1f3f227ef16f9ca4e947cb6c917ff428fde8a79b66f6b6cd9bf6a3117f5eccf0e9dd663d69a675b16a8b6ad9dc7db877fef0feece07cfbdef4d307dbfbbb7bfbdb0f77a70fb60fa6e73b0fa6b3c9f9defeeedd3a6faa753dcd3fafabf5aab9fb8b8aacfac13c03e8bbabbaba2c6679dddcfda298d655539db7e3936ab15ab7f9ddec322bca6c5294457bfd3a6f9bbb5d8cdaeb15637af3abfa42594d33e08d97f2ac69d7e60b426395d76d9137f41593011f96597b5ed58baf563342f669b5c88ae549b55eb6d4e63ebfe7357a96adcb366c73cfb4b92cea769d955f64d379b1e42ebef77d7cf54bb8c147cddb357d647a35e43f29b3a629a61fe1e35ff21b27","bfe4ff0185f310409d010000"], [
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
  'Microsoft.Compute/LowCostGet3Min;3998,Microsoft.Compute/LowCostGet30Min;31997',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'x-ms-request-id',
  '36c9240f-2310-440c-9ee9-d5225c2851da',
  'x-ms-ratelimit-remaining-subscription-reads',
  '11999',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-correlation-request-id',
  'a80f5fb7-881e-4a61-9aee-936f524f666e',
  'x-ms-routing-request-id',
  'SOUTHEASTASIA:20210310T050350Z:a80f5fb7-881e-4a61-9aee-936f524f666e',
  'X-Content-Type-Options',
  'nosniff',
  'Date',
  'Wed, 10 Mar 2021 05:03:50 GMT',
  'Connection',
  'close'
]);

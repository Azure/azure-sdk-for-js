let nock = require('nock');

module.exports.hash = "c2f50ecc051b8d62b645034e2bdced2f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Length',
  '1331',
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
  'd28edc55-afec-488d-9ed0-1547aee30600',
  'x-ms-ests-server',
  '2.1.11722.26 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AvJP_5zXpMNFtNCcPwwYUd3GLH8mDgAAAMwkSdgOAAAA; expires=Fri, 02-Jul-2021 07:06:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 07:06:28 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Miami","category":"Health & Personal Care"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Rio de Janeiro","category":"Historical & Advertising Collectibles"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '443',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd2c98d16-802b-4fd5-89bf-cca33a09ba2d',
  'x-envoy-upstream-service-time',
  '5132',
  'apim-request-id',
  'd2c98d16-802b-4fd5-89bf-cca33a09ba2d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:06:33 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query', {"activeSince":"2020-08-05T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Belo Horizonte","category":"Electronics (Consumer)"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","dimension":{"city":"Kinshasa","category":"Beauty"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/series/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '415',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3f2b67f9-1bb1-4a30-857a-3b3faf9d988a',
  'x-envoy-upstream-service-time',
  '156',
  'apim-request-id',
  '3f2b67f9-1bb1-4a30-857a-3b3faf9d988a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:06:33 GMT'
]);

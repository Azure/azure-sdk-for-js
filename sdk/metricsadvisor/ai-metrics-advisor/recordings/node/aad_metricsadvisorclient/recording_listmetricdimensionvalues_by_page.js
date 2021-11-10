let nock = require('nock');

module.exports.hash = "a72c7e715903e51f1c1be9181bb361c1";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
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
  '215a4b6a-4fce-4f05-9ced-e0beb8592e00',
  'x-ms-ests-server',
  '2.1.12231.7 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AllSpPu0H9xBticNnd7axkg; expires=Fri, 10-Dec-2021 02:07:12 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:11 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"category"})
  .query(true)
  .reply(200, {"value":["__SUM__","Electronics (Accessories)"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '226',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4a4b18bc-bce4-41e6-bd30-d69c8fde6352',
  'x-envoy-upstream-service-time',
  '56',
  'apim-request-id',
  '4a4b18bc-bce4-41e6-bd30-d69c8fde6352',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:12 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"category"})
  .query(true)
  .reply(200, {"value":["Electronics (Consumer)","Grocery & Gourmet Food"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '238',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c6add017-c881-4b80-9f4e-e5c328b1a06d',
  'x-envoy-upstream-service-time',
  '50',
  'apim-request-id',
  'c6add017-c881-4b80-9f4e-e5c328b1a06d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:12 GMT'
]);

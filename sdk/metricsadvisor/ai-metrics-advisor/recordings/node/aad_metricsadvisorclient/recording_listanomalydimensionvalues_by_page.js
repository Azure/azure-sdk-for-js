let nock = require('nock');

module.exports.hash = "3f755d2f51e43a27e2d1fd6888eae793";

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
  'cac9e4e4-b417-426f-ae6d-f846f0f60100',
  'x-ms-ests-server',
  '2.1.11444.12 - KRSLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AkbLaGQKEtxImmpXrQ054RzGLH8mAQAAAO5ZptcOAAAA; expires=Sun, 28-Feb-2021 19:33:03 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 29 Jan 2021 19:33:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["__SUM__","Karachi"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$top=2&$skip=2"}, [
  'Content-Length',
  '245',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7118e781-384f-4b7e-8f82-cfd4de3106d9',
  'x-envoy-upstream-service-time',
  '376',
  'apim-request-id',
  '7118e781-384f-4b7e-8f82-cfd4de3106d9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 29 Jan 2021 19:33:05 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","dimensionName":"city"})
  .query(true)
  .reply(200, {"value":["Los Angeles","Delhi"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query?$top=2&$skip=4"}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '7a0de988-04e2-423f-9874-28fde7cc9f80',
  'x-envoy-upstream-service-time',
  '265',
  'apim-request-id',
  '7a0de988-04e2-423f-9874-28fde7cc9f80',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 29 Jan 2021 19:33:05 GMT'
]);

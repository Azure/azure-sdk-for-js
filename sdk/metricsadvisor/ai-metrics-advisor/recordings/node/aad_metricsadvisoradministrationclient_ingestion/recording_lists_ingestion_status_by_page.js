let nock = require('nock');

module.exports.hash = "93dee8c8770c9f1d32b06775d8ae6481";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/azure_tenant_id/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  'c543f5d4-0a06-4251-a4a4-fb50040faf00',
  'x-ms-ests-server',
  '2.1.11722.26 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhDmgzXYAD1Lu7GFYxxGYOLGLH8mAwAAAHi3SdgOAAAA; expires=Fri, 02-Jul-2021 17:31:38 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 17:31:37 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:36:01Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:55:32Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '452',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6a563044-b6bb-4f5f-97b8-a567a02be08d',
  'x-envoy-upstream-service-time',
  '144',
  'apim-request-id',
  '6a563044-b6bb-4f5f-97b8-a567a02be08d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:37 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:54:49Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:52:57Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '452',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'e2f3379c-f1a6-445e-ac16-ab9880078afb',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'e2f3379c-f1a6-445e-ac16-ab9880078afb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:37 GMT'
]);

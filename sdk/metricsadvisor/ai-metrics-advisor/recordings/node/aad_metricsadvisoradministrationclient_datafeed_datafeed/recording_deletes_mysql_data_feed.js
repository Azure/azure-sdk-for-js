let nock = require('nock');

module.exports.hash = "dd9d3737f1407f2c7563f2ae1728ce3b";

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
  '29291283-7e8f-4062-a7c4-2d2432290800',
  'x-ms-ests-server',
  '2.1.11787.14 - EUS ProdSlices',
  'Set-Cookie',
  'fpc=Ao3LGmWoTnxIo4o1diRecJfGLH8mCQAAAFgUStgOAAAA; expires=Sat, 03-Jul-2021 00:10:21 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Thu, 03 Jun 2021 00:10:21 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/4470d70e-ebd3-4ea9-bbfa-c4506a07359a')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bd584c7e-c839-42ef-9aed-29166ca29e7d',
  'x-envoy-upstream-service-time',
  '5453',
  'apim-request-id',
  'bd584c7e-c839-42ef-9aed-29166ca29e7d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/4470d70e-ebd3-4ea9-bbfa-c4506a07359a')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bc5f3dc8-3099-4152-b7ad-fe48bfa32748',
  'x-envoy-upstream-service-time',
  '5129',
  'apim-request-id',
  'bc5f3dc8-3099-4152-b7ad-fe48bfa32748',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 03 Jun 2021 00:10:31 GMT'
]);

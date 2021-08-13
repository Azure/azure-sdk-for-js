let nock = require('nock');

module.exports.hash = "b5fd0decc061fef9383c5036ded1a14b";

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
  'e45f4d10-c207-407a-b1e7-c8bf1fe4a800',
  'x-ms-ests-server',
  '2.1.11722.26 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=AhDmgzXYAD1Lu7GFYxxGYOLGLH8mBQAAAHi3SdgOAAAA; expires=Fri, 02-Jul-2021 17:31:39 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 02 Jun 2021 17:31:38 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":"Pending Retry. ","lastAttemptTime":"2021-06-02T06:43:31Z"}]}, [
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3cbf0ae5-725c-4158-aca7-0e235589d221',
  'x-envoy-upstream-service-time',
  '140',
  'apim-request-id',
  '3cbf0ae5-725c-4158-aca7-0e235589d221',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 17:31:38 GMT'
]);

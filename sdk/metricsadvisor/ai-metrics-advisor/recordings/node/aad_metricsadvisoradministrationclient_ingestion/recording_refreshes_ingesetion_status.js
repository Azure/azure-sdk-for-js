let nock = require('nock');

module.exports.hash = "b5fd0decc061fef9383c5036ded1a14b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '1a6e5025-7138-4544-a57f-e73c6412dc00',
  'x-ms-ests-server',
  '2.1.11722.21 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGHGLH8mAgAAAAZAMdgOAAAA; expires=Mon, 14-Jun-2021 04:07:40 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 04:07:39 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Running","message":"","lastAttemptTime":"2021-05-15T04:07:13Z"}]}, [
  'Content-Length',
  '121',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '176f2bab-1f14-4dee-9bef-d0638b9b0ea6',
  'x-envoy-upstream-service-time',
  '5521',
  'apim-request-id',
  '176f2bab-1f14-4dee-9bef-d0638b9b0ea6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:07:45 GMT'
]);

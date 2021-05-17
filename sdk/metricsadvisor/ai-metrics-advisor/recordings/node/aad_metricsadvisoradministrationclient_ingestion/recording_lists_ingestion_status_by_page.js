let nock = require('nock');

module.exports.hash = "93dee8c8770c9f1d32b06775d8ae6481";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/12345678-1234-1234-1234-123456789012/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fcognitiveservices.azure.com%2F.default")
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
  '6b4dde0a-dff8-4a7c-85cb-e848a7d50f00',
  'x-ms-ests-server',
  '2.1.11722.21 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AinGrRGBzI5Mg73OLQslIGFb6HqYAQAAAOg5MdgOAAAAxix_JgIAAADpOTHYDgAAAA; expires=Mon, 14-Jun-2021 03:41:35 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Sat, 15 May 2021 03:41:35 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:26:20Z"},{"timestamp":"2020-08-30T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:25:51Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '476',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6fd31d88-d211-49d5-b5d4-73004382c7e8',
  'x-envoy-upstream-service-time',
  '5376',
  'apim-request-id',
  '6fd31d88-d211-49d5-b5d4-73004382c7e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 03:41:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .query(true)
  .reply(200, {"value":[{"timestamp":"2020-08-29T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:30:05Z"},{"timestamp":"2020-08-28T00:00:00Z","status":"Failed","message":"Cannot fetch data from source. ","lastAttemptTime":"2021-05-15T03:29:08Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query?$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '476',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f932163e-9141-4d38-80fb-abef02ebc8e4',
  'x-envoy-upstream-service-time',
  '5434',
  'apim-request-id',
  'f932163e-9141-4d38-80fb-abef02ebc8e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 03:41:46 GMT'
]);

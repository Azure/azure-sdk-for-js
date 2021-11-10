let nock = require('nock');

module.exports.hash = "481a1703db08a541b8a31c330d57373f";

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
  'd2417219-4213-4ffe-b3a8-215fa741ba00',
  'x-ms-ests-server',
  '2.1.12197.4 - SCUS ProdSlices',
  'Set-Cookie',
  'fpc=Ag7NCBmgpfZArwbnFcFYCq0; expires=Wed, 08-Dec-2021 09:37:49 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Mon, 08 Nov 2021 09:37:49 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-10-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-10-30T00:00:00Z","status":"Succeeded","message":""}]}, [
  'Content-Length',
  '153',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c1137e99-418d-41ab-8627-873a4a65f805',
  'x-envoy-upstream-service-time',
  '188',
  'apim-request-id',
  'c1137e99-418d-41ab-8627-873a4a65f805',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress/reset', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'abcc0466-219f-44ca-b73d-6d072fe3763a',
  'x-envoy-upstream-service-time',
  '185',
  'apim-request-id',
  'abcc0466-219f-44ca-b73d-6d072fe3763a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:49 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-10-31T00:00:00Z","status":"NotStarted","message":""},{"timestamp":"2020-10-30T00:00:00Z","status":"NotStarted","message":""}]}, [
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bcd469d2-0e71-4057-aa29-6c6675f63ee0',
  'x-envoy-upstream-service-time',
  '172',
  'apim-request-id',
  'bcd469d2-0e71-4057-aa29-6c6675f63ee0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:37:49 GMT'
]);

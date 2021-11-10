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
  '9b14d4aa-6a4f-4138-9ff1-3590fdff0500',
  'x-ms-ests-server',
  '2.1.12231.7 - WUS2 ProdSlices',
  'Set-Cookie',
  'fpc=AhqeKoXfYgxJtsUIGdjb5KzGLH8mAQAAAHscHdkOAAAA; expires=Fri, 10-Dec-2021 01:50:52 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 01:50:52 GMT',
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
  '561ef3f4-d48d-4ee5-bd2a-9c076ca476d5',
  'x-envoy-upstream-service-time',
  '332',
  'apim-request-id',
  '561ef3f4-d48d-4ee5-bd2a-9c076ca476d5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:50:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress/reset', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '3fc97aa9-3077-4860-89b0-e2dd12182519',
  'x-envoy-upstream-service-time',
  '300',
  'apim-request-id',
  '3fc97aa9-3077-4860-89b0-e2dd12182519',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-10-30T00:00:00.000Z","endTime":"2020-11-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-10-31T00:00:00Z","status":"NotStarted","message":""},{"timestamp":"2020-10-30T00:00:00Z","status":"NotStarted","message":""}]}, [
  'Content-Length',
  '155',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2c9cc143-6d86-4318-a6fb-d1c15fbed94c',
  'x-envoy-upstream-service-time',
  '368',
  'apim-request-id',
  '2c9cc143-6d86-4318-a6fb-d1c15fbed94c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 01:51:22 GMT'
]);

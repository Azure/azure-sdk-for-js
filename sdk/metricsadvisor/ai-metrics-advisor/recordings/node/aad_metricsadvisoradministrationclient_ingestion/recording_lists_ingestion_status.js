let nock = require('nock');

module.exports.hash = "86ba04863d69607c629f4d0864ecd174";

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
  '10a2508c-de7a-4341-9ec9-0c2e53cb7400',
  'x-ms-ests-server',
  '2.1.11397.13 - SEASLR2 ProdSlices',
  'Set-Cookie',
  'fpc=AjMmLnj9AXtJjZYSirhtYUHGLH8mAQAAANvjk9cOAAAA; expires=Sun, 14-Feb-2021 19:28:28 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Fri, 15 Jan 2021 19:28:27 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-01T00:00:00.000Z","endTime":"2020-09-01T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-31T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-30T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-29T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-28T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-27T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-26T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-25T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-24T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-23T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-22T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-21T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-20T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-19T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-18T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-17T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-16T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-15T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-14T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-13T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-12T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-11T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-10T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-09T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-08T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-07T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-06T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-05T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-04T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-03T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-02T00:00:00Z","status":"Succeeded","message":""},{"timestamp":"2020-08-01T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":null}, [
  'Content-Length',
  '2229',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '848b8799-ce71-46ac-826a-63bfdc5e1114',
  'x-envoy-upstream-service-time',
  '707',
  'apim-request-id',
  '848b8799-ce71-46ac-826a-63bfdc5e1114',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 19:28:40 GMT'
]);

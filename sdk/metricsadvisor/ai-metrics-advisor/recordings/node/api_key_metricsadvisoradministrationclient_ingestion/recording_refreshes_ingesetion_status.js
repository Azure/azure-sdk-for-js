let nock = require('nock');

module.exports.hash = "f3f23f5f98cbdf2f1b7f938cf3c3c2c0";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":null}, [
  'Content-Length',
  '99',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f8f862bb-4d4a-4524-b97b-21d910b41aa2',
  'x-envoy-upstream-service-time',
  '310',
  'apim-request-id',
  'f8f862bb-4d4a-4524-b97b-21d910b41aa2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress/reset', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'f586a7de-cb1c-4f58-85b3-aa82fb1149ce',
  'x-envoy-upstream-service-time',
  '421',
  'apim-request-id',
  'f586a7de-cb1c-4f58-85b3-aa82fb1149ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:16 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":""}],"@nextLink":null}, [
  'Content-Length',
  '100',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '09172863-1d98-4a8d-a5f2-0af4373d511e',
  'x-envoy-upstream-service-time',
  '392',
  'apim-request-id',
  '09172863-1d98-4a8d-a5f2-0af4373d511e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:39:16 GMT'
]);

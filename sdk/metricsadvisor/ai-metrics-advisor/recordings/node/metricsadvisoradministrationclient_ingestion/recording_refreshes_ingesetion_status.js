let nock = require('nock');

module.exports.hash = "3070de3f0d8335a1c26c3b11aa3a2027";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":null}, [
  'Content-Length',
  '99',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '39ac2dd9-4433-4cb8-8c74-39a9732b7bc3',
  'x-envoy-upstream-service-time',
  '183',
  'apim-request-id',
  '39ac2dd9-4433-4cb8-8c74-39a9732b7bc3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 23:14:38 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress/reset', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd085549c-95a6-4f6b-bcec-539502e25607',
  'x-envoy-upstream-service-time',
  '267',
  'apim-request-id',
  'd085549c-95a6-4f6b-bcec-539502e25607',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 23:14:39 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":""}],"@nextLink":null}, [
  'Content-Length',
  '100',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '1d636462-a88f-4366-9f3e-a17672aa6280',
  'x-envoy-upstream-service-time',
  '162',
  'apim-request-id',
  '1d636462-a88f-4366-9f3e-a17672aa6280',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 25 Sep 2020 23:14:40 GMT',
  'Connection',
  'close'
]);

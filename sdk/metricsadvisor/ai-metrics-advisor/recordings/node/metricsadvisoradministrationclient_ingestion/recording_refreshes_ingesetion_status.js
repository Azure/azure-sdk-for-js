let nock = require('nock');

module.exports.hash = "135ca41d063e560363416c1ac506473f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"Succeeded","message":""}],"@nextLink":null}, [
  'Content-Length',
  '99',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2f65688e-6d51-47da-ba9c-71458b9ac381',
  'x-envoy-upstream-service-time',
  '205',
  'apim-request-id',
  '2f65688e-6d51-47da-ba9c-71458b9ac381',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionProgress/reset', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '9c0f0d13-9607-4963-ac28-8961068943f7',
  'x-envoy-upstream-service-time',
  '264',
  'apim-request-id',
  '9c0f0d13-9607-4963-ac28-8961068943f7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:43 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/dataFeeds/89a2-05903dd9a640-26ece682-80a6-4415/ingestionStatus/query', {"startTime":"2020-08-22T00:00:00.000Z","endTime":"2020-08-23T00:00:00.000Z"})
  .reply(200, {"value":[{"timestamp":"2020-08-22T00:00:00Z","status":"NotStarted","message":""}],"@nextLink":null}, [
  'Content-Length',
  '100',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c0a8380b-c371-4f6b-8c8e-d18c19228684',
  'x-envoy-upstream-service-time',
  '208',
  'apim-request-id',
  'c0a8380b-c371-4f6b-8c8e-d18c19228684',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 21:11:44 GMT'
]);

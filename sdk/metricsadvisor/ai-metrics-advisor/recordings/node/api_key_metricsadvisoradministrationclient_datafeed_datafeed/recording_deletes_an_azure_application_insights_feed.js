let nock = require('nock');

module.exports.hash = "81ce971f29723c92439a2f7abf28283b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/86b83bf4-cc78-4ac9-8841-1bbbdbf6818e')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0c37da15-999c-4a4f-9dab-22a303b3b9e8',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  '0c37da15-999c-4a4f-9dab-22a303b3b9e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/86b83bf4-cc78-4ac9-8841-1bbbdbf6818e')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '9b6eed86-dade-41d5-a01e-68592644db6b',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '9b6eed86-dade-41d5-a01e-68592644db6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:54 GMT'
]);

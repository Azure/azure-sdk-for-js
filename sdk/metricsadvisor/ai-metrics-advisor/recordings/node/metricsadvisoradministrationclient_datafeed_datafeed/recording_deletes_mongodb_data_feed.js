let nock = require('nock');

module.exports.hash = "ca26442e966a10e9febe91d27f3abb2c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/b9d5bd88-457a-4cd3-86f5-ebba7dc7d206')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0dcc9a06-2ef3-4ec1-a56f-ba5c6e35dd72',
  'x-envoy-upstream-service-time',
  '295',
  'apim-request-id',
  '0dcc9a06-2ef3-4ec1-a56f-ba5c6e35dd72',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/b9d5bd88-457a-4cd3-86f5-ebba7dc7d206')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c396e69b-4844-4453-b2a6-7d81980b23df',
  'x-envoy-upstream-service-time',
  '64',
  'apim-request-id',
  'c396e69b-4844-4453-b2a6-7d81980b23df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:52 GMT'
]);

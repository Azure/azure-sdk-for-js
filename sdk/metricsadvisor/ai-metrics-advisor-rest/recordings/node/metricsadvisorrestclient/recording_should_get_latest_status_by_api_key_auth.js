let nock = require('nock');

module.exports.hash = "3838f9de4b16ff00d844f322aa20595b";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/stats/latest')
  .reply(200, {"timestamp":"2022-03-15T03:17:32Z","activeSeriesCount":176,"allSeriesCount":176,"metricsCount":2,"dataFeedCount":1,"dataPointsCount":7568}, [
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'adb5d099-9f6d-4e84-80ad-8f0054b6d4e9',
  'x-envoy-upstream-service-time',
  '644',
  'apim-request-id',
  'adb5d099-9f6d-4e84-80ad-8f0054b6d4e9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 15 Mar 2022 03:26:54 GMT'
]);

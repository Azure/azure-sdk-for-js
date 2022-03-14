let nock = require('nock');

module.exports.hash = "0c8ce86da694caf36e61bc21770bb1c7";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/stats/latest')
  .reply(200, {"timestamp":"2022-03-14T12:22:57Z","activeSeriesCount":176,"allSeriesCount":176,"metricsCount":2,"dataFeedCount":1,"dataPointsCount":7392}, [
  'Content-Length',
  '139',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3040e7e7-bc77-4237-92cc-3148d8e5ee6b',
  'x-envoy-upstream-service-time',
  '435',
  'apim-request-id',
  '3040e7e7-bc77-4237-92cc-3148d8e5ee6b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 14 Mar 2022 12:24:22 GMT'
]);

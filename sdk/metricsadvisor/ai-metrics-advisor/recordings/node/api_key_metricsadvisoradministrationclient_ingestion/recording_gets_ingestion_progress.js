let nock = require('nock');

module.exports.hash = "3e5c3b1eb3b76a56d194b0710dfff959";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/52b0c20c-cb7c-43f0-9507-2a33170342db/ingestionProgress')
  .reply(200, {"latestSuccessTimestamp":"2021-03-10T00:00:00Z","latestActiveTimestamp":"2021-05-10T00:00:00Z"}, [
  'Content-Length',
  '96',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '457066bb-9edf-4e44-9698-6608e58e3a43',
  'x-envoy-upstream-service-time',
  '313',
  'apim-request-id',
  '457066bb-9edf-4e44-9698-6608e58e3a43',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 11 May 2021 20:07:08 GMT'
]);

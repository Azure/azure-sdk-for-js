let nock = require('nock');

module.exports.hash = "3f354df2f54d31bb1dfd23993daab781";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-09-12T00:00:00.000Z","timeMode":"AnomalyTime"})
  .reply(200, {"value":[{"alertId":"1747a763000","timestamp":"2020-09-11T00:00:00Z","createdTime":"2020-09-14T12:31:04.148Z","modifiedTime":"2020-09-17T17:26:31.464Z"},{"alertId":"174754fd400","timestamp":"2020-09-10T00:00:00Z","createdTime":"2020-09-14T12:31:04.002Z","modifiedTime":"2020-09-16T21:08:42.991Z"},{"alertId":"17470297800","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.575Z","modifiedTime":"2020-09-14T20:43:36.527Z"},{"alertId":"1746b031c00","timestamp":"2020-09-08T00:00:00Z","createdTime":"2020-09-12T01:15:16.406Z","modifiedTime":"2020-09-14T20:42:57.048Z"},{"alertId":"17465dcc000","timestamp":"2020-09-07T00:00:00Z","createdTime":"2020-09-12T01:14:17.184Z","modifiedTime":"2020-09-12T01:28:54.26Z"},{"alertId":"17460b66400","timestamp":"2020-09-06T00:00:00Z","createdTime":"2020-09-12T01:14:16.927Z","modifiedTime":"2020-09-12T01:24:16.887Z"}],"@nextLink":null}, [
  'Content-Length',
  '891',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6388b246-81fc-4ec7-8785-6c6aa6ab94e4',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  '6388b246-81fc-4ec7-8785-6c6aa6ab94e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:31:39 GMT',
  'Connection',
  'close'
]);

let nock = require('nock');

module.exports.hash = "8c8912dd43269b1838ba8aa810c7bbcc";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .reply(200, {"value":[{"alertId":"175908d9800","timestamp":"2020-11-04T00:00:00Z","createdTime":"2020-11-05T00:56:55.458Z","modifiedTime":"2020-11-10T20:27:22.216Z"},{"alertId":"1758b673c00","timestamp":"2020-11-03T00:00:00Z","createdTime":"2020-11-04T00:06:13.262Z","modifiedTime":"2020-11-09T00:07:02.44Z"},{"alertId":"1758640e000","timestamp":"2020-11-02T00:00:00Z","createdTime":"2020-11-03T00:06:12.487Z","modifiedTime":"2020-11-08T00:06:42.859Z"},{"alertId":"175811a8400","timestamp":"2020-11-01T00:00:00Z","createdTime":"2020-11-02T00:33:16.23Z","modifiedTime":"2020-11-07T00:07:17.348Z"}],"@nextLink":null}, [
  'Content-Length',
  '602',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '29905cf2-1ba4-46d4-bfe7-178ab430cf99',
  'x-envoy-upstream-service-time',
  '133',
  'apim-request-id',
  '29905cf2-1ba4-46d4-bfe7-178ab430cf99',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 22:02:48 GMT'
]);

let nock = require('nock');

module.exports.hash = "7de1290cc47ab0dc50a6f0fd71f5c833";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"17cd3a55400","timestamp":"2021-10-31T00:00:00Z","createdTime":"2021-11-01T00:16:11.817Z","modifiedTime":"2021-11-04T22:31:08.352Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '350',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'eb5b3c33-3a92-4e74-8f2e-904ed1ed782f',
  'x-envoy-upstream-service-time',
  '96',
  'apim-request-id',
  'eb5b3c33-3a92-4e74-8f2e-904ed1ed782f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"17cce7ef800","timestamp":"2021-10-30T00:00:00Z","createdTime":"2021-10-31T00:16:45.619Z","modifiedTime":"2021-11-03T22:35:00.394Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '350',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b62df1b2-64d4-4a59-a06c-2e18d734cffe',
  'x-envoy-upstream-service-time',
  '127',
  'apim-request-id',
  'b62df1b2-64d4-4a59-a06c-2e18d734cffe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:23 GMT'
]);

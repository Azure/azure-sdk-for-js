let nock = require('nock');

module.exports.hash = "0474e9571ef05dc822a7d4755dcc73bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"175908d9800","timestamp":"2020-11-04T00:00:00Z","createdTime":"2020-11-05T00:56:55.458Z","modifiedTime":"2020-11-06T00:07:25.627Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$top=1&$skip=1"}, [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'be3800c5-1928-4ac7-bc5f-8fef030a2d9e',
  'x-envoy-upstream-service-time',
  '5232',
  'apim-request-id',
  'be3800c5-1928-4ac7-bc5f-8fef030a2d9e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 06 Nov 2020 18:57:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"1758b673c00","timestamp":"2020-11-03T00:00:00Z","createdTime":"2020-11-04T00:06:13.262Z","modifiedTime":"2020-11-06T00:07:25.348Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$top=1&$skip=2"}, [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3f1e7c12-600f-454d-b294-f411852b579b',
  'x-envoy-upstream-service-time',
  '1089',
  'apim-request-id',
  '3f1e7c12-600f-454d-b294-f411852b579b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 06 Nov 2020 18:57:30 GMT'
]);

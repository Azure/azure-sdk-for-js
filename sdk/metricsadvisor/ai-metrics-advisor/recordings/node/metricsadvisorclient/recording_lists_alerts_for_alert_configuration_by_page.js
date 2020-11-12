let nock = require('nock');

module.exports.hash = "0474e9571ef05dc822a7d4755dcc73bf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"175908d9800","timestamp":"2020-11-04T00:00:00Z","createdTime":"2020-11-05T00:56:55.458Z","modifiedTime":"2020-11-10T20:27:22.216Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$top=1&$skip=1"}, [
  'Content-Length',
  '342',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '206b08cb-b761-40f1-bd64-2de512252913',
  'x-envoy-upstream-service-time',
  '115',
  'apim-request-id',
  '206b08cb-b761-40f1-bd64-2de512252913',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:40 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-11-01T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"1758b673c00","timestamp":"2020-11-03T00:00:00Z","createdTime":"2020-11-04T00:06:13.262Z","modifiedTime":"2020-11-09T00:07:02.44Z"}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$top=1&$skip=2"}, [
  'Content-Length',
  '341',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6985a9c4-01f4-418c-8cf2-6d9bf52a8025',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '6985a9c4-01f4-418c-8cf2-6d9bf52a8025',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:41 GMT'
]);

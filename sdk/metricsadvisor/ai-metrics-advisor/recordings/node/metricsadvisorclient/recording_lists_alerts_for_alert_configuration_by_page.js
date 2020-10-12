let nock = require('nock');

module.exports.hash = "4070e9dac179e413d525f140069a4db5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-09-12T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"1747a763000","timestamp":"2020-09-11T00:00:00Z","createdTime":"2020-09-14T12:31:04.148Z","modifiedTime":"2020-09-17T17:26:31.464Z"},{"alertId":"174754fd400","timestamp":"2020-09-10T00:00:00Z","createdTime":"2020-09-14T12:31:04.002Z","modifiedTime":"2020-09-16T21:08:42.991Z"}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$top=2&$skip=2"}, [
  'Content-Length',
  '489',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '183384d4-ec75-447a-86bb-15a93ad9dedc',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  '183384d4-ec75-447a-86bb-15a93ad9dedc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:31:44 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query', {"startTime":"2020-01-01T00:00:00.000Z","endTime":"2020-09-12T00:00:00.000Z","timeMode":"AnomalyTime"})
  .query(true)
  .reply(200, {"value":[{"alertId":"17470297800","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.575Z","modifiedTime":"2020-09-14T20:43:36.527Z"},{"alertId":"1746b031c00","timestamp":"2020-09-08T00:00:00Z","createdTime":"2020-09-12T01:15:16.406Z","modifiedTime":"2020-09-14T20:42:57.048Z"}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/query?$top=2&$skip=4"}, [
  'Content-Length',
  '489',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b2a75b5f-a3bf-44de-ba02-427f23fb5fdf',
  'x-envoy-upstream-service-time',
  '148',
  'apim-request-id',
  'b2a75b5f-a3bf-44de-ba02-427f23fb5fdf',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:31:52 GMT',
  'Connection',
  'close'
]);

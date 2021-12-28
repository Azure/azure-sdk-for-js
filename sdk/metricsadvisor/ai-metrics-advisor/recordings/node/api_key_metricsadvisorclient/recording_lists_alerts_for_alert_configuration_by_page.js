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
  '48b72f30-4d35-408d-9a13-2e282b511ff3',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  '48b72f30-4d35-408d-9a13-2e282b511ff3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:43 GMT'
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
  'e7578ac2-e52f-4c72-9572-2b4fa8759725',
  'x-envoy-upstream-service-time',
  '112',
  'apim-request-id',
  'e7578ac2-e52f-4c72-9572-2b4fa8759725',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:43 GMT'
]);

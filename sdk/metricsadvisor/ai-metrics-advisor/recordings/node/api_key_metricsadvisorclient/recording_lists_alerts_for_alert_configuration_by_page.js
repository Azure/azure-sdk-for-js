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
  'c43afaac-700a-4a8b-a549-9ca0eaf23fc7',
  'x-envoy-upstream-service-time',
  '91',
  'apim-request-id',
  'c43afaac-700a-4a8b-a549-9ca0eaf23fc7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:42 GMT'
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
  '9e233b94-e520-4db8-87b9-e3b310a95691',
  'x-envoy-upstream-service-time',
  '105',
  'apim-request-id',
  '9e233b94-e520-4db8-87b9-e3b310a95691',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:42 GMT'
]);

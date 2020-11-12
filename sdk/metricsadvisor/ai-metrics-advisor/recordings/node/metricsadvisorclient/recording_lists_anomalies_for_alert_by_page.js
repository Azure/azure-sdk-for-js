let nock = require('nock');

module.exports.hash = "c637bccd41e31ef4e104f24ca60ac7d6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$top=1&$skip=1"}, [
  'Content-Length',
  '590',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8a0edbb4-e55c-4461-85aa-aa3efb0182f8',
  'x-envoy-upstream-service-time',
  '76',
  'apim-request-id',
  '8a0edbb4-e55c-4461-85aa-aa3efb0182f8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Karachi","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$top=1&$skip=2"}, [
  'Content-Length',
  '573',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '27938d17-94cd-4313-9fb1-e7146143780f',
  'x-envoy-upstream-service-time',
  '68',
  'apim-request-id',
  '27938d17-94cd-4313-9fb1-e7146143780f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:41 GMT'
]);

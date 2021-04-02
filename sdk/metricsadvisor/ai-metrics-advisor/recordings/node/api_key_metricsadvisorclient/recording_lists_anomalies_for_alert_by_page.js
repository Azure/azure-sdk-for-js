let nock = require('nock');

module.exports.hash = "df6208e51a2a70912e770c948c1f473d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$top=1&$skip=1"}, [
  'Content-Length',
  '590',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6685e797-68dc-49e8-b8d3-15dab0f413e0',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '6685e797-68dc-49e8-b8d3-15dab0f413e0',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:17 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Karachi","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$top=1&$skip=2"}, [
  'Content-Length',
  '573',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '71ebe2ad-8600-41a1-af07-9376fe12e818',
  'x-envoy-upstream-service-time',
  '86',
  'apim-request-id',
  '71ebe2ad-8600-41a1-af07-9376fe12e818',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:17 GMT'
]);

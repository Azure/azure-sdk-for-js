let nock = require('nock');

module.exports.hash = "a341d378fba65433457a3944c6ec052c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"__SUM__","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"High","anomalyStatus":"Active","value":55791561.8,"expectedValue":52146711.57082515}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '707',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c61d8573-96f9-4be6-b545-211d5c8640a9',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'c61d8573-96f9-4be6-b545-211d5c8640a9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2021-09-07T00:00:00Z","createdTime":"2021-09-08T00:09:22.716Z","modifiedTime":"2021-09-08T00:09:22.716Z","dimension":{"region":"Seoul","category":"Office Products"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":17763.6,"expectedValue":14939.115446142221}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '693',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '30189abf-39f5-42fa-95fe-82f54f396436',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '30189abf-39f5-42fa-95fe-82f54f396436',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:24 GMT'
]);

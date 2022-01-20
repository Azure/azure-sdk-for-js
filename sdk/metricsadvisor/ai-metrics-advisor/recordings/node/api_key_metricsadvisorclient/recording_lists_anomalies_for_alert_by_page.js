let nock = require('nock');

module.exports.hash = "aa552311bea974253457c946a2b5b076";

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
  '7dedd999-9058-4f74-a7ae-abaf02295422',
  'x-envoy-upstream-service-time',
  '69',
  'apim-request-id',
  '7dedd999-9058-4f74-a7ae-abaf02295422',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:42 GMT'
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
  '5442f570-0578-4b00-affc-70ecf7d69b21',
  'x-envoy-upstream-service-time',
  '84',
  'apim-request-id',
  '5442f570-0578-4b00-affc-70ecf7d69b21',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:42 GMT'
]);

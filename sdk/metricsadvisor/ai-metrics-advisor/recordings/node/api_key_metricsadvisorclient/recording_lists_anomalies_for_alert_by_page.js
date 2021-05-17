let nock = require('nock');

module.exports.hash = "df6208e51a2a70912e770c948c1f473d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":5079001.4,"expectedValue":5142673.035323909}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '702',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '77286e1a-27fa-4123-b67e-e75a75d14bb3',
  'x-envoy-upstream-service-time',
  '83',
  'apim-request-id',
  '77286e1a-27fa-4123-b67e-e75a75d14bb3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-10-20T00:00:00Z","createdTime":"2020-10-21T15:54:37.73Z","modifiedTime":"2020-10-21T15:54:37.73Z","dimension":{"city":"Karachi","category":"Handmade"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active","value":3724747.4,"expectedValue":3579278.2792707016}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '686',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'af9d0b1b-d201-4d6b-8bd8-41b596b569c5',
  'x-envoy-upstream-service-time',
  '79',
  'apim-request-id',
  'af9d0b1b-d201-4d6b-8bd8-41b596b569c5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:22 GMT'
]);

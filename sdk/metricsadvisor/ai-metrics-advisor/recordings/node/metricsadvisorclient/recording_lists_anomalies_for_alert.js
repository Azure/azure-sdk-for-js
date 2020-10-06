let nock = require('nock');

module.exports.hash = "d5025c8490c379c3bda0b3b57fd85355";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Cabbage Palm","Dim2":"Aphid"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Blackthorn","Dim2":"African leopard"},"property":{"anomalySeverity":"Low","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Cherry Laurel","Dim2":"Bandicoot"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Common Lime","Dim2":"Arrow crab"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Cherry Laurel","Dim2":"Aphid"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Cherry Laurel","Dim2":"Beaked whale"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}}],"@nextLink":null}, [
  'Content-Length',
  '2205',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '19dab563-b2d4-4e38-82a8-376fffdfff0a',
  'x-envoy-upstream-service-time',
  '142',
  'apim-request-id',
  '19dab563-b2d4-4e38-82a8-376fffdfff0a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:31:57 GMT',
  'Connection',
  'close'
]);

let nock = require('nock');

module.exports.hash = "f638c301f80375cd063f8e0d8ea70b6c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Cabbage Palm","Dim2":"Aphid"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Blackthorn","Dim2":"African leopard"},"property":{"anomalySeverity":"Low","anomalyStatus":"Active"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$top=2&$skip=2"}, [
  'Content-Length',
  '940',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f566e8ad-1ca1-40e7-ae59-739b4092b404',
  'x-envoy-upstream-service-time',
  '181',
  'apim-request-id',
  'f566e8ad-1ca1-40e7-ae59-739b4092b404',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:31:58 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies')
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Cherry Laurel","Dim2":"Bandicoot"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","timestamp":"2020-09-09T00:00:00Z","createdTime":"2020-09-12T01:15:16.622Z","modifiedTime":"2020-09-12T01:15:16.622Z","dimension":{"Dim1":"Common Lime","Dim2":"Arrow crab"},"property":{"anomalySeverity":"Medium","anomalyStatus":"Active"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/anomalies?$top=2&$skip=4"}, [
  'Content-Length',
  '944',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6fc43851-65a6-4c95-b116-ff8cdb8de8f1',
  'x-envoy-upstream-service-time',
  '88',
  'apim-request-id',
  '6fc43851-65a6-4c95-b116-ff8cdb8de8f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:31:59 GMT',
  'Connection',
  'close'
]);

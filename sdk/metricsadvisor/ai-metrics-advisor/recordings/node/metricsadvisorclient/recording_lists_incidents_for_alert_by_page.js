let nock = require('nock');

module.exports.hash = "70208ead4ad9747d5eb181384bb8abc6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .query(true)
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","incidentId":"51d849d03277901eadfa9a0e7665b4ad-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"}},"property":{"incidentStatus":"Resolved"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents?$top=1&$skip=1"}, [
  'Content-Length',
  '592',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b98eb5d0-6d68-4ba8-baf0-04f31b59fc6c',
  'x-envoy-upstream-service-time',
  '239',
  'apim-request-id',
  'b98eb5d0-6d68-4ba8-baf0-04f31b59fc6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:42 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .query(true)
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","incidentId":"daceb039d9ec34d28f04654dd61aee57-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Karachi","category":"Handmade"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents?$top=1&$skip=2"}, [
  'Content-Length',
  '596',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '568acc17-183c-4957-a679-4fe9d709c8de',
  'x-envoy-upstream-service-time',
  '276',
  'apim-request-id',
  '568acc17-183c-4957-a679-4fe9d709c8de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:42 GMT'
]);

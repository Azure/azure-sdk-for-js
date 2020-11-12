let nock = require('nock');

module.exports.hash = "bb6630044f59c014fb3c8c8b097f71a2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .reply(200, {"value":[{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","incidentId":"51d849d03277901eadfa9a0e7665b4ad-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"}},"property":{"incidentStatus":"Resolved"}},{"metricId":"45c7-a1e0-f87c9c7ca80f-189ff959-d9f4","anomalyDetectionConfigurationId":"5c54b62e-6be7-4d64-b085-60e9bd59fa79","incidentId":"daceb039d9ec34d28f04654dd61aee57-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Karachi","category":"Handmade"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active"}}],"@nextLink":null}, [
  'Content-Length',
  '788',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6fda29d3-c07c-4600-aaa4-aa58375a03b6',
  'x-envoy-upstream-service-time',
  '272',
  'apim-request-id',
  '6fda29d3-c07c-4600-aaa4-aa58375a03b6',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:41 GMT'
]);

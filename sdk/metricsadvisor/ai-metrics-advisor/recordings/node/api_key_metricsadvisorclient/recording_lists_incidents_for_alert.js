let nock = require('nock');

module.exports.hash = "5cf5a7dda970561e436443e5fc772284";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"51d849d03277901eadfa9a0e7665b4ad-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"}},"property":{"incidentStatus":"Resolved","valueOfRootNode":5079001.4,"expectedValueOfRootNode":5142673.035323909}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"daceb039d9ec34d28f04654dd61aee57-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Karachi","category":"Handmade"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":3724747.4,"expectedValueOfRootNode":3579278.2792707016}}]}, [
  'Content-Length',
  '1020',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'da86eaac-261a-48b0-95be-54ee2cd1a026',
  'x-envoy-upstream-service-time',
  '301',
  'apim-request-id',
  'da86eaac-261a-48b0-95be-54ee2cd1a026',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:24 GMT'
]);

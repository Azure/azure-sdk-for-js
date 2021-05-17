let nock = require('nock');

module.exports.hash = "afa8553564d50b56dfde4b51114089b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"51d849d03277901eadfa9a0e7665b4ad-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Delhi","category":"Shoes Handbags & Sunglasses"}},"property":{"incidentStatus":"Resolved","valueOfRootNode":5079001.4,"expectedValueOfRootNode":5142673.035323909}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents?$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '724',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'acc4076b-2d91-4632-85d8-5da2ee75e0f4',
  'x-envoy-upstream-service-time',
  '285',
  'apim-request-id',
  'acc4076b-2d91-4632-85d8-5da2ee75e0f4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:24 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .query(true)
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"daceb039d9ec34d28f04654dd61aee57-17470297800","startTime":"2020-10-20T00:00:00Z","lastTime":"2020-10-20T00:00:00Z","rootNode":{"dimension":{"city":"Karachi","category":"Handmade"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":3724747.4,"expectedValueOfRootNode":3579278.2792707016}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents?$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '729',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4f406a90-3a1c-466b-b10b-5ab77a2d3f9a',
  'x-envoy-upstream-service-time',
  '286',
  'apim-request-id',
  '4f406a90-3a1c-466b-b10b-5ab77a2d3f9a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:24 GMT'
]);

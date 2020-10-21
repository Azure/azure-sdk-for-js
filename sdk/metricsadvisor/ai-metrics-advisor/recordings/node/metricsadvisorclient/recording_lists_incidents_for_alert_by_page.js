let nock = require('nock');

module.exports.hash = "03304e01a77a51c6d72c19df527f7394";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"756442a2fc87d2079a5b3f0e57c66033-17470297800","startTime":"2020-09-09T00:00:00Z","lastTime":"2020-09-09T00:00:00Z","rootNode":{"dimension":{"Dim1":"Cabbage Palm","Dim2":"Aphid"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"9d5c4be357ab910ff92b0a810e36b3c1-17470297800","startTime":"2020-09-09T00:00:00Z","lastTime":"2020-09-09T00:00:00Z","rootNode":{"dimension":{"Dim1":"Blackthorn","Dim2":"African leopard"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents?$top=2&$skip=2"}, [
  'Content-Length',
  '982',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '27be6d6f-644f-4808-9b4b-58fb6110d13c',
  'x-envoy-upstream-service-time',
  '673',
  'apim-request-id',
  '27be6d6f-644f-4808-9b4b-58fb6110d13c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:32:02 GMT',
  'Connection',
  'close'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .query(true)
  .reply(200, {"value":[{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"a6a239ae68312b70cf66f778a7477d41-17470297800","startTime":"2020-09-08T00:00:00Z","lastTime":"2020-09-09T00:00:00Z","rootNode":{"dimension":{"Dim1":"Cherry Laurel","Dim2":"Bandicoot"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active"}},{"metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"cc2ff8a836361371b8c6eaad71b194f4-17470297800","startTime":"2020-09-05T00:00:00Z","lastTime":"2020-09-09T00:00:00Z","rootNode":{"dimension":{"Dim1":"Common Lime","Dim2":"Arrow crab"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active"}}],"@nextLink":"https://endpoint/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents?$top=2&$skip=4"}, [
  'Content-Length',
  '986',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4eea619f-e17d-410f-8c8f-c9e33d9bec40',
  'x-envoy-upstream-service-time',
  '665',
  'apim-request-id',
  '4eea619f-e17d-410f-8c8f-c9e33d9bec40',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 19:32:03 GMT',
  'Connection',
  'close'
]);

let nock = require('nock');

module.exports.hash = "dfad323b43af1fe6ab46827207b76bcd";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/alert/anomaly/configurations/7edf304f-6487-4e3d-a137-cc4f679bcbc0/alerts/17470297800/incidents')
  .reply(200, {"value":[{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"30612c95b4c216ef418956c5c6162691-17470297800","startTime":"2021-09-07T00:00:00Z","lastTime":"2021-09-07T00:00:00Z","rootNode":{"dimension":{"region":"Tianjin","category":"Home & Garden"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":18544,"expectedValueOfRootNode":18573.49119556344}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"4ec127166abf8387b2874bae49734ab1-17470297800","startTime":"2021-09-06T00:00:00Z","lastTime":"2021-09-07T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"__SUM__"}},"property":{"maxSeverity":"High","incidentStatus":"Active","valueOfRootNode":65120708.60000002,"expectedValueOfRootNode":60928226.58873364}},{"dataFeedId":"52b0c20c-cb7c-43f0-9507-2a33170342db","metricId":"189ff959-d9f4-45c7-a1e0-f87c9c7ca80f","anomalyDetectionConfigurationId":"26ece682-80a6-4415-89a2-05903dd9a640","incidentId":"efe6bdf61f01a37d8ddbb133afde0756-17470297800","startTime":"2021-09-07T00:00:00Z","lastTime":"2021-09-07T00:00:00Z","rootNode":{"dimension":{"region":"Istanbul","category":"Home & Garden"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":10715.2,"expectedValueOfRootNode":9806.569582296583}}]}, [
  'Content-Length',
  '1541',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0acefbb2-c217-4847-a6c3-c105c3c514f3',
  'x-envoy-upstream-service-time',
  '334',
  'apim-request-id',
  '0acefbb2-c217-4847-a6c3-c105c3c514f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:44 GMT'
]);

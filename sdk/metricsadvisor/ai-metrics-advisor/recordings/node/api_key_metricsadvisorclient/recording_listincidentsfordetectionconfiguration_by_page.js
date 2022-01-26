let nock = require('nock');

module.exports.hash = "072ffcc80609cb05570495546aeff4b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"18044bf3e7152862074c3d177f9114fe-17cd3a55400","startTime":"2021-10-31T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Miami","category":"Office Products"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":34975,"expectedValueOfRootNode":32994.38317904984}},{"incidentId":"2badf4cb97e13d6142e2af489e2b8e20-17cd3a55400","startTime":"2021-10-30T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Istanbul","category":"Electronics (Accessories)"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":0,"expectedValueOfRootNode":3.847182887027481}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNUzB3TVZRd01Eb3dNRG93TUZvakl5TXlZbUZrWmpSallqazNaVEV6WkRZeE5ESmxNbUZtTkRnNVpUSmlPR1V5TUE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1281',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8f4f6c88-f194-42fb-a386-141e102b5c1b',
  'x-envoy-upstream-service-time',
  '244',
  'apim-request-id',
  '8f4f6c88-f194-42fb-a386-141e102b5c1b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:39 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"5635ffb56bbaeff0734371c383b437f5-17cd3a55400","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Karachi","category":"Electronics (Consumer)"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":3799.2,"expectedValueOfRootNode":290.17563836248905}},{"incidentId":"4e578d9b55bd7f78f30dffaac7ac6327-17cd3a55400","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Tianjin","category":"Electronics (Consumer)"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":8.2,"expectedValueOfRootNode":0.0667363729590091}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNUzB3TVZRd01Eb3dNRG93TUZvakl5TTFOak0xWm1aaU5UWmlZbUZsWm1Zd056TTBNemN4WXpNNE0ySTBNemRtTlE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1287',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '117c4ff1-a37f-4fd0-bdca-b0ed104387f1',
  'x-envoy-upstream-service-time',
  '204',
  'apim-request-id',
  '117c4ff1-a37f-4fd0-bdca-b0ed104387f1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:40 GMT'
]);

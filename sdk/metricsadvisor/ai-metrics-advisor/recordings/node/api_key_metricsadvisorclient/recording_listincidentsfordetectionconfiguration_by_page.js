let nock = require('nock');

module.exports.hash = "072ffcc80609cb05570495546aeff4b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"9eacfa65b7c794522d388fcf5bf0a463-17cd3a55400","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Electronics (Consumer)"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":4329.599999999999,"expectedValueOfRootNode":466.6497159787059}},{"incidentId":"67fc98695447cda7a0cb9369c0ad9dc7-17cd3a55400","startTime":"2021-10-31T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Tianjin","category":"Shoes Handbags & Sunglasses"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":756713.8,"expectedValueOfRootNode":821548.9344276552}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNUzB3TVZRd01Eb3dNRG93TUZvakl5TTVaV0ZqWm1FMk5XSTNZemM1TkRVeU1tUXpPRGhtWTJZMVltWXdZVFEyTXc9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1309',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fc2747a1-f2b2-4409-a767-ec6a1cc870db',
  'x-envoy-upstream-service-time',
  '261',
  'apim-request-id',
  'fc2747a1-f2b2-4409-a767-ec6a1cc870db',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:21 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"0701219234e0357d270798d1d573d305-17cce7ef800","startTime":"2021-10-30T00:00:00Z","lastTime":"2021-10-30T00:00:00Z","rootNode":{"dimension":{"region":"Miami","category":"__SUM__"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":916393.5999999999,"expectedValueOfRootNode":1705232.3043721747}},{"incidentId":"6a665967352784e62673118aaf807b77-17cce7ef800","startTime":"2021-10-30T00:00:00Z","lastTime":"2021-10-30T00:00:00Z","rootNode":{"dimension":{"region":"Delhi","category":"Home & Garden"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":60493.4,"expectedValueOfRootNode":112094.16029507673}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNQzB6TVZRd01Eb3dNRG93TUZvakl5TTJZVFkyTlRrMk56TTFNamM0TkdVMk1qWTNNekV4T0dGaFpqZ3dOMkkzTnc9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1277',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c672379d-39d7-49b0-bf6c-835bbadd975d',
  'x-envoy-upstream-service-time',
  '221',
  'apim-request-id',
  'c672379d-39d7-49b0-bf6c-835bbadd975d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:21 GMT'
]);

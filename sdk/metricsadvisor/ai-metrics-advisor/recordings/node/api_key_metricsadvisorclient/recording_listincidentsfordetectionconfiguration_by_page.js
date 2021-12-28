let nock = require('nock');

module.exports.hash = "072ffcc80609cb05570495546aeff4b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"9eacfa65b7c794522d388fcf5bf0a463-17cd3a55400","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Electronics (Consumer)"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":4329.599999999999,"expectedValueOfRootNode":1016.1747790393504}},{"incidentId":"55e8821f21cb799db557b0e7c9eb7dd9-17cd3a55400","startTime":"2021-10-31T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Electronics (Accessories)"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":12.6,"expectedValueOfRootNode":114.17942348386997}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNUzB3TVZRd01Eb3dNRG93TUZvakl5TTVaV0ZqWm1FMk5XSTNZemM1TkRVeU1tUXpPRGhtWTJZMVltWXdZVFEyTXc9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1302',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'cdafc491-e97b-4595-ba82-98aeed0a4eec',
  'x-envoy-upstream-service-time',
  '235',
  'apim-request-id',
  'cdafc491-e97b-4595-ba82-98aeed0a4eec',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:41 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"0100436ffc1318780ffaff7008d0b5df-17cce7ef800","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-30T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Shoes Handbags & Sunglasses"}},"property":{"maxSeverity":"High","incidentStatus":"Active","valueOfRootNode":31964628.800000004,"expectedValueOfRootNode":41483996.57269485}},{"incidentId":"36536d07873a17badf11ee986edcb63a-17cce7ef800","startTime":"2021-10-27T00:00:00Z","lastTime":"2021-10-30T00:00:00Z","rootNode":{"dimension":{"region":"Cairo","category":"Electronics (Accessories)"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":0.6,"expectedValueOfRootNode":9.242478885844319}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNQzB6TVZRd01Eb3dNRG93TUZvakl5TXpOalV6Tm1Rd056ZzNNMkV4TjJKaFpHWXhNV1ZsT1RnMlpXUmpZall6WVE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1301',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'bd1095b3-a284-4df0-b9c5-a4aa0941f58b',
  'x-envoy-upstream-service-time',
  '210',
  'apim-request-id',
  'bd1095b3-a284-4df0-b9c5-a4aa0941f58b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:32:41 GMT'
]);

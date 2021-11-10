let nock = require('nock');

module.exports.hash = "072ffcc80609cb05570495546aeff4b5";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://login.microsoftonline.com:443', {"encodedQueryParams":true})
  .post('/72698866-8641-4147-9144-24744011447/oauth2/v2.0/token', "response_type=token&grant_type=client_credentials&client_id=azure_client_id&client_secret=azure_client_secret&scope=https%3A%2F%2Fsanitized%2F")
  .reply(200, {"token_type":"Bearer","expires_in":86399,"ext_expires_in":86399,"access_token":"access_token"}, [
  'Cache-Control',
  'no-store, no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; charset=utf-8',
  'Expires',
  '-1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options',
  'nosniff',
  'P3P',
  'CP="DSP CUR OTPi IND OTRi ONL FIN"',
  'x-ms-request-id',
  '2b50f717-e5f1-4ffd-82c1-59b9db942600',
  'x-ms-ests-server',
  '2.1.12231.7 - NCUS ProdSlices',
  'Set-Cookie',
  'fpc=AvLx07Fyq3lKpJJggDhU_wI; expires=Fri, 10-Dec-2021 02:07:02 GMT; path=/; secure; HttpOnly; SameSite=None',
  'Set-Cookie',
  'x-ms-gateway-slice=estsfd; path=/; secure; samesite=none; httponly',
  'Set-Cookie',
  'stsservicecookie=estsfd; path=/; secure; samesite=none; httponly',
  'Date',
  'Wed, 10 Nov 2021 02:07:01 GMT',
  'Content-Length',
  '1331'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2021-05-05T00:00:00.000Z","endTime":"2021-11-01T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"9eacfa65b7c794522d388fcf5bf0a463-17cd3a55400","startTime":"2021-10-29T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"__SUM__","category":"Electronics (Consumer)"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":4329.599999999999,"expectedValueOfRootNode":466.6497159787059}},{"incidentId":"67fc98695447cda7a0cb9369c0ad9dc7-17cd3a55400","startTime":"2021-10-31T00:00:00Z","lastTime":"2021-10-31T00:00:00Z","rootNode":{"dimension":{"region":"Tianjin","category":"Shoes Handbags & Sunglasses"}},"property":{"maxSeverity":"Medium","incidentStatus":"Active","valueOfRootNode":756713.8,"expectedValueOfRootNode":821548.9344276552}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjM5MGQxMTM5LTk4ZmItNDVhZi1iODMxLThkNWFkNjFiMTUwYSIsImRldGVjdENvbmZpZ0lkIjoiZWZhZWUzMDUtZjA0OS00M2VjLTlmOWItNzYwMjZkNTVjMTRhIiwic3RhcnRUaW1lIjoiMjAyMS0wNS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMS0xMS0wMVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1TMHhNUzB3TVZRd01Eb3dNRG93TUZvakl5TTVaV0ZqWm1FMk5XSTNZemM1TkRVeU1tUXpPRGhtWTJZMVltWXdZVFEyTXc9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1309',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b0e9cd58-9c1f-42e6-8165-6bc9fd2ef3f3',
  'x-envoy-upstream-service-time',
  '340',
  'apim-request-id',
  'b0e9cd58-9c1f-42e6-8165-6bc9fd2ef3f3',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:02 GMT'
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
  '29be57da-a781-4cb9-9e97-e03865732f71',
  'x-envoy-upstream-service-time',
  '382',
  'apim-request-id',
  '29be57da-a781-4cb9-9e97-e03865732f71',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:07:02 GMT'
]);

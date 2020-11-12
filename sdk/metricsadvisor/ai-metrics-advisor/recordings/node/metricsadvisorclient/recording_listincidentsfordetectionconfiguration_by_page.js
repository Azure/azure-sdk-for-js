let nock = require('nock');

module.exports.hash = "3c872e853fc752fc387d02c26808dad4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/incidents/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"2d7db62bcdf6c4f795c81fa0cd335508-175908d9800","startTime":"2020-11-04T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Hyderabad","category":"Software & Computer Games"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}},{"incidentId":"22ede4ce36745c0a111c6cb99fd20c54-175908d9800","startTime":"2020-11-03T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Lagos","category":"Grocery & Gourmet Food"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/incidents/query?$top=2&$token=eyJtZXRyaWNJZCI6IjI3ZTMwMTVmLTA0ZmQtNDRiYS1hMjBiLWJjNTI5YTBhZWJhZSIsImRldGVjdENvbmZpZ0lkIjoiZmI1YTZlZDYtMmI5ZS00YjcyLThiMGMtMDA0NmVhZDFjMTVjIiwic3RhcnRUaW1lIjoiMjAyMC0wMS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMC0xMS0wNVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1DMHhNUzB3TlZRd01Eb3dNRG93TUZvakl5TXlaRGRrWWpZeVltTmtaalpqTkdZM09UVmpPREZtWVRCalpETXpOVFV3T0E9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1138',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '064dd9b7-be04-48eb-9785-4bc956c49a0f',
  'x-envoy-upstream-service-time',
  '269',
  'apim-request-id',
  '064dd9b7-be04-48eb-9785-4bc956c49a0f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:36 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"3bc1136adb61ca433bd9edbbaf46ec21-175908d9800","startTime":"2020-11-04T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Hyderabad","category":"Cell Phones"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}},{"incidentId":"3b763da1c27792ce771cf696518d688d-175908d9800","startTime":"2020-11-04T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Lagos","category":"Automotive & Powersports"}},"property":{"maxSeverity":"Low","incidentStatus":"Active"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/incidents/query?$top=2&$token=eyJtZXRyaWNJZCI6IjI3ZTMwMTVmLTA0ZmQtNDRiYS1hMjBiLWJjNTI5YTBhZWJhZSIsImRldGVjdENvbmZpZ0lkIjoiZmI1YTZlZDYtMmI5ZS00YjcyLThiMGMtMDA0NmVhZDFjMTVjIiwic3RhcnRUaW1lIjoiMjAyMC0wMS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMC0xMS0wNVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1DMHhNUzB3TlZRd01Eb3dNRG93TUZvakl5TXpZbU14TVRNMllXUmlOakZqWVRRek0ySmtPV1ZrWW1KaFpqUTJaV015TVE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1126',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '42f83466-4793-4c8f-ac83-9d02f186822c',
  'x-envoy-upstream-service-time',
  '290',
  'apim-request-id',
  '42f83466-4793-4c8f-ac83-9d02f186822c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:37 GMT'
]);

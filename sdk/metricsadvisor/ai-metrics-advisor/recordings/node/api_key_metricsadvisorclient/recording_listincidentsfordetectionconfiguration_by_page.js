let nock = require('nock');

module.exports.hash = "77813a8fd46a26b8823b279bdeb86370";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query', {"startTime":"2020-01-05T00:00:00.000Z","endTime":"2020-11-05T00:00:00.000Z","filter":{}})
  .query(true)
  .reply(200, {"value":[{"incidentId":"2d7db62bcdf6c4f795c81fa0cd335508-175908d9800","startTime":"2020-11-04T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Hyderabad","category":"Software & Computer Games"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":1.4,"expectedValueOfRootNode":0.4998854052597048}},{"incidentId":"22ede4ce36745c0a111c6cb99fd20c54-175908d9800","startTime":"2020-11-03T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Lagos","category":"Grocery & Gourmet Food"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":0.4,"expectedValueOfRootNode":0.11447198690121768}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjI3ZTMwMTVmLTA0ZmQtNDRiYS1hMjBiLWJjNTI5YTBhZWJhZSIsImRldGVjdENvbmZpZ0lkIjoiZmI1YTZlZDYtMmI5ZS00YjcyLThiMGMtMDA0NmVhZDFjMTVjIiwic3RhcnRUaW1lIjoiMjAyMC0wMS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMC0xMS0wNVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1DMHhNUzB3TlZRd01Eb3dNRG93TUZvakl5TXlaRGRrWWpZeVltTmtaalpqTkdZM09UVmpPREZtWVRCalpETXpOVFV3T0E9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1281',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'ab92c117-cc9e-4f5a-ae44-dc2a6d523e60',
  'x-envoy-upstream-service-time',
  '321',
  'apim-request-id',
  'ab92c117-cc9e-4f5a-ae44-dc2a6d523e60',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query')
  .query(true)
  .reply(200, {"value":[{"incidentId":"3bc1136adb61ca433bd9edbbaf46ec21-175908d9800","startTime":"2020-11-04T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Hyderabad","category":"Cell Phones"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":3.4,"expectedValueOfRootNode":0.8470849150958543}},{"incidentId":"3b763da1c27792ce771cf696518d688d-175908d9800","startTime":"2020-11-04T00:00:00Z","lastTime":"2020-11-04T00:00:00Z","rootNode":{"dimension":{"city":"Lagos","category":"Automotive & Powersports"}},"property":{"maxSeverity":"Low","incidentStatus":"Active","valueOfRootNode":0.2,"expectedValueOfRootNode":0}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/query?$maxpagesize=2&$token=eyJtZXRyaWNJZCI6IjI3ZTMwMTVmLTA0ZmQtNDRiYS1hMjBiLWJjNTI5YTBhZWJhZSIsImRldGVjdENvbmZpZ0lkIjoiZmI1YTZlZDYtMmI5ZS00YjcyLThiMGMtMDA0NmVhZDFjMTVjIiwic3RhcnRUaW1lIjoiMjAyMC0wMS0wNVQwMDowMDowMFoiLCJlbmRUaW1lIjoiMjAyMC0xMS0wNVQwMDowMDowMFoiLCJuZXh0IjoiTWpBeU1DMHhNUzB3TlZRd01Eb3dNRG93TUZvakl5TXpZbU14TVRNMllXUmlOakZqWVRRek0ySmtPV1ZrWW1KaFpqUTJaV015TVE9PSIsImxpbWl0IjoyLCJmaWx0ZXIiOnt9fQ=="}, [
  'Content-Length',
  '1253',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'c54b3692-1b7a-4ec5-aa81-a4985007cedb',
  'x-envoy-upstream-service-time',
  '262',
  'apim-request-id',
  'c54b3692-1b7a-4ec5-aa81-a4985007cedb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 07:07:52 GMT'
]);

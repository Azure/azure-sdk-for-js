let nock = require('nock');

module.exports.hash = "14604dbfdd906b90289ba6c2b9d4dc49";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/045f03a31628d5938cd75cfdecfff045-17465dcc000/rootCause')
  .reply(200, {"value":[{"rootCause":{"dimension":{"category":"Electronics (Consumer)","city":"Karachi"}},"path":["city"],"score":0.34265262137636504,"description":"Increase on category = Electronics (Consumer) | city = Karachi contributes the most to current incident."}]}, [
  'Content-Length',
  '259',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6555748d-2897-4f28-9800-62389210cd36',
  'x-envoy-upstream-service-time',
  '242',
  'apim-request-id',
  '6555748d-2897-4f28-9800-62389210cd36',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:33 GMT'
]);

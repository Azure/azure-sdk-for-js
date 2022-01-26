let nock = require('nock');

module.exports.hash = "472ae8b1f82a93f3a899f43727dc1307";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/incidents/045f03a31628d5938cd75cfdecfff045-17465dcc000/rootCause')
  .reply(200, {"value":[{"rootCause":{"dimension":{"region":"Beijing","category":"Handmade"}},"path":["category"],"score":0.05937581364487382,"description":"Increase on region = Beijing | category = Handmade contributes the most to current incident."}]}, [
  'Content-Length',
  '239',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '15b41b84-334a-48c7-a90f-31f1a7a5049b',
  'x-envoy-upstream-service-time',
  '265',
  'apim-request-id',
  '15b41b84-334a-48c7-a90f-31f1a7a5049b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:58:46 GMT'
]);

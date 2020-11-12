let nock = require('nock');

module.exports.hash = "78892ebc4812a54f8413f419d4f1b68a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/incidents/5938cd75cfdecfff045-17465dcc000045f03a31628d/rootCause')
  .reply(200, {"value":[{"rootCause":{"dimension":{"category":"Electronics (Consumer)","city":"Karachi"}},"path":["city"],"score":0.34265262137636504,"description":"Increase on category = Electronics (Consumer) | city = Karachi contributes the most to current incident."}]}, [
  'Content-Length',
  '259',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '618d5a4e-09c3-4e24-92aa-44de3a14a541',
  'x-envoy-upstream-service-time',
  '237',
  'apim-request-id',
  '618d5a4e-09c3-4e24-92aa-44de3a14a541',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:47 GMT'
]);

let nock = require('nock');

module.exports.hash = "7829449fc8cf6337c3c723b6341b8fae";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/5c54b62e-6be7-4d64-b085-60e9bd59fa79/incidents/045f03a31628d5938cd75cfdecfff045-17465dcc000/rootCause')
  .reply(200, {"value":[{"rootCause":{"dimension":{"category":"Home & Garden","city":"Karachi"}},"path":["city"],"score":0.2336003146084017,"description":"Decrease on category = Home & Garden | city = Karachi contributes the most to current incident."}]}, [
  'Content-Length',
  '240',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6aa62c2a-9ba6-47cb-8c0f-fae99c58f014',
  'x-envoy-upstream-service-time',
  '379',
  'apim-request-id',
  '6aa62c2a-9ba6-47cb-8c0f-fae99c58f014',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 18 Sep 2020 22:08:32 GMT',
  'Connection',
  'close'
]);

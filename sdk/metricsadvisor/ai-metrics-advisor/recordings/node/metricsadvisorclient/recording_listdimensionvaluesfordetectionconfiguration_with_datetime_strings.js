let nock = require('nock');

module.exports.hash = "6fce7226225c8811a2e322e1b279930c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/enrichment/anomalyDetection/configurations/26ece682-80a6-4415-89a2-05903dd9a640/anomalies/dimension/query', {"startTime":"2020-08-05T00:00:00.000Z","endTime":"2020-09-05T00:00:00.000Z","dimensionName":"Dim1"})
  .reply(200, {"value":["Cherry Laurel","Cabbage Palm","Common Lime","Blackthorn","Blue Atlas Cedar","Cider gum","Common Walnut","Almond","Chinese red-barked birch","Black Birch (River Birch)","Bastard Service Tree","Caucasian Fir","Common Beech","Cherry","Caucasian Lime","Birch","Algerian Fir","Black Poplar","Cockspur Thorn","Common Ash","Austrian Pine","Common Hazel","Common Alder","Box elder","Aspen","Common Juniper"],"@nextLink":null}, [
  'Content-Length',
  '428',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5905614e-d0bc-4f80-a69b-64f3e62becb4',
  'x-envoy-upstream-service-time',
  '197',
  'apim-request-id',
  '5905614e-d0bc-4f80-a69b-64f3e62becb4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:15 GMT',
  'Connection',
  'close'
]);

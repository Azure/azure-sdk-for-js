let nock = require('nock');

module.exports.hash = "c80d3d53767f20cffcee286893495b65";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"Dim1"})
  .reply(200, {"value":["Algerian Fir","Almond","Aspen","Austrian Pine","Bastard Service Tree","Birch","Black Birch (River Birch)","Black Mulberry","Black Poplar","Blackthorn","Blue Atlas Cedar","Box elder","Cabbage Palm","Caucasian Fir","Caucasian Lime","Cherry","Cherry Laurel","Chinese red-barked birch","Cider gum","Cockspur Thorn"],"@nextLink":"https://endpoint/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=20&$skip=20"}, [
  'Content-Length',
  '497',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'fcb2c1fb-fd5b-4a60-8d13-5703b3c1c175',
  'x-envoy-upstream-service-time',
  '81',
  'apim-request-id',
  'fcb2c1fb-fd5b-4a60-8d13-5703b3c1c175',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 17 Sep 2020 22:55:20 GMT',
  'Connection',
  'close'
]);

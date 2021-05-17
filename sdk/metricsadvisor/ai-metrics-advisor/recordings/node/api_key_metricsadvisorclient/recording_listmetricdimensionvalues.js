let nock = require('nock');

module.exports.hash = "48513e0ce8ff104493751462e8b4f4a4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .reply(200, {"value":["Abidjan","Ahmadabad","Alexandria","Ankara","Atlanta","Baghdad","Bangkok","Barcelona","Beijing","Belo Horizonte","Bengaluru","Bogota","Boston","Brasilia","Buenos Aires","Cairo","Chengdu","Chennai","Chicago","Chittagong"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$maxpagesize=20&$skip=20"}, [
  'Content-Length',
  '410',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6caba47f-1dc1-4a87-ad10-29a368d70ffe',
  'x-envoy-upstream-service-time',
  '139',
  'apim-request-id',
  '6caba47f-1dc1-4a87-ad10-29a368d70ffe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:25 GMT'
]);

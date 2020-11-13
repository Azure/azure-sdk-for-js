let nock = require('nock');

module.exports.hash = "1b1c955135747e675464f678838132ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .reply(200, {"value":["Abidjan","Ahmadabad","Alexandria","Ankara","Atlanta","Baghdad","Bangkok","Barcelona","Beijing","Belo Horizonte","Bengaluru","Bogota","Boston","Brasilia","Buenos Aires","Cairo","Chengdu","Chennai","Chicago","Chittagong"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=20&$skip=20"}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '693b9f95-2edd-43e2-954e-2d55af4fc585',
  'x-envoy-upstream-service-time',
  '99',
  'apim-request-id',
  '693b9f95-2edd-43e2-954e-2d55af4fc585',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:24 GMT'
]);

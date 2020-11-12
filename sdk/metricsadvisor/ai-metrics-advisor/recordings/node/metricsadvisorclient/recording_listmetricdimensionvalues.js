let nock = require('nock');

module.exports.hash = "1b1c955135747e675464f678838132ee";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/dimension/query', {"dimensionName":"city"})
  .reply(200, {"value":["Abidjan","Ahmadabad","Alexandria","Ankara","Atlanta","Baghdad","Bangkok","Barcelona","Beijing","Belo Horizonte","Bengaluru","Bogota","Boston","Brasilia","Buenos Aires","Cairo","Chengdu","Chennai","Chicago","Chittagong"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/45c7-a1e0-f87c9c7ca80f-189ff959-d9f4/dimension/query?$top=20&$skip=20"}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '60925fb5-a887-4a5a-8f2e-590c01351eed',
  'x-envoy-upstream-service-time',
  '87',
  'apim-request-id',
  '60925fb5-a887-4a5a-8f2e-590c01351eed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 12 Nov 2020 23:10:43 GMT'
]);

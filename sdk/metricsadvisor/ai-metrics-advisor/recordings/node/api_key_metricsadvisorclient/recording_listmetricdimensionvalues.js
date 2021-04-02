let nock = require('nock');

module.exports.hash = "48513e0ce8ff104493751462e8b4f4a4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query', {"dimensionName":"city"})
  .reply(200, {"value":["Abidjan","Ahmadabad","Alexandria","Ankara","Atlanta","Baghdad","Bangkok","Barcelona","Beijing","Belo Horizonte","Bengaluru","Bogota","Boston","Brasilia","Buenos Aires","Cairo","Chengdu","Chennai","Chicago","Chittagong"],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/metrics/189ff959-d9f4-45c7-a1e0-f87c9c7ca80f/dimension/query?$top=20&$skip=20"}, [
  'Content-Length',
  '402',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'd849e94f-c64b-41d0-a6a8-c33dc93b613e',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'd849e94f-c64b-41d0-a6a8-c33dc93b613e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:41:21 GMT'
]);

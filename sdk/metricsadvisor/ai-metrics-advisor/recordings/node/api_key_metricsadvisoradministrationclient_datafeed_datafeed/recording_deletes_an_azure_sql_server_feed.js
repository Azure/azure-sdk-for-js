let nock = require('nock');

module.exports.hash = "26be118ace021c1235287359e5075d53";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/0847a076-a12d-41a7-b4d2-c673a17e06ec')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'ea7de783-af42-4717-9560-40e71e70a294',
  'x-envoy-upstream-service-time',
  '324',
  'apim-request-id',
  'ea7de783-af42-4717-9560-40e71e70a294',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/0847a076-a12d-41a7-b4d2-c673a17e06ec')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '77176a44-fd52-4ace-b6f7-52776a72a401',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '77176a44-fd52-4ace-b6f7-52776a72a401',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:04 GMT'
]);

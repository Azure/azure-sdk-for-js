let nock = require('nock');

module.exports.hash = "26be118ace021c1235287359e5075d53";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/edd67707-0e92-4868-afca-c1db28137ace')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2d6fc599-b17a-42f6-abaa-6b7922cbe66e',
  'x-envoy-upstream-service-time',
  '292',
  'apim-request-id',
  '2d6fc599-b17a-42f6-abaa-6b7922cbe66e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:54 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/edd67707-0e92-4868-afca-c1db28137ace')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b4e42d12-b3d4-4587-a562-447209aabffa',
  'x-envoy-upstream-service-time',
  '63',
  'apim-request-id',
  'b4e42d12-b3d4-4587-a562-447209aabffa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:38:54 GMT'
]);

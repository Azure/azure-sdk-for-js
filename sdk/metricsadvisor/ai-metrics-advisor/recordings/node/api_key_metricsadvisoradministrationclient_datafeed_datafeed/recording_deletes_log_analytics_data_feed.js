let nock = require('nock');

module.exports.hash = "2b8641347cfffae800a67810c101e008";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/e85af53e-25f9-4c78-9b63-02bce3462a13')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '691876f5-c13a-43f5-815a-8cfdd67bf182',
  'x-envoy-upstream-service-time',
  '319',
  'apim-request-id',
  '691876f5-c13a-43f5-815a-8cfdd67bf182',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/e85af53e-25f9-4c78-9b63-02bce3462a13')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b16fcb3f-07fc-4399-8556-aaf94d0c0582',
  'x-envoy-upstream-service-time',
  '65',
  'apim-request-id',
  'b16fcb3f-07fc-4399-8556-aaf94d0c0582',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 08 Jan 2022 02:17:14 GMT'
]);

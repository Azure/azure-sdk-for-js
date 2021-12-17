let nock = require('nock');

module.exports.hash = "7057a8ca17e949a053f56d53572dabc8";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/hooks/7802fdc6-70d2-4bf5-9837-cdc84eac95b1')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '70096f54-968b-4b42-82a5-d7e6d174ad6f',
  'x-envoy-upstream-service-time',
  '223',
  'apim-request-id',
  '70096f54-968b-4b42-82a5-d7e6d174ad6f',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:27:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/hooks/7802fdc6-70d2-4bf5-9837-cdc84eac95b1')
  .reply(404, {"code":"404 NOT_FOUND","message":"hookId is invalid."}, [
  'Content-Length',
  '55',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '49b4af07-bb36-490d-a463-6eca69fe5dfc',
  'x-envoy-upstream-service-time',
  '104',
  'apim-request-id',
  '49b4af07-bb36-490d-a463-6eca69fe5dfc',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:27:01 GMT'
]);

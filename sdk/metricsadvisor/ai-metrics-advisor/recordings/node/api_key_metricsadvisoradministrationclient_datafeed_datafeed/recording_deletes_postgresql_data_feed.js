let nock = require('nock');

module.exports.hash = "703b44e18d5f8b4333366b99daa74b58";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/8cecc5f6-fd29-4fe1-ba60-0660a9c3902c')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '2690524e-2922-48b1-bb73-62d61162e628',
  'x-envoy-upstream-service-time',
  '311',
  'apim-request-id',
  '2690524e-2922-48b1-bb73-62d61162e628',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:29 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/8cecc5f6-fd29-4fe1-ba60-0660a9c3902c')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '16595a9d-2bcd-4a36-b22c-7f7633bf37de',
  'x-envoy-upstream-service-time',
  '62',
  'apim-request-id',
  '16595a9d-2bcd-4a36-b22c-7f7633bf37de',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:29 GMT'
]);

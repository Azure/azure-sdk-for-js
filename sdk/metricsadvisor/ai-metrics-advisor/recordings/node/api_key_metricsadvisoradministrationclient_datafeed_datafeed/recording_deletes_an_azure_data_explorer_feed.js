let nock = require('nock');

module.exports.hash = "d334d4a48f14d26f57ffddc91b746e6e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('//metricsadvisor/v1.0/dataFeeds/833272d3-42f5-4dc5-87e3-fec1b4b2c857')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '0a5f5e9c-852c-45f1-a263-c7ef5addcb94',
  'x-envoy-upstream-service-time',
  '352',
  'apim-request-id',
  '0a5f5e9c-852c-45f1-a263-c7ef5addcb94',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:20 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('//metricsadvisor/v1.0/dataFeeds/833272d3-42f5-4dc5-87e3-fec1b4b2c857')
  .reply(404, {"code":"404 NOT_FOUND","message":"datafeedId is invalid."}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '5157b217-3243-4259-8256-5d5cd5301444',
  'x-envoy-upstream-service-time',
  '82',
  'apim-request-id',
  '5157b217-3243-4259-8256-5d5cd5301444',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:38:20 GMT'
]);

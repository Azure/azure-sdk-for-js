let nock = require('nock');

module.exports.hash = "9e11a3334bdeb420dc718a0b9ac71781";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"874704b3-80d3-4e78-929d-64be2accfb4f","hookName":"js-test-emailHook-161531685824404287","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=1&$skip=1"}, [
  'Content-Length',
  '398',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a9f0ae2c-b57b-4f21-8544-a4d03bc87b14',
  'x-envoy-upstream-service-time',
  '108',
  'apim-request-id',
  'a9f0ae2c-b57b-4f21-8544-a4d03bc87b14',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:46 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"54b8eea6-fdfc-4fd7-a7b5-b8dfa1d37d70","hookName":"js-test-emailHook-161531705673800660","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=1&$skip=2"}, [
  'Content-Length',
  '398',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '151dc6d1-0ca0-47ed-bb38-6159955fcaed',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '151dc6d1-0ca0-47ed-bb38-6159955fcaed',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 15 May 2021 04:10:46 GMT'
]);

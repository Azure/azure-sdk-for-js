let nock = require('nock');

module.exports.hash = "e89845354bda9fbabaf9179fbd12fbc3";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('//metricsadvisor/v1.0/hooks/7802fdc6-70d2-4bf5-9837-cdc84eac95b1', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"7802fdc6-70d2-4bf5-9837-cdc84eac95b1","hookName":"js-test-emailHook-163978361806502579","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '0ffb6896-e171-4c56-982b-345cf389f18c',
  'x-envoy-upstream-service-time',
  '485',
  'apim-request-id',
  '0ffb6896-e171-4c56-982b-345cf389f18c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 17 Dec 2021 23:26:58 GMT'
]);

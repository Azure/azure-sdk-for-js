let nock = require('nock');

module.exports.hash = "3d6cd6941132b216d6e0b8ebdc1a711e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/535ee654-f225-461b-9d8d-2c6abb9fed1a', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(200, {"hookId":"535ee654-f225-461b-9d8d-2c6abb9fed1a","hookName":"js-test-emailHook-162266592635407258","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3ec3a302-7129-49b0-96c8-2eac35920441',
  'x-envoy-upstream-service-time',
  '1110',
  'apim-request-id',
  '3ec3a302-7129-49b0-96c8-2eac35920441',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:15 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/535ee654-f225-461b-9d8d-2c6abb9fed1a')
  .reply(200, {"hookId":"535ee654-f225-461b-9d8d-2c6abb9fed1a","hookName":"js-test-emailHook-162266592635407258","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '2f54ef07-26e9-44a3-8b2b-6073595b7cb9',
  'x-envoy-upstream-service-time',
  '176',
  'apim-request-id',
  '2f54ef07-26e9-44a3-8b2b-6073595b7cb9',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:15 GMT'
]);

let nock = require('nock');

module.exports.hash = "296b1dbcef57360a0b8d87b9d57c71a0";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-162266592635407258","js-test-webHook-":"js-test-webHook-162266592635409328"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-162266592635407258","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/535ee654-f225-461b-9d8d-2c6abb9fed1a',
  'x-request-id',
  'fedf6452-e0dd-4475-9b1b-966186cea79e',
  'x-envoy-upstream-service-time',
  '624',
  'apim-request-id',
  'fedf6452-e0dd-4475-9b1b-966186cea79e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:06 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/535ee654-f225-461b-9d8d-2c6abb9fed1a')
  .reply(200, {"hookId":"535ee654-f225-461b-9d8d-2c6abb9fed1a","hookName":"js-test-emailHook-162266592635407258","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '513f72b6-9716-4ef8-93e0-15940c5c24ba',
  'x-envoy-upstream-service-time',
  '303',
  'apim-request-id',
  '513f72b6-9716-4ef8-93e0-15940c5c24ba',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:06 GMT'
]);

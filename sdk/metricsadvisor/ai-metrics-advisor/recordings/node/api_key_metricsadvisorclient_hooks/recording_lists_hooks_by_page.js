let nock = require('nock');

module.exports.hash = "8aa08cebc2e345d514d255814af01f9e";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"874704b3-80d3-4e78-929d-64be2accfb4f","hookName":"js-test-emailHook-161531685824404287","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"54b8eea6-fdfc-4fd7-a7b5-b8dfa1d37d70","hookName":"js-test-emailHook-161531705673800660","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '646',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4666f0f9-06e2-4538-bd2d-576a828d8a12',
  'x-envoy-upstream-service-time',
  '5137',
  'apim-request-id',
  '4666f0f9-06e2-4538-bd2d-576a828d8a12',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"2a5859d5-6df2-463e-840d-350a980f3291","hookName":"js-test-emailHook-162265643099209817","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"535ee654-f225-461b-9d8d-2c6abb9fed1a","hookName":"js-test-emailHook-162266592635407258","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '688',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '695363eb-e868-4eaf-8d43-8f630fcf443a',
  'x-envoy-upstream-service-time',
  '291',
  'apim-request-id',
  '695363eb-e868-4eaf-8d43-8f630fcf443a',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 02 Jun 2021 20:32:27 GMT'
]);

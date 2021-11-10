let nock = require('nock');

module.exports.hash = "7f5620e8c8366ea064ce460bf752a91c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"103a479c-ca6d-400e-a7f8-a9a868361b47","hookName":"js-test-emailHook-163615467799506131","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"57721e92-20ac-49c3-a3bc-567794d173b5","hookName":"js-test-emailHook-163615469910009534","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"aee75965-9331-427a-a6c1-c9e5d3999ed1","hookName":"js-test-emailHook-163651112651907744","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"6cf4555e-321e-4702-a0ad-48ac2b698d2a","hookName":"js-test-webHook-163651112651900484","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}]}, [
  'Content-Length',
  '1082',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '40b0419b-ba6e-481a-902e-2564e58713e4',
  'x-envoy-upstream-service-time',
  '129',
  'apim-request-id',
  '40b0419b-ba6e-481a-902e-2564e58713e4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:30 GMT'
]);

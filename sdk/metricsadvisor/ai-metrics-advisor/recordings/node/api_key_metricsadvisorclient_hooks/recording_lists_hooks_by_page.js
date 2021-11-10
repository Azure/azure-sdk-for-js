let nock = require('nock');

module.exports.hash = "d775b4b529b46a7c162abc14ac2974b9";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"103a479c-ca6d-400e-a7f8-a9a868361b47","hookName":"js-test-emailHook-163615467799506131","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"57721e92-20ac-49c3-a3bc-567794d173b5","hookName":"js-test-emailHook-163615469910009534","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=2"}, [
  'Content-Length',
  '646',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a8084c32-8b86-4754-a4d7-464a259c6f38',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  'a8084c32-8b86-4754-a4d7-464a259c6f38',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:30 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"aee75965-9331-427a-a6c1-c9e5d3999ed1","hookName":"js-test-emailHook-163651112651907744","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"6cf4555e-321e-4702-a0ad-48ac2b698d2a","hookName":"js-test-webHook-163651112651900484","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '725',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '3c95745a-5968-4361-97a4-16cc31a36de1',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '3c95745a-5968-4361-97a4-16cc31a36de1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Wed, 10 Nov 2021 02:25:30 GMT'
]);

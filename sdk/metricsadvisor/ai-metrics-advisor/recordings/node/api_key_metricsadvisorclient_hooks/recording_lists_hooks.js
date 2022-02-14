let nock = require('nock');

module.exports.hash = "7dca66528dada1f6dee3276b774c7fcf";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"103a479c-ca6d-400e-a7f8-a9a868361b47","hookName":"js-test-emailHook-163615467799506131","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"57721e92-20ac-49c3-a3bc-567794d173b5","hookName":"js-test-emailHook-163615469910009534","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"79223f60-bb88-424f-8942-6df8d659e5c8","hookName":"js-test-emailHook-163667848285101340","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"e2f4abd6-fb50-4ccb-8d6b-55e00e68aee5","hookName":"js-test-emailHook-163667870367305614","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"afe109eb-27f8-42d3-be1f-cad1a1f0da54","hookName":"js-test-emailHook-164264038100308708","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"5f15ae02-3249-4f9e-ae4d-2854ba9dc0c1","hookName":"js-test-webHook-164264038100303372","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}]}, [
  'Content-Length',
  '1578',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '31ab6517-5f9c-49c5-a5b2-8522470b8781',
  'x-envoy-upstream-service-time',
  '101',
  'apim-request-id',
  '31ab6517-5f9c-49c5-a5b2-8522470b8781',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:43 GMT'
]);

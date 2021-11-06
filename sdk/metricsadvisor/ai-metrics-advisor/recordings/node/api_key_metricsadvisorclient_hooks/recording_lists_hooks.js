let nock = require('nock');

module.exports.hash = "7f5620e8c8366ea064ce460bf752a91c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"103a479c-ca6d-400e-a7f8-a9a868361b47","hookName":"js-test-emailHook-163615467799506131","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"57721e92-20ac-49c3-a3bc-567794d173b5","hookName":"js-test-emailHook-163615469910009534","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"604c4044-51e4-4456-b76b-82482d96b45a","hookName":"js-test-emailHook-163616448988405339","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"84968cc8-b283-4bce-b2f1-eba0fa853c17","hookName":"js-test-webHook-163616448988408780","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}]}, [
  'Content-Length',
  '1082',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8f00c0d6-3950-4c5a-9e08-97ce917df774',
  'x-envoy-upstream-service-time',
  '102',
  'apim-request-id',
  '8f00c0d6-3950-4c5a-9e08-97ce917df774',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Sat, 06 Nov 2021 02:08:14 GMT'
]);

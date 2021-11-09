let nock = require('nock');

module.exports.hash = "7f5620e8c8366ea064ce460bf752a91c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"103a479c-ca6d-400e-a7f8-a9a868361b47","hookName":"js-test-emailHook-163615467799506131","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"57721e92-20ac-49c3-a3bc-567794d173b5","hookName":"js-test-emailHook-163615469910009534","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"2531af07-9d0f-4cda-9b03-4284a940c710","hookName":"js-test-emailHook-163636435782600770","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"5dfb93fa-fc9a-4725-af2b-c604e303336b","hookName":"js-test-webHook-163636435782604310","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}]}, [
  'Content-Length',
  '1082',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '977f72d8-4058-4cc7-8eae-27017c49b9e8',
  'x-envoy-upstream-service-time',
  '100',
  'apim-request-id',
  '977f72d8-4058-4cc7-8eae-27017c49b9e8',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 08 Nov 2021 09:39:21 GMT'
]);

let nock = require('nock');

module.exports.hash = "7f5620e8c8366ea064ce460bf752a91c";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"103a479c-ca6d-400e-a7f8-a9a868361b47","hookName":"js-test-emailHook-163615467799506131","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"57721e92-20ac-49c3-a3bc-567794d173b5","hookName":"js-test-emailHook-163615469910009534","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"79223f60-bb88-424f-8942-6df8d659e5c8","hookName":"js-test-emailHook-163667848285101340","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"e2f4abd6-fb50-4ccb-8d6b-55e00e68aee5","hookName":"js-test-emailHook-163667870367305614","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"7ba3c3b1-f3d3-4598-ae87-ac584020c641","hookName":"js-test-emailHook-163702282957003574","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}},{"hookId":"e86dd6fb-ec6a-4b29-98f5-172a91f3db69","hookName":"js-test-webHook-163702282957004992","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"SecretPlaceholder"}}]}, [
  'Content-Length',
  '1578',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '95ebf913-3474-45cd-8b3f-83fc0ad9fcb2',
  'x-envoy-upstream-service-time',
  '111',
  'apim-request-id',
  '95ebf913-3474-45cd-8b3f-83fc0ad9fcb2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:52 GMT'
]);

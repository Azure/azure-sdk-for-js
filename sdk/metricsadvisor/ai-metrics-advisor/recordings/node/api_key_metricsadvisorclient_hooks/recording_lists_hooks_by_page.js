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
  'bbf79546-9abf-49cb-a1e0-6a36a825862d',
  'x-envoy-upstream-service-time',
  '110',
  'apim-request-id',
  'bbf79546-9abf-49cb-a1e0-6a36a825862d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks')
  .query(true)
  .reply(200, {"value":[{"hookId":"79223f60-bb88-424f-8942-6df8d659e5c8","hookName":"js-test-emailHook-163667848285101340","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}},{"hookId":"e2f4abd6-fb50-4ccb-8d6b-55e00e68aee5","hookName":"js-test-emailHook-163667870367305614","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}],"@nextLink":"https://endpoint:443/metricsadvisor/v1.0/hooks?hookName=js-test&$maxpagesize=2&$skip=4"}, [
  'Content-Length',
  '646',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '58870ac9-3db5-4bdb-848b-971e7d5e2ffa',
  'x-envoy-upstream-service-time',
  '103',
  'apim-request-id',
  '58870ac9-3db5-4bdb-848b-971e7d5e2ffa',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Tue, 16 Nov 2021 00:33:52 GMT'
]);

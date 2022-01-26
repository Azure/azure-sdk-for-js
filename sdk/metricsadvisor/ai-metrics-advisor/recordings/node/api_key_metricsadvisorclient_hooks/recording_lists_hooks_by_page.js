let nock = require('nock');

module.exports.hash = "bf9aaeaa90d32ba6e64f95081f31cb29";

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
  '8bd5e9b1-b9b8-4754-b4e8-a696d6c83163',
  'x-envoy-upstream-service-time',
  '107',
  'apim-request-id',
  '8bd5e9b1-b9b8-4754-b4e8-a696d6c83163',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:43 GMT'
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
  'd23bd641-fb4b-44f8-be1c-a0c51052637c',
  'x-envoy-upstream-service-time',
  '106',
  'apim-request-id',
  'd23bd641-fb4b-44f8-be1c-a0c51052637c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Thu, 20 Jan 2022 00:59:43 GMT'
]);

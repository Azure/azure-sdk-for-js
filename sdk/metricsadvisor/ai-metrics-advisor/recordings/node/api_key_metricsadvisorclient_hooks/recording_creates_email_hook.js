let nock = require('nock');

module.exports.hash = "296b1dbcef57360a0b8d87b9d57c71a0";

module.exports.testInfo = {"uniqueName":{"js-test-emailHook-":"js-test-emailHook-161070018056802238","js-test-webHook-":"js-test-webHook-161070018056805597"},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Email","hookName":"js-test-emailHook-161070018056802238","description":"description","hookParameter":{"toList":["test@example.com"]}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/9194cb28-ba76-4fac-99c6-092c73e5e1f3',
  'x-request-id',
  '7b5db128-34ce-4dc0-89bf-a42298da9947',
  'x-envoy-upstream-service-time',
  '366',
  'apim-request-id',
  '7b5db128-34ce-4dc0-89bf-a42298da9947',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:01 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/9194cb28-ba76-4fac-99c6-092c73e5e1f3')
  .reply(200, {"hookId":"9194cb28-ba76-4fac-99c6-092c73e5e1f3","hookName":"js-test-emailHook-161070018056802238","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test@example.com"]}}, [
  'Content-Length',
  '247',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '49b07cdb-ace4-4ca6-b430-267259b03fa5',
  'x-envoy-upstream-service-time',
  '169',
  'apim-request-id',
  '49b07cdb-ace4-4ca6-b430-267259b03fa5',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:01 GMT'
]);

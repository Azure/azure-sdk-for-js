let nock = require('nock');

module.exports.hash = "9be0384c2bf274adc260c397128a3dc6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-160530449676502399","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/20f65cc3-2f21-44b8-ab83-0040da955bc5',
  'x-request-id',
  '40fdf5bf-91a4-446d-9d39-9dd7ef91c5f2',
  'x-envoy-upstream-service-time',
  '833',
  'apim-request-id',
  '40fdf5bf-91a4-446d-9d39-9dd7ef91c5f2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:58 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/20f65cc3-2f21-44b8-ab83-0040da955bc5')
  .reply(200, {"hookId":"20f65cc3-2f21-44b8-ab83-0040da955bc5","hookName":"js-test-webHook-160530449676502399","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f161d362-a280-459a-840e-4367a8ee57dd',
  'x-envoy-upstream-service-time',
  '145',
  'apim-request-id',
  'f161d362-a280-459a-840e-4367a8ee57dd',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 21:54:58 GMT'
]);

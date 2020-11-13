let nock = require('nock');

module.exports.hash = "9be0384c2bf274adc260c397128a3dc6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-160523011294301028","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/78ee2629-4750-4511-8b11-961cbffc2aa9',
  'x-request-id',
  'e8545384-d794-467e-8d97-670805df72ea',
  'x-envoy-upstream-service-time',
  '902',
  'apim-request-id',
  'e8545384-d794-467e-8d97-670805df72ea',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:14 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/78ee2629-4750-4511-8b11-961cbffc2aa9')
  .reply(200, {"hookId":"78ee2629-4750-4511-8b11-961cbffc2aa9","hookName":"js-test-webHook-160523011294301028","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '883f4987-864d-495e-9b50-1f02d773244e',
  'x-envoy-upstream-service-time',
  '174',
  'apim-request-id',
  '883f4987-864d-495e-9b50-1f02d773244e',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:15:15 GMT'
]);

let nock = require('nock');

module.exports.hash = "9be0384c2bf274adc260c397128a3dc6";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-160529681071104557","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/a24db07b-522a-499f-8239-97c5e7743212',
  'x-request-id',
  '4d8d57bc-9bf0-41c4-a8c4-93adb9eb354b',
  'x-envoy-upstream-service-time',
  '690',
  'apim-request-id',
  '4d8d57bc-9bf0-41c4-a8c4-93adb9eb354b',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:51 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/a24db07b-522a-499f-8239-97c5e7743212')
  .reply(200, {"hookId":"a24db07b-522a-499f-8239-97c5e7743212","hookName":"js-test-webHook-160529681071104557","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'f9ca0003-47a1-4884-854a-014923de6721',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  'f9ca0003-47a1-4884-854a-014923de6721',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:51 GMT'
]);

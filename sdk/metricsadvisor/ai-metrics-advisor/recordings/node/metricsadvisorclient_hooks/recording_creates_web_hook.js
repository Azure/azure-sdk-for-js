let nock = require('nock');

module.exports.hash = "6ff21718bdfa253ddd49802def2d3f6d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-160073143932209816","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/d082f519-d49c-48f8-824c-8579952c6270',
  'x-request-id',
  '6e51e273-9da8-4cd7-be0e-915249beda6c',
  'x-envoy-upstream-service-time',
  '822',
  'apim-request-id',
  '6e51e273-9da8-4cd7-be0e-915249beda6c',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:22 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/d082f519-d49c-48f8-824c-8579952c6270')
  .reply(200, {"hookId":"d082f519-d49c-48f8-824c-8579952c6270","hookName":"js-test-webHook-160073143932209816","hookType":"Webhook","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '348',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '6b2f0413-8ba3-48fc-9d45-923d20afa2fe',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '6b2f0413-8ba3-48fc-9d45-923d20afa2fe',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:22 GMT'
]);

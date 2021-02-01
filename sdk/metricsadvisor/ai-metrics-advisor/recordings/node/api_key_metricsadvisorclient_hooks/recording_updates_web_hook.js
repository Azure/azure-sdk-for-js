let nock = require('nock');

module.exports.hash = "f73bb136141e744b254cea252bdc08eb";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/b1c3c74b-ed83-41aa-8716-dbe12c741940', {"hookType":"Webhook","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123"}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'bc733d22-5d1a-4a06-826a-5697ae690dde',
  'x-envoy-upstream-service-time',
  '543',
  'apim-request-id',
  'bc733d22-5d1a-4a06-826a-5697ae690dde',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:04 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/b1c3c74b-ed83-41aa-8716-dbe12c741940')
  .reply(200, {"hookId":"b1c3c74b-ed83-41aa-8716-dbe12c741940","hookName":"js-test-webHook-161070018056805597","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user1","password":"pass123","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '353',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '8606e2e0-41fc-45c5-b030-dc3dbf007fb7',
  'x-envoy-upstream-service-time',
  '158',
  'apim-request-id',
  '8606e2e0-41fc-45c5-b030-dc3dbf007fb7',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:04 GMT'
]);

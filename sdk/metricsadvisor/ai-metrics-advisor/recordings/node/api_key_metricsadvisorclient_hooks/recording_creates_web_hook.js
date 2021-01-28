let nock = require('nock');

module.exports.hash = "f45b14607343ef5ffa520f5a98da405f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .post('/metricsadvisor/v1.0/hooks', {"hookType":"Webhook","hookName":"js-test-webHook-161070018056805597","description":"description","hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass"}})
  .reply(201, "", [
  'Content-Length',
  '0',
  'Location',
  'https://endpoint/metricsadvisor/v1.0/hooks/b1c3c74b-ed83-41aa-8716-dbe12c741940',
  'x-request-id',
  '22b4ca39-8ebc-4442-b1d0-290326bc9f4d',
  'x-envoy-upstream-service-time',
  '602',
  'apim-request-id',
  '22b4ca39-8ebc-4442-b1d0-290326bc9f4d',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:02 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/b1c3c74b-ed83-41aa-8716-dbe12c741940')
  .reply(200, {"hookId":"b1c3c74b-ed83-41aa-8716-dbe12c741940","hookName":"js-test-webHook-161070018056805597","hookType":"Webhook","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"endpoint":"https://httpbin.org/post","username":"user","password":"pass","headers":{},"certificateKey":"","certificatePassword":""}}, [
  'Content-Length',
  '349',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'a25a9172-9eb5-4bf9-9f3b-2ba764341dd2',
  'x-envoy-upstream-service-time',
  '157',
  'apim-request-id',
  'a25a9172-9eb5-4bf9-9f3b-2ba764341dd2',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 15 Jan 2021 08:43:02 GMT'
]);

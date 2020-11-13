let nock = require('nock');

module.exports.hash = "fc0fd3d9f5031d1fc1acd01a8a06d3fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/c2696e26-17f0-4c9f-9aa3-1982e7fed1bc', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'fa616089-476e-4302-b012-badc9691bfdb',
  'x-envoy-upstream-service-time',
  '308',
  'apim-request-id',
  'fa616089-476e-4302-b012-badc9691bfdb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:52 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/c2696e26-17f0-4c9f-9aa3-1982e7fed1bc')
  .reply(200, {"hookId":"c2696e26-17f0-4c9f-9aa3-1982e7fed1bc","hookName":"js-test-emailHook-160529681071108921","hookType":"Email","externalLink":"","description":"description","admins":["kaghiya@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"]}}, [
  'Content-Length',
  '268',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '97108e9c-f716-4f37-b070-80a673c95ca1',
  'x-envoy-upstream-service-time',
  '150',
  'apim-request-id',
  '97108e9c-f716-4f37-b070-80a673c95ca1',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 19:46:52 GMT'
]);

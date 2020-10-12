let nock = require('nock');

module.exports.hash = "fc0fd3d9f5031d1fc1acd01a8a06d3fa";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .patch('/metricsadvisor/v1.0/hooks/76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70', {"hookType":"Email","hookParameter":{"toList":["test2@example.com","test3@example.com"]}})
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '201200ad-9c62-44ae-b8aa-644ba3113e57',
  'x-envoy-upstream-service-time',
  '306',
  'apim-request-id',
  '201200ad-9c62-44ae-b8aa-644ba3113e57',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:23 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/hooks/76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70')
  .reply(200, {"hookId":"76b262e1-c8b8-49f0-8e6f-4a7a6bfabd70","hookName":"js-test-emailHook-160073143932207624","hookType":"Email","externalLink":"","description":"description","admins":["yumeng@microsoft.com"],"hookParameter":{"toList":["test2@example.com","test3@example.com"],"ccList":null,"bccList":null}}, [
  'Content-Length',
  '296',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '96a62f21-c076-4008-8b2d-87bdd1cf95a4',
  'x-envoy-upstream-service-time',
  '130',
  'apim-request-id',
  '96a62f21-c076-4008-8b2d-87bdd1cf95a4',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Mon, 21 Sep 2020 23:37:23 GMT'
]);

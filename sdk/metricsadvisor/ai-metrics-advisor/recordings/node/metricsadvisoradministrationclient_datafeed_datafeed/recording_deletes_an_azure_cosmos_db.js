let nock = require('nock');

module.exports.hash = "e6ac13f5b0a5c1a1a7f68d8669dc9474";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/5fddfc0a-0d45-422e-96cb-330276999209')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  'd96c127f-b7e5-45c7-b302-ad72a36d73ce',
  'x-envoy-upstream-service-time',
  '302',
  'apim-request-id',
  'd96c127f-b7e5-45c7-b302-ad72a36d73ce',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:26 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/5fddfc0a-0d45-422e-96cb-330276999209')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  'b08f20df-7344-4dab-a71f-765fcab187df',
  'x-envoy-upstream-service-time',
  '60',
  'apim-request-id',
  'b08f20df-7344-4dab-a71f-765fcab187df',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 23:11:26 GMT'
]);

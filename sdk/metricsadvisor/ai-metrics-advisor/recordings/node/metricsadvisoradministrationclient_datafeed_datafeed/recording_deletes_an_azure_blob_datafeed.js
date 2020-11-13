let nock = require('nock');

module.exports.hash = "d862111c280f70b54e99d56bfedf91e4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .delete('/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b')
  .reply(204, "", [
  'Content-Length',
  '0',
  'x-request-id',
  '42ab292a-68b1-49e6-983f-611fdff69cbb',
  'x-envoy-upstream-service-time',
  '358',
  'apim-request-id',
  '42ab292a-68b1-49e6-983f-611fdff69cbb',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:48 GMT'
]);

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/metricsadvisor/v1.0/dataFeeds/223c7496-4dda-4c68-a210-3a93b92e514b')
  .reply(404, {"code":"ERROR_INVALID_PARAMETER","message":"datafeedId is invalid."}, [
  'Content-Length',
  '69',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-request-id',
  '4efed11d-25d8-422e-91b1-d1a6ee76b211',
  'x-envoy-upstream-service-time',
  '71',
  'apim-request-id',
  '4efed11d-25d8-422e-91b1-d1a6ee76b211',
  'Strict-Transport-Security',
  'max-age=31536000; includeSubDomains; preload',
  'x-content-type-options',
  'nosniff',
  'Date',
  'Fri, 13 Nov 2020 01:14:48 GMT'
]);

let nock = require('nock');

module.exports.hash = "9dd6f93d2e3c4f1bb4561712f12cf6db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test%27)/docs(%27garbxyz%27)')
  .query(true)
  .reply(404, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'a9ee9450-b341-40c8-9222-19f9e17233fa',
  'elapsed-time',
  '3',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:03:48 GMT',
  'Content-Length',
  '0' ]);

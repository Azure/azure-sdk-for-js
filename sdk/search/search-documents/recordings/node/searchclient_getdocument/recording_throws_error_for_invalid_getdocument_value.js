let nock = require('nock');

module.exports.hash = "9dd6f93d2e3c4f1bb4561712f12cf6db";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27hotel-live-test1%27)/docs(%27garbxyz%27)')
  .query(true)
  .reply(404, "", [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Expires',
  '-1',
  'request-id',
  'af8a88a4-89ae-4bfa-9bac-6d39cb8612fe',
  'elapsed-time',
  '4',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:45:02 GMT',
  'Content-Length',
  '0' ]);

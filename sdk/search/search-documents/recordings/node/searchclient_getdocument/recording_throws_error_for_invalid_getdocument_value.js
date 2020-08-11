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
  'e726a872-f836-4b5a-a991-8254d2ba6a31',
  'elapsed-time',
  '3',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:07:21 GMT',
  'Content-Length',
  '0' ]);

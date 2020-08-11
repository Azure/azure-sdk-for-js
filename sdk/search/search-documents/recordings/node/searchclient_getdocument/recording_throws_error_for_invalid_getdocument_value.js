let nock = require('nock');

module.exports.hash = "af3f37b4a396e446e72978621cb4ac64";

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
  'bebaf6f0-ec2c-4166-a8f2-111bbe5e7c1e',
  'elapsed-time',
  '4',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 10 Aug 2020 10:01:49 GMT',
  'Content-Length',
  '0' ]);

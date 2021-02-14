let nock = require('nock');

module.exports.hash = "45022062f0e26a01c271e6703b334be4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"No index with the name 'garbxyz' was found in the service 'testsearchcases'."}}, [ 'Cache-Control',
  'no-cache',
  'Pragma',
  'no-cache',
  'Content-Type',
  'application/json; odata.metadata=minimal',
  'Content-Language',
  'en',
  'Expires',
  '-1',
  'request-id',
  '07858434-6737-4d70-a3a7-c3ce18bc6968',
  'elapsed-time',
  '207',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:21:19 GMT',
  'Content-Length',
  '110' ]);

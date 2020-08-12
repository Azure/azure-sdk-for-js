let nock = require('nock');

module.exports.hash = "042821d4c3616b703a08e02f760abe31";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"No data source with the name 'garbxyz' was found in service 'testsearchcases'."}}, [ 'Cache-Control',
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
  '52eb4e1b-b050-4634-a3eb-ff6f5aa55ec2',
  'elapsed-time',
  '14',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 12 Aug 2020 05:47:01 GMT',
  'Content-Length',
  '112' ]);

let nock = require('nock');

module.exports.hash = "ffccc679e72a807cdfec97892a004fb2";

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
  '4831bc3e-03e6-4483-bcdd-b062ba0f3200',
  'elapsed-time',
  '5',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:07:32 GMT',
  'Content-Length',
  '112' ]);

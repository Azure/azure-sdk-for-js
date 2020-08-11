let nock = require('nock');

module.exports.hash = "ffccc679e72a807cdfec97892a004fb2";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/datasources(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"No data source with the name 'garbxyz' was found in service 'searchdocsdk'."}}, [ 'Cache-Control',
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
  '4e21bcd4-1e02-41d1-ad41-f9e478e74cc2',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 09:57:10 GMT',
  'Content-Length',
  '109' ]);

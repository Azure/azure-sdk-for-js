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
  'f33ae575-9e07-496e-895d-1da07e3686df',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 10:10:57 GMT',
  'Content-Length',
  '109' ]);

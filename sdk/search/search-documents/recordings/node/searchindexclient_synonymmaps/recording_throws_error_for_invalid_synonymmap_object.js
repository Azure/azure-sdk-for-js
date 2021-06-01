let nock = require('nock');

module.exports.hash = "e567ce655ea934e7d306432fd9c84241";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/synonymmaps(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"No synonym map with the name 'garbxyz' was found in service 'testsearchcases'."}}, [
  'Cache-Control',
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
  '19e7d129-c68e-4f49-8c39-60330ba36f10',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:37:59 GMT',
  'Content-Length',
  '112'
]);

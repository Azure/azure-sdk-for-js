let nock = require('nock');

module.exports.hash = "1b42fc88e6bfa9105999939d2ce56df4";

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
  'f823e3c0-e83b-4dd8-8303-6b6c18f6adde',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 02 Aug 2021 18:23:55 GMT',
  'Content-Length',
  '112'
]);

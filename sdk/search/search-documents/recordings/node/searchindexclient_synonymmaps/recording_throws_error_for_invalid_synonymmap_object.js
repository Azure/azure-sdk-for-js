let nock = require('nock');

module.exports.hash = "1b42fc88e6bfa9105999939d2ce56df4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/synonymmaps('garbxyz')`)
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
  '469cc61e-639b-4ce3-acf5-3fba90afd370',
  'elapsed-time',
  '6',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:57:34 GMT',
  'Content-Length',
  '112'
]);

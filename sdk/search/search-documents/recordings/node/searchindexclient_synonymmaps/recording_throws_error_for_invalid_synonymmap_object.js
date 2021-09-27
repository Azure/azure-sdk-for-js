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
  '97a7653a-79c6-421d-8ffc-3761f6b68fd0',
  'elapsed-time',
  '66',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 27 Sep 2021 18:33:51 GMT',
  'Content-Length',
  '112'
]);

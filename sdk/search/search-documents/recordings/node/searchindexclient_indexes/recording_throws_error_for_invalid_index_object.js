let nock = require('nock');

module.exports.hash = "45022062f0e26a01c271e6703b334be4";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexes(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"No index with the name 'garbxyz' was found in the service 'testsearchcases'."}}, [
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
  '4248c061-bf84-43ba-bb74-2ab221fbc1c9',
  'elapsed-time',
  '16',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 01 Jun 2021 18:38:54 GMT',
  'Content-Length',
  '110'
]);

let nock = require('nock');

module.exports.hash = "7277123b629a210f8b3110ebefec5e9d";

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
  '5dcc87fc-7363-4f71-a28a-069d246ad6ad',
  'elapsed-time',
  '18',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Mon, 02 Aug 2021 18:24:50 GMT',
  'Content-Length',
  '110'
]);

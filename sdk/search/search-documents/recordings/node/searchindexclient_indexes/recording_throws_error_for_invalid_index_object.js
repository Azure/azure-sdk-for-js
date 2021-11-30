let nock = require('nock');

module.exports.hash = "7277123b629a210f8b3110ebefec5e9d";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get(`/indexes('garbxyz')`)
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
  'e01da2e0-443f-4891-b4a9-2394223714e0',
  'elapsed-time',
  '15',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 28 Sep 2021 05:58:29 GMT',
  'Content-Length',
  '110'
]);

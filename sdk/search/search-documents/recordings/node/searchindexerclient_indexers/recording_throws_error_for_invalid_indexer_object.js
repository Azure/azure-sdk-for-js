let nock = require('nock');

module.exports.hash = "a05c351bfe7ffe38a8f1c740f1d0dd8f";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/indexers(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"Indexer 'garbxyz' was not found in service 'testsearchcases'."}}, [ 'Cache-Control',
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
  '0577882f-065e-418d-8cbd-93457cc7d750',
  'elapsed-time',
  '7',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:05:45 GMT',
  'Content-Length',
  '95' ]);

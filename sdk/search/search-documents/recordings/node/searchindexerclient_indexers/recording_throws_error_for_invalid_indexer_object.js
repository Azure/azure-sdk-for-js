let nock = require('nock');

module.exports.hash = "b546af201e9f4b3ed9f7fb66f796c57e";

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
  '71c5468c-5ad8-46c2-8ecf-492d6a714532',
  'elapsed-time',
  '5',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:20:35 GMT',
  'Content-Length',
  '95' ]);

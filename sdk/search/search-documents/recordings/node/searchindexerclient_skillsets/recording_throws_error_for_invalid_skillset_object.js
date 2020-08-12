let nock = require('nock');

module.exports.hash = "1421b0624db14488f7bb37ae23c0ee0a";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint:443', {"encodedQueryParams":true})
  .get('/skillsets(%27garbxyz%27)')
  .query(true)
  .reply(404, {"error":{"code":"","message":"No skillset with the name 'garbxyz' was found in service 'Microsoft.WindowsAzure.Search.Core.Models.SearchService'."}}, [ 'Cache-Control',
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
  '80d671a2-86a6-4114-b181-0a90422ea05e',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Tue, 11 Aug 2020 11:50:46 GMT',
  'Content-Length',
  '149' ]);

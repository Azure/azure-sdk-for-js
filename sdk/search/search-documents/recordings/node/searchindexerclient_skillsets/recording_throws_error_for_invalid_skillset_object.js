let nock = require('nock');

module.exports.hash = "2cbb4a8bd8e0507fca06bbaff714dac2";

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
  '0572d183-37b6-4869-9f3a-d197679e6c51',
  'elapsed-time',
  '31',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Fri, 25 Sep 2020 08:23:00 GMT',
  'Content-Length',
  '149' ]);

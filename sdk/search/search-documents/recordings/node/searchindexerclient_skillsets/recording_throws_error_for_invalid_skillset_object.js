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
  '3f7e2cc7-9263-4cf4-98ee-fded9571740d',
  'elapsed-time',
  '21',
  'OData-Version',
  '4.0',
  'Preference-Applied',
  'odata.include-annotations="*"',
  'Strict-Transport-Security',
  'max-age=15724800; includeSubDomains',
  'Date',
  'Wed, 04 Nov 2020 08:25:55 GMT',
  'Content-Length',
  '149' ]);

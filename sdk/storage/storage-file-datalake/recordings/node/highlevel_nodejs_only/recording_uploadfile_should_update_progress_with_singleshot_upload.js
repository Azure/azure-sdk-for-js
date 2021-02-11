let nock = require('nock');

module.exports.hash = "b4820000fc4cc6800ac0a1fbfd68908c";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240346803160","file":"file158368240349909601"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240346803160')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6ACB2F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2ff4-601e-0014-7b60-f586fa000000',
  'x-ms-client-request-id',
  'e683a2bc-05ce-4e0a-8b4e-68e02c12c5f7',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);

let nock = require('nock');

module.exports.hash = "f487818fac605c665cf6566571870873";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240157705323","file":"file158368240160407376"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240157705323')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E58BC344"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2b52-601e-0014-4a60-f586fa000000',
  'x-ms-client-request-id',
  '14ae3390-216a-4cce-ba11-f9d28908365f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

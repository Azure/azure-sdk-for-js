let nock = require('nock');

module.exports.hash = "a601000f0008a0b2a0186269a12bdb38";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240101204624","file":"file158368240120005274"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240101204624')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E54D4D66"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2a67-601e-0014-7960-f586fa000000',
  'x-ms-client-request-id',
  '74ae261f-b301-4c7e-8a0d-a39b3217e1ad',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

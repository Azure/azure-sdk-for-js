let nock = require('nock');

module.exports.hash = "bb2465b7ff03079db40b070324d649d2";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240144701438","file":"file158368240147705953"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240144701438')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E577E8E6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2b18-601e-0014-1660-f586fa000000',
  'x-ms-client-request-id',
  'ac37485e-a491-4d69-b798-c0aec924906d',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

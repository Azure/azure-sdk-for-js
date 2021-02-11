let nock = require('nock');

module.exports.hash = "194fd067e5d4cf1058687977425cd8c3";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240133902232","file":"file158368240139807070"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240133902232')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:41 GMT',
  'ETag',
  '"0x8D7C377E56791BC"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2adb-601e-0014-6060-f586fa000000',
  'x-ms-client-request-id',
  '5db1cef0-2852-4912-9175-2522870ae71f',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:41 GMT'
]);

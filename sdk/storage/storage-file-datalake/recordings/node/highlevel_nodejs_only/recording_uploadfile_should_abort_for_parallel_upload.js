let nock = require('nock');

module.exports.hash = "61fb91210202d26d7a9c44b696176fee";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240342202282","file":"file158368240344903289"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240342202282')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6A53754"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f2fd0-601e-0014-5a60-f586fa000000',
  'x-ms-client-request-id',
  '57f440a1-37fb-4757-8a5a-34c41163af94',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);

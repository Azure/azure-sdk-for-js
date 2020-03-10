let nock = require('nock');

module.exports.hash = "02a178e0535bff21260ce28e36ac5973";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240378806707","file":"file158368240381405739"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240378806707')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:43 GMT',
  'ETag',
  '"0x8D7C377E6DCA6CF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f30a7-601e-0014-1960-f586fa000000',
  'x-ms-client-request-id',
  'e89d7789-ca03-4cef-b9ca-59de7cbe496e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:43 GMT'
]);

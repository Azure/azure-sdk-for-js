let nock = require('nock');

module.exports.hash = "dd18446a51277c20b8474b788de6bf27";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem158368240455209039","file":"file158368240457803844"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem158368240455209039')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 08 Mar 2020 15:46:44 GMT',
  'ETag',
  '"0x8D7C377E7512C48"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '679f327e-601e-0014-4660-f586fa000000',
  'x-ms-client-request-id',
  '2cdb3996-5fae-4f2d-a53c-a0c0ae979145',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Sun, 08 Mar 2020 15:46:44 GMT'
]);

let nock = require('nock');

module.exports.hash = "067fe3734143ebc9a5adc9fa6cabdad0";

module.exports.testInfo = {"uniqueName":{"container":"container159352287196103124","blob":"blob159352287350901700"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352287196103124')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:14:32 GMT',
  'ETag',
  '"0x8D81CF7875DD83F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c14ed2e-801e-006a-77e0-4e9588000000',
  'x-ms-client-request-id',
  'e4fe7469-4280-4b5a-800a-554ae0a603b8',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:14:31 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352287196103124/blob159352287350901700', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:14:33 GMT',
  'ETag',
  '"0x8D81CF787B8A442"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c14ee56-801e-006a-7ae0-4e9588000000',
  'x-ms-client-request-id',
  'b5e30df5-00c2-401e-806e-455a81cc66ad',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-30T13:14:33.2449858Z',
  'Date',
  'Tue, 30 Jun 2020 13:14:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159352287196103124')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c14efbc-801e-006a-4fe0-4e9588000000',
  'x-ms-client-request-id',
  '0fea0a24-c239-4b03-a816-0b9a6733e508',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:14:33 GMT'
]);

let nock = require('nock');

module.exports.hash = "b37ff448692db04932e06e588c02795a";

module.exports.testInfo = {"uniqueName":{"container":"container159352287482009428","blob":"blob159352287529809358"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352287482009428')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:14:34 GMT',
  'ETag',
  '"0x8D81CF788734B49"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c14f09d-801e-006a-1fe0-4e9588000000',
  'x-ms-client-request-id',
  '63a01411-759f-43b5-96b3-9de1e9d1a00e',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:14:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159352287482009428/blob159352287529809358', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 30 Jun 2020 13:14:35 GMT',
  'ETag',
  '"0x8D81CF789018CD9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c14f164-801e-006a-4be0-4e9588000000',
  'x-ms-client-request-id',
  '1f00cacc-f953-4ae3-ad8a-9ea22118edd1',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-06-30T13:14:35.4005209Z',
  'Date',
  'Tue, 30 Jun 2020 13:14:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159352287482009428')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c14f198-801e-006a-79e0-4e9588000000',
  'x-ms-client-request-id',
  'e8a0e645-b12c-4db2-8d9b-cdc0f944e5be',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Tue, 30 Jun 2020 13:14:34 GMT'
]);

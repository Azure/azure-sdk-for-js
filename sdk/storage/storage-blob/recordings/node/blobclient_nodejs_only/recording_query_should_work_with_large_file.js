let nock = require('nock');

module.exports.hash = "2a2992af0587ffceb9d76e62795326e5";

module.exports.testInfo = {"uniqueName":{"container":"container159842818431600907","blob":"blob159842818461508750"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818431600907')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:44 GMT',
  'ETag',
  '"0x8D8499498D2584B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc513d9-101e-000a-6e7d-7be917000000',
  'x-ms-client-request-id',
  'dcad4502-06a9-4b75-b8f8-b0d0776c58d9',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:43 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container159842818431600907/blob159842818461508750', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 26 Aug 2020 07:49:44 GMT',
  'ETag',
  '"0x8D8499498FF21D1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eb73cf11-401e-005a-5d7d-7b2b47000000',
  'x-ms-client-request-id',
  'b17f04f0-c74d-4287-8983-796668d9c407',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-08-26T07:49:44.3769809Z',
  'Date',
  'Wed, 26 Aug 2020 07:49:44 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container159842818431600907')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6dc51411-101e-000a-067d-7be917000000',
  'x-ms-client-request-id',
  '387d26e5-8ce6-4802-8cb3-c228cb31a400',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Wed, 26 Aug 2020 07:49:44 GMT'
]);

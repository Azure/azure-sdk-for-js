let nock = require('nock');

module.exports.testInfo = {"container":"container156816861813201107","blob":"blob156816861853901574"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816861813201107')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:38 GMT',
  'ETag',
  '"0x8D7365F0E39CD26"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a22ca825-401e-0035-4847-68c8a9000000',
  'x-ms-client-request-id',
  '0d57bf06-88c8-442d-9caa-9425279848c3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:38 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816861813201107/blob156816861853901574', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:38 GMT',
  'ETag',
  '"0x8D7365F0E77C605"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8eacb615-201e-002e-7847-68e63b000000',
  'x-ms-client-request-id',
  'c76bf83a-a447-4be8-98e1-a92d8ee843e3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:23:38 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816861813201107/blob156816861853901574')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd05ab458-801e-004e-1547-68a319000000',
  'x-ms-client-request-id',
  '09b054ad-3804-42fc-b5a2-7fa29a639cc0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:23:38 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816861813201107')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fbed66e8-701e-001f-4c47-68bdec000000',
  'x-ms-client-request-id',
  '2c89a431-a876-46da-9fbf-10da7c7c2de6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:39 GMT' ]);


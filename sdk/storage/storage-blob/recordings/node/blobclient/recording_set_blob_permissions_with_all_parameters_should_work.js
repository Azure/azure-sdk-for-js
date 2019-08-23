let nock = require('nock');

module.exports.testInfo = {"container":"container156654446071202001","blob":"blob156654446188307738"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654446071202001')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:23 GMT',
  'ETag',
  '"0x8D72798F76817A4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39f34d89-301e-001d-2e81-599f87000000',
  'x-ms-client-request-id',
  '6eb84ef3-cd67-4000-a2e8-2f37d5fad847',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654446071202001/blob156654446188307738', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:24 GMT',
  'ETag',
  '"0x8D72798F83874B0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eca9495f-401e-0028-7081-59f393000000',
  'x-ms-client-request-id',
  'df2fb0dd-4e91-44a3-9648-1b3fe886f39d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 23 Aug 2019 07:10:24 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654446071202001/blob156654446188307738')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:24 GMT',
  'ETag',
  '"0x8D72798F83874B0"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'a3c63ed7-201f-0001-4c81-59cde7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '69d8a3f1-878c-46d4-ac58-868bd9e205df',
  'Date',
  'Fri, 23 Aug 2019 07:10:25 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654446071202001/blob156654446188307738')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:24 GMT',
  'ETag',
  '"0x8D72798F83874B0"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rw-rw-rw-',
  'x-ms-acl',
  'user::rw-,group::rw-,other::rw-',
  'x-ms-request-id',
  'f8de5350-e01f-000e-3481-59bb8b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'e8ece4c7-0efb-4917-aaee-a06ae5e674bc',
  'Date',
  'Fri, 23 Aug 2019 07:10:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654446071202001')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'eca949b7-401e-0028-3d81-59f393000000',
  'x-ms-client-request-id',
  'd0b2fabe-166e-447a-9106-db6314f6ed7f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:28 GMT',
  'Connection',
  'close' ]);


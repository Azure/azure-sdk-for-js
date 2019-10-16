let nock = require('nock');

module.exports.testInfo = {"container":"container157113270743906133","directory":"directory157113270861700167"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113270743906133')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:40:13 GMT',
  'ETag',
  '"0x8D75153ADEE576C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c384bb0e-b01e-0016-783c-838400000000',
  'x-ms-client-request-id',
  'cc7ef439-4bbf-4484-aaef-23ea10001b8c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113270743906133/directory157113270861700167')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:15 GMT',
  'ETag',
  '"0x8D75153AEA0E4A9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1bc49ab2-e01f-004a-383c-8375f9000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0b737bfe-66da-4b37-8851-4b35a7b37685',
  'Date',
  'Tue, 15 Oct 2019 09:40:14 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113270743906133/directory157113270861700167')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:15 GMT',
  'ETag',
  '"0x8D75153AEA0E4A9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  '89e56b75-301f-002e-463c-83c559000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'bf6e2987-481e-4a37-82e7-9be3ca006af2',
  'Date',
  'Tue, 15 Oct 2019 09:40:16 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113270743906133/directory157113270861700167')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:15 GMT',
  'ETag',
  '"0x8D75153AEA0E4A9"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '8cff3b23-301f-0061-6b3c-830141000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '6f0616be-4424-46f2-a57e-863229464d55',
  'Date',
  'Tue, 15 Oct 2019 09:40:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container157113270743906133/directory157113270861700167')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:15 GMT',
  'ETag',
  '"0x8D75153AEA0E4A9"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'fd3644df-401f-0065-1a3c-83f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f8d56ee7-8418-4f70-99b2-ab4000d69d22',
  'Date',
  'Tue, 15 Oct 2019 09:40:17 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113270743906133/directory157113270861700167')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 15 Oct 2019 09:40:15 GMT',
  'ETag',
  '"0x8D75153AEA0E4A9"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '7f43ac99-801f-001e-743c-839f73000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '25329d43-6ee8-4be9-a1ff-38a0e12d8a88',
  'Date',
  'Tue, 15 Oct 2019 09:40:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113270743906133')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cc2c0644-b01e-009e-263c-833cd9000000',
  'x-ms-client-request-id',
  '2e303103-166d-4673-b029-30d6822173f7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:40:20 GMT',
  'Connection',
  'close' ]);


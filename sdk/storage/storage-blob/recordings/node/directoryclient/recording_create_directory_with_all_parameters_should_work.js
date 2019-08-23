let nock = require('nock');

module.exports.testInfo = {"container":"container156654448224700379","directory":"directory156654448343306958"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654448224700379')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:45 GMT',
  'ETag',
  '"0x8D72799043D04D7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39f35a45-301e-001d-2881-599f87000000',
  'x-ms-client-request-id',
  '110cde1a-0550-4343-8010-45ae6293fb48',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654448224700379/directory156654448343306958')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:46 GMT',
  'ETag',
  '"0x8D7279904F3E0FF"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9caeb785-d01f-002a-2181-594d2b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '7279da41-790b-4d63-9da4-ff3b7b73f2b4',
  'Date',
  'Fri, 23 Aug 2019 07:10:45 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654448224700379/directory156654448343306958')
  .reply(200, [], [ 'Cache-Control',
  'cacheControl',
  'Content-Length',
  '0',
  'Content-Type',
  'contentType',
  'Content-Encoding',
  'contentEncoding',
  'Content-Language',
  'contentLanguage',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:10:46 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7279904F3E0FF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a9381ab-701e-001c-1381-59c05b000000',
  'x-ms-client-request-id',
  '92c65b9c-1ef1-4016-8421-5e58e4c9cdf0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-hdi_isfolder',
  'true',
  'x-ms-meta-prop1',
  'val1',
  'x-ms-meta-prop2',
  'val2',
  'x-ms-creation-time',
  'Fri, 23 Aug 2019 07:10:46 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-hdi_isfolder,x-ms-meta-prop1,x-ms-meta-prop2,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 23 Aug 2019 07:10:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654448224700379/directory156654448343306958')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:10:46 GMT',
  'ETag',
  '"0x8D7279904F3E0FF"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  'rwx-w----',
  'x-ms-acl',
  'user::rwx,group::-w-,other::---',
  'x-ms-request-id',
  '71f375f1-701f-0023-6c81-5908f8000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '389ffc83-ffd3-4645-8c65-685715eadc57',
  'Date',
  'Fri, 23 Aug 2019 07:10:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654448224700379')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5d556a5a-301e-0032-0681-59924c000000',
  'x-ms-client-request-id',
  'e8577eb6-a06c-4cca-8911-909d9f67cfb4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:10:49 GMT',
  'Connection',
  'close' ]);


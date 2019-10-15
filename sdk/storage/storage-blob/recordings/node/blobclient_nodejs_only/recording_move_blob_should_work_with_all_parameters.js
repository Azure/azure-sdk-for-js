let nock = require('nock');

module.exports.testInfo = {"container":"container156654454311506542","blob":"blob156654454428903708","blob_move":"blob_move156654454695701722"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654454311506542')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:45 GMT',
  'ETag',
  '"0x8D727992885564E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2309fad8-c01e-0026-0982-59da23000000',
  'x-ms-client-request-id',
  'e0a37ec1-6732-4065-9dec-1c11a1afc7bb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654454311506542/blob156654454428903708', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:47 GMT',
  'ETag',
  '"0x8D727992971B6C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '494e6897-d01e-002a-7f82-594d2b000000',
  'x-ms-client-request-id',
  '22a4476f-d49a-47de-857c-15a3a733782f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 23 Aug 2019 07:11:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/container156654454311506542/blob156654454428903708')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:47 GMT',
  'ETag',
  '"0x8D727992971B6C5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-namespace-enabled',
  'true',
  'x-ms-request-id',
  'dd0f7783-e01f-0021-3b82-59b640000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '94d2c6d1-d80d-475b-8d4d-69fd42ade20f',
  'Date',
  'Fri, 23 Aug 2019 07:11:47 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654454311506542/blob_move156654454695701722')
  .query(true)
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f8de5373-e01f-000e-4882-59bb8b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd67505de-3192-48e4-9d73-05f5c0876238',
  'Date',
  'Fri, 23 Aug 2019 07:11:49 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654454311506542/blob_move156654454695701722')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Fri, 23 Aug 2019 07:11:47 GMT',
  'ETag',
  '"0x8D727992971B6C5"',
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
  'dd0f7784-e01f-0021-3c82-59b640000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '35c5c597-93e5-42b5-930c-7f00d11d32a7',
  'Date',
  'Fri, 23 Aug 2019 07:11:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654454311506542/blob_move156654454695701722')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:47 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D727992971B6C5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6cef0d3c-f01e-002d-6682-592148000000',
  'x-ms-client-request-id',
  '7a235f5b-34de-4f96-921b-a4894f52d225',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Fri, 23 Aug 2019 07:11:47 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 23 Aug 2019 07:11:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654454311506542')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ec7414c-f01e-0002-7782-592c83000000',
  'x-ms-client-request-id',
  'd253abaf-e8b2-4bc6-a43f-a49c7e625327',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:12:13 GMT',
  'Connection',
  'close' ]);


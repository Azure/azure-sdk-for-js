let nock = require('nock');

module.exports.testInfo = {"container":"container156654453699306685","blob":"blob156654453818104643","blob_move":"blob_move156654453935304263"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654453699306685')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:39 GMT',
  'ETag',
  '"0x8D7279924DFE0F2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c7335a49-b01e-002c-1c82-597e94000000',
  'x-ms-client-request-id',
  '2ffa4dbc-637c-4b80-a55b-2fb098ba7348',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:39 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654453699306685/blob156654453818104643', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:41 GMT',
  'ETag',
  '"0x8D7279925991845"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd7152fa-201e-0001-1082-59cde7000000',
  'x-ms-client-request-id',
  '8838463c-dc10-440c-8560-a3e9341c4a76',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 23 Aug 2019 07:11:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156654453699306685/blob_move156654453935304263')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b5190589-f01f-003d-1982-59e420000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f0749e1d-ae61-4d08-b7e3-8c2b5a948a00',
  'Date',
  'Fri, 23 Aug 2019 07:11:41 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156654453699306685/blob_move156654453935304263')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 23 Aug 2019 07:11:41 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7279925991845"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28b5fa0d-a01e-0030-6782-592cf4000000',
  'x-ms-client-request-id',
  '35069cf8-b67f-4732-a916-e1b3874e91be',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Fri, 23 Aug 2019 07:11:41 GMT',
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
  'Fri, 23 Aug 2019 07:11:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156654453699306685')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dd71544d-201e-0001-5f82-59cde7000000',
  'x-ms-client-request-id',
  'f401cb12-05d8-4cba-92f5-fdd473af565c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 23 Aug 2019 07:11:44 GMT',
  'Connection',
  'close' ]);


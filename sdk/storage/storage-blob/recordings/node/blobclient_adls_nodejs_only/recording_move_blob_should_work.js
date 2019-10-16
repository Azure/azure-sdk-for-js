let nock = require('nock');

module.exports.testInfo = {"container":"container157113288953809409","blob":"blob157113289091806074","blob_move":"blob_move157113289206805876"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113288953809409')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:16 GMT',
  'ETag',
  '"0x8D751541A917549"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c14ce6d0-101e-0093-073c-83d3d5000000',
  'x-ms-client-request-id',
  '07860547-3a37-4fdf-a187-ad5ed876a87d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:15 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113288953809409/blob157113289091806074', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:17 GMT',
  'ETag',
  '"0x8D751541B4AA614"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0883782f-b01e-0059-023c-834018000000',
  'x-ms-client-request-id',
  '6cdceca5-330f-4233-855c-e9743b010a87',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 15 Oct 2019 09:43:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157113288953809409/blob_move157113289206805876')
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f666096-e01f-002c-023c-83c7a3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4978c594-a911-4684-a8f0-e6c92127fd69',
  'Date',
  'Tue, 15 Oct 2019 09:43:18 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container157113288953809409/blob_move157113289206805876')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 15 Oct 2019 09:43:17 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D751541B4AA614"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7bea462a-801e-005a-1c3c-83431f000000',
  'x-ms-client-request-id',
  'e0d9b441-17cc-4280-bccb-c7d6a2f99298',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 15 Oct 2019 09:43:17 GMT',
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
  'Tue, 15 Oct 2019 09:43:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157113288953809409')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bef3f26a-a01e-00a8-683c-83918b000000',
  'x-ms-client-request-id',
  'ccccdfce-892f-4db0-a55f-796e780c7231',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 15 Oct 2019 09:43:21 GMT',
  'Connection',
  'close' ]);


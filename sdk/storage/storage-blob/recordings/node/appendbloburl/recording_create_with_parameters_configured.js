let nock = require('nock');

module.exports.testInfo = {"container":"container156776184938102313","blob":"blob156776184978105060"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776184938102313')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:09 GMT',
  'ETag',
  '"0x8D732ABF9218F84"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '707531e0-001e-011a-5f94-646851000000',
  'x-ms-client-request-id',
  'b1cf3bbf-77e2-4ecb-b56c-93a544f2435b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:08 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776184938102313/blob156776184978105060')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:10 GMT',
  'ETag',
  '"0x8D732ABF95E9098"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd40599f7-001e-00ac-2294-64e42a000000',
  'x-ms-client-request-id',
  '503df0bf-793c-4813-949e-817b078d065c',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:24:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156776184938102313/blob156776184978105060')
  .reply(200, [], [ 'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '0',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:24:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732ABF95E9098"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25276ae8-101e-008f-6e94-647ee9000000',
  'x-ms-client-request-id',
  '1c233e7d-968f-4cb0-829f-b8b4bbccc9ac',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-meta-key1',
  'vala',
  'x-ms-meta-key2',
  'valb',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:24:10 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '0',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,x-ms-meta-key1,x-ms-meta-key2,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:24:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776184938102313')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9a567e40-201e-002d-7894-6444f0000000',
  'x-ms-client-request-id',
  'b20f493f-576c-4d9e-ba44-42517742e1c6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:24:09 GMT',
  'Connection',
  'close' ]);


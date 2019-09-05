let nock = require('nock');

module.exports.testInfo = {"container":"container156776209772101542","blob":"blob156776209812308561","blockblob":"blockblob156776209853004611","undefined":"2019-09-06T09:28:18.929Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209772101542')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'ETag',
  '"0x8D732AC8D279D08"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '40bdd63f-e01e-008b-3795-64f3ee000000',
  'x-ms-client-request-id',
  '24c9a0ec-da2a-4f56-9b54-7a41f1816f6f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209772101542/blob156776209812308561')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'ETag',
  '"0x8D732AC8D65A48E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '147fa30d-b01e-003f-3d95-643f20000000',
  'x-ms-client-request-id',
  '1d341cfd-edad-43ca-98bf-02d2a78fcfd0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209772101542/blockblob156776209853004611', "Hello World!")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'ETag',
  '"0x8D732AC8DA29556"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '252830b4-101e-008f-0c95-647ee9000000',
  'x-ms-client-request-id',
  '6db5a17e-875c-481a-886a-f94b0c57ed17',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209772101542/blob156776209812308561', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:19 GMT',
  'ETag',
  '"0x8D732AC8DE049AB"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '14852631-c01e-0035-5895-649b97000000',
  'x-ms-client-request-id',
  '27ac253e-7030-4959-93cb-312303fad2a0',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-blob-append-offset',
  '0',
  'x-ms-blob-committed-block-count',
  '1',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776209772101542/blob156776209812308561')
  .query(true)
  .reply(201, "", [ 'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:19 GMT',
  'ETag',
  '"0x8D732AC8E2579D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-blob-append-offset',
  '12',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'x-ms-request-id',
  'fdf63964-f01e-0153-7095-642aba000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'f5efe3f3-2e5e-4d12-bbc4-19166447bf06',
  'Date',
  'Fri, 06 Sep 2019 09:28:19 GMT',
  'Connection',
  'close',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776209772101542/blob156776209812308561')
  .reply(200, "Hello World!Hello World!", [ 'Content-Length',
  '24',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC8E2579D3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '84944ff1-301e-007c-7795-64d97c000000',
  'x-ms-client-request-id',
  'dca6b23c-dead-4b28-83bd-8fc9cd6b4542',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:28:18 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'AppendBlob',
  'x-ms-blob-committed-block-count',
  '2',
  'x-ms-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:28:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776209772101542')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e08c035c-c01e-009c-1d95-645ae5000000',
  'x-ms-client-request-id',
  'ba7ed3dc-f495-49c6-9aeb-05cb33d13a59',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:20 GMT',
  'Connection',
  'close' ]);


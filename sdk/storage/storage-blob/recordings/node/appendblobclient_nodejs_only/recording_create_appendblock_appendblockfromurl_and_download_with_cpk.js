let nock = require('nock');

module.exports.testInfo = {"container":"container156816860289804680","blob":"blob156816860330501485","blockblob":"blockblob156816860371509247","undefined":"2019-09-11T02:23:24.123Z"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816860289804680')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:23 GMT',
  'ETag',
  '"0x8D7365F052567F7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd1812c8b-801e-000a-2547-687f75000000',
  'x-ms-client-request-id',
  '011cf8ef-3d39-49bc-a17e-6dfa1de5d088',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:22 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816860289804680/blob156816860330501485')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:23 GMT',
  'ETag',
  '"0x8D7365F05640DC1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b919056-e01e-001a-1d47-684993000000',
  'x-ms-client-request-id',
  '784095da-4dd2-4611-bd23-a6be42b3e5bc',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Wed, 11 Sep 2019 02:23:23 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816860289804680/blockblob156816860371509247', "Hello World!")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:24 GMT',
  'ETag',
  '"0x8D7365F05A23370"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8eac9f83-201e-002e-6f47-68e63b000000',
  'x-ms-client-request-id',
  '442a850c-5a9a-4df4-a0f0-f7755bdd4570',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'peH8Xsgc5QI=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:23:23 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816860289804680/blob156816860330501485', "Hello World!")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:24 GMT',
  'ETag',
  '"0x8D7365F05E1B8DF"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f35a65b-601e-0044-2c47-68ba90000000',
  'x-ms-client-request-id',
  '35b1fede-a49f-42bf-a244-93fdbce1b5d9',
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
  'Wed, 11 Sep 2019 02:23:23 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816860289804680/blob156816860330501485')
  .query(true)
  .reply(201, "", [ 'Content-MD5',
  '7Qdih1MuhjZehB6Sv8UNjA==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:24 GMT',
  'ETag',
  '"0x8D7365F06303525"',
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
  '05577564-a01e-0059-3847-68637a000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '1bef00b9-96c7-4cbf-82de-cdf323df3f3e',
  'Date',
  'Wed, 11 Sep 2019 02:23:24 GMT',
  'Content-Length',
  '0' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816860289804680/blob156816860330501485')
  .reply(200, "Hello World!Hello World!", [ 'Content-Length',
  '24',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:23:24 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365F06303525"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cad13fa-101e-004b-4247-685766000000',
  'x-ms-client-request-id',
  'b7bc9734-7e14-4382-b3c6-e1b40e8e17bf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:23:23 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-blob-committed-block-count,x-ms-server-encrypted,x-ms-encryption-key-sha256,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:23:25 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816860289804680')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf96886-501e-0047-3947-68b997000000',
  'x-ms-client-request-id',
  '8e051d51-3bda-435b-b206-5829badd88f4',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:23:25 GMT' ]);


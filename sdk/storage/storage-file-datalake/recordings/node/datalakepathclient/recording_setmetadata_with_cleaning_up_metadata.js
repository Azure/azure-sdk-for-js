let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534384929004037","file":"file157534385042507240"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384929004037')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:51 GMT',
  'ETag',
  '"0x8D777A05C130B35"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f53ccc9-201e-005c-7989-a9b467000000',
  'x-ms-client-request-id',
  'e8e50f80-a0e0-44b7-a3f6-03edad4a7438',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:51 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384929004037/file157534385042507240')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:53 GMT',
  'ETag',
  '"0x8D777A05CD7AA71"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e18b85f-001f-0062-0989-a90246000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '2838dc16-56a6-4072-8e8f-a19bf9d94d2c',
  'Date',
  'Tue, 03 Dec 2019 03:24:52 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534384929004037/file157534385042507240', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e18b860-001f-0062-0a89-a90246000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3e2cd8c3-0127-4394-958e-41bfec844cf8',
  'Date',
  'Tue, 03 Dec 2019 03:24:52 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534384929004037/file157534385042507240')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:24:53 GMT',
  'ETag',
  '"0x8D777A05D302687"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '0e18b862-001f-0062-0b89-a90246000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '561a588b-1e9d-4cc9-ad8d-63beceaa0865',
  'Date',
  'Tue, 03 Dec 2019 03:24:53 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384929004037/file157534385042507240')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:54 GMT',
  'ETag',
  '"0x8D777A05DDCE7E3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb638af-d01e-008e-2389-a90a3f000000',
  'x-ms-client-request-id',
  '3201e5fe-bb69-421d-b15f-bdd40bf05ebb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 03 Dec 2019 03:24:54 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534384929004037/file157534385042507240')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A05DDCE7E3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb6397c-d01e-008e-5a89-a90a3f000000',
  'x-ms-client-request-id',
  '3c684363-32b8-4ca4-8238-67e4eed15811',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'a',
  'x-ms-meta-b',
  'b',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:53 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:24:54 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534384929004037/file157534385042507240')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:55 GMT',
  'ETag',
  '"0x8D777A05E34E7A4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb63a05-d01e-008e-5589-a90a3f000000',
  'x-ms-client-request-id',
  'c3446842-a44a-449f-9262-85dd9231441b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 03 Dec 2019 03:24:54 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534384929004037/file157534385042507240')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:24:55 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A05E34E7A4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb63a9d-d01e-008e-5989-a90a3f000000',
  'x-ms-client-request-id',
  '8fd0b932-0ce0-4973-823d-561a47e7c627',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:24:53 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:24:55 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534384929004037')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f53d841-201e-005c-2489-a9b467000000',
  'x-ms-client-request-id',
  'c64546e7-7248-4622-87af-6351578fe52f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:24:55 GMT' ]);

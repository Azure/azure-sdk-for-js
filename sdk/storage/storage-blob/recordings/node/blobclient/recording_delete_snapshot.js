let nock = require('nock');

module.exports.testInfo = {"container":"container156816830699007626","blob":"blob156816830740709825"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816830699007626')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:27 GMT',
  'ETag',
  '"0x8D7365E54C73878"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1ab468b1-a01e-003f-7147-68d120000000',
  'x-ms-client-request-id',
  'd37ce78a-f261-435a-8fc9-eacecd99eb19',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816830699007626/blob156816830740709825', "Hello World")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:27 GMT',
  'ETag',
  '"0x8D7365E550842C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b62e85c-801e-0001-6747-686701000000',
  'x-ms-client-request-id',
  '3b57baa3-ac09-4781-a04b-2f7f04ae4fe4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:26 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156816830699007626/blob156816830740709825')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:27 GMT',
  'ETag',
  '"0x8D7365E550842C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49227429-901e-0015-7a47-68a465000000',
  'x-ms-client-request-id',
  'a158121c-1f31-4c3c-8419-a0ca4c3ab217',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-11T02:18:28.1807935Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:18:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container156816830699007626/blob156816830740709825')
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E550842C4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f194ba7e-301e-0057-0847-688f71000000',
  'x-ms-client-request-id',
  'dc46702b-ea94-4517-b9a4-c2a02983fa74',
  'x-ms-version',
  '2019-02-02',
  'x-ms-snapshot',
  '2019-09-11T02:18:28.1807935Z',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Wed, 11 Sep 2019 02:18:27 GMT',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-snapshot,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:27 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816830699007626/blob156816830740709825')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0188a6d2-d01e-0019-6d47-684a94000000',
  'x-ms-client-request-id',
  '52744197-7462-47bc-84d9-f2d1599c5545',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:18:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816830699007626/blob156816830740709825')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '66b0912f-f01e-004a-7847-68569b000000',
  'x-ms-client-request-id',
  'fd836213-9ac3-463b-9257-c0d0099ac627',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 11 Sep 2019 02:18:28 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156816830699007626')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container156816830699007626\"><Blobs /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'be43ac1d-201e-0007-3c47-689079000000',
  'x-ms-client-request-id',
  '9da5858c-1cf8-4898-8310-622d0eef5358',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:18:29 GMT' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156816830699007626')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9bf7f967-501e-0047-0847-68b997000000',
  'x-ms-client-request-id',
  '06627d00-2545-4771-bb56-55500fea4663',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:30 GMT' ]);


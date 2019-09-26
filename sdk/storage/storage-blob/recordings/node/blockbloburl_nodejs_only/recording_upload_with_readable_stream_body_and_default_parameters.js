let nock = require('nock');

module.exports.testInfo = {"container":"container156776210304003896","blob":"blob156776210343704276","randomstring":"randomstring156776210343709426"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776210304003896')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'ETag',
  '"0x8D732AC90527B51"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e2fd22b7-901e-0137-3b95-64db22000000',
  'x-ms-client-request-id',
  'f4c9f182-79b4-4997-abbc-c29978a5b6c5',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:22 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776210304003896/blob156776210343704276', "randomstring156776210343709426")
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'yvSxLQHQ16LLB+84MmBCzw==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'ETag',
  '"0x8D732AC908F2138"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdf2e9c2-f01e-00b8-4e95-64ac45000000',
  'x-ms-client-request-id',
  'f9d792cc-96e6-419d-b440-2df6c3ae49b8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'XnJHQhbSqh8=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776210304003896/blob156776210343704276')
  .reply(200, "randomstring156776210343709426", [ 'Content-Length',
  '30',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'yvSxLQHQ16LLB+84MmBCzw==',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D732AC908F2138"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1c9c3934-901e-0075-6095-649caf000000',
  'x-ms-client-request-id',
  '438b1c0a-40d4-4707-b067-efd48664aed3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-tag-count',
  '0',
  'x-ms-creation-time',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776210304003896')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8392c4b-c01e-0047-6d95-649cd8000000',
  'x-ms-client-request-id',
  'fcd2ec6c-618c-452a-a169-af1b7062b7ca',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:23 GMT',
  'Connection',
  'close' ]);


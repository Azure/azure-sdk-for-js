let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534405709907645","file":"file157534405823601937","destfilesystem":"destfilesystem157534405995609393","destfile":"destfile157534406110101314"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534405709907645')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:19 GMT',
  'ETag',
  '"0x8D777A0D7EF6727"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '545ddc6f-501e-0094-0389-a92550000000',
  'x-ms-client-request-id',
  '3625bc20-05e5-40bb-b2a9-9814ff8f0d89',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:18 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534405709907645/file157534405823601937')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:20 GMT',
  'ETag',
  '"0x8D777A0D89F107C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f061c761-401f-0065-4a89-a9f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'cbf87ed6-3259-482c-b8b0-ebcefa66ef09',
  'Date',
  'Tue, 03 Dec 2019 03:28:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534405709907645/file157534405823601937', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f061c762-401f-0065-4b89-a9f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '61c92eb5-6402-42f0-85b8-f16adccfc5df',
  'Date',
  'Tue, 03 Dec 2019 03:28:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534405709907645/file157534405823601937')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:28:21 GMT',
  'ETag',
  '"0x8D777A0D8F87B61"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  'f061c763-401f-0065-4c89-a9f4c3000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4bdc585a-a305-4a9a-87e0-46ad39e68feb',
  'Date',
  'Tue, 03 Dec 2019 03:28:20 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/destfilesystem157534405995609393')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:22 GMT',
  'ETag',
  '"0x8D777A0D9A5272E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2797d14b-901e-006c-7189-a9ee4d000000',
  'x-ms-client-request-id',
  '669682e3-e608-42f5-96c8-775ed706f422',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:21 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/destfilesystem157534405995609393/destfile157534406110101314')
  .query(true)
  .reply(201, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5e79ffff-201f-0075-2d89-a9c225000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '9894b7e8-a252-4a6c-862a-9d16d63956ce',
  'Date',
  'Tue, 03 Dec 2019 03:28:22 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/destfilesystem157534405995609393/destfile157534406110101314')
  .reply(200, "", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:28:21 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0D8F87B61"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f4e2a6b5-f01e-001a-2389-a96af1000000',
  'x-ms-client-request-id',
  '32ede787-2a2d-4cf1-bb20-fe1a52eb953e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:28:20 GMT',
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
  'Tue, 03 Dec 2019 03:28:24 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/destfilesystem157534405995609393')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2797d7b0-901e-006c-0789-a9ee4d000000',
  'x-ms-client-request-id',
  '99fe4931-a681-45e1-be77-fc627232b2f8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:24 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534405709907645')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '545dea52-501e-0094-5789-a92550000000',
  'x-ms-client-request-id',
  '71b4083c-5e23-4303-b6a1-13efc270478a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:28:24 GMT' ]);

let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534395219604425","Upper blob empty another":"Upper blob empty another157534395333807511"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534395219604425')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:34 GMT',
  'ETag',
  '"0x8D777A0996A3AC4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '92af20fe-801e-003c-1989-a9f145000000',
  'x-ms-client-request-id',
  'e891db33-5f39-4400-ae26-bafd19829af3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:34 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534395219604425/Upper%20blob%20empty%20another157534395333807511')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:35 GMT',
  'ETag',
  '"0x8D777A09A1797F3"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29bbd6fc-901f-0001-3989-a94463000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '23467d4c-ac4c-4196-85cf-91983840faf1',
  'Date',
  'Tue, 03 Dec 2019 03:26:35 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534395219604425/Upper%20blob%20empty%20another157534395333807511')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:35 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A09A1797F3"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4f6a9990-d01e-006b-4089-a918c8000000',
  'x-ms-client-request-id',
  'cd272f28-b3b9-4d6c-9194-430087414e81',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:26:35 GMT',
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
  'Tue, 03 Dec 2019 03:26:36 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534395219604425')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A09A1797F3","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:35 GMT","name":"Upper blob empty another157534395333807511","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c35c693-f01f-0038-3189-a904c7000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '47e65cc9-33d9-4012-9472-15dbdecc48f4',
  'Date',
  'Tue, 03 Dec 2019 03:26:37 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534395219604425')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '92af2a44-801e-003c-2689-a9f145000000',
  'x-ms-client-request-id',
  '5e7f91e2-9e2f-47b9-9242-54998074ed3e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:38 GMT' ]);

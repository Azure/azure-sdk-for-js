let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534395702504550","Upper blob empty another 汉字":"Upper blob empty another 汉字157534395819009793"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534395702504550')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:39 GMT',
  'ETag',
  '"0x8D777A09C4AD640"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5abb8f7a-401e-0021-0a89-a928af000000',
  'x-ms-client-request-id',
  '6ff3ff3d-4d90-476e-b627-21e160cd502b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:39 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534395702504550/Upper%20blob%20empty%20another%20%E6%B1%89%E5%AD%97157534395819009793')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:26:40 GMT',
  'ETag',
  '"0x8D777A09CFE45E1"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '340c8811-601f-005b-6589-a942e2000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '755e0763-7665-4a31-bb9d-8f40e8310a4b',
  'Date',
  'Tue, 03 Dec 2019 03:26:40 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534395702504550/Upper%20blob%20empty%20another%20%E6%B1%89%E5%AD%97157534395819009793')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:26:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A09CFE45E1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7be11ae9-a01e-006f-3e89-a9ed4a000000',
  'x-ms-client-request-id',
  '2c891aaf-be2c-4a24-abab-1d9862975778',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:26:40 GMT',
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
  'Tue, 03 Dec 2019 03:26:41 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534395702504550')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A09CFE45E1","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:26:40 GMT","name":"Upper blob empty another 汉字157534395819009793","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b07177b-901f-004e-6889-a9807b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'ecf87bb9-f1a0-4a40-8dcd-f718d68ffdb7',
  'Date',
  'Tue, 03 Dec 2019 03:26:42 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534395702504550')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5abb9764-401e-0021-3e89-a928af000000',
  'x-ms-client-request-id',
  '1958bf4a-76f9-4b44-b868-585a4c955957',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:26:43 GMT' ]);

let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash157534401098306165","にっぽんごにほんご":"にっぽんごにほんご157534401232006629"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534401098306165')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:33 GMT',
  'ETag',
  '"0x8D777A0BC8CCCE7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5dc7187-501e-009f-4189-a93d24000000',
  'x-ms-client-request-id',
  'f9c8dce6-7c5e-4ed3-8f7e-acdd5b6ad395',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:32 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash157534401098306165/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94157534401232006629')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:27:34 GMT',
  'ETag',
  '"0x8D777A0BD40A03B"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '72c8802d-f01f-0011-2589-a97285000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'aa7cf163-68f0-449f-bc85-dea8cf31c3ce',
  'Date',
  'Tue, 03 Dec 2019 03:27:34 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash157534401098306165/%E3%81%AB%E3%81%A3%E3%81%BD%E3%82%93%E3%81%94%E3%81%AB%E3%81%BB%E3%82%93%E3%81%94157534401232006629')
  .reply(200, "", [ 'Content-Length',
  '0',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:27:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A0BD40A03B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7b955e95-501e-0058-3989-a941e5000000',
  'x-ms-client-request-id',
  '9ff5eb9c-2b69-4542-9782-42996a48dfe5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:27:34 GMT',
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
  'Tue, 03 Dec 2019 03:27:35 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash157534401098306165')
  .query(true)
  .reply(200, {"paths":[{"contentLength":"0","etag":"0x8D777A0BD40A03B","group":"$superuser","lastModified":"Tue, 03 Dec 2019 03:27:34 GMT","name":"にっぽんごにほんご157534401232006629","owner":"$superuser","permissions":"rw-r-----"}]}, [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/json;charset=utf-8',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a7a7a248-201f-0018-6d89-a9680b000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4a2333fb-f359-4c40-901f-9de015887193',
  'Date',
  'Tue, 03 Dec 2019 03:27:37 GMT' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash157534401098306165')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5dc7b1f-501e-009f-2e89-a93d24000000',
  'x-ms-client-request-id',
  '07531833-c3dd-4869-baf5-0c2df0286756',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:27:36 GMT' ]);

let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem157534388183106353","file":"file157534388298501530","tempfile2":"tempfile2157534388470109987"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534388183106353')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:24 GMT',
  'ETag',
  '"0x8D777A06F79E366"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a20cba6-d01e-0042-0889-a96e8a000000',
  'x-ms-client-request-id',
  '3b51bb8a-c95d-4ae5-b03d-4b9550f1c8cc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:24 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534388183106353/file157534388298501530')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:25 GMT',
  'ETag',
  '"0x8D777A0702A393A"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '43f07d92-c01f-0030-5489-a91fb4000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'd610717f-c476-487f-b53b-a87a39e01b5b',
  'Date',
  'Tue, 03 Dec 2019 03:25:25 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534388183106353/file157534388298501530', "Hello World")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '43f07d93-c01f-0030-5589-a91fb4000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '8d3b6d67-7b22-406a-bc18-0028b763d165',
  'Date',
  'Tue, 03 Dec 2019 03:25:25 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534388183106353/file157534388298501530')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:26 GMT',
  'ETag',
  '"0x8D777A070823F07"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '43f07d94-c01f-0030-5689-a91fb4000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3ff0e954-1c68-4a92-9519-c599cba7e363',
  'Date',
  'Tue, 03 Dec 2019 03:25:25 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem157534388183106353/tempfile2157534388470109987')
  .query(true)
  .reply(201, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:27 GMT',
  'ETag',
  '"0x8D777A07131A70C"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1abf03e3-301f-002e-4089-a9c559000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  'c9263d84-a395-420a-b220-c51c1bfabec7',
  'Date',
  'Tue, 03 Dec 2019 03:25:27 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534388183106353/tempfile2157534388470109987')
  .reply(200, [], [ 'Cache-Control',
  'cacheControl',
  'Content-Length',
  '0',
  'Content-Type',
  'contentType',
  'Content-Encoding',
  'contentEncoding',
  'Content-Language',
  'contentLanguage',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:27 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A07131A70C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '967ed2b2-a01e-0020-6b89-a92952000000',
  'x-ms-client-request-id',
  '4c78189d-460f-4f13-95ae-f927da00c1fd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'val-a',
  'x-ms-meta-b',
  'val-b',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:25:27 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:25:28 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534388183106353/tempfile2157534388470109987')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:27 GMT',
  'ETag',
  '"0x8D777A07131A70C"',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-owner',
  '$superuser',
  'x-ms-group',
  '$superuser',
  'x-ms-permissions',
  '---------',
  'x-ms-acl',
  'user::---,group::---,other::---',
  'x-ms-request-id',
  '1abf03e4-301f-002e-4189-a9c559000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '3b084a89-1c0a-4509-8c48-0aab063f4e15',
  'Date',
  'Tue, 03 Dec 2019 03:25:28 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534388183106353/tempfile2157534388470109987', "HelloWorld")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '29bbca6d-901f-0001-4789-a94463000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '614df2f0-5aac-4939-8d40-0cff796fe68b',
  'Date',
  'Tue, 03 Dec 2019 03:25:29 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534388183106353/tempfile2157534388470109987', "HelloWorld")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '29bbca7f-901f-0001-5989-a94463000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '0bf78d71-75d6-4096-86a3-171d5cb67c2e',
  'Date',
  'Tue, 03 Dec 2019 03:25:29 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534388183106353/tempfile2157534388470109987', "HelloWorld")
  .query(true)
  .reply(202, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '29bbca91-901f-0001-6b89-a94463000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '19a4c5e7-6386-43f2-9da4-e15c2459b9f5',
  'Date',
  'Tue, 03 Dec 2019 03:25:29 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .patch('/filesystem157534388183106353/tempfile2157534388470109987')
  .query(true)
  .reply(200, "", [ 'Last-Modified',
  'Tue, 03 Dec 2019 03:25:31 GMT',
  'ETag',
  '"0x8D777A073684AA5"',
  'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-request-id',
  '29bbcaa8-901f-0001-0189-a94463000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '471ed375-2516-406e-aeda-e3d6eea9fa2d',
  'Date',
  'Tue, 03 Dec 2019 03:25:30 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/filesystem157534388183106353/tempfile2157534388470109987')
  .reply(200, [], [ 'Cache-Control',
  'cacheControl2',
  'Content-Length',
  '30',
  'Content-Type',
  'contentType2',
  'Content-Encoding',
  'contentEncoding2',
  'Content-Language',
  'contentLanguage2',
  'Last-Modified',
  'Tue, 03 Dec 2019 03:25:31 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D777A073684AA5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '967ed8ab-a01e-0020-7c89-a92952000000',
  'x-ms-client-request-id',
  '75fc2d79-c7f2-43bf-8921-eca520ff694a',
  'x-ms-version',
  '2019-02-02',
  'x-ms-meta-a',
  'val-a',
  'x-ms-meta-b',
  'val-b',
  'x-ms-creation-time',
  'Tue, 03 Dec 2019 03:25:27 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'contentDisposition2',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-meta-a,x-ms-meta-b,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 03 Dec 2019 03:25:31 GMT' ]);

nock('https://fakestorageaccount.dfs.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534388183106353/tempfile2157534388470109987')
  .reply(200, "", [ 'Server',
  'Windows-Azure-HDFS/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29bbcac7-901f-0001-2089-a94463000000',
  'x-ms-version',
  '2019-02-02',
  'x-ms-client-request-id',
  '4a155347-634a-494a-a738-5e6b197bf33d',
  'Date',
  'Tue, 03 Dec 2019 03:25:30 GMT',
  'Content-Length',
  '0' ]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem157534388183106353')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5a20dbdf-d01e-0042-3789-a96e8a000000',
  'x-ms-client-request-id',
  '6050a500-264c-4d36-a9bc-ea0e4bb1070a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Tue, 03 Dec 2019 03:25:31 GMT' ]);

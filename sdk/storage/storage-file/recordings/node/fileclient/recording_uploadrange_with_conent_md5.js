let nock = require('nock');

module.exports.testInfo = {"share":"share156816838929905264","dir":"dir156816838972503331","file":"file156816839015203378"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838929905264')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:49 GMT',
  'ETag',
  '"0x8D7365E85D74B78"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6183dbe-401a-0058-5247-686287000000',
  'x-ms-client-request-id',
  '1f49d889-5108-49ce-9f8f-011b947a64bc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:48 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838929905264/dir156816838972503331')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:50 GMT',
  'ETag',
  '"0x8D7365E86189449"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29a45a4b-d01a-0030-6147-683cd6000000',
  'x-ms-client-request-id',
  '6e187eb6-d30d-4098-ae87-38ca27eb9376',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:50.0798025Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:50.0798025Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:50.0798025Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:49 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838929905264/dir156816838972503331/file156816839015203378')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:50 GMT',
  'ETag',
  '"0x8D7365E865979AA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '661b9a18-201a-0007-0547-689079000000',
  'x-ms-client-request-id',
  '6aaee8ba-96f2-469c-a402-73f50771e6a6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:50.5051050Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:50.5051050Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:50.5051050Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838929905264/dir156816838972503331/file156816839015203378', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:50 GMT',
  'ETag',
  '"0x8D7365E869AFB71"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '333d7c0d-501a-0003-3647-6865fb000000',
  'x-ms-client-request-id',
  '325eecc0-3e75-4213-9841-3b5e3b50cf5e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816838929905264/dir156816838972503331/file156816839015203378', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:51 GMT',
  'ETag',
  '"0x8D7365E86E24A8B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c6b9872-a01a-0052-4047-687b0e000000',
  'x-ms-client-request-id',
  'eb2acca6-c308-4b8c-8f4b-00efccf401eb',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:19:50 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816838929905264/dir156816838972503331/file156816839015203378')
  .reply(206, "HelloWor", [ 'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:51 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E86E24A8B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a01b4101-901a-0051-2f47-687809000000',
  'x-ms-client-request-id',
  '6eee0e10-7176-4f9a-9aae-5359c0a5e3a4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:19:50.5051050Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:50.5051050Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:50.5051050Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:19:51 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816838929905264')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3fa88070-701a-0050-0347-6879f4000000',
  'x-ms-client-request-id',
  '1118b59d-da76-491b-bb3a-3fc87a3b4fff',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:51 GMT' ]);


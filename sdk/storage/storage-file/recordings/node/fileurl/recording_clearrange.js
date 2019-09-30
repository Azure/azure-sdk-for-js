let nock = require('nock');

module.exports.testInfo = {"share":"share156775321658805446","dir":"dir156775321703207574","file":"file156775321752300401"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321658805446')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:16 GMT',
  'ETag',
  '"0x8D73297DF9680D9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6d15a043-701a-006d-5e80-6443c8000000',
  'x-ms-client-request-id',
  '84712b3c-d343-4073-bb7f-8e90c74a493a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321658805446/dir156775321703207574')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:17 GMT',
  'ETag',
  '"0x8D73297DFE303BA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b58d609d-201a-0132-2380-6409f9000000',
  'x-ms-client-request-id',
  'f31fd359-579f-4daa-af68-55de4500364e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:17.3861818Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:17.3861818Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:17.3861818Z',
  'x-ms-file-permission-key',
  '1237041589013461953*8787082347076103240',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321658805446/dir156775321703207574/file156775321752300401')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:17 GMT',
  'ETag',
  '"0x8D73297E0230258"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dbb8e13f-301a-007c-1280-64d97c000000',
  'x-ms-client-request-id',
  'c0771600-8a66-4fcb-912d-50f0d8e46b06',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:17.8055768Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:17.8055768Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:17.8055768Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321658805446/dir156775321703207574/file156775321752300401', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:18 GMT',
  'ETag',
  '"0x8D73297E06152EA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e687e49c-c01a-012a-1e80-64d69e000000',
  'x-ms-client-request-id',
  '864d7bbe-7964-48ab-b49f-ba8b7b097dc9',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321658805446/dir156775321703207574/file156775321752300401', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:18 GMT',
  'ETag',
  '"0x8D73297E09DCE53"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e01c9442-101a-0036-0980-647af3000000',
  'x-ms-client-request-id',
  '7c3418d6-4e81-4b74-be6c-9407822a0f67',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 06 Sep 2019 07:00:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775321658805446/dir156775321703207574/file156775321752300401')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:19 GMT',
  'ETag',
  '"0x8D73297E0DA97E5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27229545-f01a-00b8-2780-64ac45000000',
  'x-ms-client-request-id',
  'aa2acb00-3a9a-49c2-9e6c-f35c3d2bde45',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:18 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775321658805446/dir156775321703207574/file156775321752300401')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [ 'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:19 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D73297E0DA97E5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0b1ba76-e01a-008b-7480-64f3ee000000',
  'x-ms-client-request-id',
  '8368651a-b00a-4d1b-b2d8-a525e6ab3ba8',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-06T07:00:17.8055768Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:17.8055768Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:17.8055768Z',
  'x-ms-file-permission-key',
  '15082859266781889734*8787082347076103240',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:00:19 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775321658805446')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '69947d05-701a-0099-5b80-64883e000000',
  'x-ms-client-request-id',
  '40deb77d-9a00-4fdd-9e4c-6988e0ecac91',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:19 GMT',
  'Connection',
  'close' ]);


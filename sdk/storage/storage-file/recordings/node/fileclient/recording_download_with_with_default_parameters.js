let nock = require('nock');

module.exports.testInfo = {"share":"share156816840153405539","dir":"dir156816840203506929","file":"file156816840245802900"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840153405539')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:01 GMT',
  'ETag',
  '"0x8D7365E8D2CB356"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26c20298-101a-0062-3747-682124000000',
  'x-ms-client-request-id',
  '384168a0-a254-47df-8664-188197b220f1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840153405539/dir156816840203506929')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:02 GMT',
  'ETag',
  '"0x8D7365E8D6E9775"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3b6657d4-c01a-000d-0e47-6889f0000000',
  'x-ms-client-request-id',
  '7abbc38e-8d9c-48ed-b83f-d61846b50e6f',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:02.3875445Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:02.3875445Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:02.3875445Z',
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
  'Wed, 11 Sep 2019 02:20:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840153405539/dir156816840203506929/file156816840245802900')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:02 GMT',
  'ETag',
  '"0x8D7365E8DAEE07E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '322d3650-a01a-001d-5247-68bf16000000',
  'x-ms-client-request-id',
  '311c860c-48f7-42b1-a14b-8e7dec2a8277',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:02.8088446Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:02.8088446Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:02.8088446Z',
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
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840153405539/dir156816840203506929/file156816840245802900', "Hello World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:03 GMT',
  'ETag',
  '"0x8D7365E8DF1E91F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1db64149-001a-005f-5c47-689402000000',
  'x-ms-client-request-id',
  'f0be1aae-4e92-421d-8636-9cb835bdcc97',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816840153405539/dir156816840203506929/file156816840245802900')
  .reply(200, "Hello World", [ 'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:03 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E8DF1E91F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '19b15756-e01a-0038-5947-6827a5000000',
  'x-ms-client-request-id',
  'f29bc938-d5ae-4ca0-8576-8ade8d8fd682',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:20:02.8088446Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:02.8088446Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:02.8088446Z',
  'x-ms-file-permission-key',
  '1459396823544571282*13609941760923454748',
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
  'Wed, 11 Sep 2019 02:20:02 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816840153405539')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ab52548f-501a-0008-5f47-687d8f000000',
  'x-ms-client-request-id',
  '90c372f8-63b8-4629-8ed9-6120dd1c11a0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:03 GMT' ]);


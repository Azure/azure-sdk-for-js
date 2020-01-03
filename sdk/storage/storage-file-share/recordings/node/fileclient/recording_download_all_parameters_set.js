let nock = require('nock');

module.exports.testInfo = {"share":"share156816840674507523","dir":"dir156816840716604291","file":"file156816840759005446"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840674507523')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:07 GMT',
  'ETag',
  '"0x8D7365E903CE428"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6dc5-c01a-0042-6a47-684de8000000',
  'x-ms-client-request-id',
  '5491bbd8-c88a-40e0-8c5d-e0d75938136a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:06 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840674507523/dir156816840716604291')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:07 GMT',
  'ETag',
  '"0x8D7365E907D5051"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb11983f-001a-0032-5d47-683e2c000000',
  'x-ms-client-request-id',
  'cebedd50-b821-471b-b497-ea599acb0ce5',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:07.5171921Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:07.5171921Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:07.5171921Z',
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
  'Wed, 11 Sep 2019 02:20:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840674507523/dir156816840716604291/file156816840759005446')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:07 GMT',
  'ETag',
  '"0x8D7365E90BD9948"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ca5364e-e01a-0033-0547-683fd1000000',
  'x-ms-client-request-id',
  'f89ce238-a50e-448e-bfdc-d88bfb5b244b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:20:07.9384904Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:07.9384904Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:07.9384904Z',
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
  'Wed, 11 Sep 2019 02:20:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816840674507523/dir156816840716604291/file156816840759005446', "Hello World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:08 GMT',
  'ETag',
  '"0x8D7365E90FD941A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf44a349-d01a-0056-3247-688e8c000000',
  'x-ms-client-request-id',
  '7031a36f-e03e-434b-bb6d-d9ea7c08e55e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:20:07 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156816840674507523/dir156816840716604291/file156816840759005446')
  .reply(206, "H", [ 'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'wdn1D4aCWhojAuwkScFxlg==',
  'Content-Range',
  'bytes 0-0/11',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:08 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7365E90FD941A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9f2f6395-601a-0044-1447-68ba90000000',
  'x-ms-client-request-id',
  '38f2fe38-900e-4627-be61-9c1b6364e9fe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2019-09-11T02:20:07.9384904Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:20:07.9384904Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:20:07.9384904Z',
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
  'Wed, 11 Sep 2019 02:20:08 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816840674507523')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9158b775-f01a-0027-7947-68fcb5000000',
  'x-ms-client-request-id',
  '1bda600b-33a0-4027-b680-30f72e717156',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:08 GMT' ]);


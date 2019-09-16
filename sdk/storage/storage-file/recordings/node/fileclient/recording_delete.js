let nock = require('nock');

module.exports.testInfo = {"share":"share156816837325103819","dir":"dir156816837367305937","file":"file156816837409504573"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837325103819')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:33 GMT',
  'ETag',
  '"0x8D7365E7C461E34"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '428c6d92-c01a-0042-6047-684de8000000',
  'x-ms-client-request-id',
  '80a8fd01-b737-4213-9be7-3b005020a2cf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837325103819/dir156816837367305937')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:34 GMT',
  'ETag',
  '"0x8D7365E7C86B7B8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '566840ab-c01a-0060-5b47-6823de000000',
  'x-ms-client-request-id',
  '74aadf85-a986-411d-9487-c4f604bdbded',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:34.0243896Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:34.0243896Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:34.0243896Z',
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
  'Wed, 11 Sep 2019 02:19:33 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816837325103819/dir156816837367305937/file156816837409504573')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:19:34 GMT',
  'ETag',
  '"0x8D7365E7CC8D5CE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8fd1690f-d01a-003b-5547-6824a2000000',
  'x-ms-client-request-id',
  '04992c86-8640-4818-bc12-7e1940e55471',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:19:34.4576974Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:19:34.4576974Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:19:34.4576974Z',
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
  'Wed, 11 Sep 2019 02:19:34 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816837325103819/dir156816837367305937/file156816837409504573')
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4b337498-001a-0054-6647-688c76000000',
  'x-ms-client-request-id',
  '9f042626-6c4e-404b-8f34-230df0dde140',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:34 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816837325103819')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4021a2b3-e01a-001a-3947-684993000000',
  'x-ms-client-request-id',
  'f651861e-0a86-40b2-904e-1e365691908a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:35 GMT' ]);


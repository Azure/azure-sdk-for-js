let nock = require('nock');

module.exports.testInfo = {"share":"share156775317055608250","dir":"dir156775317099501095"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775317055608250')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:30 GMT',
  'ETag',
  '"0x8D73297C4268000"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '266ddce1-d01a-00cd-1080-64c769000000',
  'x-ms-client-request-id',
  '9d209df5-59c9-4e95-b26b-3a14ab435b4b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:29 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775317055608250/dir156775317099501095')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 06:59:31 GMT',
  'ETag',
  '"0x8D73297C47174D4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50f9f882-e01a-001d-2c80-64fa3f000000',
  'x-ms-client-request-id',
  '77a9eb8b-fb02-48a9-b7fd-5844326bc4af',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T06:59:31.3434836Z',
  'x-ms-file-last-write-time',
  '2019-09-06T06:59:31.3434836Z',
  'x-ms-file-creation-time',
  '2019-09-06T06:59:31.3434836Z',
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
  'Fri, 06 Sep 2019 06:59:30 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775317055608250/dir156775317099501095')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aa443fa9-601a-0133-5180-645625000000',
  'x-ms-client-request-id',
  '4f865841-a3e5-48f4-9727-310dc0c51c14',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 06:59:31 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775317055608250')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '25bcead8-c01a-0068-0280-649113000000',
  'x-ms-client-request-id',
  '613977c1-74fa-458c-8cfd-1ddb77dc288d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 06:59:32 GMT',
  'Connection',
  'close' ]);


let nock = require('nock');

module.exports.testInfo = {"share":"share156775323764301189","dir":"dir156775323808302495","file":"file156775323848702007"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323764301189')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:37 GMT',
  'ETag',
  '"0x8D73297EC239216"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79edeb0c-201a-0084-1980-648582000000',
  'x-ms-client-request-id',
  'b9179439-e403-48d7-86c0-c3fc92f4322d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323764301189/dir156775323808302495')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:38 GMT',
  'ETag',
  '"0x8D73297EC633642"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ef4116ee-b01a-00cb-5c80-64f4d6000000',
  'x-ms-client-request-id',
  '938ff73c-1933-4c13-91b4-90fa69a58442',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:38.3589954Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:38.3589954Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:38.3589954Z',
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
  'Fri, 06 Sep 2019 07:00:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323764301189/dir156775323808302495/file156775323848702007')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:38 GMT',
  'ETag',
  '"0x8D73297ECA026EC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '64c06064-801a-0159-7c80-648e0d000000',
  'x-ms-client-request-id',
  'f0fc67e7-328a-4085-9356-5485f4bfb793',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:38.7583724Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:38.7583724Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:38.7583724Z',
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
  'Fri, 06 Sep 2019 07:00:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775323764301189/dir156775323808302495/file156775323848702007')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '50c5e2bd-601a-00aa-2b80-64d795000000',
  'x-ms-client-request-id',
  'edbba551-a212-4798-be1b-be59ea42ef18',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:00:38 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775323764301189')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c731226e-b01a-00e4-8080-64f91d000000',
  'x-ms-client-request-id',
  '6e1d1a15-4c36-4c92-a426-268fd38c868b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:39 GMT',
  'Connection',
  'close' ]);


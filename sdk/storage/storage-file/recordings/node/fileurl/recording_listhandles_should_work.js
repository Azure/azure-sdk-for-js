let nock = require('nock');

module.exports.testInfo = {"share":"share156775323354509814","dir":"dir156775323398203426","file":"file156775323439207849"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323354509814')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:33 GMT',
  'ETag',
  '"0x8D73297E9B1686C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c12b214f-301a-0031-7b80-641690000000',
  'x-ms-client-request-id',
  '24f32b10-7375-4c92-b969-9cd2986e4e0b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323354509814/dir156775323398203426')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:34 GMT',
  'ETag',
  '"0x8D73297E9F23B57"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ba64e1d1-101a-00b0-1b80-64b64a000000',
  'x-ms-client-request-id',
  '20c3a966-fea8-41cb-92e7-7ba5641dc1df',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:34.2631255Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:34.2631255Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:34.2631255Z',
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
  'Fri, 06 Sep 2019 07:00:33 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775323354509814/dir156775323398203426/file156775323439207849')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:00:34 GMT',
  'ETag',
  '"0x8D73297EA2F7A35"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b6d465b-901a-00cc-6080-6498b5000000',
  'x-ms-client-request-id',
  '03d6a468-9923-4b33-8348-e74180e765cf',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-06T07:00:34.6645045Z',
  'x-ms-file-last-write-time',
  '2019-09-06T07:00:34.6645045Z',
  'x-ms-file-creation-time',
  '2019-09-06T07:00:34.6645045Z',
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
  'Fri, 06 Sep 2019 07:00:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775323354509814/dir156775323398203426/file156775323439207849')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c8e130a2-b01a-010f-7980-647fe2000000',
  'x-ms-client-request-id',
  '5e85c104-e2ff-449d-aa0f-8b31860e0623',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:00:34 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775323354509814')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a2ccc74f-401a-0092-0380-647355000000',
  'x-ms-client-request-id',
  '6874f02a-122c-48fd-b4df-d1059901445a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:00:34 GMT',
  'Connection',
  'close' ]);


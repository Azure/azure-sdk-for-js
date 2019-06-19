let nock = require('nock');

module.exports.testInfo = {"share":"share156093653147800019","dir":"dir156093653175002390","file":"file156093653204208722"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093653147800019')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:49 GMT',
  'ETag',
  '"0x8D6F4981E3FFB9F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b36f101d-601a-00d2-0280-2680ce000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093653147800019/dir156093653175002390')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'ETag',
  '"0x8D6F4981E6CA01E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2527b682-801a-00f1-4880-26ef05000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093653147800019/dir156093653175002390/file156093653204208722')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'ETag',
  '"0x8D6F4981E969DEE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9fb79290-601a-0138-7f80-26399a000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093653147800019/dir156093653175002390/file156093653204208722', "Hello")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'ETag',
  '"0x8D6F4981EC074A4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e17ab595-801a-005b-6b80-2639ea000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093653147800019/dir156093653175002390/file156093653204208722', "World")
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:51 GMT',
  'ETag',
  '"0x8D6F4981EEA244B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5c5a8292-701a-0045-0680-26e307000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093653147800019/dir156093653175002390/file156093653204208722')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:51 GMT',
  'ETag',
  '"0x8D6F4981F133792"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c83bff06-a01a-00c4-5680-264150000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:50 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156093653147800019/dir156093653175002390/file156093653204208722')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Ranges><Range><Start>0</Start><End>9</End></Range></Ranges>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:51 GMT',
  'ETag',
  '"0x8D6F4981F133792"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4b8385d-c01a-00b9-3580-26dd98000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-content-length',
  '10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-content-length,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093653147800019')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '156a5b78-e01a-008c-4380-2673cd000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:51 GMT',
  'Connection',
  'close' ]);


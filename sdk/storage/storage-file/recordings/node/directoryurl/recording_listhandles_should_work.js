let nock = require('nock');

module.exports.testInfo = {"share":"share156093648111809719","dir":"dir156093648214709019"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093648111809719')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:00 GMT',
  'ETag',
  '"0x8D6F498008FBA54"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fcad50ea-801a-00b5-6b80-263369000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:24:59 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093648111809719/dir156093648214709019')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:25:00 GMT',
  'ETag',
  '"0x8D6F49800D84CB1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cac4be00-701a-0067-4580-268d31000000',
  'x-ms-version',
  '2018-11-09',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 19 Jun 2019 09:25:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156093648111809719/dir156093648214709019')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8c585ad9-101a-0077-7680-26bbd7000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:25:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093648111809719/dir156093648214709019')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c6ef030e-701a-0082-1280-269fc6000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:00 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093648111809719')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b4b83812-c01a-00b9-2480-26dd98000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:25:01 GMT',
  'Connection',
  'close' ]);


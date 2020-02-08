let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613040694104225","dir":"dir157613040807502821","file":"file157613040922006536"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040694104225')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:08 GMT',
  'ETag',
  '"0x8D77EC88A9B50EE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd534240a-901a-0014-11b1-b0da54000000',
  'x-ms-client-request-id',
  'f8dbc234-4a08-46a0-8e0c-cd00016879ad',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040694104225/dir157613040807502821')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:09 GMT',
  'ETag',
  '"0x8D77EC88B4AB4E0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b63f915a-401a-0038-6bb1-b036fb000000',
  'x-ms-client-request-id',
  'd543b039-4d24-4d21-95bf-3470baf94173',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:09.1702496Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:09.1702496Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:09.1702496Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:00:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040694104225/dir157613040807502821/file157613040922006536')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:25 GMT',
  'ETag',
  '"0x8D77EC894ECD7F2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9531b31f-b01a-0003-41b1-b0735f000000',
  'x-ms-client-request-id',
  '54527898-13e8-4144-b384-e3505b1f22ed',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T06:00:25.3323250Z',
  'x-ms-file-last-write-time',
  '2019-12-12T06:00:25.3323250Z',
  'x-ms-file-creation-time',
  '2019-12-12T06:00:25.3323250Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:00:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040694104225/dir157613040807502821/file157613040922006536')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:25 GMT',
  'ETag',
  '"0x8D77EC894ECD7F2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f44c947a-301a-0040-60b1-b09503000000',
  'x-ms-client-request-id',
  '85672136-7c09-44e8-9611-f14f68e21218',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  'e9890485-bf47-4d9a-b3d0-aceb18506124',
  'Date',
  'Thu, 12 Dec 2019 06:00:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040694104225/dir157613040807502821/file157613040922006536', "Hello World")
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the file and no lease ID was specified in the request.\nRequestId:9531b32a-b01a-0003-45b1-b0735f000000\nTime:2019-12-12T06:00:26.7839997Z</Message></Error>", [
  'Content-Length',
  '267',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9531b32a-b01a-0003-45b1-b0735f000000',
  'x-ms-client-request-id',
  'c030da5d-cedd-4dc3-adc1-670a585bfdde',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'LeaseIdMissing',
  'Date',
  'Thu, 12 Dec 2019 06:00:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613040694104225/dir157613040807502821/file157613040922006536', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 12 Dec 2019 06:00:27 GMT',
  'ETag',
  '"0x8D77EC895F71C4B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9531b32c-b01a-0003-47b1-b0735f000000',
  'x-ms-client-request-id',
  '32aaf347-5859-4476-8eeb-234de40c428b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 06:00:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613040694104225')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd534242f-901a-0014-1cb1-b0da54000000',
  'x-ms-client-request-id',
  '493811ff-7306-4fb3-9a66-5250b3c03672',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 06:00:27 GMT'
]);

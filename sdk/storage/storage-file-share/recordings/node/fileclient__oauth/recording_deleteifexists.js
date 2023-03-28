let nock = require('nock');

module.exports.hash = "cbdf1540420c7743b54cbd8c686956dd";

module.exports.testInfo = {"uniqueName":{"share":"share167749055331207296","dir":"dir167749055360606671","file":"file167749055390403517"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055331207296')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:53 GMT',
  'ETag',
  '"0x8DB18A605622E6A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb34c-101a-0070-0e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '9fe050a9-3fe0-4450-be09-eef1b907d0d7',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055331207296/dir167749055360606671')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:54 GMT',
  'ETag',
  '"0x8DB18A6058FE366"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb34f-101a-0070-108e-4a9c5e000000',
  'x-ms-client-request-id',
  '4f462a90-3401-4578-937f-20e2785a4587',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:54.0010854Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:54.0010854Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:54.0010854Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:53 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055331207296/dir167749055360606671/file167749055390403517')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ResourceNotFound</Code><Message>The specified resource does not exist.\nRequestId:a17cb351-101a-0070-128e-4a9c5e000000\nTime:2023-02-27T09:35:54.2942230Z</Message></Error>", [
  'Content-Length',
  '223',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb351-101a-0070-128e-4a9c5e000000',
  'x-ms-client-request-id',
  'a2a59dfe-ec5a-4cf9-ad20-0ed998cc5c8e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Date',
  'Mon, 27 Feb 2023 09:35:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055331207296/dir167749055360606671/file167749055390403517')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:54 GMT',
  'ETag',
  '"0x8DB18A605E9B603"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb352-101a-0070-138e-4a9c5e000000',
  'x-ms-client-request-id',
  '9204dc51-516d-41be-a23e-55cd096b08f3',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:54.5897475Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:54.5897475Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:54.5897475Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055331207296/dir167749055360606671/file167749055390403517')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb353-101a-0070-148e-4a9c5e000000',
  'x-ms-client-request-id',
  '1fcd5107-3d5f-4455-9813-a12369c6cbeb',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:54 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055331207296')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb354-101a-0070-158e-4a9c5e000000',
  'x-ms-client-request-id',
  'a32d0099-365b-4686-924b-28ada82e3543',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:54 GMT'
]);

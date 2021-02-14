let nock = require('nock');

module.exports.hash = "6a95770e71d94eec184293d3f84b1364";

module.exports.testInfo = {"uniqueName":{"share":"share160387504560906547","dir":"dir160387504591108432","file":"file160387504621805581","newdir":"newdir160387504622002090"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160387504560906547')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Oct 2020 08:50:45 GMT',
  'ETag',
  '"0x8D87B1E8F613F8E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9e3-a01a-0077-3e07-ad8069000000',
  'x-ms-client-request-id',
  '16985bf7-eca1-4c24-94d6-1c368a942489',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 28 Oct 2020 08:50:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160387504560906547/dir160387504591108432')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 28 Oct 2020 08:50:46 GMT',
  'ETag',
  '"0x8D87B1E8F904503"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9e5-a01a-0077-3f07-ad8069000000',
  'x-ms-client-request-id',
  '174fab35-9350-493e-b5a8-50dc1250a504',
  'x-ms-version',
  '2020-02-10',
  'x-ms-file-change-time',
  '2020-10-28T08:50:46.0757251Z',
  'x-ms-file-last-write-time',
  '2020-10-28T08:50:46.0757251Z',
  'x-ms-file-creation-time',
  '2020-10-28T08:50:46.0757251Z',
  'x-ms-file-permission-key',
  '18253506462963126402*10775527834424002315',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 28 Oct 2020 08:50:45 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160387504560906547/newdir160387504622002090/file160387504621805581')
  .reply(404, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>ParentNotFound</Code><Message>The specified parent path does not exist.\nRequestId:fdd8c9e6-a01a-0077-4007-ad8069000000\nTime:2020-10-28T08:50:46.3820030Z</Message></Error>", [
  'Content-Length',
  '224',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9e6-a01a-0077-4007-ad8069000000',
  'x-ms-client-request-id',
  '928dc52f-f7e7-44e6-b9e3-f856cf874afd',
  'x-ms-version',
  '2020-02-10',
  'x-ms-error-code',
  'ParentNotFound',
  'Date',
  'Wed, 28 Oct 2020 08:50:46 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160387504560906547')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fdd8c9e7-a01a-0077-4107-ad8069000000',
  'x-ms-client-request-id',
  'd87b5957-71f9-4e09-aca0-3ba4dbe469c7',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Wed, 28 Oct 2020 08:50:46 GMT'
]);

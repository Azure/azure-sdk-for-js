let nock = require('nock');

module.exports.hash = "5bbb82df82d1a2a8dc439c1870947d3b";

module.exports.testInfo = {"uniqueName":{"share":"share167749056846106273","dir":"dir167749056875609443","file":"file167749056905601722"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056846106273')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:08 GMT',
  'ETag',
  '"0x8DB18A60E6969B4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a3-101a-0070-428e-4a9c5e000000',
  'x-ms-client-request-id',
  '566020da-57cf-4af0-9999-70621f05cd48',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056846106273/dir167749056875609443')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:09 GMT',
  'ETag',
  '"0x8DB18A60E97A445"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a5-101a-0070-438e-4a9c5e000000',
  'x-ms-client-request-id',
  '01912b6c-97d2-4c02-8b54-b304688c62c6',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:09.1513925Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:09.1513925Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:09.1513925Z',
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
  'Mon, 27 Feb 2023 09:36:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056846106273/dir167749056875609443/file167749056905601722')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:09 GMT',
  'ETag',
  '"0x8DB18A60EC5B25C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a6-101a-0070-448e-4a9c5e000000',
  'x-ms-client-request-id',
  '060739d8-61fe-4379-9644-5fdc0514b38a',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:09.4532188Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:09.4532188Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:09.4532188Z',
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
  'Mon, 27 Feb 2023 09:36:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056846106273/dir167749056875609443/file167749056905601722', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:09 GMT',
  'ETag',
  '"0x8DB18A60EF34B5D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a7-101a-0070-458e-4a9c5e000000',
  'x-ms-client-request-id',
  'cef214f1-284c-45bf-b13d-72889049a4ae',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:09.7520477Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056846106273/dir167749056875609443/file167749056905601722', "World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:10 GMT',
  'ETag',
  '"0x8DB18A60F206F3C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a9-101a-0070-468e-4a9c5e000000',
  'x-ms-client-request-id',
  '62063387-8ac3-45aa-9da8-de7e17625b07',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:10.0478780Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:09 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056846106273/dir167749056875609443/file167749056905601722')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:10 GMT',
  'ETag',
  '"0x8DB18A60F5051D6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3aa-101a-0070-478e-4a9c5e000000',
  'x-ms-client-request-id',
  '5920e620-8738-4636-9673-595d13b71fe7',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:10.3616982Z',
  'Date',
  'Mon, 27 Feb 2023 09:36:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749056846106273/dir167749056875609443/file167749056905601722')
  .reply(200, "H\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000d", [
  'Content-Length',
  '10',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:10 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB18A60F5051D6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ad-101a-0070-488e-4a9c5e000000',
  'x-ms-client-request-id',
  'bb85a75e-0426-49b3-810f-47e7e0eca5df',
  'x-ms-version',
  '2022-11-02',
  'x-ms-type',
  'File',
  'x-ms-server-encrypted',
  'true',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-file-change-time',
  '2023-02-27T09:36:10.3616982Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:10.3616982Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:09.4532188Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:10 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749056846106273')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3b0-101a-0070-4b8e-4a9c5e000000',
  'x-ms-client-request-id',
  'b9921fdd-9851-4273-a90b-2a4345461517',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:10 GMT'
]);

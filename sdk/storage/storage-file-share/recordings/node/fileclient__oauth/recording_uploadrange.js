let nock = require('nock');

module.exports.hash = "ab22c5880d51cbda06f173a4437fd0d5";

module.exports.testInfo = {"uniqueName":{"share":"share167749056636602612","dir":"dir167749056666203494","file":"file167749056696408112"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056636602612')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:06 GMT',
  'ETag',
  '"0x8DB18A60D2A109D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb399-101a-0070-3a8e-4a9c5e000000',
  'x-ms-client-request-id',
  'c8a59fb9-466a-4029-8b09-4d56c8f01679',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056636602612/dir167749056666203494')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:07 GMT',
  'ETag',
  '"0x8DB18A60D587566"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb39b-101a-0070-3b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '9eabf7d8-c4cf-44ab-8dd0-bae050ab8d18',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:07.0595942Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:07.0595942Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:07.0595942Z',
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
  'Mon, 27 Feb 2023 09:36:06 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056636602612/dir167749056666203494/file167749056696408112')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:07 GMT',
  'ETag',
  '"0x8DB18A60D86AA7A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb39c-101a-0070-3c8e-4a9c5e000000',
  'x-ms-client-request-id',
  'ea08df51-0a01-44f2-b7e3-d6b7590951fb',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:07.3624186Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:07.3624186Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:07.3624186Z',
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
  'Mon, 27 Feb 2023 09:36:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056636602612/dir167749056666203494/file167749056696408112', "Hello")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'ixqZU8RhEpaoJ6v4xHgE1w==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:07 GMT',
  'ETag',
  '"0x8DB18A60DB41C6D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb39d-101a-0070-3d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '6274588a-7a98-42fa-88c8-8f4309fd358e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:07.6602477Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749056636602612/dir167749056666203494/file167749056696408112', "World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '9aeSTmIehMkoCpon4by39g==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:07 GMT',
  'ETag',
  '"0x8DB18A60DE14053"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb39e-101a-0070-3e8e-4a9c5e000000',
  'x-ms-client-request-id',
  'da13cc5f-a751-4292-8448-4f734dee9e12',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:07.9560787Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:07 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749056636602612/dir167749056666203494/file167749056696408112')
  .reply(206, "HelloWor", [
  'Content-Length',
  '8',
  'Content-Type',
  'application/octet-stream',
  'Content-Range',
  'bytes 0-7/10',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:07 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB18A60DE14053"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a1-101a-0070-408e-4a9c5e000000',
  'x-ms-client-request-id',
  '0b9336e7-2446-4e78-a738-253acf01b34e',
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
  '2023-02-27T09:36:07.9560787Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:07.9560787Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:07.3624186Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Range,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:08 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749056636602612')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3a2-101a-0070-418e-4a9c5e000000',
  'x-ms-client-request-id',
  '7237611b-369d-4221-8362-1825fc7d02f0',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:08 GMT'
]);

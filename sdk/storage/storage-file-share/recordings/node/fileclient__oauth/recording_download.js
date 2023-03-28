let nock = require('nock');

module.exports.hash = "5b30ea14feb2d92cba23dd202361a856";

module.exports.testInfo = {"uniqueName":{"share":"share167749057679301590","dir":"dir167749057708802113","file":"file167749057738808478"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057679301590')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:17 GMT',
  'ETag',
  '"0x8DB18A61360DB67"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3cc-101a-0070-5f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '1407fda1-abb6-41fa-9167-ee59cb116859',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:16 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057679301590/dir167749057708802113')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:17 GMT',
  'ETag',
  '"0x8DB18A6138F0990"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ce-101a-0070-608e-4a9c5e000000',
  'x-ms-client-request-id',
  '9747d62d-cb10-4bbd-b8c7-97eed85ff67b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:17.4836112Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:17.4836112Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:17.4836112Z',
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
  'Mon, 27 Feb 2023 09:36:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057679301590/dir167749057708802113/file167749057738808478')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:17 GMT',
  'ETag',
  '"0x8DB18A613BCC99E"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3cf-101a-0070-618e-4a9c5e000000',
  'x-ms-client-request-id',
  '4d2209f8-5dbe-491f-9917-1856dffd8399',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:17.7834398Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:17.7834398Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:17.7834398Z',
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
  'Mon, 27 Feb 2023 09:36:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749057679301590/dir167749057708802113/file167749057738808478', "Hello World")
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:18 GMT',
  'ETag',
  '"0x8DB18A613EA89A4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3d1-101a-0070-628e-4a9c5e000000',
  'x-ms-client-request-id',
  '3e652b89-39e9-4a9b-ae4b-a83d6561044b',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:18.0832676Z',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:17 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749057679301590/dir167749057708802113/file167749057738808478')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:18 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB18A613EA89A4"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3d2-101a-0070-638e-4a9c5e000000',
  'x-ms-client-request-id',
  '00020c0e-083d-4886-b576-6d550d7dd0cd',
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
  '2023-02-27T09:36:18.0832676Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:18.0832676Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:17.7834398Z',
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
  'Mon, 27 Feb 2023 09:36:18 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749057679301590')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3d5-101a-0070-658e-4a9c5e000000',
  'x-ms-client-request-id',
  'b4014fd6-7af7-456c-b75e-e48c24441168',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:18 GMT'
]);

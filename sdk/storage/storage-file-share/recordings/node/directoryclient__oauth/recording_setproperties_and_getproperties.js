let nock = require('nock');

module.exports.hash = "20d7a1087e2eb0188e379dfc27a7344f";

module.exports.testInfo = {"uniqueName":{"share":"share167749052731806329","dir":"dir167749052761401606"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052731806329')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:27 GMT',
  'ETag',
  '"0x8DB18A5F5E37E6A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2af-101a-0070-298e-4a9c5e000000',
  'x-ms-client-request-id',
  '25e2c3a7-1bd5-4263-8ada-f6215aca018e',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052731806329/dir167749052761401606')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:28 GMT',
  'ETag',
  '"0x8DB18A5F611F694"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2b2-101a-0070-2a8e-4a9c5e000000',
  'x-ms-client-request-id',
  'c0554ca0-ab27-44dd-84b2-18ebaf6db832',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:28.0099988Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:28.0099988Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:28.0099988Z',
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
  'Mon, 27 Feb 2023 09:35:27 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052731806329/dir167749052761401606')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:28 GMT',
  'ETag',
  '"0x8DB18A5F645821F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2bf-101a-0070-2b8e-4a9c5e000000',
  'x-ms-client-request-id',
  'ce944098-6924-495b-9567-c06d80cf5c51',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:28.3478047Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:28.0099988Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:28.0099988Z',
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
  'Mon, 27 Feb 2023 09:35:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749052731806329/dir167749052761401606')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:28 GMT',
  'ETag',
  '"0x8DB18A5F645821F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2c0-101a-0070-2c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '28c4ff60-5d7c-41a2-ac49-dfbb86551851',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-02-27T09:35:28.3478047Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:28.0099988Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:28.0099988Z',
  'x-ms-file-permission-key',
  '8792472798472242479*1359530181238362790',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:28 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052731806329')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2c1-101a-0070-2d8e-4a9c5e000000',
  'x-ms-client-request-id',
  'e6e754fc-bd2e-4384-987a-a4f4d8367d82',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:28 GMT'
]);

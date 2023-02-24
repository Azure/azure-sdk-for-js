let nock = require('nock');

module.exports.hash = "0d70b028cbf4ef70b14c5b3d969f77e4";

module.exports.testInfo = {"uniqueName":{"share":"share167749058308102135","dir":"dir167749058337608612","file":"file167749058367808610","destfile":"destfile167749058397708402"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058308102135')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:23 GMT',
  'ETag',
  '"0x8DB18A6172045FF"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f1-101a-0070-788e-4a9c5e000000',
  'x-ms-client-request-id',
  '4dbc591e-9f37-49ad-afb1-27a0382cb0a1',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058308102135/dir167749058337608612')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:23 GMT',
  'ETag',
  '"0x8DB18A6174EDFFA"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f3-101a-0070-798e-4a9c5e000000',
  'x-ms-client-request-id',
  'f1c48fe5-6823-4782-82ee-c17ded685844',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:23.7740026Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:23.7740026Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:23.7740026Z',
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
  'Mon, 27 Feb 2023 09:36:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058308102135/dir167749058337608612/file167749058367808610')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:24 GMT',
  'ETag',
  '"0x8DB18A6177C78F0"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f4-101a-0070-7a8e-4a9c5e000000',
  'x-ms-client-request-id',
  'e97a3608-e24c-47f1-a450-54b33229bcdd',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:24.0728304Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:24.0728304Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:24.0728304Z',
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
  'Mon, 27 Feb 2023 09:36:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058308102135/destfile167749058397708402')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:24 GMT',
  'ETag',
  '"0x8DB18A617A9EAEC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f5-101a-0070-7b8e-4a9c5e000000',
  'x-ms-client-request-id',
  'e758156f-f681-43e6-9e02-d1b1a6248e5e',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:24.3706604Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:24.0728304Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:24.0728304Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:36:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749058308102135/destfile167749058397708402')
  .reply(200, "", [
  'Content-Length',
  '1024',
  'Content-Type',
  'application/octet-stream',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:24 GMT',
  'ETag',
  '"0x8DB18A617A9EAEC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f6-101a-0070-7c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '87cfbcdc-b0ee-497f-afa2-6bf1acc7c55f',
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
  '2023-02-27T09:36:24.3706604Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:24.0728304Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:24.0728304Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749058308102135/dir167749058337608612/file167749058367808610')
  .reply(404, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f7-101a-0070-7d8e-4a9c5e000000',
  'x-ms-client-request-id',
  '533d2e45-5133-48b4-a448-2200b15fc905',
  'x-ms-version',
  '2022-11-02',
  'x-ms-error-code',
  'ResourceNotFound',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749058308102135')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3f8-101a-0070-7e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '8fafc80e-959c-4c3d-b964-55795af1ec13',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:24 GMT'
]);

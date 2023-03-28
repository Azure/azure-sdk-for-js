let nock = require('nock');

module.exports.hash = "f2882c849aefb0f88a9f76d562b25150";

module.exports.testInfo = {"uniqueName":{"share":"share167749055004103583","dir":"dir167749055033601683","file":"file167749055063600494"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055004103583')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:50 GMT',
  'ETag',
  '"0x8DB18A6036EE03D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb332-101a-0070-7a8e-4a9c5e000000',
  'x-ms-client-request-id',
  '2768a027-ca9b-4e04-82b2-01d6f69b2710',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055004103583/dir167749055033601683')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:50 GMT',
  'ETag',
  '"0x8DB18A6039D0F3D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb336-101a-0070-7b8e-4a9c5e000000',
  'x-ms-client-request-id',
  '43fa8731-2431-4e02-85e3-ad3dcd1977ad',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:50.7319613Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:50.7319613Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:50.7319613Z',
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
  'Mon, 27 Feb 2023 09:35:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055004103583/dir167749055033601683/file167749055063600494')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:51 GMT',
  'ETag',
  '"0x8DB18A603CAA840"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb337-101a-0070-7c8e-4a9c5e000000',
  'x-ms-client-request-id',
  '9d053d5d-5d63-432b-ab2a-4dd4ae27d026',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:51.0307904Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:51.0307904Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:51.0307904Z',
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
  'Mon, 27 Feb 2023 09:35:50 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749055004103583/dir167749055033601683/file167749055063600494')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:51 GMT',
  'ETag',
  '"0x8DB18A603F77E05"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb338-101a-0070-7d8e-4a9c5e000000',
  'x-ms-client-request-id',
  'a439b789-63fb-4c05-99f9-89265011a902',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:51.3246213Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:51.0307904Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:51.0307904Z',
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
  'Mon, 27 Feb 2023 09:35:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .head('/share167749055004103583/dir167749055033601683/file167749055063600494')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:51 GMT',
  'ETag',
  '"0x8DB18A603F77E05"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb339-101a-0070-7e8e-4a9c5e000000',
  'x-ms-client-request-id',
  '27331cf9-6216-456a-a92b-cec50063df1f',
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
  '2023-02-27T09:35:51.3246213Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:51.0307904Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:51.0307904Z',
  'x-ms-file-permission-key',
  '13438439191449926184*1359530181238362790',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '11529285414812647424',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-type,x-ms-server-encrypted,x-ms-lease-status,x-ms-lease-state,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:51 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749055004103583')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb33b-101a-0070-7f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '934e4abd-1d30-4db5-949c-757c8a9a4cc8',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:51 GMT'
]);

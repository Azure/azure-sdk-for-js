let nock = require('nock');

module.exports.hash = "9dd028934387ead13a15053c97012238";

module.exports.testInfo = {"uniqueName":{"share":"share167749052884706412","dir":"dir167749052914200503"},"newDate":{"now":"2023-02-27T09:35:29.826Z"}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052884706412')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:29 GMT',
  'ETag',
  '"0x8DB18A5F6CCD414"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2c2-101a-0070-2e8e-4a9c5e000000',
  'x-ms-client-request-id',
  'e526284b-9d31-4ee6-979b-4e3e780121b6',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052884706412/dir167749052914200503')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:29 GMT',
  'ETag',
  '"0x8DB18A5F6FAD4CE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2c4-101a-0070-2f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '94e8714e-75a5-444f-bf4a-6087fcb32c4f',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:29.5361230Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:29.5361230Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:29.5361230Z',
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
  'Mon, 27 Feb 2023 09:35:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749052884706412')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [
  'Content-Length',
  '149',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2c5-101a-0070-308e-4a9c5e000000',
  'x-ms-client-request-id',
  'cec4270d-b37a-4a55-bc05-51d626aab68c',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:29 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052884706412/dir167749052914200503')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:30 GMT',
  'ETag',
  '"0x8DB18A5F763C06D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2c7-101a-0070-318e-4a9c5e000000',
  'x-ms-client-request-id',
  '5339f0f7-eff9-45ce-bc92-c34d426995ec',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:29.8260000Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:29.8260000Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:29.8260000Z',
  'x-ms-file-permission-key',
  '15439958905827650591*1359530181238362790',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 27 Feb 2023 09:35:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749052884706412/dir167749052914200503')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:30 GMT',
  'ETag',
  '"0x8DB18A5F763C06D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2ca-101a-0070-328e-4a9c5e000000',
  'x-ms-client-request-id',
  '39259409-a132-481e-84ed-237b032e75ba',
  'x-ms-version',
  '2022-11-02',
  'x-ms-server-encrypted',
  'true',
  'x-ms-file-change-time',
  '2023-02-27T09:35:29.8260000Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:29.8260000Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:29.8260000Z',
  'x-ms-file-permission-key',
  '15439958905827650591*1359530181238362790',
  'x-ms-file-attributes',
  'ReadOnly | Hidden | System | Directory | Archive | Offline | NotContentIndexed | NoScrubData',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-server-encrypted,x-ms-file-change-time,x-ms-file-last-write-time,x-ms-file-creation-time,x-ms-file-permission-key,x-ms-file-attributes,x-ms-file-id,x-ms-file-parent-id,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:35:30 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052884706412')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb2cb-101a-0070-338e-4a9c5e000000',
  'x-ms-client-request-id',
  'bccc2d9b-5e10-4f39-b27a-a2efb56de57d',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:30 GMT'
]);

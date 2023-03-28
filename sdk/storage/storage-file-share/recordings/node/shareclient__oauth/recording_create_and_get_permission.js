let nock = require('nock');

module.exports.hash = "7ba61c8be0f5f181e9aee5aec5cf6473";

module.exports.testInfo = {"uniqueName":{"share":"share167749058516801689","dir":"dir167749058546403065"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058516801689')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:25 GMT',
  'ETag',
  '"0x8DB18A6185EDBF2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3fb-101a-0070-7f8e-4a9c5e000000',
  'x-ms-client-request-id',
  '512977b6-1268-44b5-a086-4e015dfbae05',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058516801689/dir167749058546403065')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:36:25 GMT',
  'ETag',
  '"0x8DB18A6188CFD99"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3fd-101a-0070-808e-4a9c5e000000',
  'x-ms-client-request-id',
  '6962d357-c20a-4fce-ba48-1a96624ab30c',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:36:25.8588057Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:36:25.8588057Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:36:25.8588057Z',
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
  'Mon, 27 Feb 2023 09:36:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share167749058516801689')
  .query(true)
  .reply(200, {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"}, [
  'Content-Length',
  '149',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3fe-101a-0070-018e-4a9c5e000000',
  'x-ms-client-request-id',
  '3c66a2da-cac3-4c40-9f12-acc6f3957dc9',
  'x-ms-version',
  '2022-11-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 27 Feb 2023 09:36:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749058516801689', {"permission":"O:SYG:SYD:(A;OICI;FA;;;BA)(A;OICI;FA;;;SY)(A;;0x1200a9;;;BU)(A;OICIIO;GXGR;;;BU)(A;OICI;0x1301bf;;;AU)(A;;FA;;;SY)(A;OICIIO;GA;;;CO)"})
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb3ff-101a-0070-028e-4a9c5e000000',
  'x-ms-client-request-id',
  'e34226b4-0b0d-4647-8c6f-78e456951b10',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-permission-key',
  '15439958905827650591*1359530181238362790',
  'Date',
  'Mon, 27 Feb 2023 09:36:26 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749058516801689')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb400-101a-0070-038e-4a9c5e000000',
  'x-ms-client-request-id',
  'c530410b-26ed-4dd2-aeef-5e6da98ac199',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:36:26 GMT'
]);

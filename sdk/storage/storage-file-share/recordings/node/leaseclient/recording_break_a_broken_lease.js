let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157613036068907374","dir":"dir157613036183806291","file":"file157613036299807216"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:21 GMT',
  'ETag',
  '"0x8D77EC86F0C1BC5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb540f6-701a-0041-51b1-b0cadf000000',
  'x-ms-client-request-id',
  'c59235db-39aa-47f7-87de-ec57f4d71cae',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374/dir157613036183806291')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:22 GMT',
  'ETag',
  '"0x8D77EC86FBD968D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6a1ccfa0-101a-0025-0fb1-b03b47000000',
  'x-ms-client-request-id',
  '277b4443-734d-4109-babd-efab3ac1b77d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:22.9469325Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:22.9469325Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:22.9469325Z',
  'x-ms-file-permission-key',
  '7008756509702647153*693339914461510392',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:59:22 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374/dir157613036183806291/file157613036299807216')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:24 GMT',
  'ETag',
  '"0x8D77EC8706DAF0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6676952c-501a-0046-2db1-b0a6bc000000',
  'x-ms-client-request-id',
  'bb4d931c-af54-46b6-a2ec-9f5bc157d7b3',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-12-12T05:59:24.1009935Z',
  'x-ms-file-last-write-time',
  '2019-12-12T05:59:24.1009935Z',
  'x-ms-file-creation-time',
  '2019-12-12T05:59:24.1009935Z',
  'x-ms-file-permission-key',
  '11619239463300764278*693339914461510392',
  'x-ms-file-attributes',
  'Archive',
  'x-ms-file-id',
  '13835093239654252544',
  'x-ms-file-parent-id',
  '13835128424026341376',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 12 Dec 2019 05:59:23 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374/dir157613036183806291/file157613036299807216')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:24 GMT',
  'ETag',
  '"0x8D77EC8706DAF0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669d74-001a-0039-11b1-b06927000000',
  'x-ms-client-request-id',
  'f7641246-dce3-4446-8f15-eb0e5e82dab1',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-id',
  '566e92fc-bb0a-43bf-a0c2-c18d50b894a9',
  'Date',
  'Thu, 12 Dec 2019 05:59:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374/dir157613036183806291/file157613036299807216')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:24 GMT',
  'ETag',
  '"0x8D77EC8706DAF0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669d79-001a-0039-14b1-b06927000000',
  'x-ms-client-request-id',
  '47c2194d-cb75-4a7f-8a75-6b017cb11ebe',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-time',
  '0',
  'Date',
  'Thu, 12 Dec 2019 05:59:24 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374/dir157613036183806291/file157613036299807216')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:24 GMT',
  'ETag',
  '"0x8D77EC8706DAF0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669d7a-001a-0039-15b1-b06927000000',
  'x-ms-client-request-id',
  '6e65718d-1447-4906-99cb-d558a8530dfd',
  'x-ms-version',
  '2019-02-02',
  'x-ms-lease-time',
  '0',
  'Date',
  'Thu, 12 Dec 2019 05:59:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157613036068907374/dir157613036183806291/file157613036299807216')
  .query(true)
  .reply(200, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Thu, 12 Dec 2019 05:59:24 GMT',
  'ETag',
  '"0x8D77EC8706DAF0F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd6669d7d-001a-0039-17b1-b06927000000',
  'x-ms-client-request-id',
  '4a96d395-7f0f-4740-809a-05a4072c5c38',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:25 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157613036068907374')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cb54103-701a-0041-52b1-b0cadf000000',
  'x-ms-client-request-id',
  '2806dcbc-7ae9-44bf-8981-959845cb2072',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 12 Dec 2019 05:59:26 GMT'
]);

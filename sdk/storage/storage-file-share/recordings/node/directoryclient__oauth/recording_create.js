let nock = require('nock');

module.exports.hash = "7c9311eaa560db83e37344703d4dcc8d";

module.exports.testInfo = {"uniqueName":{"share":"share167749052127409319","dir":"dir167749052157208099"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052127409319')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:21 GMT',
  'ETag',
  '"0x8DB18A5F24997F1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb290-101a-0070-128e-4a9c5e000000',
  'x-ms-client-request-id',
  '39e8493f-9b81-4721-9c1c-d4e9042814e2',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share167749052127409319/dir167749052157208099')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 27 Feb 2023 09:35:21 GMT',
  'ETag',
  '"0x8DB18A5F2784037"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb293-101a-0070-138e-4a9c5e000000',
  'x-ms-client-request-id',
  '53e12362-9c49-43fe-95a9-411c48e11627',
  'x-ms-version',
  '2022-11-02',
  'x-ms-file-change-time',
  '2023-02-27T09:35:21.9694647Z',
  'x-ms-file-last-write-time',
  '2023-02-27T09:35:21.9694647Z',
  'x-ms-file-creation-time',
  '2023-02-27T09:35:21.9694647Z',
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
  'Mon, 27 Feb 2023 09:35:21 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share167749052127409319')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a17cb294-101a-0070-148e-4a9c5e000000',
  'x-ms-client-request-id',
  '0e8228a2-c5de-4e9d-9d6b-5f78b6dc0896',
  'x-ms-version',
  '2022-11-02',
  'Date',
  'Mon, 27 Feb 2023 09:35:22 GMT'
]);

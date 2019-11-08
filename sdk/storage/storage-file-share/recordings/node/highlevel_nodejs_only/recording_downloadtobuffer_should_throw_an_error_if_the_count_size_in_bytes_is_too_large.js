let nock = require('nock');

module.exports.testInfo = {"share":"share157324721723109893","dir":"dir157324721746100709","file":"file157324721764205868"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157324721723109893')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 08 Nov 2019 21:06:57 GMT',
  'ETag',
  '"0x8D7648F971481AB"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53b6991a-801a-0092-0e78-96fb89000000',
  'x-ms-client-request-id',
  '31e718d6-274f-433c-9d52-b3c0624e9239',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 08 Nov 2019 21:06:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157324721723109893/dir157324721746100709')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 08 Nov 2019 21:06:57 GMT',
  'ETag',
  '"0x8D7648F97321E74"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cbb203cb-601a-008a-6f78-9624ee000000',
  'x-ms-client-request-id',
  '742d8f91-6f11-4626-bb81-e515630e99aa',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-08T21:06:57.5959668Z',
  'x-ms-file-last-write-time',
  '2019-11-08T21:06:57.5959668Z',
  'x-ms-file-creation-time',
  '2019-11-08T21:06:57.5959668Z',
  'x-ms-file-permission-key',
  '3771195323339035646*6669510238408230007',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Fri, 08 Nov 2019 21:06:57 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share157324721723109893')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53b6991d-801a-0092-0f78-96fb89000000',
  'x-ms-client-request-id',
  'cc98e2f4-0045-4b0d-befe-a3ab87443c6b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 08 Nov 2019 21:06:58 GMT'
]);

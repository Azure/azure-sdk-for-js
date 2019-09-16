let nock = require('nock');

module.exports.testInfo = {"share":"share156816828128206825","dir":"dir156816828170309472"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828128206825')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:01 GMT',
  'ETag',
  '"0x8D7365E4574ABD3"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '661b9991-201a-0007-6747-689079000000',
  'x-ms-client-request-id',
  'fa79b2c8-ddaa-41bf-8a12-51a2974a4517',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816828128206825/dir156816828170309472')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:18:02 GMT',
  'ETag',
  '"0x8D7365E45B500E5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e71ce447-001a-0039-1347-682658000000',
  'x-ms-client-request-id',
  '2a28f25b-a38a-48c4-8b9e-aa852075b29b',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-11T02:18:02.0530405Z',
  'x-ms-file-last-write-time',
  '2019-09-11T02:18:02.0530405Z',
  'x-ms-file-creation-time',
  '2019-09-11T02:18:02.0530405Z',
  'x-ms-file-permission-key',
  '15292852142319295125*13609941760923454748',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 11 Sep 2019 02:18:01 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816828128206825')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '34cc91fc-601a-004f-5247-68a2e4000000',
  'x-ms-client-request-id',
  '7739af68-278d-4023-b76c-583504c4cdb1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:18:02 GMT' ]);


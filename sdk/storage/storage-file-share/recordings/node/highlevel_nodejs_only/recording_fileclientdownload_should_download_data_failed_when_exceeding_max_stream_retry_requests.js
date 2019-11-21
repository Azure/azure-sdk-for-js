let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647741704520","dir":"dir157376647790604905","file":"file157376647828208521"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647741704520')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:17 GMT',
  'ETag',
  '"0x8D7694896701AB2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f179d57-901a-0051-3b31-9b7809000000',
  'x-ms-client-request-id',
  '13ab7ad4-ee7a-459f-8b85-3358d4f7f0dc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:17 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647741704520/dir157376647790604905')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:18 GMT',
  'ETag',
  '"0x8D7694896A92799"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06991014-e01a-005e-3131-9b95ff000000',
  'x-ms-client-request-id',
  '778dcefd-c0b6-4f1d-8f8c-0610c4cb8671',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:18.2444441Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:18.2444441Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:18.2444441Z',
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
  'Thu, 14 Nov 2019 21:21:17 GMT' ]);

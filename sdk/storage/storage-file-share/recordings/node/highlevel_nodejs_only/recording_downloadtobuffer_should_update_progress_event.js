let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647450909693","dir":"dir157376647484507636","file":"file157376647519105392"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647450909693')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:14 GMT',
  'ETag',
  '"0x8D7694894A105C1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'ff38eb5d-301a-0018-3331-9b4b69000000',
  'x-ms-client-request-id',
  '8404d45c-1319-41b5-815a-060ddecb4fa7',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:14 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647450909693/dir157376647484507636')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:15 GMT',
  'ETag',
  '"0x8D7694894D4AE9A"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'caa7a824-a01a-0034-1931-9bc954000000',
  'x-ms-client-request-id',
  '4277f195-d68b-4319-83a2-f58024e14907',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:15.1742618Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:15.1742618Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:15.1742618Z',
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
  'Thu, 14 Nov 2019 21:21:14 GMT' ]);

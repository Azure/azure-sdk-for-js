let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647828604816","dir":"dir157376647861800380","file":"file157376647897100833"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647828604816')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:18 GMT',
  'ETag',
  '"0x8D7694896E0AF27"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '06991017-e01a-005e-3231-9b95ff000000',
  'x-ms-client-request-id',
  '6f80826c-7199-4606-b07a-03705baebe2d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:17 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647828604816/dir157376647861800380')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:18 GMT',
  'ETag',
  '"0x8D769489714CE3D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1367cd25-301a-0013-6831-9b531d000000',
  'x-ms-client-request-id',
  '255e22ba-15cf-4b0a-a36f-8b3a893efef6',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:18.9499453Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:18.9499453Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:18.9499453Z',
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
  'Thu, 14 Nov 2019 21:21:18 GMT' ]);

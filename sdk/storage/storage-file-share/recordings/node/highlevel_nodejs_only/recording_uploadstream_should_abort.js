let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376646959504311","dir":"dir157376646993806034","file":"file157376647029705472"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646959504311')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:09 GMT',
  'ETag',
  '"0x8D7694891B38B01"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb70b24f-201a-0043-1031-9b4c15000000',
  'x-ms-client-request-id',
  '7e31b154-65a5-4c49-9606-fb435207080b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:09 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376646959504311/dir157376646993806034')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:10 GMT',
  'ETag',
  '"0x8D7694891E85115"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8393f784-401a-0017-4031-9ba69f000000',
  'x-ms-client-request-id',
  'f54018ab-e9b1-48ec-abc2-0cca774f7109',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:10.2697749Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:10.2697749Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:10.2697749Z',
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
  'Thu, 14 Nov 2019 21:21:10 GMT' ]);

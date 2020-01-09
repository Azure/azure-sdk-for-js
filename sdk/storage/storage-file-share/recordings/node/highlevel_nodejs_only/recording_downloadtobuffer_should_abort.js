let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647366000445","dir":"dir157376647400408729","file":"file157376647450501984"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647366000445')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:13 GMT',
  'ETag',
  '"0x8D7694894203BF7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf3f6d53-801a-004e-7431-9ba319000000',
  'x-ms-client-request-id',
  'c3903e17-9a7a-4ef2-8064-35d0578ed9a1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:13 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647366000445/dir157376647400408729')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:14 GMT',
  'ETag',
  '"0x8D769489469561F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '79982b4d-501a-0047-7e31-9bb997000000',
  'x-ms-client-request-id',
  'c40c5bf7-0dbd-43a5-b4f4-e2553ef011af',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:14.4707615Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:14.4707615Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:14.4707615Z',
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

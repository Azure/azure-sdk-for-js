let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"share":"share157376647670604020","dir":"dir157376647705204848","file":"file157376647741306107"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647670604020')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:17 GMT',
  'ETag',
  '"0x8D7694895F0BFE8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '493d267c-201a-0048-2331-9b5461000000',
  'x-ms-client-request-id',
  '1419c4fe-f9c9-4c66-946b-d1f0de76fabc',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 14 Nov 2019 21:21:16 GMT' ]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share157376647670604020/dir157376647705204848')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 14 Nov 2019 21:21:17 GMT',
  'ETag',
  '"0x8D769489625AED6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e8f3695c-f01a-0068-7d31-9b38ad000000',
  'x-ms-client-request-id',
  'efcc7bb6-9917-4091-bb42-31e28380ec56',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-11-14T21:21:17.3828310Z',
  'x-ms-file-last-write-time',
  '2019-11-14T21:21:17.3828310Z',
  'x-ms-file-creation-time',
  '2019-11-14T21:21:17.3828310Z',
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
  'Thu, 14 Nov 2019 21:21:16 GMT' ]);

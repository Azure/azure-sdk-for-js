let nock = require('nock');

module.exports.testInfo = {"share":"share156882665146902984","dir":"dir156882665238308563"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156882665146902984')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 18 Sep 2019 17:10:51 GMT',
  'ETag',
  '"0x8D73C5B28A203C7"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6c178dc0-901a-0055-1144-6edb01000000',
  'x-ms-client-request-id',
  '8de82129-5ca4-44a1-bdc4-694407f86951',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 18 Sep 2019 17:10:51 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156882665146902984/dir156882665238308563')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 18 Sep 2019 17:10:52 GMT',
  'ETag',
  '"0x8D73C5B28E7553F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '29e203bc-f01a-012c-2844-6ef41e000000',
  'x-ms-client-request-id',
  'ed9a5b6c-75a4-4822-a87e-bf32016dc9a2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-file-change-time',
  '2019-09-18T17:10:52.2154303Z',
  'x-ms-file-last-write-time',
  '2019-09-18T17:10:52.2154303Z',
  'x-ms-file-creation-time',
  '2019-09-18T17:10:52.2154303Z',
  'x-ms-file-permission-key',
  '15246684120248489204*13496228697838683005',
  'x-ms-file-attributes',
  'Directory',
  'x-ms-file-id',
  '13835128424026341376',
  'x-ms-file-parent-id',
  '0',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Wed, 18 Sep 2019 17:10:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156882665146902984/dir156882665238308563')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults><Entries /><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28241b8d-e01a-001e-0144-6eea9b000000',
  'x-ms-client-request-id',
  'e7ba34ef-19e9-4e04-971f-b429d77ff886',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 18 Sep 2019 17:10:52 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156882665146902984')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bb343cb4-001a-00fa-1344-6ef991000000',
  'x-ms-client-request-id',
  'b5ae3d98-15ff-42d7-9765-7615957ffc25',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 18 Sep 2019 17:10:52 GMT' ]);


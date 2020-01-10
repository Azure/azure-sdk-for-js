let nock = require('nock');

module.exports.testInfo = {"share":"share156816842392809536"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842392809536x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:24 GMT',
  'ETag',
  '"0x8D7365E9A7AA426"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e71ce4fb-001a-0039-3a47-682658000000',
  'x-ms-client-request-id',
  '433d2efc-aee7-443a-946d-ae456d44da1f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842392809536x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:24 GMT',
  'ETag',
  '"0x8D7365E9ABA8910"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '17ccfcab-401a-0035-3247-68c8a9000000',
  'x-ms-client-request-id',
  'd3f14d56-b7de-4844-887f-de21f8f4cb93',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816842392809536</Prefix><Shares><Share><Name>share156816842392809536x1</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:24 GMT</Last-Modified><Etag>\"0x8D7365E9A7AA426\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156816842392809536x2</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:24 GMT</Last-Modified><Etag>\"0x8D7365E9ABA8910\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '81abde8d-801a-0067-5c47-68d55b000000',
  'x-ms-client-request-id',
  'a1d0980f-1d13-4112-a77d-cfe0cba81349',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:24 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842392809536x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3f32e8e7-d01a-0012-0747-6852e0000000',
  'x-ms-client-request-id',
  'f24dc171-9d25-4166-a1f3-0daf34d29592',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:24 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842392809536x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb119854-001a-0032-6347-683e2c000000',
  'x-ms-client-request-id',
  'a45d632c-923e-4dd0-be7a-6906bc3deca0',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:25 GMT' ]);


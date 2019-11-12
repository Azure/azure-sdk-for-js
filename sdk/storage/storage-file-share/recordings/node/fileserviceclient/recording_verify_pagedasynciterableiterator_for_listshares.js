let nock = require('nock');

module.exports.testInfo = {"share":"share156816842172002073"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842172002073x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:22 GMT',
  'ETag',
  '"0x8D7365E99296F74"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '859541a1-901a-0015-2a47-68a465000000',
  'x-ms-client-request-id',
  '168179ea-12bf-4cc1-8c64-46f8855f5e43',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842172002073x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:22 GMT',
  'ETag',
  '"0x8D7365E996A0841"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c10fb9e3-301a-0013-2647-68531d000000',
  'x-ms-client-request-id',
  '694e7c42-c5cd-4eae-9088-4becc28d8cda',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:21 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816842172002073</Prefix><Shares><Share><Name>share156816842172002073x1</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:22 GMT</Last-Modified><Etag>\"0x8D7365E99296F74\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156816842172002073x2</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:22 GMT</Last-Modified><Etag>\"0x8D7365E996A0841\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3257de26-601a-000b-6647-687e88000000',
  'x-ms-client-request-id',
  '44b113e6-4072-478c-9367-0559f56d4758',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:22 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842172002073x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd8064eb0-901a-005a-5e47-68607d000000',
  'x-ms-client-request-id',
  'f3869352-ff75-48c1-b67b-7cc818a47145',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842172002073x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ca5366d-e01a-0033-0947-683fd1000000',
  'x-ms-client-request-id',
  'ac2712e1-21c1-41ae-8fba-445f95d6e207',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:23 GMT' ]);


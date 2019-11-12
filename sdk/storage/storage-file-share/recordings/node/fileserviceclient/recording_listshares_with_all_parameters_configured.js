let nock = require('nock');

module.exports.testInfo = {"share":"share156816841912405288"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841912405288x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:19 GMT',
  'ETag',
  '"0x8D7365E979D2032"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cb11984c-001a-0032-6147-683e2c000000',
  'x-ms-client-request-id',
  'ba918bfc-c91a-482a-9770-59c2030b022d',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:19 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816841912405288x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:19 GMT',
  'ETag',
  '"0x8D7365E97DCDD01"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8595419b-901a-0015-2747-68a465000000',
  'x-ms-client-request-id',
  '19ccff16-077f-4d81-96ef-e4978ca21138',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:19 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816841912405288</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share156816841912405288x1</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:19 GMT</Last-Modified><Etag>\"0x8D7365E979D2032\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156816841912405288x2/01D5684775661E46/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8f38ff91-f01a-0041-2347-684eef000000',
  'x-ms-client-request-id',
  'cfd2eaaa-71a4-4a20-9895-a92788d5fe8c',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:19 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816841912405288</Prefix><Marker>/fakestorageaccount/share156816841912405288x2/01D5684775661E46/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share156816841912405288x2</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:19 GMT</Last-Modified><Etag>\"0x8D7365E97DCDD01\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4ae131e6-201a-0043-5947-684c15000000',
  'x-ms-client-request-id',
  '21170bf9-4cea-4a82-bab6-5e5ef9acb1b3',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:19 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816841912405288x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cefd3555-a01a-003f-5a47-68d120000000',
  'x-ms-client-request-id',
  '1b6be9ca-cd17-45d9-a0b9-8cb9e1293b09',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:20 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816841912405288x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a99d1493-901a-003c-1a47-68d227000000',
  'x-ms-client-request-id',
  '7792fa6c-3ccc-4f0d-bb39-388ce33a6fb8',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:20 GMT' ]);


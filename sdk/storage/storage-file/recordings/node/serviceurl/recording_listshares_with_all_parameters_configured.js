let nock = require('nock');

module.exports.testInfo = {"share":"share156093655829902758"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093655829902758x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:26:16 GMT',
  'ETag',
  '"0x8D6F4982E3BC692"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'abee30b9-501a-003f-0581-26894a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:26:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156093655829902758x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 19 Jun 2019 09:26:17 GMT',
  'ETag',
  '"0x8D6F4982E64CBE1"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8325c8d9-f01a-011f-7481-26a3d3000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:26:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156093655829902758</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share156093655829902758x1</Name><Properties><Last-Modified>Wed, 19 Jun 2019 09:26:16 GMT</Last-Modified><Etag>\"0x8D6F4982E3BC692\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156093655829902758x2/01D526810BEE5590/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f883f78d-f01a-005f-7181-26cc68000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:26:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156093655829902758</Prefix><Marker>/fakestorageaccount/share156093655829902758x2/01D526810BEE5590/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share156093655829902758x2</Name><Properties><Last-Modified>Wed, 19 Jun 2019 09:26:17 GMT</Last-Modified><Etag>\"0x8D6F4982E64CBE1\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4663d87f-d01a-0084-3981-2668be000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 19 Jun 2019 09:26:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093655829902758x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3cf0a0fb-101a-00d6-3081-26754c000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:26:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156093655829902758x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3074da51-e01a-0069-2e81-26613a000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Wed, 19 Jun 2019 09:26:17 GMT',
  'Connection',
  'close' ]);


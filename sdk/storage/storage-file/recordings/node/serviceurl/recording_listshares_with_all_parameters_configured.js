let nock = require('nock');

module.exports.testInfo = {"share":"share156044264509408715"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044264509408715x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:17:10 GMT',
  'ETag',
  '"0x8D6EFDFE9E54AEC"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '840ae6d5-901a-002b-47c8-210e29000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:17:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044264509408715x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:17:10 GMT',
  'ETag',
  '"0x8D6EFDFEA1A939D"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c458e196-701a-00a2-4dc8-21b70d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:17:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156044264509408715</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share156044264509408715x1</Name><Properties><Last-Modified>Thu, 13 Jun 2019 09:17:10 GMT</Last-Modified><Etag>\"0x8D6EFDFE9E54AEC\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156044264509408715x2/01D521C8C7B60A45/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9dab560-e01a-00ca-4fc8-21e95c000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:17:10 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156044264509408715</Prefix><Marker>/fakestorageaccount/share156044264509408715x2/01D521C8C7B60A45/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share156044264509408715x2</Name><Properties><Last-Modified>Thu, 13 Jun 2019 09:17:10 GMT</Last-Modified><Etag>\"0x8D6EFDFEA1A939D\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '650f07f1-b01a-0051-4cc8-216464000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:17:11 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044264509408715x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbd04cd5-d01a-008d-4ec8-213637000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:17:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156044264509408715x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a90ca978-201a-00dc-01c8-2128c2000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:17:14 GMT',
  'Connection',
  'close' ]);


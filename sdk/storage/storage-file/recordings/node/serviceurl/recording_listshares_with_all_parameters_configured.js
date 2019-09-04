let nock = require('nock');

module.exports.testInfo = {"share":"share156758481645102134"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758481645102134x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:36 GMT',
  'ETag',
  '"0x8D7310FC9441BDE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '53ac6809-e01a-00a4-1bf8-62fe25000000',
  'x-ms-client-request-id',
  'a8f3d2b4-a88d-4ca3-8fd7-10839fefdd6b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156758481645102134x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 04 Sep 2019 08:13:37 GMT',
  'ETag',
  '"0x8D7310FC9864C5F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6bc3ab67-d01a-00bf-67f8-62c026000000',
  'x-ms-client-request-id',
  '6242d8dc-fced-4945-baa0-4d88cafab49b',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:36 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156758481645102134</Prefix><MaxResults>1</MaxResults><Shares><Share><Name>share156758481645102134x1</Name><Properties><Last-Modified>Wed, 04 Sep 2019 08:13:36 GMT</Last-Modified><Etag>\"0x8D7310FC9441BDE\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156758481645102134x2/01D562F8A7119503/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '27d605e8-d01a-0090-0df8-62cded000000',
  'x-ms-client-request-id',
  '0495d83d-0e6b-4b20-bd72-b8b8d5a0cdab',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156758481645102134</Prefix><Marker>/fakestorageaccount/share156758481645102134x2/01D562F8A7119503/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>1</MaxResults><Shares><Share><Name>share156758481645102134x2</Name><Properties><Last-Modified>Wed, 04 Sep 2019 08:13:37 GMT</Last-Modified><Etag>\"0x8D7310FC9864C5F\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'dfe54642-b01a-00b9-09f8-62f399000000',
  'x-ms-client-request-id',
  '1fc9a9ed-98de-4000-b16f-3e39445a4246',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 04 Sep 2019 08:13:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758481645102134x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b2263077-301a-007c-4cf8-62d97c000000',
  'x-ms-client-request-id',
  '93d98cbb-fc73-41df-95c5-215d25410475',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:37 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156758481645102134x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '676432c7-f01a-003e-0df8-6260fc000000',
  'x-ms-client-request-id',
  '04e16710-bad2-4eeb-bb13-354faa7be714',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 08:13:38 GMT',
  'Connection',
  'close' ]);


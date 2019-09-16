let nock = require('nock');

module.exports.testInfo = {"share":"share156816842608500442"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842608500442x0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:26 GMT',
  'ETag',
  '"0x8D7365E9BC423D5"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bf05eba6-701a-0014-2547-68a598000000',
  'x-ms-client-request-id',
  '287e877b-11e6-4e70-a364-eede7c9b26cf',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:26 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842608500442x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:26 GMT',
  'ETag',
  '"0x8D7365E9C05868F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fd8fa32b-b01a-0046-7647-68b86a000000',
  'x-ms-client-request-id',
  '8dab409a-0c83-47c0-a722-080dbac2ae85',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:26 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842608500442x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:27 GMT',
  'ETag',
  '"0x8D7365E9C44D759"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '54a3cc8f-801a-0023-6347-680937000000',
  'x-ms-client-request-id',
  'a241335d-8ee0-48f0-a382-a18f38030ef3',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:27 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156816842608500442x3')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 11 Sep 2019 02:20:27 GMT',
  'ETag',
  '"0x8D7365E9C863A50"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3115b90b-501a-0065-7e47-68d7a1000000',
  'x-ms-client-request-id',
  '41d41311-a7f8-40a9-9174-e91f64e8e50f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:27 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816842608500442</Prefix><MaxResults>2</MaxResults><Shares><Share><Name>share156816842608500442x0</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:26 GMT</Last-Modified><Etag>\"0x8D7365E9BC423D5\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156816842608500442x1</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:26 GMT</Last-Modified><Etag>\"0x8D7365E9C05868F\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156816842608500442x2/01D5684779CE17E2/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4021a300-e01a-001a-4b47-684993000000',
  'x-ms-client-request-id',
  '873295a8-cc2b-49a5-8f24-e42ee2c75ff3',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:27 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156816842608500442</Prefix><Marker>/fakestorageaccount/share156816842608500442x2/01D5684779CE17E2/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>2</MaxResults><Shares><Share><Name>share156816842608500442x2</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:27 GMT</Last-Modified><Etag>\"0x8D7365E9C44D759\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156816842608500442x3</Name><Properties><Last-Modified>Wed, 11 Sep 2019 02:20:27 GMT</Last-Modified><Etag>\"0x8D7365E9C863A50\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '26c202c3-101a-0062-4047-682124000000',
  'x-ms-client-request-id',
  'dcd86df1-f1e2-4645-986b-6b612cb275fc',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 11 Sep 2019 02:20:28 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842608500442x0')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a99d14a9-901a-003c-1c47-68d227000000',
  'x-ms-client-request-id',
  '51335012-db37-4152-bf38-24e69d4b2165',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:28 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842608500442x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bcc18c2c-b01a-0064-1247-68d65c000000',
  'x-ms-client-request-id',
  '6dda1499-ff76-4cb5-a1cb-2981aa2c295c',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:28 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842608500442x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f3b8d06b-601a-0029-3447-6810be000000',
  'x-ms-client-request-id',
  '8376a366-5146-42ed-acc8-e25f0b28d96f',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:28 GMT' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156816842608500442x3')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1e1ba708-001a-0010-2747-68501a000000',
  'x-ms-client-request-id',
  '3875d576-e583-46fd-905e-befc051e3b33',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:20:30 GMT' ]);


let nock = require('nock');

module.exports.testInfo = {"share":"share156150556597004381"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556597004381x0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:46 GMT',
  'ETag',
  '"0x8D6F9C56D9A4E78"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8936626c-c01a-00bb-36ae-2b9b65000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556597004381x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:46 GMT',
  'ETag',
  '"0x8D6F9C56DCA511C"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd9c8b6a0-e01a-008e-40ae-2b3530000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556597004381x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:46 GMT',
  'ETag',
  '"0x8D6F9C56E0C5FB9"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd04d1f37-e01a-0006-72ae-2b8de9000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556597004381x3')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:47 GMT',
  'ETag',
  '"0x8D6F9C56E47E9C2"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e7cb58d0-e01a-00ac-18ae-2b5b06000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:46 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156150556597004381</Prefix><MaxResults>2</MaxResults><Shares><Share><Name>share156150556597004381x0</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:46 GMT</Last-Modified><Etag>\"0x8D6F9C56D9A4E78\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156150556597004381x1</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:46 GMT</Last-Modified><Etag>\"0x8D6F9C56DCA511C\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156150556597004381x2/01D52BAE4B9845EB/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '65889b83-901a-0020-4dae-2b165d000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:32:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156150556597004381</Prefix><Marker>/fakestorageaccount/share156150556597004381x2/01D52BAE4B9845EB/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>2</MaxResults><Shares><Share><Name>share156150556597004381x2</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:46 GMT</Last-Modified><Etag>\"0x8D6F9C56E0C5FB9\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156150556597004381x3</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:47 GMT</Last-Modified><Etag>\"0x8D6F9C56E47E9C2\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0c7454e6-f01a-0074-38ae-2bfcd7000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:32:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556597004381x0')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '7543deab-701a-008b-64ae-2bc14f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:47 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556597004381x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '31045578-d01a-004a-41ae-2b4af6000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:48 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556597004381x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e05309b8-f01a-00b8-4aae-2b9862000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:49 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556597004381x3')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c3acfcab-001a-006a-60ae-2b263a000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:49 GMT',
  'Connection',
  'close' ]);


let nock = require('nock');

module.exports.testInfo = {"share":"share156150556285909368"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556285909368x0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:43 GMT',
  'ETag',
  '"0x8D6F9C56BC05A44"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2b43752b-101a-0031-57ae-2b2146000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556285909368x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:43 GMT',
  'ETag',
  '"0x8D6F9C56BEEA60B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e0819df7-001a-0043-5fae-2b5078000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556285909368x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:43 GMT',
  'ETag',
  '"0x8D6F9C56C261B25"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a3a08fd1-501a-00b5-6eae-2b776e000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156150556285909368x3')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Jun 2019 23:32:44 GMT',
  'ETag',
  '"0x8D6F9C56C54EADE"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b29ba468-d01a-00eb-2cae-2b846d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156150556285909368</Prefix><MaxResults>2</MaxResults><Shares><Share><Name>share156150556285909368x0</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:43 GMT</Last-Modified><Etag>\"0x8D6F9C56BC05A44\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156150556285909368x1</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:43 GMT</Last-Modified><Etag>\"0x8D6F9C56BEEA60B\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker>/fakestorageaccount/share156150556285909368x2/01D52BAE49AF7DC1/9999-12-31T23:59:59.9999999Z</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f8626a9-701a-00c4-80ae-2b0557000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:32:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Prefix>share156150556285909368</Prefix><Marker>/fakestorageaccount/share156150556285909368x2/01D52BAE49AF7DC1/9999-12-31T23:59:59.9999999Z</Marker><MaxResults>2</MaxResults><Shares><Share><Name>share156150556285909368x2</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:43 GMT</Last-Modified><Etag>\"0x8D6F9C56C261B25\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share><Share><Name>share156150556285909368x3</Name><Properties><Last-Modified>Tue, 25 Jun 2019 23:32:44 GMT</Last-Modified><Etag>\"0x8D6F9C56C54EADE\"</Etag><Quota>5120</Quota></Properties><Metadata><key>val</key></Metadata></Share></Shares><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '48e32e83-201a-0098-55ae-2bf4ae000000',
  'x-ms-version',
  '2018-03-28',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Jun 2019 23:32:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556285909368x0')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cea1d7df-101a-0013-78ae-2b4f70000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556285909368x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3551f5aa-101a-00b9-52ae-2b999f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556285909368x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c1efb01-901a-00e7-13ae-2b6a9c000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156150556285909368x3')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '439638e7-301a-002d-55ae-2bf951000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 23:32:45 GMT',
  'Connection',
  'close' ]);


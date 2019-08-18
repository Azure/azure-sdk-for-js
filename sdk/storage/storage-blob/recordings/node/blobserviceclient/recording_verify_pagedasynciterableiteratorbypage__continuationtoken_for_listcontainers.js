let nock = require('nock');

module.exports.testInfo = {"container":"container156599413408905448"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599413408905448x0')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'ETag',
  '"0x8D7229830AE9AE9"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b6963d3f-001e-0007-2e81-548c14000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:13 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599413408905448x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'ETag',
  '"0x8D7229830E26508"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4c76199b-b01e-00b4-2d81-547693000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599413408905448x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'ETag',
  '"0x8D72298310F8605"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '49d5d558-401e-0044-5e81-54a6fd000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156599413408905448x3')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 16 Aug 2019 22:22:15 GMT',
  'ETag',
  '"0x8D72298313DDF1D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9597d389-a01e-0067-4381-54c936000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>container156599413408905448</Prefix><MaxResults>2</MaxResults><Containers><Container><Name>container156599413408905448x0</Name><Properties><Last-Modified>Fri, 16 Aug 2019 22:22:14 GMT</Last-Modified><Etag>\"0x8D7229830AE9AE9\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container><Container><Name>container156599413408905448x1</Name><Properties><Last-Modified>Fri, 16 Aug 2019 22:22:14 GMT</Last-Modified><Etag>\"0x8D7229830E26508\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker>/fakestorageaccount/container156599413408905448x2</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96a14798-701e-0008-5781-5461e2000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>container156599413408905448</Prefix><Marker>/fakestorageaccount/container156599413408905448x2</Marker><MaxResults>2</MaxResults><Containers><Container><Name>container156599413408905448x2</Name><Properties><Last-Modified>Fri, 16 Aug 2019 22:22:14 GMT</Last-Modified><Etag>\"0x8D72298310F8605\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container><Container><Name>container156599413408905448x3</Name><Properties><Last-Modified>Fri, 16 Aug 2019 22:22:15 GMT</Last-Modified><Etag>\"0x8D72298313DDF1D\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aceabe00-001e-00e9-0681-548697000000',
  'x-ms-version',
  '2018-11-09',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 16 Aug 2019 22:22:14 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156599413408905448x0')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd0eab1ea-301e-002d-0c81-54f951000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156599413408905448x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c59b2e32-a01e-00c6-3f81-5407ad000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:17 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156599413408905448x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9597d7a1-a01e-0067-6a81-54c936000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:16 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156599413408905448x3')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'aceac0b4-001e-00e9-5581-548697000000',
  'x-ms-version',
  '2018-11-09',
  'Date',
  'Fri, 16 Aug 2019 22:22:17 GMT',
  'Connection',
  'close' ]);


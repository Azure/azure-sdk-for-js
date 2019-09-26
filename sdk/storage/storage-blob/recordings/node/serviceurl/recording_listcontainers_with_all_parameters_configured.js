let nock = require('nock');

module.exports.testInfo = {"container":"container156776206137807142"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776206137807142x1')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:41 GMT',
  'ETag',
  '"0x8D732AC777D1665"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8027ba8b-101e-0019-5a95-647738000000',
  'x-ms-client-request-id',
  '54a7f7ec-cda3-4367-bf4a-645e00882d49',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:40 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776206137807142x2')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:27:42 GMT',
  'ETag',
  '"0x8D732AC77BA1CFA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a5e53a08-401e-00cf-6c95-6479d1000000',
  'x-ms-client-request-id',
  '3149bdaf-4244-4583-bd8c-031f2d86f806',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>container156776206137807142</Prefix><MaxResults>1</MaxResults><Containers><Container><Name>container156776206137807142x1</Name><Properties><Last-Modified>Fri, 06 Sep 2019 09:27:41 GMT</Last-Modified><Etag>\"0x8D732AC777D1665\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker>/fakestorageaccount/container156776206137807142x2</NextMarker></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df2106f3-901e-0007-4095-649be0000000',
  'x-ms-client-request-id',
  '8d9e006a-7c58-43c2-b3cc-72bba543e401',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:27:41 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Prefix>container156776206137807142</Prefix><Marker>/fakestorageaccount/container156776206137807142x2</Marker><MaxResults>1</MaxResults><Containers><Container><Name>container156776206137807142x2</Name><Properties><Last-Modified>Fri, 06 Sep 2019 09:27:42 GMT</Last-Modified><Etag>\"0x8D732AC77BA1CFA\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties><Metadata><key>val</key></Metadata></Container></Containers><NextMarker /></EnumerationResults>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '70b0a4fb-901e-0118-0695-64d6e9000000',
  'x-ms-client-request-id',
  'c81e55df-97c9-4e7b-815c-ec46e4d04461',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:27:42 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776206137807142x1')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cf0e9663-301e-00ea-5295-64d0ad000000',
  'x-ms-client-request-id',
  '54266135-64ca-4fad-8e06-8cef055370a6',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:43 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776206137807142x2')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '6f05055a-801e-009d-6895-640539000000',
  'x-ms-client-request-id',
  '033046bb-0744-4091-b402-afc2d4b0d504',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:27:43 GMT',
  'Connection',
  'close' ]);


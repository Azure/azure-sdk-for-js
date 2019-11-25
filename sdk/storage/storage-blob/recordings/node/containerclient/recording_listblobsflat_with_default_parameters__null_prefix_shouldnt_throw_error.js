let nock = require('nock');

module.exports.testInfo = {"uniqueName":{"container":"container157437874225702943","blockblob/0":"blockblob/0157437874232102547","blockblob/1":"blockblob/1157437874236908002","blockblob/2":"blockblob/2157437874241604499"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437874225702943')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:25:42 GMT',
  'ETag',
  '"0x8D76EDA2078A923"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c85d40f6-e01e-0060-76c2-a003c0000000',
  'x-ms-client-request-id',
  '780f4cae-b47d-45e9-9fe1-a54a3f4c14ee',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 21 Nov 2019 23:25:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437874225702943/blockblob%2F0157437874232102547')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:25:42 GMT',
  'ETag',
  '"0x8D76EDA2080CE80"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e4084ef-801e-0049-5bc2-a03db4000000',
  'x-ms-client-request-id',
  '3736550d-0869-4b81-8e15-321c8fe7ac9e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:25:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437874225702943/blockblob%2F1157437874236908002')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:25:42 GMT',
  'ETag',
  '"0x8D76EDA2087D4A8"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '96d703b7-b01e-0099-15c2-a000e2000000',
  'x-ms-client-request-id',
  'c177489f-5701-4f56-a1c9-0e66aafc6e51',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:25:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container157437874225702943/blockblob%2F2157437874241604499')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 21 Nov 2019 23:25:42 GMT',
  'ETag',
  '"0x8D76EDA208F28FE"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '382d2a6e-d01e-006b-5bc2-a0f8ab000000',
  'x-ms-client-request-id',
  '8b276f9a-f6aa-49ec-b93c-731b093194e4',
  'x-ms-version',
  '2019-02-02',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:25:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container157437874225702943')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container157437874225702943\"><Blobs><Blob><Name>blockblob/0157437874232102547</Name><Properties><Creation-Time>Thu, 21 Nov 2019 23:25:42 GMT</Creation-Time><Last-Modified>Thu, 21 Nov 2019 23:25:42 GMT</Last-Modified><Etag>0x8D76EDA2080CE80</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blockblob/1157437874236908002</Name><Properties><Creation-Time>Thu, 21 Nov 2019 23:25:42 GMT</Creation-Time><Last-Modified>Thu, 21 Nov 2019 23:25:42 GMT</Last-Modified><Etag>0x8D76EDA2087D4A8</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob><Blob><Name>blockblob/2157437874241604499</Name><Properties><Creation-Time>Thu, 21 Nov 2019 23:25:42 GMT</Creation-Time><Last-Modified>Thu, 21 Nov 2019 23:25:42 GMT</Last-Modified><Etag>0x8D76EDA208F28FE</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c85d415a-e01e-0060-51c2-a003c0000000',
  'x-ms-client-request-id',
  'c3093927-242c-4306-9fd2-c3624d67b28c',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 21 Nov 2019 23:25:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437874225702943/blockblob%2F0157437874232102547')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '39740b8f-601e-001c-2dc2-a02d3f000000',
  'x-ms-client-request-id',
  '66d96529-a145-4aab-a767-05cb6bd0dc16',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:25:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437874225702943/blockblob%2F1157437874236908002')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8919fcf4-901e-0037-6ac2-a0adf3000000',
  'x-ms-client-request-id',
  '07ae2b8c-1bf2-47fc-8fa7-25b7bf33c511',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:25:41 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437874225702943/blockblob%2F2157437874241604499')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f00aa8bb-801e-003b-4ec2-a03afb000000',
  'x-ms-client-request-id',
  'c6cc1b0f-2c32-4bb6-81b0-816b3bde3472',
  'x-ms-version',
  '2019-02-02',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Thu, 21 Nov 2019 23:25:42 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container157437874225702943')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c85d41b5-e01e-0060-2ac2-a003c0000000',
  'x-ms-client-request-id',
  '742e10b9-d2da-4422-b388-75e9fd6ed8fd',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Thu, 21 Nov 2019 23:25:41 GMT'
]);

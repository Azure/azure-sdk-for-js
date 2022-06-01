let nock = require('nock');

module.exports.hash = "f8306cff267e3c7a75e734f991cfcd79";

module.exports.testInfo = {"uniqueName":{"container":"container163764847274901088"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847274901088')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:12 GMT',
  'ETag',
  '"0x8D9AE4972A81FE8"',
  'x-ms-request-id',
  'e1793313-501e-0003-1432-e07981000000',
  'x-ms-client-request-id',
  '90542033-dd83-4e5a-a9db-fa4c35513c18',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847274901088/dir1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:13 GMT',
  'ETag',
  '"0x8D9AE4972CEB190"',
  'x-ms-request-id',
  'e1793317-501e-0003-1632-e07981000000',
  'x-ms-client-request-id',
  '615f5558-c221-437e-a318-2444d6dc4ace',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163764847274901088')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163764847274901088\"><Blobs><Blob><Name Encoded=\"true\">dir1%2Fdir2%2Ffile%EF%BF%BF.blob</Name><Properties><Creation-Time>Tue, 23 Nov 2021 06:21:13 GMT</Creation-Time><Last-Modified>Tue, 23 Nov 2021 06:21:13 GMT</Last-Modified><Etag>0x8D9AE4972CEB190</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e1793318-501e-0003-1732-e07981000000',
  'x-ms-client-request-id',
  '4a87dac8-66b1-47b5-8f0c-a44e34ebaf57',
  'x-ms-version',
  '2021-02-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 23 Nov 2021 06:21:12 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847274901088/dir1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793319-501e-0003-1832-e07981000000',
  'x-ms-client-request-id',
  '85207475-3c90-47c6-9c2b-cae32742a960',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847274901088')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e179331a-501e-0003-1932-e07981000000',
  'x-ms-client-request-id',
  '195e4cd0-3e67-49a5-b8f7-c15fd4229d03',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:13 GMT'
]);

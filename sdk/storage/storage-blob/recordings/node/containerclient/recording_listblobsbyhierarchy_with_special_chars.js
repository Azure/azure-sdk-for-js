let nock = require('nock');

module.exports.hash = "7895766adedc1280487f734293ac3e86";

module.exports.testInfo = {"uniqueName":{"container":"container163764847619608209"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847619608209')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:16 GMT',
  'ETag',
  '"0x8D9AE4974B50685"',
  'x-ms-request-id',
  'e1793327-501e-0003-2532-e07981000000',
  'x-ms-client-request-id',
  '62c96823-4f31-4eca-9d6d-545f896fa940',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847619608209/dir%EF%BF%BF1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:16 GMT',
  'ETag',
  '"0x8D9AE4974DB984A"',
  'x-ms-request-id',
  'e1793329-501e-0003-2632-e07981000000',
  'x-ms-client-request-id',
  'fdbadd3a-5157-496b-8a4c-bd7e24b5de4b',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847619608209/NormalBlob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:16 GMT',
  'ETag',
  '"0x8D9AE4975110009"',
  'x-ms-request-id',
  'e179332a-501e-0003-2732-e07981000000',
  'x-ms-client-request-id',
  'cb3e0d98-fffe-40ee-9d0d-97a59f3ea11e',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847619608209/file%EF%BF%BF.blob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:17 GMT',
  'ETag',
  '"0x8D9AE4975363D18"',
  'x-ms-request-id',
  'e179332b-501e-0003-2832-e07981000000',
  'x-ms-client-request-id',
  'fe07bd51-1950-4feb-a5c3-764add8eb95b',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764847619608209/dir%2FNormalBlob')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:17 GMT',
  'ETag',
  '"0x8D9AE49755B4F78"',
  'x-ms-request-id',
  'e179332c-501e-0003-2932-e07981000000',
  'x-ms-client-request-id',
  '583d8b84-1277-4601-8210-7223b32c6535',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163764847619608209')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163764847619608209\"><Delimiter>/</Delimiter><Blobs><Blob><Name>NormalBlob</Name><Properties><Creation-Time>Tue, 23 Nov 2021 06:21:16 GMT</Creation-Time><Last-Modified>Tue, 23 Nov 2021 06:21:16 GMT</Last-Modified><Etag>0x8D9AE4975110009</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><BlobPrefix><Name>dir/</Name></BlobPrefix><BlobPrefix><Name Encoded=\"true\">dir%EF%BF%BF1%2F</Name></BlobPrefix><Blob><Name Encoded=\"true\">file%EF%BF%BF.blob</Name><Properties><Creation-Time>Tue, 23 Nov 2021 06:21:17 GMT</Creation-Time><Last-Modified>Tue, 23 Nov 2021 06:21:17 GMT</Last-Modified><Etag>0x8D9AE4975363D18</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e179332d-501e-0003-2a32-e07981000000',
  'x-ms-client-request-id',
  'fdc72464-175a-471a-b05c-665f04eca535',
  'x-ms-version',
  '2021-02-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 23 Nov 2021 06:21:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847619608209/dir%EF%BF%BF1%2Fdir2%2Ffile%EF%BF%BF.blob')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e179332e-501e-0003-2b32-e07981000000',
  'x-ms-client-request-id',
  '1d48979c-48b7-4b79-a72b-1e7fa627a1cb',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764847619608209')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e179332f-501e-0003-2c32-e07981000000',
  'x-ms-client-request-id',
  'c60e04de-15ee-4c87-b396-9d1ff97050ef',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:18 GMT'
]);

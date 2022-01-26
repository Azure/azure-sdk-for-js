let nock = require('nock');

module.exports.hash = "418d2dead90d038009be0c18a35991ca";

module.exports.testInfo = {"uniqueName":{"container":"container163764846946300799","blockblob/0":"blockblob/0163764847049508913","blockblob/1":"blockblob/1163764847075404687","blockblob/2":"blockblob/2163764847100203486"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764846946300799')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:10 GMT',
  'ETag',
  '"0x8D9AE497125C49D"',
  'x-ms-request-id',
  'e1793304-501e-0003-0932-e07981000000',
  'x-ms-client-request-id',
  'fd371097-dcb9-49e8-a9be-8aa50e328a16',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764846946300799/blockblob%2F0163764847049508913')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:10 GMT',
  'ETag',
  '"0x8D9AE497151AE92"',
  'x-ms-request-id',
  'e1793307-501e-0003-0a32-e07981000000',
  'x-ms-client-request-id',
  'c5711044-3c51-4a51-9cc9-fbfad8129867',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764846946300799/blockblob%2F1163764847075404687')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:10 GMT',
  'ETag',
  '"0x8D9AE497177AD2B"',
  'x-ms-request-id',
  'e1793308-501e-0003-0b32-e07981000000',
  'x-ms-client-request-id',
  '23405c1c-5b44-4206-8c6c-d733ffb4eb43',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163764846946300799/blockblob%2F2163764847100203486')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 23 Nov 2021 06:21:11 GMT',
  'ETag',
  '"0x8D9AE49719DD2AC"',
  'x-ms-request-id',
  'e1793309-501e-0003-0c32-e07981000000',
  'x-ms-client-request-id',
  '60f2adc1-251e-4270-a22a-8f694963d3a3',
  'x-ms-version',
  '2021-02-12',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:10 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container163764846946300799')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container163764846946300799\"><Blobs><Blob><Name>blockblob/0163764847049508913</Name><Properties><Creation-Time>Tue, 23 Nov 2021 06:21:10 GMT</Creation-Time><Last-Modified>Tue, 23 Nov 2021 06:21:10 GMT</Last-Modified><Etag>0x8D9AE497151AE92</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/1163764847075404687</Name><Properties><Creation-Time>Tue, 23 Nov 2021 06:21:10 GMT</Creation-Time><Last-Modified>Tue, 23 Nov 2021 06:21:10 GMT</Last-Modified><Etag>0x8D9AE497177AD2B</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob><Blob><Name>blockblob/2163764847100203486</Name><Properties><Creation-Time>Tue, 23 Nov 2021 06:21:11 GMT</Creation-Time><Last-Modified>Tue, 23 Nov 2021 06:21:11 GMT</Last-Modified><Etag>0x8D9AE49719DD2AC</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>false</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'x-ms-request-id',
  'e179330a-501e-0003-0d32-e07981000000',
  'x-ms-client-request-id',
  '43868828-52de-402c-8a2e-627a75ae8de5',
  'x-ms-version',
  '2021-02-12',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 23 Nov 2021 06:21:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764846946300799/blockblob%2F0163764847049508913')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e179330d-501e-0003-0e32-e07981000000',
  'x-ms-client-request-id',
  '81dd1865-3b8c-4297-9287-1d0b04342fb4',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764846946300799/blockblob%2F1163764847075404687')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e179330e-501e-0003-0f32-e07981000000',
  'x-ms-client-request-id',
  '9c0ce74a-1979-41be-a363-26f59092a8a3',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764846946300799/blockblob%2F2163764847100203486')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793310-501e-0003-1132-e07981000000',
  'x-ms-client-request-id',
  'fe31cc23-9e3b-4d41-bbd0-e1ed36d2625d',
  'x-ms-version',
  '2021-02-12',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 23 Nov 2021 06:21:11 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163764846946300799')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'e1793311-501e-0003-1232-e07981000000',
  'x-ms-client-request-id',
  '2007b266-137b-40f9-ae7e-d3f79d8197b5',
  'x-ms-version',
  '2021-02-12',
  'Date',
  'Tue, 23 Nov 2021 06:21:12 GMT'
]);

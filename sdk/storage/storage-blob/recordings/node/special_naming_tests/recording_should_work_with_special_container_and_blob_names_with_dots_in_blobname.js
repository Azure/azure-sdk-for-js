let nock = require('nock');

module.exports.hash = "a939465fdcb8818ec775dcdec8c4ba7f";

module.exports.testInfo = {"uniqueName":{"1container-with-dash":"1container-with-dash167517557371003842","/blobname/./blobname1/../blobname2/blobname3":"/blobname/./blobname1/../blobname2/blobname3167517557440402742"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash167517557371003842')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 31 Jan 2023 14:32:54 GMT',
  'ETag',
  '"0x8DB03980A451FE7"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a12f401-801e-0059-0f80-35633a000000',
  'x-ms-client-request-id',
  '41fccfd6-c98e-4c00-91bc-61b378688c50',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Tue, 31 Jan 2023 14:32:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/1container-with-dash167517557371003842//blobname/blobname2/blobname3167517557440402742', "A")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 31 Jan 2023 14:32:54 GMT',
  'ETag',
  '"0x8DB03980A593743"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a12f420-801e-0059-2a80-35633a000000',
  'x-ms-client-request-id',
  '014e81a7-2b87-41d1-a484-7604cd950709',
  'x-ms-version',
  '2021-10-04',
  'x-ms-content-crc64',
  'PiO3pTJ67n0=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2023-01-31T14:32:54.6598461Z',
  'Date',
  'Tue, 31 Jan 2023 14:32:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/1container-with-dash167517557371003842//blobname/blobname2/blobname3167517557440402742')
  .reply(200, "", [
  'Content-Length',
  '1',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'f8VicOenD6gaWTW3Lqy+KQ==',
  'Last-Modified',
  'Tue, 31 Jan 2023 14:32:54 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DB03980A593743"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a12f437-801e-0059-4080-35633a000000',
  'x-ms-client-request-id',
  '6371373c-b855-431c-ac64-b5cb3aa69333',
  'x-ms-version',
  '2021-10-04',
  'x-ms-version-id',
  '2023-01-31T14:32:54.6598461Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Tue, 31 Jan 2023 14:32:54 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-version-id,x-ms-is-current-version,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 31 Jan 2023 14:32:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/1container-with-dash167517557371003842')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"1container-with-dash167517557371003842\"><Prefix>/blobname/blobname2/blobname3</Prefix><Blobs><Blob><Name>/blobname/blobname2/blobname3167517557440402742</Name><VersionId>2023-01-31T14:32:54.6598461Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Tue, 31 Jan 2023 14:32:54 GMT</Creation-Time><Last-Modified>Tue, 31 Jan 2023 14:32:54 GMT</Last-Modified><Etag>0x8DB03980A593743</Etag><Content-Length>1</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>f8VicOenD6gaWTW3Lqy+KQ==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a12f450-801e-0059-5980-35633a000000',
  'x-ms-client-request-id',
  '4fb1f7ae-63e1-4063-a3c1-d4b19db74a84',
  'x-ms-version',
  '2021-10-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 31 Jan 2023 14:32:54 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/1container-with-dash167517557371003842')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4a12f47c-801e-0059-0180-35633a000000',
  'x-ms-client-request-id',
  '2901758c-d2ea-4e92-9379-abce6d18027b',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Tue, 31 Jan 2023 14:32:54 GMT'
]);

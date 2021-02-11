let nock = require('nock');

module.exports.hash = "078e6a6f2e700a11c763da2508207d10";

module.exports.testInfo = {"uniqueName":{"container":"container160497156957603790","randomstring":"randomstring160497157005405586","listingcontainer":"listingcontainer160497157005400065","listblob":"listblob160497157031704201"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160497156957603790')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Nov 2020 01:26:09 GMT',
  'ETag',
  '"0x8D885179ABAD178"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '9b023f1c-e01e-00eb-0b00-b78d67000000',
  'x-ms-client-request-id',
  '732fa996-5c2c-45f6-ab63-1517d3e28f6a',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 10 Nov 2020 01:26:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/listingcontainer160497157005400065')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 10 Nov 2020 01:26:10 GMT',
  'ETag',
  '"0x8D885179AE49B8F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '604b6cbd-e01e-00c2-1e00-b7fb25000000',
  'x-ms-client-request-id',
  'e5c76261-fe2c-417c-902e-7fa4094e4e37',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 10 Nov 2020 01:26:10 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/listingcontainer160497157005400065/listblob160497157031704201', "randomstring160497157005405586")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'qAD2BWMX4iEmU3Rg3DbNmQ==',
  'Last-Modified',
  'Tue, 10 Nov 2020 01:26:10 GMT',
  'ETag',
  '"0x8D885179B0E0F4F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '93ed5f7f-401e-00e6-0a00-b7626b000000',
  'x-ms-client-request-id',
  'ef992c28-6a0d-4dc7-9d0e-2d237191f35e',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  '5+Um4oHJgLY=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 10 Nov 2020 01:26:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/listingcontainer160497157005400065')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"listingcontainer160497157005400065\"><MaxResults>5</MaxResults><Blobs><Blob><Name>listblob160497157031704201</Name><Properties><Creation-Time>Tue, 10 Nov 2020 01:26:10 GMT</Creation-Time><Last-Modified>Tue, 10 Nov 2020 01:26:10 GMT</Last-Modified><Etag>0x8D885179B0E0F4F</Etag><Content-Length>30</Content-Length><Content-Type>blobContentType</Content-Type><Content-Encoding>blobContentEncoding</Content-Encoding><Content-Language>blobContentLanguage</Content-Language><Content-CRC64 /><Content-MD5>qAD2BWMX4iEmU3Rg3DbNmQ==</Content-MD5><Cache-Control>blobCacheControl</Cache-Control><Content-Disposition>blobContentDisposition</Content-Disposition><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><_>underscore value</_><keyb>value b</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1d028baf-301e-0043-5400-b75972000000',
  'x-ms-client-request-id',
  '5e55e30a-43e8-452f-b08a-2c4664dfc49b',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 10 Nov 2020 01:26:09 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160497156957603790')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bc66b5ca-401e-0107-4200-b7c34b000000',
  'x-ms-client-request-id',
  'f819a449-cd8c-4e2a-8384-c53441dcd246',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Tue, 10 Nov 2020 01:26:10 GMT',
  'Connection',
  'close'
]);

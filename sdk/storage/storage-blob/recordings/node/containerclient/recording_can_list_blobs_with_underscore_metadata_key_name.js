let nock = require('nock');

module.exports.hash = "376efd4f1fc6ddff77323260ed8302a6";

module.exports.testInfo = {"uniqueName":{"container":"container160496397131200931","randomstring":"randomstring160496397275708309","newcontainer":"newcontainer160496397275709959","newblob":"newblob160496397301403670"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160496397131200931')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Nov 2020 23:19:32 GMT',
  'ETag',
  '"0x8D88505EA6A2397"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '078b5a2a-d01e-0052-4eee-b6dff1000000',
  'x-ms-client-request-id',
  '68522a31-ea5e-4a54-a346-933da0557cae',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 09 Nov 2020 23:19:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newcontainer160496397275709959')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 09 Nov 2020 23:19:32 GMT',
  'ETag',
  '"0x8D88505EA92CB7F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '45de9152-b01e-00a0-2fee-b627b8000000',
  'x-ms-client-request-id',
  '0b30d683-61ba-4d1b-b71c-c8652c3b8d16',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 09 Nov 2020 23:19:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/newcontainer160496397275709959/newblob160496397301403670', "randomstring160496397275708309")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'i0Yx+x3PJjt0R7WlAU3M2Q==',
  'Last-Modified',
  'Mon, 09 Nov 2020 23:19:33 GMT',
  'ETag',
  '"0x8D88505EAB3C83B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5b19bc95-e01e-0076-13ee-b62951000000',
  'x-ms-client-request-id',
  'f644a749-0b97-4db2-9360-fbe70790fd58',
  'x-ms-version',
  '2020-02-10',
  'x-ms-content-crc64',
  '7dLXSTyEraE=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Mon, 09 Nov 2020 23:19:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/newcontainer160496397275709959')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"newcontainer160496397275709959\"><MaxResults>5</MaxResults><Blobs><Blob><Name>newblob160496397301403670</Name><Properties><Creation-Time>Mon, 09 Nov 2020 23:19:33 GMT</Creation-Time><Last-Modified>Mon, 09 Nov 2020 23:19:33 GMT</Last-Modified><Etag>0x8D88505EAB3C83B</Etag><Content-Length>30</Content-Length><Content-Type>blobContentType</Content-Type><Content-Encoding>blobContentEncoding</Content-Encoding><Content-Language>blobContentLanguage</Content-Language><Content-CRC64 /><Content-MD5>i0Yx+x3PJjt0R7WlAU3M2Q==</Content-MD5><Cache-Control>blobCacheControl</Cache-Control><Content-Disposition>blobContentDisposition</Content-Disposition><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><_>underscore value</_><keyb>value b</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '37d99c98-901e-0088-56ee-b64610000000',
  'x-ms-client-request-id',
  'c86b4aa5-f310-46d4-91e7-999fdecc3067',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 09 Nov 2020 23:19:32 GMT',
  'Connection',
  'close'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160496397131200931')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'df576b20-c01e-0085-18ee-b68ec4000000',
  'x-ms-client-request-id',
  'cbba8063-e66d-4769-b428-7daf94832b64',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 09 Nov 2020 23:19:33 GMT',
  'Connection',
  'close'
]);

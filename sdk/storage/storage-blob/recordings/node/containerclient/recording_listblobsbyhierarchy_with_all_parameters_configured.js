let nock = require('nock');

module.exports.hash = "a38363b365a0cc53487de4a5ec6d1f00";

module.exports.testInfo = {"uniqueName":{"container":"container165899894160306171","blockblob0/0":"blockblob0/0165899894171800583","blockblob1/1":"blockblob1/1165899894182108673"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894160306171')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:21 GMT',
  'ETag',
  '"0x8DA7077E1D6E5F1"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df00-301e-0011-0460-a27e0d000000',
  'x-ms-client-request-id',
  '3b0fc8db-a84a-486b-bb7b-6dd93668fad1',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894160306171/blockblob0/0165899894171800583')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:22 GMT',
  'ETag',
  '"0x8DA7077E1EAC23F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df16-301e-0011-1460-a27e0d000000',
  'x-ms-client-request-id',
  '891c8882-d385-42a6-abaf-6d4406dd8733',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899894160306171/blockblob1/1165899894182108673')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:02:22 GMT',
  'ETag',
  '"0x8DA7077E1FA5034"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df3b-301e-0011-3360-a27e0d000000',
  'x-ms-client-request-id',
  'f16258e6-7f28-4354-9359-59b10b6e2b0d',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899894160306171')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899894160306171\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix></Blobs><NextMarker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE2NTg5OTg5NDE4MjEwODY3MyEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df58-301e-0011-4d60-a27e0d000000',
  'x-ms-client-request-id',
  '34c08b63-0b11-4567-82b9-abdd6fe69e86',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899894160306171')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899894160306171\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE2NTg5OTg5NDE4MjEwODY3MyEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</Marker><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob1/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df78-301e-0011-6860-a27e0d000000',
  'x-ms-client-request-id',
  'd48b01f4-1ecf-4bb5-b680-45d31685c532',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899894160306171')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899894160306171\"><Prefix>blockblob0/</Prefix><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><Blob><Name>blockblob0/0165899894171800583</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:02:22 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:02:22 GMT</Last-Modified><Etag>0x8DA7077E1EAC23F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df8d-301e-0011-7960-a27e0d000000',
  'x-ms-client-request-id',
  '1c07638d-ae59-4a56-b4ae-58a603b7fc04',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894160306171/blockblob0/0165899894171800583')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078df9d-301e-0011-0860-a27e0d000000',
  'x-ms-client-request-id',
  '16c722b9-27e7-455d-8eaf-616cbe999a70',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894160306171/blockblob1/1165899894182108673')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078dfb2-301e-0011-1b60-a27e0d000000',
  'x-ms-client-request-id',
  '1fbdeea3-e77d-4247-8af8-d68582834a80',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899894160306171')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3078dfc9-301e-0011-2f60-a27e0d000000',
  'x-ms-client-request-id',
  'af419589-621c-4705-85d2-691ab00e5de4',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:02:21 GMT'
]);

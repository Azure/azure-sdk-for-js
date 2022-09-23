let nock = require('nock');

module.exports.hash = "af687eb54a0abcf04e0e25ac64183f35";

module.exports.testInfo = {"uniqueName":{"container":"container165899958000501368","blockblob/0":"blockblob/0165899958010605045","blockblob/1":"blockblob/1165899958020702340","blockblob/2":"blockblob/2165899958030703387","blockblob/3":"blockblob/3165899958040708968"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958000501368')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:00 GMT',
  'ETag',
  '"0x8DA70795E5C8D04"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba660-d01e-0054-5f62-a2abee000000',
  'x-ms-client-request-id',
  'c6ac4293-47e7-4420-832c-321e3e2683cd',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958000501368/blockblob/0165899958010605045')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:00 GMT',
  'ETag',
  '"0x8DA70795E6DAE7F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba672-d01e-0054-6d62-a2abee000000',
  'x-ms-client-request-id',
  '6210bb11-f458-4a02-8d18-5617d2ba2122',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958000501368/blockblob/1165899958020702340')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:00 GMT',
  'ETag',
  '"0x8DA70795E7CEE51"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba684-d01e-0054-7c62-a2abee000000',
  'x-ms-client-request-id',
  '0b16216e-806b-482a-9d06-c1dfa5eb68a0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958000501368/blockblob/2165899958030703387')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:00 GMT',
  'ETag',
  '"0x8DA70795E8C2E22"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba693-d01e-0054-0962-a2abee000000',
  'x-ms-client-request-id',
  'ef4b715c-3f77-4b11-b9d0-edbe3c2fcd6b',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899958000501368/blockblob/3165899958040708968')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:13:00 GMT',
  'ETag',
  '"0x8DA70795E9B6DEA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba6a3-d01e-0054-1662-a2abee000000',
  'x-ms-client-request-id',
  'eb5e0c64-4398-4d3d-841f-747157893090',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899958000501368')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899958000501368\"><Prefix>blockblob</Prefix><Blobs><Blob><Name>blockblob/0165899958010605045</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:00 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:00 GMT</Last-Modified><Etag>0x8DA70795E6DAE7F</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob><Blob><Name>blockblob/1165899958020702340</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:00 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:00 GMT</Last-Modified><Etag>0x8DA70795E7CEE51</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob><Blob><Name>blockblob/2165899958030703387</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:00 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:00 GMT</Last-Modified><Etag>0x8DA70795E8C2E22</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob><Blob><Name>blockblob/3165899958040708968</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:13:00 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:13:00 GMT</Last-Modified><Etag>0x8DA70795E9B6DEA</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba6b3-d01e-0054-2362-a2abee000000',
  'x-ms-client-request-id',
  '1f951b55-cc76-4eb5-8f07-cc7304395ab3',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958000501368/blockblob/0165899958010605045')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba6e7-d01e-0054-4c62-a2abee000000',
  'x-ms-client-request-id',
  'de33ed7c-abf3-44af-98a7-ae20c10e9f11',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958000501368/blockblob/1165899958020702340')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba6f6-d01e-0054-5b62-a2abee000000',
  'x-ms-client-request-id',
  'aff04d63-0385-42bf-a6ca-e73211097d40',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958000501368/blockblob/2165899958030703387')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba710-d01e-0054-6f62-a2abee000000',
  'x-ms-client-request-id',
  '89c7ad04-a9c8-411d-9d72-dd7cc7e75fb8',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958000501368/blockblob/3165899958040708968')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba721-d01e-0054-7962-a2abee000000',
  'x-ms-client-request-id',
  '6bd1c255-06f2-42d3-95c6-069bb54568d9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:13:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899958000501368')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba734-d01e-0054-0762-a2abee000000',
  'x-ms-client-request-id',
  '0a9b4f88-bd3d-404f-899b-725162527295',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:13:01 GMT'
]);

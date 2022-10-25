let nock = require('nock');

module.exports.hash = "7e0c7eaf4af5371052e5ba21cf092a75";

module.exports.testInfo = {"uniqueName":{"container":"container166667912080206491","blockblob0/0":"blockblob0/0166667912146307135","blockblob1/1":"blockblob1/1166667912158502632"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166667912080206491')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Tue, 25 Oct 2022 06:25:21 GMT',
  'ETag',
  '"0x8DAB651B1B0ED79"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d6f2-e01e-005f-6c3a-e85085000000',
  'x-ms-client-request-id',
  '9f1b3de0-91dd-4d8d-a76a-3496d352d9d4',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166667912080206491/blockblob0/0166667912146307135')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 25 Oct 2022 06:25:21 GMT',
  'ETag',
  '"0x8DAB651B1C641D6"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d721-e01e-005f-133a-e85085000000',
  'x-ms-client-request-id',
  '2511aff0-ce9a-4122-8447-76332dbc42fd',
  'x-ms-version',
  '2021-10-04',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2022-10-25T06:25:21.7512918Z',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container166667912080206491/blockblob1/1166667912158502632')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Tue, 25 Oct 2022 06:25:21 GMT',
  'ETag',
  '"0x8DAB651B1D7CB81"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d73f-e01e-005f-2c3a-e85085000000',
  'x-ms-client-request-id',
  'a216c9fb-276a-468f-8bac-30baa233595f',
  'x-ms-version',
  '2021-10-04',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2022-10-25T06:25:21.8662273Z',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container166667912080206491')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container166667912080206491\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob0/</Name></BlobPrefix></Blobs><NextMarker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE2NjY2NzkxMjE1ODUwMjYzMiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d75b-e01e-005f-453a-e85085000000',
  'x-ms-client-request-id',
  'e28816e5-92ac-42df-bf41-4c1ea1873c3b',
  'x-ms-version',
  '2021-10-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container166667912080206491')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container166667912080206491\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDMwIWJsb2NrYmxvYjEvMTE2NjY2NzkxMjE1ODUwMjYzMiEwMDAwMjghOTk5OS0xMi0zMVQyMzo1OTo1OS45OTk5OTk5WiE-</Marker><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><BlobPrefix><Name>blockblob1/</Name></BlobPrefix></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d78a-e01e-005f-6e3a-e85085000000',
  'x-ms-client-request-id',
  '88483a86-f9b4-4ca5-ac52-35c065bf60a6',
  'x-ms-version',
  '2021-10-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container166667912080206491')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container166667912080206491\"><Prefix>blockblob0/</Prefix><MaxResults>2</MaxResults><Delimiter>/</Delimiter><Blobs><Blob><Name>blockblob0/0166667912146307135</Name><VersionId>2022-10-25T06:25:21.7512918Z</VersionId><IsCurrentVersion>true</IsCurrentVersion><Properties><Creation-Time>Tue, 25 Oct 2022 06:25:21 GMT</Creation-Time><Last-Modified>Tue, 25 Oct 2022 06:25:21 GMT</Last-Modified><Etag>0x8DAB651B1C641D6</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d7b4-e01e-005f-113a-e85085000000',
  'x-ms-client-request-id',
  '10fbc820-c3a9-48ca-ba17-2c3ea67510eb',
  'x-ms-version',
  '2021-10-04',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166667912080206491/blockblob0/0166667912146307135')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d7d0-e01e-005f-293a-e85085000000',
  'x-ms-client-request-id',
  'd049422c-d8c4-4531-aa50-c72bbb651d9e',
  'x-ms-version',
  '2021-10-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166667912080206491/blockblob1/1166667912158502632')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d7e5-e01e-005f-3c3a-e85085000000',
  'x-ms-client-request-id',
  'd822fe93-2126-447a-be82-77cf85ac98fb',
  'x-ms-version',
  '2021-10-04',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Tue, 25 Oct 2022 06:25:21 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container166667912080206491')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f16d805-e01e-005f-5a3a-e85085000000',
  'x-ms-client-request-id',
  '82706779-c144-4fb7-9b87-b88318f30259',
  'x-ms-version',
  '2021-10-04',
  'Date',
  'Tue, 25 Oct 2022 06:25:22 GMT'
]);

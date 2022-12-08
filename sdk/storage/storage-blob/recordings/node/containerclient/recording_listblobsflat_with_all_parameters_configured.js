let nock = require('nock');

module.exports.hash = "22ffc2ddfc1499ef04837c558cd7e802";

module.exports.testInfo = {"uniqueName":{"container":"container165899957868602749","blockblob/0":"blockblob/0165899957878603067","blockblob/1":"blockblob/1165899957888904643"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957868602749')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:58 GMT',
  'ETag',
  '"0x8DA70795D934031"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba564-d01e-0054-2262-a2abee000000',
  'x-ms-client-request-id',
  'c5e6fee1-74e3-498a-9d0d-6b81ad95718f',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957868602749/blockblob/0165899957878603067')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:59 GMT',
  'ETag',
  '"0x8DA70795DA46451"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba57b-d01e-0054-3662-a2abee000000',
  'x-ms-client-request-id',
  '80006244-29f4-4128-bbd7-6dc07eefac85',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:12:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957868602749/blockblob/1165899957888904643')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:59 GMT',
  'ETag',
  '"0x8DA70795DB3CB1D"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba594-d01e-0054-4c62-a2abee000000',
  'x-ms-client-request-id',
  '90600723-d6e6-45c6-bb6e-fafacaa2cec9',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 09:12:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899957868602749')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899957868602749\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Blobs><Blob><Name>blockblob/0165899957878603067</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:12:59 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:12:59 GMT</Last-Modified><Etag>0x8DA70795DA46451</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierChangeTime>Thu, 28 Jul 2022 09:12:59 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTY1ODk5OTU3ODg4OTA0NjQzITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba5a6-d01e-0054-5962-a2abee000000',
  'x-ms-client-request-id',
  'd80ef4b7-b21a-40dd-ba8a-1bcf56022c88',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:12:58 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899957868602749')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899957868602749\"><Prefix>blockblob</Prefix><Marker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTY1ODk5OTU3ODg4OTA0NjQzITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</Marker><MaxResults>2</MaxResults><Blobs><Blob><Name>blockblob/1165899957888904643</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:12:59 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:12:59 GMT</Last-Modified><Etag>0x8DA70795DB3CB1D</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Cool</AccessTier><AccessTierChangeTime>Thu, 28 Jul 2022 09:12:59 GMT</AccessTierChangeTime><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted></Properties><Metadata><keya>a</keya><keyb>c</keyb></Metadata><OrMetadata /></Blob></Blobs><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba5b3-d01e-0054-6462-a2abee000000',
  'x-ms-client-request-id',
  '5b442949-39f7-4cf8-a9a8-8e17d57e489e',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957868602749/blockblob/0165899957878603067')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba5c3-d01e-0054-7262-a2abee000000',
  'x-ms-client-request-id',
  '8413a19a-a33e-41bf-ac3b-cf99a14364bd',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957868602749/blockblob/1165899957888904643')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba5df-d01e-0054-7b62-a2abee000000',
  'x-ms-client-request-id',
  '5450a763-1d85-4ae4-a473-c060586692e0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899957868602749')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba5f4-d01e-0054-0a62-a2abee000000',
  'x-ms-client-request-id',
  '5b6f1c8f-303f-4cbb-a48f-55dca2fd5e4d',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

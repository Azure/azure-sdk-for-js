let nock = require('nock');

module.exports.hash = "c0abfb4bb1863a076c1e5ac109a4cc7b";

module.exports.testInfo = {"uniqueName":{"container":"container165899957948908427","blockblob/0":"blockblob/0165899957958904339","blockblob/1":"blockblob/1165899957970106437"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957948908427')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:59 GMT',
  'ETag',
  '"0x8DA70795E0DB561"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba603-d01e-0054-1662-a2abee000000',
  'x-ms-client-request-id',
  '909f294c-6d36-44a2-8c84-f55f8663f1f4',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957948908427/blockblob/0165899957958904339')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:59 GMT',
  'ETag',
  '"0x8DA70795E20853E"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba617-d01e-0054-2562-a2abee000000',
  'x-ms-client-request-id',
  'd9643a74-a082-487b-8833-85dc03c2e4e0',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899957948908427/blockblob/1165899957970106437')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  '1B2M2Y8AsgTpgAmY7PhCfg==',
  'Last-Modified',
  'Thu, 28 Jul 2022 09:12:59 GMT',
  'ETag',
  '"0x8DA70795E2FEC18"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba62c-d01e-0054-3362-a2abee000000',
  'x-ms-client-request-id',
  '40cf7708-6af1-4b76-909b-58de46efc6ea',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'AAAAAAAAAAA=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-encryption-key-sha256',
  '3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899957948908427')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\" ContainerName=\"container165899957948908427\"><Prefix>blockblob</Prefix><MaxResults>1</MaxResults><Blobs><Blob><Name>blockblob/0165899957958904339</Name><Properties><Creation-Time>Thu, 28 Jul 2022 09:12:59 GMT</Creation-Time><Last-Modified>Thu, 28 Jul 2022 09:12:59 GMT</Last-Modified><Etag>0x8DA70795E20853E</Etag><Content-Length>0</Content-Length><Content-Type>application/octet-stream</Content-Type><Content-Encoding /><Content-Language /><Content-CRC64 /><Content-MD5>1B2M2Y8AsgTpgAmY7PhCfg==</Content-MD5><Cache-Control /><Content-Disposition /><BlobType>BlockBlob</BlobType><AccessTier>Hot</AccessTier><AccessTierInferred>true</AccessTierInferred><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><ServerEncrypted>true</ServerEncrypted><CustomerProvidedKeySha256>3QFFFpRA5+XANHqwwbT4yXDmrT/2JaLt/FKHjzhOdoE=</CustomerProvidedKeySha256></Properties><Metadata Encrypted=\"true\" /><OrMetadata /></Blob></Blobs><NextMarker>2!100!MDAwMDI5IWJsb2NrYmxvYi8xMTY1ODk5OTU3OTcwMTA2NDM3ITAwMDAyOCE5OTk5LTEyLTMxVDIzOjU5OjU5Ljk5OTk5OTlaIQ--</NextMarker></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba642-d01e-0054-4662-a2abee000000',
  'x-ms-client-request-id',
  '8a7f82e8-b99b-454a-bb56-a8bf7f8e6e11',
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
  .delete('/container165899957948908427')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a85ba651-d01e-0054-5362-a2abee000000',
  'x-ms-client-request-id',
  'fd28b201-6898-4449-a39e-16672e084475',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 09:12:59 GMT'
]);

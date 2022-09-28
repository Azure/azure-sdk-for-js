let nock = require('nock');

module.exports.hash = "3b1c98a18eec371b9e1d1af75a23809a";

module.exports.testInfo = {"uniqueName":{"container":"container165899712058409588","blockblob":"blockblob165899712068700106","srcblob/%2+%2F":"srcblob/%2+%2F165899712068704846"},"newDate":{"expiry":"2022-07-28T08:32:00.790Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712058409588')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'ETag',
  '"0x8DA7073A46DA4FD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907332-201e-0032-525c-a2e4ce000000',
  'x-ms-client-request-id',
  '72bb203b-0cb3-4149-9e84-995f2151dfa7',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712058409588/srcblob/%252%2B%252F165899712068704846', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'ETag',
  '"0x8DA7073A47F5F59"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907350-201e-0032-6a5c-a2e4ce000000',
  'x-ms-client-request-id',
  '0021b61c-6a21-4ba3-bafa-d3dc75e80bae',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899712058409588/blockblob165899712068700106')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'ETag',
  '"0x8DA7073A4909AD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907372-201e-0032-075c-a2e4ce000000',
  'x-ms-client-request-id',
  'e237d025-72fa-4823-a340-3abe8105648d',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899712058409588/blockblob165899712068700106')
  .reply(200, "Hello World", [
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType1',
  'Content-Language',
  'blobContentLanguage1',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A4909AD2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569073a8-201e-0032-385c-a2e4ce000000',
  'x-ms-client-request-id',
  '41aecadf-add5-4780-9c4f-f801e84f3762',
  'x-ms-version',
  '2021-08-06',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:32:01 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Language,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899712058409588')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569073ca-201e-0032-565c-a2e4ce000000',
  'x-ms-client-request-id',
  '1f008bb6-7f12-4605-9a96-92bc38ee8f68',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:01 GMT'
]);

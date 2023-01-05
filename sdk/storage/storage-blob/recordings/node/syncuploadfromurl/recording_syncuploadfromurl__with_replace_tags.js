let nock = require('nock');

module.exports.hash = "16204e0756a77bbbe49d64ff34bad4a4";

module.exports.testInfo = {"uniqueName":{"container":"container165899711986100136","blockblob":"blockblob165899711996506911","srcblob/%2+%2F":"srcblob/%2+%2F165899711996503719"},"newDate":{"expiry":"2022-07-28T08:32:00.067Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711986100136')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'ETag',
  '"0x8DA7073A3FF89F5"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690726b-201e-0032-325c-a2e4ce000000',
  'x-ms-client-request-id',
  '55908806-5639-41bf-9f01-099ad415cb87',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711986100136/srcblob/%252%2B%252F165899711996503719', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'ETag',
  '"0x8DA7073A4111E1F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907290-201e-0032-4d5c-a2e4ce000000',
  'x-ms-client-request-id',
  '94b86268-3b43-490f-8154-117f74e0e041',
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
  .put('/container165899711986100136/srcblob/%252%2B%252F165899711996503719', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569072ab-201e-0032-635c-a2e4ce000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '88922684-719c-4b84-93e6-f124c334bacd',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711986100136/blockblob165899711996506911')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'ETag',
  '"0x8DA7073A4317264"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569072c0-201e-0032-755c-a2e4ce000000',
  'x-ms-client-request-id',
  'f9dbd2a6-fb34-450a-bcaa-d1f2bfd11317',
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
  .get('/container165899711986100136/blockblob165899711996506911')
  .reply(200, ["48656c6c6f20576f726c64"], [
  'Cache-Control',
  'blobCacheControl',
  'Content-Length',
  '11',
  'Content-Type',
  'blobContentType',
  'Content-Encoding',
  'blobContentEncoding',
  'Content-Language',
  'blobContentLanguage',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A4317264"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569072d6-201e-0032-075c-a2e4ce000000',
  'x-ms-client-request-id',
  '378e21af-3c6b-44af-9976-6ef6c53f28ac',
  'x-ms-version',
  '2021-08-06',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:32:00 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'Content-Disposition',
  'blobContentDisposition',
  'x-ms-server-encrypted',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899711986100136/blockblob165899711996506911')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569072ed-201e-0032-1b5c-a2e4ce000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  '717d6e86-3d33-432b-b19a-53d514393a11',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899711986100136')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690730e-201e-0032-385c-a2e4ce000000',
  'x-ms-client-request-id',
  '27d3d216-279a-4b19-b178-68f734c7b4ff',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:32:00 GMT'
]);

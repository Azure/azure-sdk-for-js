let nock = require('nock');

module.exports.hash = "43807084beb93488dac025d9f32c4bc4";

module.exports.testInfo = {"uniqueName":{"container":"container165899711905709036","blockblob":"blockblob165899711916307700","srcblob/%2+%2F":"srcblob/%2+%2F165899711916301733"},"newDate":{"expiry":"2022-07-28T08:31:59.269Z","tagtestexpiry":"2022-07-28T08:31:59.375Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711905709036')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:59 GMT',
  'ETag',
  '"0x8DA7073A38514AA"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907165-201e-0032-595c-a2e4ce000000',
  'x-ms-client-request-id',
  '0193d06b-e525-40a0-95c8-7a21889d8aa6',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711905709036/srcblob/%252%2B%252F165899711916301733', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:59 GMT',
  'ETag',
  '"0x8DA7073A396D0AD"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907189-201e-0032-775c-a2e4ce000000',
  'x-ms-client-request-id',
  'a91a7e2c-45a7-41d0-9b6f-cc64f3ff2a57',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711905709036/srcblob/%252%2B%252F165899711916301733', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569071b8-201e-0032-1d5c-a2e4ce000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'da8bfee7-b660-4b67-b16c-eba0e0718b77',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container165899711905709036/blockblob165899711916307700')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 28 Jul 2022 08:31:59 GMT',
  'ETag',
  '"0x8DA7073A3C15C9B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '569071d8-201e-0032-365c-a2e4ce000000',
  'x-ms-client-request-id',
  'e60656b3-c751-40d0-ac84-bcf289c4b060',
  'x-ms-version',
  '2021-08-06',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899711905709036/blockblob165899711916307700')
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
  'Thu, 28 Jul 2022 08:31:59 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA7073A3C15C9B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907216-201e-0032-6b5c-a2e4ce000000',
  'x-ms-client-request-id',
  'a9905646-4aa6-48e9-9a57-403fb61bc195',
  'x-ms-version',
  '2021-08-06',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Thu, 28 Jul 2022 08:31:59 GMT',
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
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container165899711905709036/blockblob165899711916307700')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '56907225-201e-0032-785c-a2e4ce000000',
  'x-ms-version',
  '2021-08-06',
  'x-ms-client-request-id',
  'abcc5dbf-b380-4e25-919c-b8670d116e65',
  'Access-Control-Expose-Headers',
  'Content-Length,Content-Type,Date,Server,x-ms-client-request-id,x-ms-request-id,x-ms-version',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container165899711905709036')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5690723f-201e-0032-0d5c-a2e4ce000000',
  'x-ms-client-request-id',
  '9ae1c6c6-b3ef-422f-bac2-dadc292141b9',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Thu, 28 Jul 2022 08:31:59 GMT'
]);

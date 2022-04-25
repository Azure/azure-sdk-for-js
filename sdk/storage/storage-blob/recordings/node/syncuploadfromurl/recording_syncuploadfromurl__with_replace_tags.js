let nock = require('nock');

module.exports.hash = "80a93132ec0f659bff44a7805dcf306b";

module.exports.testInfo = {"uniqueName":{"container":"container164917033533308063","blockblob":"blockblob164917033558102381","srcblob/%2+%2F":"srcblob/%2+%2F164917033558204967"},"newDate":{"expiry":"2022-04-05T14:52:15.832Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033533308063')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:52:15 GMT',
  'ETag',
  '"0x8DA1713E012AE61"',
  'x-ms-request-id',
  'b8466d1a-a01e-0005-7dfc-48f0c9000000',
  'x-ms-client-request-id',
  '0d1f4449-f344-4156-814e-0dc5206c1c27',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:52:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033533308063/srcblob%2F%252%2B%252F164917033558204967', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:52:16 GMT',
  'ETag',
  '"0x8DA1713E0395B7A"',
  'x-ms-request-id',
  'b8466d1c-a01e-0005-7efc-48f0c9000000',
  'x-ms-client-request-id',
  'ee2736fa-7a71-4584-94da-f9336510df31',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:52:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033533308063/srcblob%2F%252%2B%252F164917033558204967', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'x-ms-request-id',
  'b8466d1d-a01e-0005-7ffc-48f0c9000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '04c8dbb1-30e8-4898-bdb0-dc70381e92c0',
  'Date',
  'Tue, 05 Apr 2022 14:52:15 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033533308063/blockblob164917033558102381')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:52:16 GMT',
  'ETag',
  '"0x8DA1713E0886644"',
  'x-ms-request-id',
  'b8466d1e-a01e-0005-80fc-48f0c9000000',
  'x-ms-client-request-id',
  '353b5247-708f-493c-b426-4d2ec7c0206c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:52:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164917033533308063/blockblob164917033558102381')
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
  'Tue, 05 Apr 2022 14:52:16 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1713E0886644"',
  'x-ms-request-id',
  'b8466d21-a01e-0005-03fc-48f0c9000000',
  'x-ms-client-request-id',
  '65394d6e-fa96-4957-a12d-c9cabdd8cdc5',
  'x-ms-version',
  '2021-04-10',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Tue, 05 Apr 2022 14:52:16 GMT',
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
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Content-Encoding,Content-Language,Cache-Control,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,Content-Disposition,x-ms-server-encrypted,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 05 Apr 2022 14:52:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164917033533308063/blockblob164917033558102381')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-request-id',
  'b8466d22-a01e-0005-04fc-48f0c9000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '1da4c89e-dcd0-4b6a-8c04-2d292364cf92',
  'Date',
  'Tue, 05 Apr 2022 14:52:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164917033533308063')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'b8466d23-a01e-0005-05fc-48f0c9000000',
  'x-ms-client-request-id',
  'b2592027-5158-4e17-ad3a-13daa4754122',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:52:16 GMT'
]);

let nock = require('nock');

module.exports.hash = "5a18c44abec518db362c83bc9539dfbc";

module.exports.testInfo = {"uniqueName":{"container":"container164916945938401406","blob":"blob164916945963408105","copiedblob":"copiedblob164916945989704555"},"newDate":{"expiry":"2022-04-05T14:37:40.140Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945938401406')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:39 GMT',
  'ETag',
  '"0x8DA1711D5F679AE"',
  'x-ms-request-id',
  '6394754d-701e-0008-63fa-48c247000000',
  'x-ms-client-request-id',
  'e2bd0f35-0c88-424f-a27f-76cebc037c28',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:37:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945938401406/blob164916945963408105', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'ETag',
  '"0x8DA1711D61F5ED0"',
  'x-ms-request-id',
  '6394754f-701e-0008-64fa-48c247000000',
  'x-ms-client-request-id',
  '049e64ff-84fa-47dd-bac9-315465d2c4e7',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:37:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945938401406/blob164916945963408105', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'x-ms-request-id',
  '63947550-701e-0008-65fa-48c247000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'bc8a7583-be88-4297-bf18-f08493d8f26e',
  'Date',
  'Tue, 05 Apr 2022 14:37:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945938401406/copiedblob164916945989704555')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'ETag',
  '"0x8DA1711D66BF889"',
  'x-ms-request-id',
  '63947551-701e-0008-66fa-48c247000000',
  'x-ms-client-request-id',
  '7f0d6297-cdfa-4eef-93f1-a27afd1c55fc',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  'cd8dfbec-4e3f-471f-8362-2ee5945397b1',
  'x-ms-copy-status',
  'success',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:37:39 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164916945938401406/blob164916945963408105')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1711D61F5ED0"',
  'x-ms-request-id',
  '63947553-701e-0008-68fa-48c247000000',
  'x-ms-client-request-id',
  'ec943916-96eb-46fa-8122-2da2a34a4600',
  'x-ms-version',
  '2021-04-10',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 05 Apr 2022 14:37:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164916945938401406/copiedblob164916945989704555')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1711D66BF889"',
  'x-ms-request-id',
  '63947554-701e-0008-69fa-48c247000000',
  'x-ms-client-request-id',
  'ba3827b0-d0b9-49ff-94fc-e6bf918b248f',
  'x-ms-version',
  '2021-04-10',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'cd8dfbec-4e3f-471f-8362-2ee5945397b1',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container164916945938401406/blob164916945963408105?sv=2021-04-10&se=2022-04-06T14%3A37%3A40Z&sr=b&sp=racwd&sig=EEXvg4kVEEtQVPSjQwJa%2BfR3%2FR7QRx5jReniOBSlR1k%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Tue, 05 Apr 2022 14:37:40 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Cool',
  'x-ms-access-tier-inferred',
  'true',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-tag-count,Content-Type,Last-Modified,ETag,x-ms-creation-time,Content-MD5,x-ms-lease-status,x-ms-lease-state,x-ms-blob-type,x-ms-copy-id,x-ms-copy-source,x-ms-copy-status,x-ms-copy-progress,x-ms-copy-completion-time,x-ms-server-encrypted,x-ms-access-tier,x-ms-access-tier-inferred,Accept-Ranges',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Tue, 05 Apr 2022 14:37:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164916945938401406/copiedblob164916945989704555')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '63947555-701e-0008-6afa-48c247000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  'e0c25385-c2d9-4b53-929f-d06d3b4c8869',
  'Date',
  'Tue, 05 Apr 2022 14:37:40 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164916945938401406')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '63947556-701e-0008-6bfa-48c247000000',
  'x-ms-client-request-id',
  'bd044376-9f15-4509-af31-6a66dc270fd2',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:37:40 GMT'
]);

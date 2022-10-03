let nock = require('nock');

module.exports.hash = "5073aea6fffcfac03336482bd12871cb";

module.exports.testInfo = {"uniqueName":{"container":"container164916945573907613","blob":"blob164916945720004399","copiedblob":"copiedblob164916945747905327"},"newDate":{"expiry":"2022-04-05T14:37:37.745Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945573907613')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:37 GMT',
  'ETag',
  '"0x8DA1711D47F8F8D"',
  'x-ms-request-id',
  '63947542-701e-0008-5afa-48c247000000',
  'x-ms-client-request-id',
  '0dd0f4e8-55cb-4d41-ad72-48bec4270002',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:37:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945573907613/blob164916945720004399', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:37 GMT',
  'ETag',
  '"0x8DA1711D4AB0C95"',
  'x-ms-request-id',
  '63947545-701e-0008-5bfa-48c247000000',
  'x-ms-client-request-id',
  '628fd808-b34c-4eb9-b50a-78530990d9b1',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:37:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945573907613/blob164916945720004399', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'x-ms-request-id',
  '63947546-701e-0008-5cfa-48c247000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '8811d42f-ff67-45bf-bd2d-47fb421cf16e',
  'Date',
  'Tue, 05 Apr 2022 14:37:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164916945573907613/copiedblob164916945747905327')
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:38 GMT',
  'ETag',
  '"0x8DA1711D504C5D4"',
  'x-ms-request-id',
  '63947547-701e-0008-5dfa-48c247000000',
  'x-ms-client-request-id',
  'f4522610-b8c8-41a4-a823-1f6dfb1563b8',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-copy-id',
  '43e2baab-bc27-4d8c-ab27-2e2aae81ba3d',
  'x-ms-copy-status',
  'success',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:37:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164916945573907613/blob164916945720004399')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:37 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1711D4AB0C95"',
  'x-ms-request-id',
  '63947548-701e-0008-5efa-48c247000000',
  'x-ms-client-request-id',
  '265aac31-dc99-44da-a49a-15f46af6d61e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Tue, 05 Apr 2022 14:37:37 GMT',
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
  'Tue, 05 Apr 2022 14:37:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container164916945573907613/copiedblob164916945747905327')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:37:38 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1711D504C5D4"',
  'x-ms-request-id',
  '63947549-701e-0008-5ffa-48c247000000',
  'x-ms-client-request-id',
  'c6cd30d3-0294-46d9-83f4-406befab887a',
  'x-ms-version',
  '2021-04-10',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Tue, 05 Apr 2022 14:37:38 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  '43e2baab-bc27-4d8c-ab27-2e2aae81ba3d',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container164916945573907613/blob164916945720004399?sv=2021-04-10&se=2022-04-06T14%3A37%3A37Z&sr=b&sp=racwdt&sig=8%2BQWObCjRqbWpRnN9kykfxD%2Fk5KxzY9hmG%2FSYcleMiM%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Tue, 05 Apr 2022 14:37:38 GMT',
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
  'Tue, 05 Apr 2022 14:37:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164916945573907613/blob164916945720004399')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '6394754a-701e-0008-60fa-48c247000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '2a30a5cc-b3f9-4bac-93b6-452cae9668f3',
  'Date',
  'Tue, 05 Apr 2022 14:37:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164916945573907613/copiedblob164916945747905327')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-request-id',
  '6394754b-701e-0008-61fa-48c247000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '8085ffd8-9852-425f-8e72-a45b371c5c70',
  'Date',
  'Tue, 05 Apr 2022 14:37:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164916945573907613')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  '6394754c-701e-0008-62fa-48c247000000',
  'x-ms-client-request-id',
  'a904f53c-7688-47f4-9992-4c36e6b3ab58',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:37:38 GMT'
]);

let nock = require('nock');

module.exports.hash = "43807084beb93488dac025d9f32c4bc4";

module.exports.testInfo = {"uniqueName":{"container":"container164917033187009499","blockblob":"blockblob164917033363702142","srcblob/%2+%2F":"srcblob/%2+%2F164917033363906144"},"newDate":{"expiry":"2022-04-05T14:52:13.915Z","tagtestexpiry":"2022-04-05T14:52:14.210Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033187009499')
  .query(true)
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:52:13 GMT',
  'ETag',
  '"0x8DA1713DEE3CA68"',
  'x-ms-request-id',
  'b8466d0d-a01e-0005-74fc-48f0c9000000',
  'x-ms-client-request-id',
  'b38766b0-63fd-42c5-8c5b-49a78e77c81c',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:52:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033187009499/srcblob%2F%252%2B%252F164917033363906144', "Hello World")
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:52:14 GMT',
  'ETag',
  '"0x8DA1713DF117BD3"',
  'x-ms-request-id',
  'b8466d10-a01e-0005-75fc-48f0c9000000',
  'x-ms-client-request-id',
  '22f374c9-457e-44f6-84c4-2b39e3e9776e',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:52:13 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033187009499/srcblob%2F%252%2B%252F164917033363906144', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'x-ms-request-id',
  'b8466d11-a01e-0005-76fc-48f0c9000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '09eb5b9f-e4e3-48c7-8535-0a3a5095e16e',
  'Date',
  'Tue, 05 Apr 2022 14:52:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container164917033187009499/blockblob164917033363702142')
  .reply(201, "", [
  'Transfer-Encoding',
  'chunked',
  'Last-Modified',
  'Tue, 05 Apr 2022 14:52:14 GMT',
  'ETag',
  '"0x8DA1713DF76CDDA"',
  'x-ms-request-id',
  'b8466d12-a01e-0005-77fc-48f0c9000000',
  'x-ms-client-request-id',
  'e71c81eb-2621-49a5-b546-ede706a0090c',
  'x-ms-version',
  '2021-04-10',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Tue, 05 Apr 2022 14:52:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164917033187009499/blockblob164917033363702142')
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
  'Tue, 05 Apr 2022 14:52:14 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8DA1713DF76CDDA"',
  'x-ms-request-id',
  'b8466d15-a01e-0005-7afc-48f0c9000000',
  'x-ms-client-request-id',
  'd658ecdb-cf83-4103-b5af-4fb4b2d0aa39',
  'x-ms-version',
  '2021-04-10',
  'x-ms-tag-count',
  '1',
  'x-ms-creation-time',
  'Tue, 05 Apr 2022 14:52:14 GMT',
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
  'Tue, 05 Apr 2022 14:52:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container164917033187009499/blockblob164917033363702142')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '117',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'x-ms-request-id',
  'b8466d16-a01e-0005-7bfc-48f0c9000000',
  'x-ms-version',
  '2021-04-10',
  'x-ms-client-request-id',
  '2285a019-dde9-40ad-86ea-7af34fae88ee',
  'Date',
  'Tue, 05 Apr 2022 14:52:14 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container164917033187009499')
  .query(true)
  .reply(202, "", [
  'Transfer-Encoding',
  'chunked',
  'x-ms-request-id',
  'b8466d19-a01e-0005-7cfc-48f0c9000000',
  'x-ms-client-request-id',
  '7a57e49e-ea79-467d-af57-a0370d199f95',
  'x-ms-version',
  '2021-04-10',
  'Date',
  'Tue, 05 Apr 2022 14:52:15 GMT'
]);

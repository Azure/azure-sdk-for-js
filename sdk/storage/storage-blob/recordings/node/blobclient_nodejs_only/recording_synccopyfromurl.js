let nock = require('nock');

module.exports.hash = "9824a6daab12292957d73406d9ba3de9";

module.exports.testInfo = {"uniqueName":{"container":"container158459463331705281","blob":"blob158459463355705972","copiedblob":"copiedblob158459463380103159"},"newDate":{"undefined":"2020-03-19T05:10:33.801Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459463331705281')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 05:10:33 GMT',
  'ETag',
  '"0x8D7CBC3DA171971"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd838c3b2-201e-0041-40ac-fd8226000000',
  'x-ms-client-request-id',
  '79599e27-c9f2-4b4c-ad70-f54fd43e2353',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 05:10:32 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459463331705281/blob158459463355705972', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 05:10:33 GMT',
  'ETag',
  '"0x8D7CBC3DA3BF48A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15fd09ff-d01e-0018-62ac-fd05a5000000',
  'x-ms-client-request-id',
  'f1ef1af5-d5e3-4509-9466-0c900aea590f',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-03-19T05:10:33.6648095Z',
  'Date',
  'Thu, 19 Mar 2020 05:10:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158459463331705281/copiedblob158459463380103159')
  .reply(202, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 19 Mar 2020 05:10:34 GMT',
  'ETag',
  '"0x8D7CBC3DA970F42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd838c492-201e-0041-14ac-fd8226000000',
  'x-ms-client-request-id',
  '9f78df14-8b4b-406f-8cf9-157d8140c204',
  'x-ms-version',
  '2019-12-12',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-version-id',
  '2020-03-19T05:10:34.2652371Z',
  'x-ms-copy-id',
  'cad1df54-bfae-4f8d-877c-6ac60f2e696b',
  'x-ms-copy-status',
  'success',
  'Date',
  'Thu, 19 Mar 2020 05:10:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459463331705281/blob158459463355705972')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 05:10:33 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBC3DA3BF48A"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15fd0b6b-d01e-0018-19ac-fd05a5000000',
  'x-ms-client-request-id',
  '85d4ae99-dce6-4bf7-911b-7847d7e80c64',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T05:10:33.6648095Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 05:10:33 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Thu, 19 Mar 2020 05:10:34 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .head('/container158459463331705281/copiedblob158459463380103159')
  .reply(200, "", [
  'Content-Length',
  '11',
  'Content-Type',
  'application/octet-stream',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Thu, 19 Mar 2020 05:10:34 GMT',
  'Accept-Ranges',
  'bytes',
  'ETag',
  '"0x8D7CBC3DA970F42"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'd838c61d-201e-0041-7aac-fd8226000000',
  'x-ms-client-request-id',
  'b22bc58c-f504-4546-a28e-06bcd59e998d',
  'x-ms-version',
  '2019-12-12',
  'x-ms-version-id',
  '2020-03-19T05:10:34.2652371Z',
  'x-ms-is-current-version',
  'true',
  'x-ms-creation-time',
  'Thu, 19 Mar 2020 05:10:34 GMT',
  'x-ms-lease-status',
  'unlocked',
  'x-ms-lease-state',
  'available',
  'x-ms-blob-type',
  'BlockBlob',
  'x-ms-copy-id',
  'cad1df54-bfae-4f8d-877c-6ac60f2e696b',
  'x-ms-copy-source',
  'https://fakestorageaccount.blob.core.windows.net/container158459463331705281/blob158459463355705972?sv=2019-07-07&se=2020-03-20T05%3A10%3A33Z&sr=b&sp=racwd&sig=XAxbUEG26%2FCXtFlj2cVNjQ%2B%2F%2FlGjapB%2Ft7y8S6TEt6A%3D',
  'x-ms-copy-status',
  'success',
  'x-ms-copy-progress',
  '11/11',
  'x-ms-copy-completion-time',
  'Thu, 19 Mar 2020 05:10:34 GMT',
  'x-ms-server-encrypted',
  'true',
  'x-ms-access-tier',
  'Hot',
  'x-ms-access-tier-inferred',
  'true',
  'Date',
  'Thu, 19 Mar 2020 05:10:33 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158459463331705281')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '15fd0c0d-d01e-0018-29ac-fd05a5000000',
  'x-ms-client-request-id',
  '7e0cd9e5-2b41-46df-9d71-414718729662',
  'x-ms-version',
  '2019-12-12',
  'Date',
  'Thu, 19 Mar 2020 05:10:34 GMT'
]);

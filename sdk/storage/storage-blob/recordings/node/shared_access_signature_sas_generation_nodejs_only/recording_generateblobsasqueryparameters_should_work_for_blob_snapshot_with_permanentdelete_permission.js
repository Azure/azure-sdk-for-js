let nock = require('nock');

module.exports.hash = "7d237c0de3b8e6847e4d9ae43db34d1a";

module.exports.testInfo = {"uniqueName":{"container":"container163230260969205328","blob":"blob163230260996208059"},"newDate":{"now":"2021-09-22T09:23:29.692Z","tmr":"2021-09-22T09:23:29.692Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260969205328')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:30 GMT',
  'ETag',
  '"0x8D97DAAA434FF8C"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4763-f01e-0052-6b93-afa62a000000',
  'x-ms-client-request-id',
  'd40a4d0d-5b05-458c-88e2-fa65e2fe8fa3',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260969205328/blob163230260996208059')
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:30 GMT',
  'ETag',
  '"0x8D97DAAA45EFF91"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a47af-f01e-0052-2593-afa62a000000',
  'x-ms-client-request-id',
  '41b6771f-92f5-48ca-9906-f64be3b0295a',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:30.5237393Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260969205328/blob163230260996208059')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:30 GMT',
  'ETag',
  '"0x8D97DAAA45EFF91"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a47dd-f01e-0052-4f93-afa62a000000',
  'x-ms-client-request-id',
  '6366ef3a-4c22-4515-9ba5-d7a8f8fb7b6a',
  'x-ms-version',
  '2020-12-06',
  'x-ms-version-id',
  '2021-09-22T09:23:30.7995840Z',
  'x-ms-snapshot',
  '2021-09-22T09:23:30.7985840Z',
  'x-ms-request-server-encrypted',
  'false',
  'Date',
  'Wed, 22 Sep 2021 09:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260969205328/blob163230260996208059')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a481a-f01e-0052-0793-afa62a000000',
  'x-ms-client-request-id',
  '1c58948c-0a90-4b4b-aa52-f72d22c2cae7',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'true',
  'Date',
  'Wed, 22 Sep 2021 09:23:30 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260969205328')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4852-f01e-0052-3393-afa62a000000',
  'x-ms-client-request-id',
  'cd86a5d9-2f71-430c-8656-198ab9fac761',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:31 GMT'
]);

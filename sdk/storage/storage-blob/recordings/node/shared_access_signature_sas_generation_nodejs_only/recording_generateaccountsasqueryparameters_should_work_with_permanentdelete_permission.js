let nock = require('nock');

module.exports.hash = "979d8e05f7f6684826e1c622f5724014";

module.exports.testInfo = {"uniqueName":{"container":"container163230260366006803","blobname":"blobname163230260499308632"},"newDate":{"now":"2021-09-22T09:23:23.657Z","tmr":"2021-09-22T09:23:23.658Z"}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260366006803')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:25 GMT',
  'ETag',
  '"0x8D97DAAA13A7EF4"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a432e-f01e-0052-5793-afa62a000000',
  'x-ms-client-request-id',
  '2570c324-9cc8-43e0-9ea4-ee506fab1b47',
  'x-ms-version',
  '2020-12-06',
  'Date',
  'Wed, 22 Sep 2021 09:23:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container163230260366006803/blobname163230260499308632')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 22 Sep 2021 09:23:25 GMT',
  'ETag',
  '"0x8D97DAAA1693855"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a4369-f01e-0052-0693-afa62a000000',
  'x-ms-client-request-id',
  '1114c62a-7183-48df-8bac-58c1c5736f31',
  'x-ms-version',
  '2020-12-06',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2021-09-22T09:23:25.5575637Z',
  'Date',
  'Wed, 22 Sep 2021 09:23:25 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container163230260366006803/blobname163230260499308632')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8e7a439e-f01e-0052-2f93-afa62a000000',
  'x-ms-client-request-id',
  '23bc645b-61fc-4fcd-979b-34375e32ce7d',
  'x-ms-version',
  '2020-12-06',
  'x-ms-delete-type-permanent',
  'false',
  'Date',
  'Wed, 22 Sep 2021 09:23:25 GMT'
]);

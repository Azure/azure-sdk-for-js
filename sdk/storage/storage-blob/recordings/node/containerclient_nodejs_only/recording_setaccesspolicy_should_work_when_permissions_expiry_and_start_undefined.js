let nock = require('nock');

module.exports.hash = "f3081b25309fc349f82d59ed2a396942";

module.exports.testInfo = {"uniqueName":{"container":"container158193961700603197"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158193961700603197')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:17 GMT',
  'ETag',
  '"0x8D7B39E291573B2"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534e976-b01e-0004-7d87-e5d202000000',
  'x-ms-client-request-id',
  'cc3771e5-019b-4e88-bc99-abd696ba7dd2',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:16 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158193961700603197', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start/><Expiry/><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:17 GMT',
  'ETag',
  '"0x8D7B39E294CE8E0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534ea3b-b01e-0004-3187-e5d202000000',
  'x-ms-client-request-id',
  'c4e14ae0-5cdf-4651-92b0-29a953d8588e',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158193961700603197')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:17 GMT',
  'ETag',
  '"0x8D7B39E294CE8E0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534eae2-b01e-0004-4c87-e5d202000000',
  'x-ms-client-request-id',
  '2dd39ff1-922a-4759-9506-f6934e9c998f',
  'x-ms-version',
  '2019-07-07',
  'x-ms-blob-public-access',
  'blob',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-blob-public-access,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 11:40:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container158193961700603197', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start/><Expiry/></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:18 GMT',
  'ETag',
  '"0x8D7B39E29B3ACD0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534eb52-b01e-0004-3087-e5d202000000',
  'x-ms-client-request-id',
  'dba89c8b-29e0-4c74-9ec4-f2440242ec99',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container158193961700603197')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id></SignedIdentifier></SignedIdentifiers>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Mon, 17 Feb 2020 11:40:18 GMT',
  'ETag',
  '"0x8D7B39E29B3ACD0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534ebcf-b01e-0004-2787-e5d202000000',
  'x-ms-client-request-id',
  '6e99621d-8b58-498d-9e9f-0e8f0bf5bceb',
  'x-ms-version',
  '2019-07-07',
  'x-ms-blob-public-access',
  'blob',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-blob-public-access,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 11:40:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container158193961700603197')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b534ec3e-b01e-0004-1287-e5d202000000',
  'x-ms-client-request-id',
  'b8d86c31-6a05-484c-84ae-d53f08a7fbfd',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 11:40:18 GMT'
]);

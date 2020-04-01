let nock = require('nock');

module.exports.hash = "8ea3e2c75fa46417ca1f474591cd26be";

module.exports.testInfo = {"uniqueName":{"queue":"queue158193571336803063"},"newDate":{}}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158193571336803063')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59c9b78-4003-0010-1a7d-e59a6d000000',
  'x-ms-client-request-id',
  '514bd06e-eb7e-42d7-a4e1-aa1232c9c456',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:15 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158193571336803063', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59c9c30-4003-0010-437d-e59a6d000000',
  'x-ms-client-request-id',
  '112c5974-985f-4c1c-90e1-602f7ca15b5c',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:17 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue158193571336803063')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Permission>raup</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59c9d7c-4003-0010-7c7d-e59a6d000000',
  'x-ms-client-request-id',
  '07edd850-3c78-40bf-8c30-4e85d4033a42',
  'x-ms-version',
  '2019-07-07',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 10:35:17 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue158193571336803063', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy/></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59c9dc4-4003-0010-407d-e59a6d000000',
  'x-ms-client-request-id',
  'a2c7c994-283f-40d8-b7db-a46e2fee1810',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:23 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .get('/queue158193571336803063')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id></SignedIdentifier></SignedIdentifiers>", [
  'Cache-Control',
  'no-cache',
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59ca258-4003-0010-437d-e59a6d000000',
  'x-ms-client-request-id',
  '78641a74-6e36-41bd-9e60-30ae5e138338',
  'x-ms-version',
  '2019-07-07',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Cache-Control,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 17 Feb 2020 10:35:23 GMT'
]);

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue158193571336803063')
  .query(true)
  .reply(204, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'a59ca2a0-4003-0010-037d-e59a6d000000',
  'x-ms-client-request-id',
  '8186c084-7673-45f9-a9e3-7a32ac0dd813',
  'x-ms-version',
  '2019-07-07',
  'Date',
  'Mon, 17 Feb 2020 10:35:27 GMT'
]);

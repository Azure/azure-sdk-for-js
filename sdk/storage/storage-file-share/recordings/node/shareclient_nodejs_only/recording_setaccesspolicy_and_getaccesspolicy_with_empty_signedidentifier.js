let nock = require('nock');

module.exports.hash = "3ebabd40f7e1e2d99e8708a8b72d7c1c";

module.exports.testInfo = {"uniqueName":{"share":"share160224079312107686"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160224079312107686')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 10:53:14 GMT',
  'ETag',
  '"0x8D86C4185BA2A5B"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e574a944-401a-002d-6b2a-9eddd5000000',
  'x-ms-client-request-id',
  'eb2a5911-6380-4442-864a-6c70df597eae',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 10:53:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160224079312107686', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy/></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 09 Oct 2020 10:53:14 GMT',
  'ETag',
  '"0x8D86C4185ED2986"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e574a947-401a-002d-6c2a-9eddd5000000',
  'x-ms-client-request-id',
  '84e0844e-b5b0-4d78-bfe3-cc5d25692a35',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 10:53:14 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160224079312107686')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id></SignedIdentifier></SignedIdentifiers>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 09 Oct 2020 10:53:14 GMT',
  'ETag',
  '"0x8D86C4185ED2986"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e574a949-401a-002d-6e2a-9eddd5000000',
  'x-ms-client-request-id',
  '147051c4-d43f-4e80-acd0-724b355fa4e2',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 09 Oct 2020 10:53:15 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160224079312107686')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e574a94b-401a-002d-6f2a-9eddd5000000',
  'x-ms-client-request-id',
  'a5f5debb-fc04-44c8-81a9-4d15a428c3de',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Fri, 09 Oct 2020 10:53:15 GMT'
]);

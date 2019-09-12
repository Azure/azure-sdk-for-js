let nock = require('nock');

module.exports.testInfo = {"share":"share156775332951405138","undefined":"2019-09-06T07:02:09.953Z"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775332951405138')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:09 GMT',
  'ETag',
  '"0x8D7329822E552DD"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '172b3421-101a-00a0-0e81-647322000000',
  'x-ms-client-request-id',
  '2c1d9177-0691-4231-bfca-cb8dca237259',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156775332951405138', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2019-09-05T07:02:09.9530000Z</Start><Expiry>2019-09-07T07:02:09.9530000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:10 GMT',
  'ETag',
  '"0x8D73298232FBA9F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'b400ba3d-801a-0114-5681-6441e1000000',
  'x-ms-client-request-id',
  '4ab640e0-2231-436c-900a-779be9da606a',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156775332951405138')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2019-09-05T07:02:09.9530000Z</Start><Expiry>2019-09-07T07:02:09.9530000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 06 Sep 2019 07:02:10 GMT',
  'ETag',
  '"0x8D73298232FBA9F"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '2c5bcdd8-e01a-009b-0a81-643686000000',
  'x-ms-client-request-id',
  '2240dad6-3411-41a1-85ed-06b84b6d7370',
  'x-ms-version',
  '2019-02-02',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 07:02:09 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share156775332951405138')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0e7c5a59-001a-00f1-4a81-64eeae000000',
  'x-ms-client-request-id',
  'bca4ab84-befe-4058-b023-9d1fde2a4f01',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 07:02:10 GMT',
  'Connection',
  'close' ]);


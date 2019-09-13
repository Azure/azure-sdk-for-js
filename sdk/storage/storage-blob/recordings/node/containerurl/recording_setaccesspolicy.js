let nock = require('nock');

module.exports.testInfo = {"container":"container156776210741601871"}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776210741601871')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:27 GMT',
  'ETag',
  '"0x8D732AC92EDCC18"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '4055b198-701e-0100-2795-64098e000000',
  'x-ms-client-request-id',
  '9c47047a-9131-4821-8adf-257b9a86bafb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:26 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container156776210741601871', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:28 GMT',
  'ETag',
  '"0x8D732AC932A994B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '5f563fc9-601e-0085-0d95-64da5e000000',
  'x-ms-client-request-id',
  'fb4b18d1-6bcd-4ea2-833a-4aaa3a81a431',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container156776210741601871')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwd</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>", [ 'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Last-Modified',
  'Fri, 06 Sep 2019 09:28:28 GMT',
  'ETag',
  '"0x8D732AC932A994B"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'cff69844-901e-0017-1c95-645e88000000',
  'x-ms-client-request-id',
  '96fbe0c4-a911-4221-a1ba-b3509805279d',
  'x-ms-version',
  '2019-02-02',
  'x-ms-blob-public-access',
  'blob',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,x-ms-blob-public-access,Last-Modified,ETag,Content-Length,Date,Transfer-Encoding,content-md5,x-ms-content-crc64',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Fri, 06 Sep 2019 09:28:27 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container156776210741601871')
  .query(true)
  .reply(202, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fb666892-a01e-014e-3395-642706000000',
  'x-ms-client-request-id',
  '33ee27e5-b65f-4634-ac04-90f0273e1afb',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Fri, 06 Sep 2019 09:28:28 GMT',
  'Connection',
  'close' ]);


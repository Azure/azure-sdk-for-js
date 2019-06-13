let nock = require('nock');

module.exports.testInfo = {"undefined":"2019-06-13T16:23:07.345Z","share":"share156044298734500432","dir":"dir156044298759103906","file":"file156044298783809360"}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298734500432')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:52 GMT',
  'ETag',
  '"0x8D6EFE0B5E3F6C6"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '0395e270-c01a-001a-1ac9-2155fe000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:22:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298734500432/dir156044298759103906')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:52 GMT',
  'ETag',
  '"0x8D6EFE0B6098E54"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '89959a9f-101a-00b9-33c9-21999f000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:22:51 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298734500432/dir156044298759103906/file156044298783809360')
  .reply(201, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:52 GMT',
  'ETag',
  '"0x8D6EFE0B62ED030"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '3595a8b1-d01a-0041-31c9-215282000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-request-server-encrypted',
  'true',
  'Date',
  'Thu, 13 Jun 2019 09:22:52 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share156044298734500432', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>unique-id</Id><AccessPolicy><Start>2019-06-13T16:18:07.3450000Z</Start><Expiry>2019-06-14T16:23:07.3450000Z</Expiry><Permission>rcwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(200, "", [ 'Content-Length',
  '0',
  'Last-Modified',
  'Thu, 13 Jun 2019 09:22:53 GMT',
  'ETag',
  '"0x8D6EFE0B6A74968"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'f23f086c-701a-008b-54c9-21c14f000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Thu, 13 Jun 2019 09:22:53 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share156044298734500432/')
  .query(true)
  .reply(403, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>AuthenticationFailed</Code><Message>Server failed to authenticate the request. Make sure the value of Authorization header is formed correctly including the signature.\nRequestId:fc3ea0bb-801a-00da-4cc9-21dfba000000\nTime:2019-06-13T09:22:53.9093129Z</Message><AuthenticationErrorDetail>Signature not valid in the specified time frame: Start [Thu, 13 Jun 2019 16:18:07 GMT] - Expiry [Fri, 14 Jun 2019 16:23:07 GMT] - Current [Thu, 13 Jun 2019 09:22:53 GMT]</AuthenticationErrorDetail></Error>", [ 'Content-Length',
  '544',
  'Content-Type',
  'application/xml',
  'Server',
  'Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'fc3ea0bb-801a-00da-4cc9-21dfba000000',
  'x-ms-error-code',
  'AuthenticationFailed',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-error-code,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Thu, 13 Jun 2019 09:22:53 GMT',
  'Connection',
  'close' ]);


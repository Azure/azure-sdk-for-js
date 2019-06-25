let nock = require('nock');

module.exports.testInfo = {"queue":"queue156149550420806365"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156149550420806365')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'da342c57-b003-00bf-3d96-2b6ee7000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:04 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156149550420806365', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidXmlDocument</Code><Message>XML specified is not syntactically valid.\nRequestId:8152758b-c003-005e-0896-2b8992000000\nTime:2019-06-25T20:45:04.7720911Z</Message><LineNumber>0</LineNumber><LinePosition>0</LinePosition><Reason /></Error>", [ 'Content-Length',
  '294',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8152758b-c003-005e-0896-2b8992000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidXmlDocument',
  'Date',
  'Tue, 25 Jun 2019 20:45:03 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156149550420806365')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '8ce37c7f-4003-00ee-0e96-2b7012000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Tue, 25 Jun 2019 20:45:05 GMT',
  'Connection',
  'close' ]);


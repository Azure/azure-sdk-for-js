let nock = require('nock');

module.exports.testInfo = {"queue":"queue155996389287708023"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996389287708023')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '72eb1970-b003-0063-28a8-1ddb7d000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue155996389287708023', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidXmlDocument</Code><Message>XML specified is not syntactically valid.\nRequestId:87271a52-1003-0021-16a8-1df069000000\nTime:2019-06-08T03:18:13.1594491Z</Message><LineNumber>0</LineNumber><LinePosition>0</LinePosition><Reason /></Error>", [ 'Content-Length',
  '294',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87271a52-1003-0021-16a8-1df069000000',
  'x-ms-version',
  '2018-03-28',
  'x-ms-error-code',
  'InvalidXmlDocument',
  'Date',
  'Sat, 08 Jun 2019 03:18:12 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue155996389287708023')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '07ef6264-d003-0051-23a8-1d83ad000000',
  'x-ms-version',
  '2018-03-28',
  'Date',
  'Sat, 08 Jun 2019 03:18:12 GMT',
  'Connection',
  'close' ]);


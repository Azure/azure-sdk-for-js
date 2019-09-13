let nock = require('nock');

module.exports.testInfo = {"queue":"queue156758134494102346"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758134494102346')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'acecde7a-8003-0104-38f0-628489000000',
  'x-ms-client-request-id',
  '81e6dcd5-4932-4759-bd52-f3a8c1625cd1',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:44 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156758134494102346', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI=</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidXmlDocument</Code><Message>XML specified is not syntactically valid.\nRequestId:074cceb3-9003-00e3-25f0-62957e000000\nTime:2019-09-04T07:15:45.6111573Z</Message><LineNumber>0</LineNumber><LinePosition>0</LinePosition><Reason /></Error>", [ 'Content-Length',
  '294',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '074cceb3-9003-00e3-25f0-62957e000000',
  'x-ms-client-request-id',
  '29721082-5479-433b-be49-f9c08c38940e',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidXmlDocument',
  'Date',
  'Wed, 04 Sep 2019 07:15:45 GMT',
  'Connection',
  'close' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156758134494102346')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'c302b395-8003-0114-38f0-6241e1000000',
  'x-ms-client-request-id',
  '065abbea-fcd3-4428-abc5-c8ccce32c967',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 04 Sep 2019 07:15:45 GMT',
  'Connection',
  'close' ]);


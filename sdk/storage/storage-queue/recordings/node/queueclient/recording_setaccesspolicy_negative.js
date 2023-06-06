let nock = require('nock');

module.exports.testInfo = {"queue":"queue156816834466505533"}

nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834466505533')
  .query(true)
  .reply(201, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '87a0ec69-3003-003a-6747-68255f000000',
  'x-ms-client-request-id',
  '16e89e13-5621-44db-a1d0-7a575d26a640',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:04 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .put('/queue156816834466505533', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><SignedIdentifiers><SignedIdentifier><Id>6D97528B-8412-48AE-9DB1-6BF69C9F83A6</Id><AccessPolicy><Start>2017-12-31T11:22:33.4560000Z</Start><Expiry>2018-12-31T11:22:33.4560000Z</Expiry><Permission>rwdl</Permission></AccessPolicy></SignedIdentifier></SignedIdentifiers>")
  .query(true)
  .reply(400, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><Error><Code>InvalidXmlDocument</Code><Message>XML specified is not syntactically valid.\nRequestId:e5a69d29-c003-000d-4547-6889f0000000\nTime:2019-09-11T02:19:05.4457059Z</Message><LineNumber>0</LineNumber><LinePosition>0</LinePosition><Reason /></Error>", [ 'Content-Length',
  '294',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'e5a69d29-c003-000d-4547-6889f0000000',
  'x-ms-client-request-id',
  'acdbde72-5704-4920-bde0-52bdc48d5aa2',
  'x-ms-version',
  '2019-02-02',
  'x-ms-error-code',
  'InvalidXmlDocument',
  'Date',
  'Wed, 11 Sep 2019 02:19:05 GMT' ]);


nock('https://fakestorageaccount.queue.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/queue156816834466505533')
  .query(true)
  .reply(204, "", [ 'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Queue/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '67f1c23c-8003-004e-4847-68a319000000',
  'x-ms-client-request-id',
  'f42cab1d-b1a2-4a55-9d66-d5a3dfd6408e',
  'x-ms-version',
  '2019-02-02',
  'Date',
  'Wed, 11 Sep 2019 02:19:05 GMT' ]);


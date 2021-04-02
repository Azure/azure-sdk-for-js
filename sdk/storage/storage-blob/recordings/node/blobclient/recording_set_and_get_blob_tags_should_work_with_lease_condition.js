let nock = require('nock');

module.exports.hash = "d781291bed3d0d3e207cb50014cedfd9";

module.exports.testInfo = {"uniqueName":{"container":"container160587409691906227","blob":"blob160587409824002188"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160587409691906227')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:08:18 GMT',
  'ETag',
  '"0x8D88D4CF768D73F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072aced0-d01e-0037-6d35-bf086e000000',
  'x-ms-client-request-id',
  '997ad6a2-3a75-4192-b0f8-5d8b890f1882',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:08:17 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160587409691906227/blob160587409824002188', "Hello World")
  .reply(201, "", [
  'Content-Length',
  '0',
  'Content-MD5',
  'sQqNsWTgdUEFt6mb5y4/5Q==',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:08:18 GMT',
  'ETag',
  '"0x8D88D4CF797B29F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072acf1d-d01e-0037-2835-bf086e000000',
  'x-ms-client-request-id',
  '271ee118-e9bb-4196-a955-959d84bec54c',
  'x-ms-version',
  '2020-04-08',
  'x-ms-content-crc64',
  'YeJLfssylmU=',
  'x-ms-request-server-encrypted',
  'true',
  'x-ms-version-id',
  '2020-11-20T12:08:18.3870111Z',
  'Date',
  'Fri, 20 Nov 2020 12:08:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160587409691906227/blob160587409824002188')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:08:18 GMT',
  'ETag',
  '"0x8D88D4CF797B29F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072acf9d-d01e-0037-2035-bf086e000000',
  'x-ms-client-request-id',
  '5ff720fe-78be-42e4-9408-d1ca0c80220a',
  'x-ms-version',
  '2020-04-08',
  'x-ms-lease-id',
  'ca761232-ed42-11ce-bacd-00aa0057b223',
  'Date',
  'Fri, 20 Nov 2020 12:08:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160587409691906227/blob160587409824002188', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(204, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072ad016-d01e-0037-0735-bf086e000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '9a4fd764-53a0-4616-b7f8-a61296287b8b',
  'Date',
  'Fri, 20 Nov 2020 12:08:18 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160587409691906227/blob160587409824002188')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Tags><TagSet><Tag><Key>tag1</Key><Value>val1</Value></Tag><Tag><Key>tag2</Key><Value>val2</Value></Tag></TagSet></Tags>", [
  'Content-Length',
  '162',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072ad098-d01e-0037-7335-bf086e000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '5cfa26c2-5256-4b03-b4b3-c3651e3f93de',
  'Date',
  'Fri, 20 Nov 2020 12:08:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160587409691906227/blob160587409824002188', "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?><Tags><TagSet><Tag><Key>tag1</Key><Value>val</Value></Tag></TagSet></Tags>")
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>LeaseIdMissing</Code><Message>There is currently a lease on the blob and no lease ID was specified in the request.\nRequestId:072ad0c9-d01e-0037-1835-bf086e000000\nTime:2020-11-20T12:08:19.5329483Z</Message></Error>", [
  'Content-Length',
  '268',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMissing',
  'x-ms-request-id',
  '072ad0c9-d01e-0037-1835-bf086e000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  '62e8db94-7c87-4963-9692-fbe119e7675a',
  'Date',
  'Fri, 20 Nov 2020 12:08:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/container160587409691906227/blob160587409824002188')
  .query(true)
  .reply(412, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<Error><Code>LeaseIdMismatchWithBlobOperation</Code><Message>The lease ID specified did not match the lease ID for the blob.\nRequestId:072ad0f5-d01e-0037-3d35-bf086e000000\nTime:2020-11-20T12:08:19.8101451Z</Message></Error>", [
  'Content-Length',
  '265',
  'Content-Type',
  'application/xml',
  'Vary',
  'Origin',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-error-code',
  'LeaseIdMismatchWithBlobOperation',
  'x-ms-request-id',
  '072ad0f5-d01e-0037-3d35-bf086e000000',
  'x-ms-version',
  '2020-04-08',
  'x-ms-client-request-id',
  'a60020e7-564a-4f4f-ac9e-d382a986c24d',
  'Date',
  'Fri, 20 Nov 2020 12:08:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160587409691906227/blob160587409824002188')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Fri, 20 Nov 2020 12:08:18 GMT',
  'ETag',
  '"0x8D88D4CF797B29F"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072ad144-d01e-0037-0735-bf086e000000',
  'x-ms-client-request-id',
  '73b6cec5-305a-4024-a9f4-ca04ffb271cd',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:08:19 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160587409691906227')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '072ad1d3-d01e-0037-0435-bf086e000000',
  'x-ms-client-request-id',
  '8a63490d-4851-4109-8efc-3b70f996e0ca',
  'x-ms-version',
  '2020-04-08',
  'Date',
  'Fri, 20 Nov 2020 12:08:20 GMT'
]);

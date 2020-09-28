let nock = require('nock');

module.exports.hash = "1a05718a0ff21b8797d5b152061afbea";

module.exports.testInfo = {"uniqueName":{"container":"container160126287722103166"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160126287722103166')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Mon, 28 Sep 2020 03:14:38 GMT',
  'ETag',
  '"0x8D8635CA25BAEF0"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbe6bbe3-e01e-0024-0145-959806000000',
  'x-ms-client-request-id',
  '2360d180-02e7-4905-ad11-755ff7bc749f',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 28 Sep 2020 03:14:37 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/container160126287722103166')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbe6bc0a-e01e-0024-1e45-959806000000',
  'x-ms-client-request-id',
  'c56253b3-3ac8-4eb6-a6a2-05b1b0b68dfd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Mon, 28 Sep 2020 03:14:38 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Containers><Container><Name>container160126084293406905</Name><Deleted>true</Deleted><Version>01D69540C360196E</Version><Properties><Last-Modified>Mon, 28 Sep 2020 02:40:44 GMT</Last-Modified><Etag>\"0x8D86357E5D6E2D3\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 02:40:44 GMT</DeletedTime><RemainingRetentionDays>6</RemainingRetentionDays></Properties></Container><Container><Name>container160126106381401561</Name><Deleted>true</Deleted><Version>01D6954159845195</Version><Properties><Last-Modified>Mon, 28 Sep 2020 02:44:56 GMT</Last-Modified><Etag>\"0x8D863587BFB5C7E\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 02:45:17 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Container><Container><Name>container160126138854301057</Name><Properties><Last-Modified>Mon, 28 Sep 2020 02:52:20 GMT</Last-Modified><Etag>\"0x8D8635984BFED93\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties></Container><Container><Name>container160126156070606689</Name><Deleted>true</Deleted><Version>01D695426F2D1935</Version><Properties><Last-Modified>Mon, 28 Sep 2020 02:52:41 GMT</Last-Modified><Etag>\"0x8D8635991A3D4C3\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 02:52:42 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Container><Container><Name>container160126163636303463</Name><Properties><Last-Modified>Mon, 28 Sep 2020 02:54:29 GMT</Last-Modified><Etag>\"0x8D86359D1773488\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties></Container><Container><Name>container160126189495206143</Name><Properties><Last-Modified>Mon, 28 Sep 2020 02:58:47 GMT</Last-Modified><Etag>\"0x8D8635A6B7F32AC\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties></Container><Container><Name>container160126192762308290</Name><Deleted>true</Deleted><Version>01D695434939B1ED</Version><Properties><Last-Modified>Mon, 28 Sep 2020 02:58:47 GMT</Last-Modified><Etag>\"0x8D8635A6BB07DB9\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 02:58:48 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Container><Container><Name>container160126192762308290</Name><Deleted>true</Deleted><Version>01D695435B799FC5</Version><Properties><Last-Modified>Mon, 28 Sep 2020 02:59:18 GMT</Last-Modified><Etag>\"0x8D8635A7DEFF0A5\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 02:59:18 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Container><Container><Name>container160126214436904243</Name><Deleted>true</Deleted><Version>01D69543CB1B180E</Version><Properties><Last-Modified>Mon, 28 Sep 2020 03:02:25 GMT</Last-Modified><Etag>\"0x8D8635AED911531\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 03:02:26 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Container><Container><Name>container160126287722103166</Name><Deleted>true</Deleted><Version>01D695457FE6286F</Version><Properties><Last-Modified>Mon, 28 Sep 2020 03:14:38 GMT</Last-Modified><Etag>\"0x8D8635CA25BAEF0\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><DeletedTime>Mon, 28 Sep 2020 03:14:38 GMT</DeletedTime><RemainingRetentionDays>7</RemainingRetentionDays></Properties></Container><Container><Name>newcontainer160126234811800748</Name><Properties><Last-Modified>Mon, 28 Sep 2020 03:05:48 GMT</Last-Modified><Etag>\"0x8D8635B66537475\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties></Container><Container><Name>newcontainer160126248509809420</Name><Properties><Last-Modified>Mon, 28 Sep 2020 03:08:05 GMT</Last-Modified><Etag>\"0x8D8635BB7F89648\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties></Container><Container><Name>newcontainer160126248544608083</Name><Properties><Last-Modified>Mon, 28 Sep 2020 03:08:05 GMT</Last-Modified><Etag>\"0x8D8635BB82D9242\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold></Properties></Container></Containers><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbe6d002-e01e-0024-4c45-959806000000',
  'x-ms-client-request-id',
  'e670009f-9c91-47e9-ae52-18e3663c0c14',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Mon, 28 Sep 2020 03:15:08 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/container160126287722103166')
  .query(true)
  .reply(201, "", [
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  'bbe6d05e-e01e-0024-1d45-959806000000',
  'x-ms-version',
  '2020-02-10',
  'x-ms-client-request-id',
  '3a90c421-d61a-47ba-af6b-2b88ad37b77d',
  'Date',
  'Mon, 28 Sep 2020 03:15:09 GMT',
  'Content-Length',
  '0'
]);

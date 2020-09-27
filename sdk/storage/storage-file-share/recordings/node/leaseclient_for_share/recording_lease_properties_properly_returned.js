let nock = require('nock');

module.exports.hash = "60d3362fd95e0f8e316ba3469840044f";

module.exports.testInfo = {"uniqueName":{"share":"share160121916362104227"},"newDate":{}}

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916362104227')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:03 GMT',
  'ETag',
  '"0x8D862F6DA59F6E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029344a-d01a-0000-2bdf-946ea6000000',
  'x-ms-client-request-id',
  '53981182-3d57-4e8a-bf16-1459ecdf02bd',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916362104227')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:03 GMT',
  'ETag',
  '"0x8D862F6DA59F6E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a17-701a-006b-3edf-94e952000000',
  'x-ms-client-request-id',
  '8f1703cf-5535-404a-928d-83698c189757',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-id',
  '409a5c92-4eda-4722-818d-8545d1a6228a',
  'Date',
  'Sun, 27 Sep 2020 15:06:03 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/share160121916362104227')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:03 GMT',
  'ETag',
  '"0x8D862F6DA59F6E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '1029344d-d01a-0000-2cdf-946ea6000000',
  'x-ms-client-request-id',
  'e5ad7d9c-3aa4-46d7-8da6-8005417d2e18',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-status',
  'locked',
  'x-ms-lease-state',
  'leased',
  'x-ms-lease-duration',
  'infinite',
  'x-ms-has-immutability-policy',
  'false',
  'x-ms-has-legal-hold',
  'false',
  'x-ms-share-quota',
  '5120',
  'x-ms-access-tier',
  'TransactionOptimized',
  'x-ms-access-tier-change-time',
  'Sun, 27 Sep 2020 15:06:03 GMT',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Last-Modified,ETag,x-ms-lease-status,x-ms-lease-state,x-ms-lease-duration,x-ms-has-immutability-policy,x-ms-has-legal-hold,x-ms-share-quota,x-ms-access-tier,x-ms-access-tier-change-time,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:06:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.file.core.windows.net/\"><Shares><Share><Name>share160093141210102328</Name><Properties><Last-Modified>Thu, 24 Sep 2020 07:10:13 GMT</Last-Modified><Etag>\"0x8D86058E1C40CB2\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Thu, 24 Sep 2020 07:10:13 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160093176153301093</Name><Properties><Last-Modified>Thu, 24 Sep 2020 07:16:02 GMT</Last-Modified><Etag>\"0x8D86059B206C943\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Thu, 24 Sep 2020 07:16:02 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160093195256704532</Name><Properties><Last-Modified>Thu, 24 Sep 2020 07:19:13 GMT</Last-Modified><Etag>\"0x8D8605A23EB8F85\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Thu, 24 Sep 2020 07:19:13 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121233635009423</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:12:16 GMT</Last-Modified><Etag>\"0x8D862E6F4FB4A9C\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:12:16 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121235006600409</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:12:30 GMT</Last-Modified><Etag>\"0x8D862E6FD28EA42\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:12:30 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121310851508050</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:25:09 GMT</Last-Modified><Etag>\"0x8D862E8C1F3100F\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:25:09 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121326942502893</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:27:50 GMT</Last-Modified><Etag>\"0x8D862E921DDD8EC\"</Etag><LeaseStatus>locked</LeaseStatus><LeaseState>leased</LeaseState><LeaseDuration>infinite</LeaseDuration><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:27:50 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121389438808287</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:38:15 GMT</Last-Modified><Etag>\"0x8D862EA966D8BBD\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:38:15 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121491612400623</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:55:16 GMT</Last-Modified><Etag>\"0x8D862ECF6A57F34\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>expired</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:55:16 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121509901107353</Name><Properties><Last-Modified>Sun, 27 Sep 2020 13:58:19 GMT</Last-Modified><Etag>\"0x8D862ED63A7C0E3\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>broken</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 13:58:19 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121551221306317</Name><Properties><Last-Modified>Sun, 27 Sep 2020 14:05:12 GMT</Last-Modified><Etag>\"0x8D862EE59F16DE2\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 14:05:12 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121551974009496</Name><Properties><Last-Modified>Sun, 27 Sep 2020 14:05:19 GMT</Last-Modified><Etag>\"0x8D862EE5E6E01B4\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 14:05:19 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121870218806337</Name><Properties><Last-Modified>Sun, 27 Sep 2020 14:58:23 GMT</Last-Modified><Etag>\"0x8D862F5C81E89A1\"</Etag><LeaseStatus>locked</LeaseStatus><LeaseState>leased</LeaseState><LeaseDuration>infinite</LeaseDuration><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 14:58:23 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share><Share><Name>share160121916362104227</Name><Properties><Last-Modified>Sun, 27 Sep 2020 15:06:03 GMT</Last-Modified><Etag>\"0x8D862F6DA59F6E8\"</Etag><LeaseStatus>locked</LeaseStatus><LeaseState>leased</LeaseState><LeaseDuration>infinite</LeaseDuration><Quota>5120</Quota><AccessTier>TransactionOptimized</AccessTier><AccessTierChangeTime>Sun, 27 Sep 2020 15:06:03 GMT</AccessTierChangeTime><DefaultEncryptionScope>$account-encryption-key</DefaultEncryptionScope><DenyEncryptionScopeOverride>false</DenyEncryptionScopeOverride></Properties></Share></Shares><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a1c-701a-006b-40df-94e952000000',
  'x-ms-client-request-id',
  'ed5589be-b7b2-48f5-ba82-13be26968a7e',
  'x-ms-version',
  '2020-02-10',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Sun, 27 Sep 2020 15:06:04 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .put('/share160121916362104227')
  .query(true)
  .reply(200, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Sun, 27 Sep 2020 15:06:03 GMT',
  'ETag',
  '"0x8D862F6DA59F6E8"',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '10293450-d01a-0000-2edf-946ea6000000',
  'x-ms-client-request-id',
  'a58cb950-88f9-4298-ae10-574084530956',
  'x-ms-version',
  '2020-02-10',
  'x-ms-lease-time',
  '0',
  'Date',
  'Sun, 27 Sep 2020 15:06:05 GMT'
]);

nock('https://fakestorageaccount.file.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/share160121916362104227')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-File/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '09ab1a1f-701a-006b-41df-94e952000000',
  'x-ms-client-request-id',
  'd5c1978a-4687-4656-bd22-71599aa7d748',
  'x-ms-version',
  '2020-02-10',
  'Date',
  'Sun, 27 Sep 2020 15:06:05 GMT'
]);

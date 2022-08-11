let nock = require('nock');

module.exports.hash = "e72d0399df1d5b93cb6817c520adc557";

module.exports.testInfo = {"uniqueName":{"filesystem":"filesystem165528588922202862"},"newDate":{}}

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .put('/filesystem165528588922202862')
  .query(true)
  .reply(201, "", [
  'Content-Length',
  '0',
  'Last-Modified',
  'Wed, 15 Jun 2022 09:38:09 GMT',
  'ETag',
  '"0x8DA4EB2C21CE868"',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28b0c3ce-301e-009b-489b-803724000000',
  'x-ms-client-request-id',
  '70f6eb38-cdf7-43f5-b706-b668cb24e7ec',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Wed, 15 Jun 2022 09:38:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .get('/')
  .query(true)
  .reply(200, "﻿<?xml version=\"1.0\" encoding=\"utf-8\"?><EnumerationResults ServiceEndpoint=\"https://fakestorageaccount.blob.core.windows.net/\"><Containers><Container><Name>filesystem165519456844401143165519457411002848</Name><Properties><Last-Modified>Tue, 14 Jun 2022 08:16:17 GMT</Last-Modified><Etag>\"0x8DA4DDE27DFB89B\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container><Container><Name>filesystem165519933318409303165519933641002513</Name><Properties><Last-Modified>Tue, 14 Jun 2022 09:35:36 GMT</Last-Modified><Etag>\"0x8DA4DE93CC62AAA\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container><Container><Name>filesystem165520020483108731165520020652407149</Name><Properties><Last-Modified>Tue, 14 Jun 2022 09:50:07 GMT</Last-Modified><Etag>\"0x8DA4DEB438EE29B\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container><Container><Name>filesystem165525733903404094165525734292005505</Name><Properties><Last-Modified>Wed, 15 Jun 2022 01:42:23 GMT</Last-Modified><Etag>\"0x8DA4E704B54090F\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container><Container><Name>filesystem165525742700109136165525742873105793</Name><Properties><Last-Modified>Wed, 15 Jun 2022 01:43:49 GMT</Last-Modified><Etag>\"0x8DA4E707EA66BF1\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container><Container><Name>filesystem165528341384503280</Name><Properties><Last-Modified>Wed, 15 Jun 2022 08:56:57 GMT</Last-Modified><Etag>\"0x8DA4EAD01024C72\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container><Container><Name>filesystem165528588922202862</Name><Properties><Last-Modified>Wed, 15 Jun 2022 09:38:09 GMT</Last-Modified><Etag>\"0x8DA4EB2C21CE868\"</Etag><LeaseStatus>unlocked</LeaseStatus><LeaseState>available</LeaseState><DefaultEncryptionScope>test1</DefaultEncryptionScope><DenyEncryptionScopeOverride>true</DenyEncryptionScopeOverride><HasImmutabilityPolicy>false</HasImmutabilityPolicy><HasLegalHold>false</HasLegalHold><ImmutableStorageWithVersioningEnabled>false</ImmutableStorageWithVersioningEnabled></Properties></Container></Containers><NextMarker /></EnumerationResults>", [
  'Transfer-Encoding',
  'chunked',
  'Content-Type',
  'application/xml',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28b0c3e9-301e-009b-589b-803724000000',
  'x-ms-client-request-id',
  'f3e9b42d-1c60-435d-b733-725e10f72784',
  'x-ms-version',
  '2021-08-06',
  'Access-Control-Expose-Headers',
  'x-ms-request-id,x-ms-client-request-id,Server,x-ms-version,Content-Type,Content-Length,Date,Transfer-Encoding',
  'Access-Control-Allow-Origin',
  '*',
  'Date',
  'Wed, 15 Jun 2022 09:38:09 GMT'
]);

nock('https://fakestorageaccount.blob.core.windows.net:443', {"encodedQueryParams":true})
  .delete('/filesystem165528588922202862')
  .query(true)
  .reply(202, "", [
  'Content-Length',
  '0',
  'Server',
  'Windows-Azure-Blob/1.0 Microsoft-HTTPAPI/2.0',
  'x-ms-request-id',
  '28b0c424-301e-009b-0a9b-803724000000',
  'x-ms-client-request-id',
  'e8505643-14a1-4c10-ae9e-7bb5806f1fe1',
  'x-ms-version',
  '2021-08-06',
  'Date',
  'Wed, 15 Jun 2022 09:38:09 GMT'
]);

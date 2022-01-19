let nock = require('nock');

module.exports.hash = "aacd07d354cb82cc8540bdf2eaa04f97";

module.exports.testInfo = {"uniqueName":{},"newDate":{}}

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_6f8c191d-f701-58b7-a744-35bac2a8f074"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"3e201300-bcab-4c75-a586-7f3d07f98aff"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  '2d080337-4d52-4bdc-a970-1d127c95e106',
  'X-Microsoft-Skype-Chain-ID',
  '9e9ba69c-a5da-4f40-b35b-30be37da705d',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LErgYQAAAAA7oF3D+BR9SLUzFTXbT3NaREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:join', {"callLocator":{"groupCallId":"4fd574a5-bf18-5d39-82cb-ec5cb6b0450a","kind":"groupCallLocator"},"source":{"communicationUser":{"id":"8:acs:016a7064-0581-40b9-be73-6dde64d69d72_ff23b678-5b97-564d-b6c4-6bb53068c498"}},"callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"3e201300-4227-4018-8556-b434b79cef99"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'fe287971-aca5-4022-a6a1-8b9acd3fc81f',
  'X-Microsoft-Skype-Chain-ID',
  '5802b1b1-1db3-4277-834e-5e9ead22c7c8',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0LkrgYQAAAACHjvOe2SRBR6vJMhSh/HyyREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:06 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling:answer', {"incomingCallContext":"H4sIAAAAAAAEAL1U227cNhD9Fz30yVyRIsXLAkbhFk4bBHWuSJC+FBQva3q1okJSu3YM/3tHe3GLbR4CFIgESCA5M2fmzOE8Vkb3/U0swQejS4hDtXysfIqb+R9stazkUpu8dJRS3XYtMsQxxJRkqBNtgxgTnVeNJbgTf+HD45CnXiOuDEO8bS1qBdXYYkywcdVFZUMee/1wozcO4k/ZJaU47LvBjjEM5eUMy6iE11PUYNcCoGZIUsqQsE6SlotWYgw+vR5Wk165vY8bYGfUqQQTRn0MpIiWHRMKeS80Yr4TSFkuUNuIzilBlHcU3G6DteC/9LrP7qJKLscpmWPc7yi+erqoSvz/rAnMxH9Y8+esDVPfnxF2DIPRNz6n54ywQ5RzwjRTqiUUsrCWQ6qEI6UkhxoUx8wwbpk9JwyK78OwznP9uhRtbiHQbSljXta1Mehu3DmE+cKYRV4/jG5h4mbJGIWzektqH9Pa2brrOJVKa9RY2iFGOookoQppylojVeOlYXXD6kDgK+sD0M/hksyFbZwN+mrIO5cA2xgA3uhZDymuoJv5ByR0gjqllNydM+UHAB+ATrCTHT8kPeQxphkclgDdNgtC2ILyBWVLyoSsZ8XuSfs1DsUN5aQHsH/lHuZOZqgFRsJ+Va2+6FWzu/lKLHstP37S1y/6u/D28hIAQT5rN0O9+LJrwq7+jO9x8/bd8Pl1xn+yHdg8zWTYkCBLCPgmxdGB6NxeLyG/Ox5d9X3cOdBgSZPbu4DizWx1yGwbg3EbHfr3rpQwrGb3J7Azcdi6lPfz6+WwDeV5kv37ZC4zxb7f6+O5I2Bw7Em7mBfnXYGten1r71/Ra7e9/m2Y0M2H3z+yT++vgO6W/+QuORVCMI6JalTLOW/nHoT8x9SX8Abu1sPzUAn5lxS1NTqXf+6Ndd20em7B434gH+6haSj3ziPiCWhAaIykgjFiG2k5lsRLbL8x777r+gLuKsVp3OPeH1v/9DeIHXtvDgYAAA==","callbackUri":"https://endpoint/callback","requestedMediaTypes":["audio"],"requestedCallEvents":["participantsUpdated"]})
  .query(true)
  .reply(202, {"callConnectionId":"3e201300-be0f-49aa-8394-c8473f81f36b"}, [
  'Content-Length',
  '59',
  'Content-Type',
  'application/json; charset=utf-8',
  'x-ms-client-request-id',
  'ad0304ed-b11c-4875-8375-62aeab1dee3c',
  'X-Microsoft-Skype-Chain-ID',
  'f8365b10-a2e5-4eab-a88c-c341ce404b69',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0MUrgYQAAAAB8sc8Jd1e5SKJIQUjLmgAZREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:09 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3e201300-bcab-4c75-a586-7f3d07f98aff/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"40f81040-ab16-493f-a774-356f3839f84b","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '7879ef07-0724-4849-934e-106dc18f47a9',
  'x-ms-client-request-id',
  '9b823c65-dddb-4dc7-9639-38fdd469b8c9',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0NErgYQAAAAC/pyHVKoKDSq8dLNuogHtlREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3e201300-4227-4018-8556-b434b79cef99/:cancelAllMediaOperations')
  .query(true)
  .reply(200, {"operationId":"bc6a503e-89a7-4459-af61-de9b0d0a69f1","status":"completed"}, [
  'Content-Length',
  '75',
  'Content-Type',
  'application/json; charset=utf-8',
  'X-Microsoft-Skype-Chain-ID',
  '7879ef07-0724-4849-934e-106dc18f47a9',
  'x-ms-client-request-id',
  '38cd9c1b-784c-4397-91c5-177bfda0f2c3',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0NUrgYQAAAAAr1uN72pxwSqm5iDg6ascxREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:13 GMT'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3e201300-bcab-4c75-a586-7f3d07f98aff/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7879ef07-0724-4849-934e-106dc18f47a9',
  'x-ms-client-request-id',
  '9a6fce66-d895-4a46-8e37-8d1eeef1e162',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0OErgYQAAAACQ7wD6OwROS4QH78op0GFxREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:17 GMT',
  'Content-Length',
  '0'
]);

nock('https://endpoint', {"encodedQueryParams":true})
  .post('/calling/callConnections/3e201300-4227-4018-8556-b434b79cef99/:hangup')
  .query(true)
  .reply(202, "", [
  'X-Microsoft-Skype-Chain-ID',
  '7879ef07-0724-4849-934e-106dc18f47a9',
  'x-ms-client-request-id',
  '5d7791e3-da13-4814-8085-1d8c1fc031a7',
  'X-Cache',
  'CONFIG_NOCACHE',
  'X-Azure-Ref',
  '0OUrgYQAAAAC4NAAFUhf2SIBQWC7o97FnREVMMDFFREdFMDYxOAA5ZmM3YjUxOS1hOGNjLTRmODktOTM1ZS1jOTE0OGFlMDllODE=',
  'Date',
  'Thu, 13 Jan 2022 15:50:17 GMT',
  'Content-Length',
  '0'
]);

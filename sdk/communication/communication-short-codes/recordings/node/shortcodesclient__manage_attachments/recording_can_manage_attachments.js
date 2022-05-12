let nock = require('nock');

module.exports.hash = "2dbbd7b1de93825199cbc77f577a73d0";

module.exports.testInfo = { "uniqueName": {}, "newDate": {} }

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(200, { "id": "00000000-0000-0000-0000-000000000000", "status": "draft", "costs": [{ "amount": 650, "currencyCode": "USD", "billingFrequency": "once" }, { "amount": 1000, "currencyCode": "USD", "billingFrequency": "monthly" }], "statusUpdatedDate": "2022-04-22T21:54:52+00:00", "programDetails": { "isVanity": false, "numberType": "shortCode", "isPoliticalCampaign": false, "name": "Contoso Loyalty Program", "description": "TEST UPDATE", "url": "https://endpoint/loyalty-program", "signUpTypes": ["sms", "website"], "signUpUrl": "https://contoso.com/sign-up", "termsOfServiceUrl": "https://contoso.com/terms", "privacyPolicyUrl": "https://contoso.com/privacy" }, "companyInformation": { "name": "Contoso", "url": "https://contoso.com", "address": "1 Contoso Way Redmond, WA 98052", "contactInformation": { "name": "Alex", "phone": "+14255551234", "email": "alex@contoso.com" }, "customerCareInformation": { "tollFreeNumber": "+18005551234", "email": "customercare@contoso.com" } }, "messageDetails": { "supportedProtocols": ["sms"], "recurrence": "subscription", "helpMessage": "Send 'Stop' to unsubscribe, send 'Start' to resubscribe.", "optOutMessage": "You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.", "optInMessage": "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'", "optInReply": "JOIN", "confirmationMessage": "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!", "directionality": "twoWay", "useCases": [{ "contentCategory": "coupons", "examples": [{ "messages": [{ "direction": "fromUser", "text": "txtMessage" }] }] }, { "contentCategory": "loyaltyProgram", "examples": [{ "messages": [{ "direction": "toUser", "text": "txtMessage" }] }] }, { "contentCategory": "loyaltyProgramPointsPrizes", "examples": [{ "messages": [{ "direction": "toUser", "text": "txtMessage" }] }] }] }, "trafficDetails": { "totalMonthlyVolume": 10000, "monthlyAverageMessagesFromUser": 1, "monthlyAverageMessagesToUser": 3, "isSpiky": true, "spikeDetails": "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.", "estimatedRampUpTimeInDays": 0 } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'MS-CV',
    'E0Q2VzMJ50+J4+vnjc1NVA.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '2618ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0MCRjYgAAAABuwC5GI693TJvfHlg818mdR1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:54:58 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
    'MS-CV',
    'a0wRwvdjeUmQv9S0qTNO6Q.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '457ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0MyRjYgAAAAA1GtuwMEGATaM6gtqLv+ICR1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:54:59 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, { "error": { "code": "NotFound", "message": "Could not find the ProgramBrief with key 'Azure|00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000'" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json',
    'MS-CV',
    '1K1WG2GXI0GC4/4Eoe91ow.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '1991ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0NCRjYgAAAADYjIP611l3RK2aT7Py4meOR1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:55:01 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .patch('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000', { "id": "00000000-0000-0000-0000-000000000000", "programDetails": { "isVanity": false, "numberType": "shortCode", "isPoliticalCampaign": false, "name": "Contoso Loyalty Program", "description": "TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.", "url": "https://endpoint/loyalty-program", "signUpTypes": ["sms", "website"], "signUpUrl": "https://contoso.com/sign-up", "termsOfServiceUrl": "https://contoso.com/terms", "privacyPolicyUrl": "https://contoso.com/privacy" }, "companyInformation": { "name": "Contoso", "url": "https://contoso.com", "address": "1 Contoso Way Redmond, WA 98052", "contactInformation": { "name": "Alex", "phone": "+14255551234", "email": "alex@contoso.com" }, "customerCareInformation": { "tollFreeNumber": "+18005551234", "email": "customercare@contoso.com" } }, "messageDetails": { "supportedProtocols": ["sms"], "recurrence": "subscription", "helpMessage": "Send 'Stop' to unsubscribe, send 'Start' to resubscribe.", "optOutMessage": "You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.", "optInMessage": "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'", "optInReply": "JOIN", "confirmationMessage": "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!", "directionality": "twoWay", "useCases": [{ "contentCategory": "coupons", "examples": [{ "messages": [{ "direction": "fromUser", "text": "txtMessage" }] }] }, { "contentCategory": "loyaltyProgram", "examples": [{ "messages": [{ "direction": "toUser", "text": "txtMessage" }] }] }, { "contentCategory": "loyaltyProgramPointsPrizes", "examples": [{ "messages": [{ "direction": "toUser", "text": "txtMessage" }] }] }] }, "trafficDetails": { "totalMonthlyVolume": 10000, "monthlyAverageMessagesFromUser": 1, "monthlyAverageMessagesToUser": 3, "isSpiky": true, "spikeDetails": "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.", "estimatedRampUpTimeInDays": 0 } })
  .query(true)
  .reply(201, { "id": "00000000-0000-0000-0000-000000000000", "status": "draft", "costs": [{ "amount": 650, "currencyCode": "USD", "billingFrequency": "once" }, { "amount": 1000, "currencyCode": "USD", "billingFrequency": "monthly" }], "statusUpdatedDate": "2022-04-22T21:55:04+00:00", "programDetails": { "isVanity": false, "numberType": "shortCode", "isPoliticalCampaign": false, "name": "Contoso Loyalty Program", "description": "TEST Customers can sign up to receive regular updates on coupons and other perks of our loyalty program.", "url": "https://endpoint/loyalty-program", "signUpTypes": ["sms", "website"], "signUpUrl": "https://contoso.com/sign-up", "termsOfServiceUrl": "https://contoso.com/terms", "privacyPolicyUrl": "https://contoso.com/privacy" }, "companyInformation": { "name": "Contoso", "url": "https://contoso.com", "address": "1 Contoso Way Redmond, WA 98052", "contactInformation": { "name": "Alex", "phone": "+14255551234", "email": "alex@contoso.com" }, "customerCareInformation": { "tollFreeNumber": "+18005551234", "email": "customercare@contoso.com" } }, "messageDetails": { "supportedProtocols": ["sms"], "recurrence": "subscription", "helpMessage": "Send 'Stop' to unsubscribe, send 'Start' to resubscribe.", "optOutMessage": "You've been unsubscribed from these messages.  Send 'Start' if you want to resubscribe.", "optInMessage": "Someone requested to subscribe this number to receive updates about Contoso's loyalty program.  To confirm subscription, reply to this message with 'JOIN'", "optInReply": "JOIN", "confirmationMessage": "Congrats, you have been successfully subscribed to loyalty program updates.  Welcome!", "directionality": "twoWay", "useCases": [{ "contentCategory": "coupons", "examples": [{ "messages": [{ "direction": "fromUser", "text": "txtMessage" }] }] }, { "contentCategory": "loyaltyProgram", "examples": [{ "messages": [{ "direction": "toUser", "text": "txtMessage" }] }] }, { "contentCategory": "loyaltyProgramPointsPrizes", "examples": [{ "messages": [{ "direction": "toUser", "text": "txtMessage" }] }] }] }, "trafficDetails": { "totalMonthlyVolume": 10000, "monthlyAverageMessagesFromUser": 1, "monthlyAverageMessagesToUser": 3, "isSpiky": true, "spikeDetails": "Higher traffic expected around major shopping holidays, most notably Black Friday and Memorial Day.", "estimatedRampUpTimeInDays": 0 } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json; charset=utf-8',
    'Location',
    'https://smstestapp.int.communication.azure.net/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000',
    'MS-CV',
    'g7vW0JCIM0+4G9nz2N76uw.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '2757ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0NiRjYgAAAADWyZryXpx+RKiVUwnjbRk2R1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:55:04 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000/attachments')
  .query(true)
  .reply(404, { "error": { "code": "InternalError", "message": "The server encountered an internal error.", "innererror": { "code": "NotFound", "message": "Not Found" } } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json',
    'MS-CV',
    'Rum9yg8QWEiNhWwQALBw+w.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '364ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0OSRjYgAAAAAnYGOsHF22S5k8LSOSGUchR1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:55:05 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000/attachments/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, { "error": { "code": "InternalError", "message": "The server encountered an internal error.", "innererror": { "code": "NotFound", "message": "Not Found" } } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json',
    'MS-CV',
    'n0unll2rHkOZCD+v5k6VZQ.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '306ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0OSRjYgAAAADE9PciWEoPRKwNZty6MljBR1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:55:05 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .delete('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(204, "", [
    'MS-CV',
    'PS0hltKSaEKSMGF1M0GHrQ.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '362ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0OiRjYgAAAABUpZHBLHQ/R53MjyLkRCFSR1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:55:06 GMT'
  ]);

nock('https://endpoint', { "encodedQueryParams": true })
  .get('/shortCodes/countries/US/programBriefs/00000000-0000-0000-0000-000000000000')
  .query(true)
  .reply(404, { "error": { "code": "NotFound", "message": "Could not find the ProgramBrief with key 'Azure|00000000-0000-0000-0000-000000000000|00000000-0000-0000-0000-000000000000'" } }, [
    'Transfer-Encoding',
    'chunked',
    'Content-Type',
    'application/json',
    'MS-CV',
    'qLUD95jE90qgMg49NNUGPg.0',
    'Strict-Transport-Security',
    'max-age=2592000',
    'api-supported-versions',
    '2021-10-25-preview',
    'X-Processing-Time',
    '3010ms',
    'X-Cache',
    'CONFIG_NOCACHE',
    'X-Azure-Ref',
    '0OyRjYgAAAABGxO5/6bLgT7KngUBLT3l0R1JVMzBFREdFMDcxMABjYzkyNzU4ZC0wNWY3LTRhZDYtYWE1ZS0wZmE5NzE4ZDg5ODU=',
    'Date',
    'Fri, 22 Apr 2022 21:55:09 GMT'
  ]);

# Release History

## 1.1.0 (2025-09-01)

### Other Changes

- Consumers can now provide a value for the `contentId` property when sending emails with attachments.
  This allows consumers to reference attachments in the email body using the `cid` scheme. The `contentId` property can be set on the `EmailAttachment` object.
- Updated to `@azure/core-lro` 2.7.2

## 1.0.1-beta.2 (2024-12-23)

### Other Changes

- Updated the README with inline images example.

## 1.0.1-beta.1 (2024-08-26)

### Features Added

- Consumers can now provide a value for the `contentId` property when sending emails with attachments.
  This allows consumers to reference attachments in the email body using the `cid` scheme. The `contentId` property can be set on the `EmailAttachment` object.

## 1.0.0 (2023-03-31)

The public release of the Azure Communication Services SDK for Email has the following features:

- send emails with a variety of options (multiple recipients, attachments, etc.)
- poll for the status of the email that was sent to track its progress

## 1.0.0-beta.2 (2023-03-01)

### Other Changes

- Updated to `@azure/communication-common` 2.2.0.
- Adding support for AAD token authentication

### Breaking Changes

- Reworked the SDK to follow the LRO (long running operation) approach. The 'beginSend' method returns a poller that can be used to check for the status of sending the email and retrieve the result. The return object has been adjusted to fit this approach.
- The `getSendStatus` method has been removed.
- The `sender` property has been changed to `senderAddress`.
- The `email` property under the recipient object has been changed to `address`.
- The `attachmentType` property under `attachments` has been changed to 'contentType'. This now accepts the attachment mime type.
- The EmailRecipients "cC" and "bCC" properties have been changed to "cc" and "bcc"
- The `contentBytesBase64` property under `attachments` has been changed to `contentInBase64`
- Custom headers in the email message are now key/value pairs.
- The importance property was removed. Email importance can now be specified through either the `x-priority` or `x-msmail-priority` custom headers.

## 1.0.0-beta.1 (2022-05-24)

The first preview of the Azure Communication Email Client has the following features:

- send emails to multiple recipients with attachments
- get the status of a sent message

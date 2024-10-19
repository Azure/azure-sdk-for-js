# Release History

## 1.1.0 (2024-10-30)

### Features Added

- Added ImageNotificationContent to send image messgae.
- Added DocumentNotificationContent to send document message.
- Added VideoNotificationContent to send video message.
- Added AudioNotificationContent to  send audio message.
- Deprecated MediaNotificationContent.

### Breaking Changes

- MediaNotificationcontent interface kind field is update with value "image_v0" from "image".

## 1.0.1 (2024-03-07)

Using MessagesServiceClient:

- Send WhatsApp messages.
- Get Template List.
- Download media file from WhatsApp server for incoming media message.

### Other Changes

- Fixed CI pipeline to publish MS doc.

## 1.0.0 (2024-02-29)

### Features Added

This is the initial release of the @azure-rest version of Azure Communication Messages Services.

Using MessagesServiceClient:

- Send WhatsApp messages.
- Get Template List.
- Download media file from WhatsApp server for incoming media message.

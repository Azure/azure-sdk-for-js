# Azure Video Analyzer Edge client library for TypeScript

## Getting started

### Install the package

Install the Video Analyzer client library for Typescript with npm:

```bash
npm install @azure/video-analyzer-edge
```

### Prerequisites

- TypeScript v3.6.
- You need an active [Azure subscription][azure_sub], and a [IoT device connection string][iot_device_connection_string] to use this package.
- To interact with Azure IoT Hub you will need to run `npm install azure-iothub`
- You will need to use the version of the SDK that corresponds to the version of the Video Analyzer Edge module you are using.

  | SDK     | Video Analyzer Edge Module |
  | ------- | -------------------------- |
  | 1.0.0-beta.1 | 1.0                        |

### Running the sample

Replace the variables `connectionString`, `deviceId`, and `moduleId` with your respective values. You can find these values from your Azure IoT hub. You should then be able to run the sample and send requests to your IoT hub.

<!-- LINKS -->

[azure_sub]: https://azure.microsoft.com/free/

[iot_device_connection_string]: TODO://link-to-published-package <!--https://msazure.visualstudio.com/One/_workitems/edit/9946084 Work item to add all todo links-->

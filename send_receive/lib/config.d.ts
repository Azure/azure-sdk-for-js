// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

// TODO: Create typings for azure-iot-common
//import { SharedAccessSignature } from 'azure-iot-common';

interface ConnectionConfig {
    (connectionString: string, path: string): ConnectionConfig;

    isIotHub: boolean;
    keyName: string;
    key: string;
    host: string;
    path: string;
    saslPlainUri: string;

    // Members available only when isIotHub == true
    // TODO: When azure-iot-commons are ready, use SharedAccessSignature
    sharedAccessSignature?: any;
}

export = ConnectionConfig
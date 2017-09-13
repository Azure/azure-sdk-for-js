"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudErrorMapper = {
    required: false,
    serializedName: "CloudError",
    type: {
        name: "Composite",
        className: "CloudError",
        modelProperties: {
            code: {
                required: true,
                serializedName: "code",
                type: {
                    name: "String"
                }
            },
            message: {
                required: true,
                serializedName: "message",
                type: {
                    name: "String"
                }
            },
            target: {
                required: false,
                serializedName: "target",
                type: {
                    name: "String"
                }
            },
            details: {
                required: false,
                serializedName: "details",
                type: {
                    name: "Sequence",
                    element: {
                        required: false,
                        serializedName: "CloudErrorElementType",
                        type: {
                            name: "Composite",
                            className: "CloudError"
                        }
                    }
                }
            }
        }
    }
};
//# sourceMappingURL=cloudError.js.map
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// d.ts shims provide types for things we use internally but are not part
// of this package's surface area.

interface RequestInit {}

interface RequestInfo {}

interface Response {}

interface Headers {}

declare function atob(data: string): string;
declare function btoa(data: string): string;

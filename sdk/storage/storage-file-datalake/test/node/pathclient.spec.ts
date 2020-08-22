import { record } from "@azure/test-utils-recorder";
import * as assert from "assert";
import * as dotenv from "dotenv";

import {
  DataLakeFileClient,
  DataLakeFileSystemClient,
  PathAccessControlItem,
  DataLakeServiceClient
} from "../../src";
import { PathPermissions } from "../../src/models";
import { getDataLakeServiceClient, recorderEnvSetup } from "../utils";

dotenv.config();

describe("DataLakePathClient Node.js only", () => {
  let fileSystemName: string;
  let fileSystemClient: DataLakeFileSystemClient;
  let fileName: string;
  let fileClient: DataLakeFileClient;
  const content = "Hello World";
  let serviceClient: DataLakeServiceClient;

  let recorder: any;

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
    fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    fileName = recorder.getUniqueName("file");
    fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();
    await fileClient.append(content, 0, content.length);
    await fileClient.flush(content.length);
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("setAccessControl", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true
        }
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true
        }
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false
        }
      }
    ];
    await fileClient.setAccessControl(acl);

    const permissions = await fileClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true
      },
      group: {
        read: true,
        write: false,
        execute: true
      },
      other: {
        read: false,
        write: true,
        execute: false
      }
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("setAccessControl with all parameters", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true
        }
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true
        }
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: false
        }
      }
    ];
    await fileClient.setAccessControl(acl, {
      owner: "$superuser",
      group: "$superuser"
    });

    const permissions = await fileClient.getAccessControl();

    assert.deepStrictEqual(permissions.owner, "$superuser");
    assert.deepStrictEqual(permissions.group, "$superuser");
    assert.deepStrictEqual(permissions.permissions, {
      extendedAcls: false,
      stickyBit: false,
      owner: {
        read: true,
        write: true,
        execute: true
      },
      group: {
        read: true,
        write: false,
        execute: true
      },
      other: {
        read: false,
        write: true,
        execute: false
      }
    });
    assert.deepStrictEqual(permissions.acl, acl);
  });

  it("setPermissions", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: false
        }
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true
        }
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: true
        }
      }
    ];

    const permissions: PathPermissions = {
      extendedAcls: false,
      stickyBit: true,
      owner: {
        read: true,
        write: true,
        execute: false
      },
      group: {
        read: true,
        write: false,
        execute: true
      },
      other: {
        read: false,
        write: true,
        execute: false
      }
    };

    await fileClient.setPermissions(permissions);

    const response = await fileClient.getAccessControl();

    assert.deepStrictEqual(response.owner, "$superuser");
    assert.deepStrictEqual(response.group, "$superuser");
    assert.deepStrictEqual(response.permissions, {
      ...permissions,
      other: { ...permissions.other, execute: true }
    });
    assert.deepStrictEqual(response.acl, acl);
  });

  it("setPermissions with all parameters", async () => {
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: false
        }
      },
      {
        accessControlType: "group",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: true,
          write: false,
          execute: true
        }
      },
      {
        accessControlType: "other",
        entityId: "",
        defaultScope: false,
        permissions: {
          read: false,
          write: true,
          execute: true
        }
      }
    ];

    const permissions: PathPermissions = {
      extendedAcls: false,
      stickyBit: true,
      owner: {
        read: true,
        write: true,
        execute: false
      },
      group: {
        read: true,
        write: false,
        execute: true
      },
      other: {
        read: false,
        write: true,
        execute: false
      }
    };

    await fileClient.setPermissions(permissions, { owner: "$superuser", group: "$superuser" });

    const response = await fileClient.getAccessControl();

    assert.deepStrictEqual(response.owner, "$superuser");
    assert.deepStrictEqual(response.group, "$superuser");
    assert.deepStrictEqual(response.permissions, {
      ...permissions,
      other: { ...permissions.other, execute: true }
    });
    assert.deepStrictEqual(response.acl, acl);
  });

  it("move", async () => {
    const destFileName = recorder.getUniqueName("destfile");
    const destFileClient = fileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileName);
    await destFileClient.getProperties();
  });

  it("move cross file system", async () => {
    const destFileSystemName = recorder.getUniqueName("destfilesystem");
    const destFileSystemClient = serviceClient.getFileSystemClient(destFileSystemName);
    await destFileSystemClient.create();

    const destFileName = recorder.getUniqueName("destfile");
    const destFileClient = destFileSystemClient.getFileClient(destFileName);
    await fileClient.move(destFileSystemName, destFileName);

    await destFileClient.getProperties();
    await destFileSystemClient.delete();
  });
});

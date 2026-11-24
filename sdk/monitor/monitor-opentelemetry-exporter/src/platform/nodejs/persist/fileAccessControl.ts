// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync, type BigIntStats } from "node:fs";
import { type as osType } from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "@azure/core-process";
import { diag } from "@opentelemetry/api";
import process from "node:process";

const windowsDriveAbsolutePath = /^[a-z]:[\\/]/i;

/**
 * Resolves a trusted executable beneath a drive-qualified Windows system root.
 *
 * @internal
 */
export function getWindowsSystemExecutable(
  systemRoot: string | undefined,
  ...segments: string[]
): string {
  if (!systemRoot || !windowsDriveAbsolutePath.test(systemRoot)) {
    throw new Error("A trusted Windows system directory could not be established.");
  }
  return path.win32.join(systemRoot, ...segments);
}

export class FileAccessControl {
  private static ACLED_DIRECTORIES = new Map<
    string,
    { ino: bigint; dev: bigint; birthtimeNs: bigint; ready: Promise<void> }
  >();
  private static ACL_IDENTITY: string | null = null;
  private static OS_FILE_PROTECTION_CHECKED = false;
  public static OS_PROVIDES_FILE_PROTECTION = false;
  public static USE_ICACLS = osType() === "Windows_NT";

  private static _getWindowsSystemExecutable(...segments: string[]): string {
    const systemRoot = process.env.SystemRoot ?? process.env.SYSTEMROOT;
    return getWindowsSystemExecutable(systemRoot, ...segments);
  }

  // Check if file access control could be enabled
  public static checkFileProtection(): void {
    if (
      !FileAccessControl.OS_PROVIDES_FILE_PROTECTION &&
      !FileAccessControl.OS_FILE_PROTECTION_CHECKED
    ) {
      FileAccessControl.OS_FILE_PROTECTION_CHECKED = true;
      // Node's chmod levels do not appropriately restrict file access on Windows
      // Use the built-in command line tool ICACLS on Windows to properly restrict
      // access to the temporary directory used for disk retry mode.
      if (FileAccessControl.USE_ICACLS) {
        // This should be async - but it's currently safer to have this synchronous
        // This guarantees we can immediately fail setDiskRetryMode if we need to
        try {
          FileAccessControl.OS_PROVIDES_FILE_PROTECTION = existsSync(
            FileAccessControl._getWindowsSystemExecutable("System32", "icacls.exe"),
          );
        } catch (e: any) {
          // Ignore error
        }
        if (!FileAccessControl.OS_PROVIDES_FILE_PROTECTION) {
          diag.warn(
            "Could not find ICACLS in expected location! This is necessary to use disk retry mode on Windows.",
          );
        }
      } else {
        // chmod works everywhere else
        FileAccessControl.OS_PROVIDES_FILE_PROTECTION = true;
      }
    }
  }

  public static async applyACLRules(directory: string, stats: BigIntStats): Promise<void> {
    const { ino, dev, birthtimeNs } = stats;
    const cached = this.ACLED_DIRECTORIES.get(directory);
    if (cached && cached.ino === ino && cached.dev === dev && cached.birthtimeNs === birthtimeNs) {
      return cached.ready;
    }
    // Concurrent users wait for the same ACL setup. A recreated directory needs its own ACL.
    const ready = this._getACLIdentity().then((identity) =>
      this._runICACLS(this._getACLArguments(directory, identity)),
    );
    this.ACLED_DIRECTORIES.set(directory, { ino, dev, birthtimeNs, ready });
    try {
      await ready;
    } catch (error) {
      if (this.ACLED_DIRECTORIES.get(directory)?.ready === ready) {
        this.ACLED_DIRECTORIES.delete(directory);
      }
      throw error;
    }
  }

  public static applyACLRulesSync(directory: string): void {
    if (FileAccessControl.USE_ICACLS) {
      this._runICACLSSync(this._getACLArguments(directory, this._getACLIdentitySync()));
    }
  }

  private static _runICACLS(args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const aclProc = spawn(
        FileAccessControl._getWindowsSystemExecutable("System32", "icacls.exe"),
        args,
        {
          windowsHide: true,
        },
      );
      aclProc.on("error", (e: Error) => reject(e));
      aclProc.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`Setting ACL restrictions did not succeed (ICACLS returned code ${code})`),
          );
        }
      });
    });
  }

  private static _runICACLSSync(args: string[]): void {
    // Some very old versions of Node (< 0.11) don't have this
    if (spawnSync) {
      const aclProc = spawnSync(
        FileAccessControl._getWindowsSystemExecutable("System32", "icacls.exe"),
        args,
        {
          windowsHide: true,
        },
      );
      if (aclProc.error) {
        throw aclProc.error;
      } else if (aclProc.status !== 0) {
        throw new Error(
          `Setting ACL restrictions did not succeed (ICACLS returned code ${aclProc.status})`,
        );
      }
    } else {
      throw new Error("Could not synchronously call ICACLS under current version of Node.js");
    }
  }

  private static _getACLIdentity(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (FileAccessControl.ACL_IDENTITY) {
        return resolve(FileAccessControl.ACL_IDENTITY);
      }
      const psProc = spawn(
        FileAccessControl._getWindowsSystemExecutable(
          "System32",
          "WindowsPowerShell",
          "v1.0",
          "powershell.exe",
        ),
        ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"],
        {
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"], // Needed to prevent hanging on Win 7
        },
      );
      let data = "";
      psProc.stdout?.on("data", (d: string) => (data += d));
      psProc.on("error", (e: Error) => reject(e));
      psProc.on("close", (code: number) => {
        FileAccessControl.ACL_IDENTITY = data && data.trim();
        if (code === 0) {
          resolve(FileAccessControl.ACL_IDENTITY);
        } else {
          reject(new Error(`Getting ACL identity did not succeed (PS returned code ${code})`));
        }
      });
    });
  }

  private static _getACLIdentitySync(): string {
    if (FileAccessControl.ACL_IDENTITY) {
      return FileAccessControl.ACL_IDENTITY;
    }
    // Some very old versions of Node (< 0.11) don't have this
    if (spawnSync) {
      const psProc = spawnSync(
        FileAccessControl._getWindowsSystemExecutable(
          "System32",
          "WindowsPowerShell",
          "v1.0",
          "powershell.exe",
        ),
        ["-Command", "[System.Security.Principal.WindowsIdentity]::GetCurrent().Name"],
        {
          windowsHide: true,
          stdio: ["ignore", "pipe", "pipe"], // Needed to prevent hanging on Win 7
        },
      );
      if (psProc.error) {
        throw psProc.error;
      } else if (psProc.status !== 0) {
        throw new Error(`Getting ACL identity did not succeed (PS returned code ${psProc.status})`);
      }
      FileAccessControl.ACL_IDENTITY = psProc.stdout && psProc.stdout.toString().trim();
      return FileAccessControl.ACL_IDENTITY;
    } else {
      throw new Error("Could not synchronously get ACL identity under current version of Node.js");
    }
  }

  private static _getACLArguments(directory: string, identity: string): string[] {
    return [
      directory,
      "/L",
      "/grant",
      "*S-1-5-32-544:(OI)(CI)F", // Full permission for Administrators
      "/grant",
      `${identity}:(OI)(CI)F`, // Full permission for current user
      "/inheritance:r",
    ]; // Remove all inherited permissions
  }
}

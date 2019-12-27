import * as child_process from "child_process";

export class CliCredentialClient {
  public createProcess(commandString: string) {
    return new Promise((resolve, reject) => {
      try {
        child_process.exec(commandString, (error, stdout, stderr) => {
          resolve({ stdout: stdout, stderr: stderr });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
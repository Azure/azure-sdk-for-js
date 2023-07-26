
import fs from 'fs'
export interface DiagnosticWriter {
    write(message: string): Promise<void>
}

export class FileDiagnosticWriter implements DiagnosticWriter {
    private fileWriter: number;

    constructor(fileName: string, appendFile: boolean) {
        this.fileWriter = fs.openSync(fileName, appendFile ? 'a+' : 'w+');
    }

    public async write(diagnosticsData: string): Promise<void> {
        fs.writeSync(this.fileWriter, diagnosticsData + '\n', null, 'utf-8');
    }
}

export class NoOpDiagnosticWriter implements DiagnosticWriter {
    public async write(diagnosticsData: string): Promise<void> {
        //No op
        console.log(diagnosticsData);
    }
}
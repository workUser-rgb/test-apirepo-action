import { ScanInfo } from "@/types/scaninfo.type";

declare global {
    var scanStore: { [key: string]: ScanInfo };
}

global.scanStore = global.scanStore || {};

class ScanManager {
    private scans: { [key: string]: ScanInfo } = global.scanStore;

    public addScan(scanData: ScanInfo): void {
        if (Object.keys(this.scans).length >= 10) {
            this.scans = {};
            global.scanStore = this.scans;
        }
        this.scans[scanData.scanId] = scanData;
        global.scanStore = this.scans;
    }

    public getScan(scanId: string): ScanInfo | undefined {
        return this.scans[scanId];
    }

    public updateScan(scanId: string, updatedData: Partial<ScanInfo>): void {
        if (this.scans[scanId]) {
            this.scans[scanId] = { ...this.scans[scanId], ...updatedData, lastUpdated: new Date().toISOString() };
            global.scanStore = this.scans;
        }
    }
}

const scanManager = new ScanManager();
export default scanManager;
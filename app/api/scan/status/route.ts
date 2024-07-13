import scanManager from '@/data/scans.data';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    const scanId = new URL(req.url).searchParams.get("scanId") ?? ""

    const scanData = scanManager.getScan(scanId);
    if (scanData) {
        if (scanData.status < 4) {
            scanManager.updateScan(scanId, { status: scanData.status + 1 });
        }
        const updatedScanData = scanManager.getScan(scanId);
        return NextResponse.json(updatedScanData, { status: 200 })
    } else {
        return NextResponse.json({ scanId, "error": "scanid not found :(" }, { status: 404 })
    }
}
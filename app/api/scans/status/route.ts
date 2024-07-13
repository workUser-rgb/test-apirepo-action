import { ScanInfo } from '@/types/scaninfo.type';
import { scans } from '../initiate/route';

export async function GET(req: Request) {

    const scanId = new URL(req.url).searchParams.get("scanId") ?? ""

    if (scans[scanId]) {
        const scanData = scans[scanId];

        // Simulate status update
        if (scanData.status < 4) {
            scanData.status += 1;
            scanData.lastUpdated = new Date().toISOString();
        }

        return Response.json(scanData, { status: 200 })
    } else {
        return Response.json({ scanId, "error": "scanid not found :(" }, { status: 404 })
    }
}
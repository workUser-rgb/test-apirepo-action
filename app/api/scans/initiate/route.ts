import { ScanInfo } from '@/types/scaninfo.type';
import { v4 as uuidv4 } from 'uuid';

let scans: { [key: string]: ScanInfo } = {};


export async function POST(req: Request) {

    const { host } = await req.json();

    const scanId = uuidv4();
    const scanData = {
        scanId,
        targetId: Math.floor(Math.random() * 1000),
        templateName: null,
        scanServer: "Central US",
        scanCode: Math.random().toString(36).substring(2, 12).toUpperCase(),
        host,
        projectId: Math.floor(Math.random() * 1000),
        critical: 0,
        high: 0,
        info: 30,
        low: 6,
        medium: 18,
        level: 3,
        lastUpdated: new Date().toISOString(),
        status: 1,
        scanInitiated: new Date().toISOString()
    };

    if (Object.keys(scans).length >= 10) {
        // manage server memeory :)
        scans = {};
    }

    scans[scanId] = scanData;
    return Response.json({ scanData })
}

export { scans };
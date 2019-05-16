import { Huckleberry } from "./Huckleberry";
import { AbstractFingerprint, CodeTransform } from "@atomist/sdm";
import { ProjectAnalysis } from "@atomist/sdm-pack-analysis";

export class NodeLibraryVersion extends AbstractFingerprint {

    constructor(public readonly libName: string, public readonly libVersion: string) {
        super(libName, libName, "1.0.0");
    }

    get data(): string {
        return JSON.stringify(this.libName + ":" + this.libVersion);
    }
}

export class NodeLibraryVersionHuckleberry implements Huckleberry<NodeLibraryVersion> {

    public makeItSo(t: NodeLibraryVersion): CodeTransform {
        return async p => {
            throw new Error("Applying Node library version not yet supported");
        }
    };

    get name() {
        return this.ideal.libName;
    }

    public async canGrowHere(pa: ProjectAnalysis): Promise<boolean> {
        return !!pa.elements.node;
    }

    public compare(h1: NodeLibraryVersion, h2: NodeLibraryVersion, by: string): number {
        return h1.libVersion > h2.libVersion ? 1 : -1;
    }

    // public flag(h: NodeLibraryVersion) {
    //     if (h.libVersion < "3") {
    //         return { severity: "warn" as any, category: "ts", detail: `Version ${h.libVersion} is old` };
    //     }
    //     return undefined;
    // }

    public toReadableString(h: NodeLibraryVersion): string {
        return h.libName + ":" + h.libVersion;
    }

    constructor(public readonly ideal: NodeLibraryVersion) {
    }

}
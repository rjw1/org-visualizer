import { ProjectAnalysis } from "@atomist/sdm-pack-analysis";
import { CodeTransform } from "@atomist/sdm";
import { Fingerprint } from "@atomist/automation-client/lib/project/fingerprint/Fingerprint";
import { HasMessages } from "@atomist/sdm-pack-analysis/lib/analysis/support/messageGoal";
import { ReviewComment } from "@atomist/automation-client";

/**
 * Management for a fingerprint
 * Path under analysis is fingerprints.name
 */
export interface Huckleberry<H extends Fingerprint> {

    /**
     * Must correspond to fingerprint name
     */
    readonly name: string;

    canGrowHere?(pa: ProjectAnalysis): Promise<boolean>;

    /**
     * The ideal state of this Huckleberry
     */
    readonly ideal?: H;

    /**
     * Flag any problems with this version
     * @param {H} h
     * @return {Promise<HasMessages>}
     */
    flag?(h: H): Pick<ReviewComment, "severity" | "category" | "detail"> | undefined;

    /**
     * Apply the given Huckleberry level
     * @param {H} h huckleberry to makeItSo
     * @param existingState existing state of the Huckleberry. May be undefined
     * @return {CodeTransform}
     */
    makeItSo?(h: H, existingState: H | undefined): CodeTransform;

    /**
     * Compare these two Huckleberries
     * @param {H} h1
     * @param {H} h2
     * @param {string} by
     * @return {number}
     */
    compare?(h1: H, h2: H, by: string): number;

    /**
     * To a human readable string. Must be unique
     * @param {H} h
     * @return {string}
     */
    toReadableString(h: H): string;
}

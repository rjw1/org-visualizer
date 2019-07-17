/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Aspect } from "@atomist/sdm-pack-fingerprints";

const AspectCategories: Record<string, string[]> = {};

/**
 * Store a categories for a given Aspects
 */
export function registerCategories(aspect: Pick<Aspect<any>, "name">,
                                   ...categories: string[]): void {
    AspectCategories[aspect.name] = categories;
}

/**
 * Retrieve categories or undefined for a given Aspect
 */
export function getCategories(aspect: Pick<Aspect<any>, "name">): string[] | undefined {
    return AspectCategories[aspect.name];
}

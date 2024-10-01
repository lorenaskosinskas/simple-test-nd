import {
  Fixtures,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from "playwright/test";

import { PlanFlow } from "../../flows/planFlow";
import { PageFixtures } from "./pageFixtures";

export type FlowFixtures = {
  planFlow: PlanFlow;
};

export const flowFixtures: Fixtures<
  FlowFixtures,
  object,
  PlaywrightTestArgs & PlaywrightTestOptions & PageFixtures,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = {
  planFlow: async ({ homePage, pricingPage, cartPage }, use) => {
    await use(new PlanFlow(homePage, pricingPage, cartPage));
  },
};

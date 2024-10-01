import { test as base } from "@playwright/test";

import { PageFixtures, pageFixtures } from "./pageFixtures";
import { FlowFixtures, flowFixtures } from "./flowFixtures";

export {
  expect,
  type Page,
  type Locator,
  type TestInfo,
} from "@playwright/test";

export const test = base
  .extend<PageFixtures>(pageFixtures)
  .extend<FlowFixtures>(flowFixtures);

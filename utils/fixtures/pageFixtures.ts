import {
  Fixtures,
  PlaywrightTestArgs,
  PlaywrightTestOptions,
  PlaywrightWorkerArgs,
  PlaywrightWorkerOptions,
} from "playwright/test";

import { CartPage } from "../../pages/cart/cartPage";
import { HomePage } from "../../pages/homePage";
import { LoginPage } from "../../pages/loginPage";
import { PricingPage } from "../../pages/pricingPage";

export type PageFixtures = {
  cartPage: CartPage;
  homePage: HomePage;
  loginPage: LoginPage;
  pricingPage: PricingPage;
};

export const pageFixtures: Fixtures<
  PageFixtures,
  object,
  PlaywrightTestArgs & PlaywrightTestOptions,
  PlaywrightWorkerArgs & PlaywrightWorkerOptions
> = {
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  pricingPage: async ({ page }, use) => {
    await use(new PricingPage(page));
  },
};

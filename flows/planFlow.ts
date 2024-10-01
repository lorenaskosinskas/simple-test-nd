import { CartPage } from "../pages/cart/cartPage";
import { HomePage } from "../pages/homePage";
import { PricingPage } from "../pages/pricingPage";

export class PlanFlow {
  constructor(
    private readonly homePage: HomePage,
    private readonly pricingPage: PricingPage,
    private readonly cartPage: CartPage
  ) {}
  async navigateToPricingPageAndInitiate24MonthsPlan() {
    const isPeriodSelectVisible = await this.homePage.goToPricingPage();
    if (isPeriodSelectVisible) {
      await this.pricingPage.select24MonthsPeriod();
      await this.pricingPage.closeAiAssistantIfVisible();
    }
    await this.pricingPage.selectPremiumPlan();

    if (isPeriodSelectVisible) {
      await this.cartPage.verify24MonthsPeriodSelected();
    } else {
      await this.cartPage.select24MonthsPeriod();
      await this.cartPage.verify24MonthsPeriodSelected();
    }
  }
}

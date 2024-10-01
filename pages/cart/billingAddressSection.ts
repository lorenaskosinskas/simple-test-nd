import { expect, Locator, Page } from "../../utils/fixtures/baseTest";

export class BillingAddressSection {
  private readonly firstNameInputEl: Locator;
  private readonly lastNameInputEl: Locator;
  private readonly addressDetailsLines: Locator;
  private readonly continueBtn: Locator;
  private readonly availableGatewaysRegExp: RegExp = new RegExp(
    ".*available-gateways.*"
  );

  constructor(private readonly page: Page) {
    this.firstNameInputEl = this.page.locator("#first-name-input input");
    this.lastNameInputEl = this.page.locator("#last-name-input input");
    this.addressDetailsLines = this.page.locator(
      '[data-qa="billing-address-details-line"]'
    );
    this.continueBtn = this.page.getByRole("button", { name: "Continue" });
  }

  async fillInFirstNameAndLastName(firstName: string, lastName: string) {
    await this.page.waitForRequest(this.availableGatewaysRegExp);
    await this.firstNameInputEl.waitFor({ state: "visible" });

    await this.firstNameInputEl.fill(firstName);
    await this.lastNameInputEl.fill(lastName);
  }

  async verifyAddressDetailsLines(lines: string[]) {
    await expect(this.addressDetailsLines).toHaveCount(lines.length);

    for (const [index, line] of lines.entries()) {
      await expect(this.addressDetailsLines.nth(index)).toContainText(line);
    }
  }

  async clickContinue() {
    await this.continueBtn.click();
    await this.page.waitForLoadState("load");
  }
}

import { Locator, Page } from "../utils/fixtures/baseTest";

export class LoginPage {
  private readonly loginOptionEl: Locator;
  private readonly emailInputEl: Locator;
  private readonly passwordInputEl: Locator;
  private readonly loginBtn: Locator;

  constructor(private readonly page: Page) {
    this.loginOptionEl = this.page.locator('[data-qa="log-in-button"]');
    this.emailInputEl = this.page.locator(
      '[data-qa="login-email-input"] input'
    );
    this.passwordInputEl = this.page.locator(
      '[data-qa="login-password-input"] input'
    );
    this.loginBtn = this.page.locator("button[data-qa=log-in-button]");
  }

  async logInUser(email: string, password: string) {
    await this.loginOptionEl.click();
    await this.page.waitForLoadState();
    await this.emailInputEl.fill(email);
    await this.passwordInputEl.fill(password);
    await this.loginBtn.click();
    await this.page.waitForLoadState("load");
  }
}

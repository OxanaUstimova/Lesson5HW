export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginLink = page.getByRole('link', { name: 'Login' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async login(userName, password) {
    await this.loginLink.click();
    await this.emailInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  //выход из сайта
   async logout() {
    await this.logoutLink.click();
   }
}
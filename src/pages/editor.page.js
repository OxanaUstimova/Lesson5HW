export class EditorPage {
  constructor(page) {
    this.page = page;
    
    // Локаторы статьи 
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.aboutInput = page.getByRole('textbox', { name: 'What\'s this article about?' });
    this.articleInput = page.getByRole('textbox', { name: 'Write your article (in' });
    this.publishPush = page.getByRole('button', { name: 'Publish Article' });

     // Локаторы настроек
    this.settingsPasswordInput = page.getByRole('textbox', { name: 'Password' });
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    this.settingsHeading = page.getByRole('heading');
  }


  // Метод для создания статьи 
  async createArticle(title, description, body) {
    await this.titleInput.fill(title);
    await this.aboutInput.fill(description);
    await this.articleInput.fill(body);
    await this.publishPush.click();

 
  }

  //  метод для создания пароля
  async updatePassword(newPassword) {
     await this.settingsPasswordInput.fill(newPassword); // Вставляем то, что прилетело в кармашек
    await this.updateSettingsButton.click();
 
  }
}
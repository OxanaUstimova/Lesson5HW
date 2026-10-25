    const URL = 'https://realworld.qa.guru/';
  
    export class MainPage  {
    constructor (page) {
    // техническое описание страницы браузера
    this.page = page;
     //регистрация
    this.signLink =  page.getByRole('link', { name: 'Sign up' });
     //обновление  и настройки
    this.userProfileLink = page.getByText('Оксаночка');
    this.profileTab = page.getByRole('link', { name: ' Profile' });
    this.settingsTab = page.getByRole('link', { name: ' Settings' });

     // написание статьи
    this.newArticleTab = page.getByRole('link', { name: ' New Article' });
    //для лайка
    //this.likeButton = page.getByRole('button', { name: / \( \d+ \)/ }).first();
    this.likeButton = page.getByRole('button', { name:'conqueror'});
    this.activeLikeButton = page.getByRole('button', { name: / \( \d+ \)/ });
    this.mainContent = page.getByRole('main');
    // Переменная для совместимости с тестом №2 (mainContainer)
    this.mainContainer = page.getByRole('main');
    
    }
    // методы бизнесовое описание страницы
         async open() {
        await this.page.goto(URL);
    }
      async signup(){
        await this.signLink.click();  
    }
    async goToProfile() {
    await this.userProfileLink.click();
    await this.profileTab.click();
  } 
  async clickLike() {
    await this.likeButton.click();
  }
  // Метод для обработки алерта в Тесте №2 
  async clickLikeAndDismissAlert() {
    this.page.once('dialog', dialog => {
      dialog.dismiss().catch(() => {});
    });
    await this.likeButton.click();
  }

  // Динамический метод для клика по кнопке любой страницы
    async clickPage(pageNumber) {
    await this.page.getByRole('button', { name: `Page ${pageNumber}` }).click();
  }
  // метод, который обнаруживает кнопку страницы
    getPageButton(pageNumber){
        return this.page.getByRole('button', { name: `Page ${pageNumber}` });
    }
  async goToSettings() {
    await this.userProfileLink.click();
    await this.settingsTab.click();
  }

  }


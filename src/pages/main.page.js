const URL = 'https://realworld.qa.guru/';
  
export class MainPage  {
  constructor (page) {
    // техническое описание страницы браузера
    this.page = page;

     //регистрация
    this.signLink =  page.getByRole('link', { name: 'Sign up' });

     //обновление  и настройки
    this.userProfileLink = page.getByText('Оксаночка');
    this.profileTab = page.getByRole('link', { name: 'Profile' });
    this.settingsTab = page.getByRole('link', { name: 'Settings' });
    this.logoutTab = page.getByRole('link', { name: 'Logout' });

    // Навигация по лентам
    this.newArticleTab = page.getByRole('link', { name: ' New Article' });
    this.yourFeedTab = page.getByRole('button', { name: 'Your Feed' });
    this.globalFeedTab = page.getByRole('button', { name: 'Global Feed' });
    this.favoritedArticlesTab = page.getByRole('link', { name: 'Favorited Articles' });

    // Работа с контентом и лайками
    this.likeButton = page.getByRole('button', { name: / \( \d+ \)/ }).first();
    this.activeLikeButton = page.getByRole('button', { name: / \( \d+ \)/ });
    this.mainContent = page.getByRole('main');
    this.mainContainer = page.getByRole('main');

        // Локатор для тега статьи (нужен для Теста №2)
    this.articleTagButton = page.getByRole('button', { name: 'cognatus' });
    
    // локатор находит кнопку ЛЮБОГО автора в ленте
    this.articleAuthorButton = page.getByRole('button', { name: /.*/ });
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
 
  // Метод для клика по тегу статьи 
  async clickTag() {
    await this.articleTagButton.click();
  }

  // Переход на страницу настроек
  async goToSettings() {
    await this.userProfileLink.click();
    await this.settingsTab.click();
  }
}


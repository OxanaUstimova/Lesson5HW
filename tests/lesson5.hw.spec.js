
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { MainPage } from '../src/pages/main.page';
import { EditorPage } from '../src/pages/editor.page';
import { faker } from '@faker-js/faker';

test.describe('Conduit RealWorld Tests (POM)', () => {
let mainPage;
let loginPage;
let editorPage;

test.beforeEach(async ({ page }) => {
mainPage = new MainPage(page);
loginPage = new LoginPage(page);
editorPage = new EditorPage(page);

await mainPage.open();
await loginPage.login('oxanochka@guru.ru', 'Test12345');
});

//1. Написание статьи (Предусловие: Пользователь ранее регистрировался)
test('test1 НАписание статьи', async () => {
    // Генерируем уникальные данные перед началом шагов
const randomTitle = faker.lorem.sentence(3); // Случайное название из 3 слов 
const randomAbout = faker.lorem.sentence(5); // Случайное описание из 5 слов
const randomBody = faker.lorem.paragraph();  // Случайный целый абзац текста

// Переходим на страницу создания статьи
await mainPage.newArticleTab.click(); 
//заполняем поля для статьи
await editorPage.createArticle(randomTitle, randomAbout, randomBody);     
//Проверка результата. Появилась кнопка "Удалить"
 await expect(editorPage.deleteArticleButton).toBeVisible();
});
// 2. Добавление понравившейся статьи в "Избранное" (Предварительные условия - пользователь авторизован)
test('test2 добавление статьи в избранное через лайк', async ({ page }) => {
    
    await mainPage.globalFeedTab.click();
    await mainPage.clickTag(); // Кликаем на тег статьи (например cognatus)

    // Ждем, пока плашка загрузки полностью пропадет
    await expect(page.getByText('Loading articles list...')).toBeHidden();

    // Запоминаем количество лайков ДО нажатия
    const initialLikeText = await mainPage.likeButton.textContent();

   // Нажимаем лайк
    await mainPage.clickLike(); 
    
    //Убеждаемся, что счетчик лайков на кнопке изменился (увеличился)
    await expect(mainPage.likeButton).not.toHaveText(initialLikeText);

    //Проверяем, что кнопка перешла в активное состояние 
    await expect(mainPage.activeLikeButton.first()).toBeVisible();
  });

  // 3. Тест на лайк в профиле (где мы сами генерируем статью, чтобы не зависеть от БД)
  test('test3 лайк своей статьи в профиле', async () => {
        
    await test.step('Предусловие: Создание статьи для лайка', async () => {
      await mainPage.newArticleTab.click();
      await editorPage.createArticle(faker.lorem.sentence(3), faker.lorem.sentence(5), faker.lorem.paragraph());
    });

    await mainPage.goToProfile();
    await mainPage.clickLike();
    await expect(mainPage.mainContent).toContainText(/\(\s*[1-9]\d*\s*\)/);
  });
    
  // 4. Тест на удаление статьи (который пришел на замену багнутой пагинации)
  test('test4 удаление статьи', async () => {
        
    await mainPage.newArticleTab.click();
    await editorPage.createArticle(faker.lorem.sentence(3), faker.lorem.sentence(5), faker.lorem.paragraph());
    
    await editorPage.deleteArticleButton.click();
    await expect(mainPage.newArticleTab).toBeVisible();
  });

//5. смена пароля в настройках (Предусловие: Пользователь ранее зарегистрирован)
test('test5 смена пароля в настройках', async () => {

await mainPage.goToSettings(); // метод перехода в настройки из MainPage
//Передаем в метод  новый пароль
await editorPage.updatePassword('Test12345');
    
 await expect(editorPage.settingsHeading).toContainText('Your Settings');
});

});


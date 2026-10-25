
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { MainPage } from '../src/pages/main.page';
import { EditorPage } from '../src/pages/editor.page';

test.describe('Conduit RealWorld Tests (POM)', () => {
let mainPage;
let loginPage;
let editorPage;

test.beforeEach(async ({ page }) => {
mainPage = new MainPage(page);
loginPage = new LoginPage(page);
editorPage = new EditorPage(page);
});

//1. Написание статьи (Предусловие: Пользователь ранее регистрировался)
test('test1 НАписание статьи', async () => {
//авторизация 
await mainPage.open();
await loginPage.login('oxanochka@guru.ru', 'Test12345');
// Шаг 2: Переходим на страницу создания статьи
await mainPage.newArticleTab.click(); 
//заполняем поля для статьи
await editorPage.createArticle('Важная', 'Важно', 'Важно беречь себя');     
//Проверка результата
await expect(mainPage.mainContent).toContainText('Publish Article');
});

//2.Попытка поставить лайк не авторизованному пользователю (Предусловие: Пользователь не зарегистрирован)
test('test2 попытка поставить лайк не авторизованному пользователю', async () => {
await mainPage.open();
await mainPage.clickLikeAndDismissAlert();
await expect(mainPage.mainContainer).toContainText('( 0 ) ');
});

// 3. лайк своей статьи в профиле (Предусловие: Пользователь зарегистрирован, имеет свою статью)
test('test3 лайк своей статьи в профиле', async () => {
//Открываем сайт и логинимся
await mainPage.open();
await loginPage.login('oxanochka@guru.ru', 'Test12345');
//Переходим в профиль и жмем лайк// //     await mainPage.goToProfile();
await mainPage.clickLike();
await expect(mainPage.mainContainer).toContainText(/\(\s*[1-9]\d*\s*\)/);
});
    
// 4. Проверка пагинации (Предусловие: Пользователь не зарегистрирован)
test('test4 проверка пагинации', async() =>{
await mainPage.open();
// Кликаем по страницам
await mainPage.clickPage(2);
await mainPage.clickPage(3);
// Проверяем, что кнопка 4-й страницы содержит текст '4'
await expect(mainPage.getPageButton(4)).toBeVisible();
});

//5. смена пароля в настройках (Предусловие: Пользователь ранее зарегистрирован)
test('test5 смена пароля в настройках', async () => {
await mainPage.open();
await loginPage.login('oxanochka@guru.ru', 'Test12345');
await mainPage.goToSettings(); // метод перехода в настройки из MainPage
//Передаем в метод  новый пароль
await editorPage.updatePassword('Test12345');
    
 await expect(editorPage.settingsHeading).toContainText('Your Settings');
});

});


import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://alliance-desktop-employer3.dev.robota.ua/auth/login');
  await page.getByRole('textbox', { name: 'Email або номер телефону *' }).click();
  await page
    .getByRole('textbox', { name: 'Email або номер телефону *' })
    .fill('team69rabotaua@gmail.com');
  await page.getByRole('textbox', { name: 'Введіть пароль *' }).click();
  await page.getByRole('textbox', { name: 'Введіть пароль *' }).fill('123456');
  await page.getByRole('button', { name: 'Увійти' }).click();
  await page.locator('#center').getByRole('link', { name: 'Послуги' }).click();
  await page.getByRole('link', { name: 'Резюме', exact: true }).click();

  await page.context().storageState({ path: authFile });
});

import { test, expect } from '@playwright/test';

// Хелпер для заповнення мінімальної вакансії
async function fillBaseVacancy(page) {
  await page.goto('https://alliance-desktop-employer3.dev.robota.ua/my/vacancies/create');

  // Заповнення заголовку
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).fill('QA-інженер');

  // Клік у поле з описом
  await page
    .getByRole('application')
    .locator('div')
    .filter({
      hasText: 'Розкажіть, якими знаннями, навичками і особистими якостями повинен володіти канд',
    })
    .locator('div')
    .click();

  // Генерація тексту через GPT
  await page.getByRole('button', { name: 'gpt' }).click();
  await expect(page.getByRole('paragraph').filter({ hasText: 'Готово' })).toBeVisible({
    timeout: 15000,
  });
}

test('Створення вакансії', async ({ page }) => {
  await fillBaseVacancy(page);
  await page.getByRole('button', { name: 'Опублікувати', exact: true }).click();

  const response = await page.waitForResponse((resp) => resp.url().includes('?q=createVacancy'));
  await expect(response.status()).toBe(200);
});

test('Створення гарячої вакансії', async ({ page }) => {
  await fillBaseVacancy(page);
  await page.locator('#publicationType span').first().click();
  await page.getByRole('button', { name: 'Опублікувати', exact: true }).click();
  await page.getByRole('button', { name: 'Зробити гарячою' }).click();

  const response = await page.waitForResponse((resp) => resp.url().includes('?q=vacancyMakeHot'));
  await expect(response.status()).toBe(200);
});

test('Збереження чернетки', async ({ page }) => {
  await fillBaseVacancy(page);
  await page.getByRole('button', { name: 'Зберегти чернетку' }).click();

  const response = await page.waitForResponse((resp) => resp.url().includes('?q=createVacancy'));
  await expect(response.status()).toBe(200);
});

test('Перевірка перегляду вакансії', async ({ page }) => {
  await fillBaseVacancy(page);
  await page.getByRole('button', { name: 'Перегляд' }).click();

  const response = await page.waitForResponse((resp) =>
    resp.url().includes('?q=getCompanyInfoForVacancyPreview'),
  );
  await expect(response.status()).toBe(200);
});

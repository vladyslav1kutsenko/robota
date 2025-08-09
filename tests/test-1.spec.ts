import { test, expect } from '@playwright/test';

test('Створення вакансії', async ({ page }) => {
  await page.goto('https://alliance-desktop-employer3.dev.robota.ua/my/vacancies/create');
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).click();
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).fill('QA-інженер');
  await page
    .getByRole('application')
    .locator('div')
    .filter({
      hasText: 'Розкажіть, якими знаннями, навичками і особистими якостями повинен володіти канд',
    })
    .locator('div')
    .click();
  await page.getByRole('button', { name: 'gpt' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('paragraph').filter({ hasText: 'Готово' })).toBeVisible();
  await page.getByRole('button', { name: 'Опублікувати', exact: true }).click();
  // await page.getByRole('button', { name: 'Активувати пакет й опублікувати' }).click();
  const response = await page.waitForResponse((resp) => resp.url().includes('?q=createVacancy'));
  await expect(response.status()).toBe(200);
});

test('Створення гарячої вакансії', async ({ page }) => {
  await page.goto('https://alliance-desktop-employer3.dev.robota.ua/my/vacancies/create');
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).click();
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).fill('QA-інженер');
  await page
    .getByRole('application')
    .locator('div')
    .filter({
      hasText: 'Розкажіть, якими знаннями, навичками і особистими якостями повинен володіти канд',
    })
    .locator('div')
    .click();
  await page.getByRole('button', { name: 'gpt' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('paragraph').filter({ hasText: 'Готово' })).toBeVisible();
  await page.locator('#publicationType span').first().click();
  await page.getByRole('button', { name: 'Опублікувати', exact: true }).click();
  await page.getByRole('button', { name: 'Зробити гарячою' }).click();
  // await page.getByRole('button', { name: 'Активувати пакет й опублікувати' }).click();
  const response = await page.waitForResponse((resp) => resp.url().includes('?q=createVacancy'));
  await expect(response.status()).toBe(200);
});

test('Збереження чернетки', async ({ page }) => {
  await page.goto('https://alliance-desktop-employer3.dev.robota.ua/my/vacancies/create');
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).click();
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).fill('QA-інженер');
  await page
    .getByRole('application')
    .locator('div')
    .filter({
      hasText: 'Розкажіть, якими знаннями, навичками і особистими якостями повинен володіти канд',
    })
    .locator('div')
    .click();
  await page.getByRole('button', { name: 'gpt' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('paragraph').filter({ hasText: 'Готово' })).toBeVisible();
  await page.getByRole('button', { name: 'Зберегти чернетку' }).click();
  const response = await page.waitForResponse((resp) => resp.url().includes('?q=createVacancy'));
  await expect(response.status()).toBe(200);
});

test('Перевідка перегляду вакансії', async ({ page }) => {
  await page.goto('https://alliance-desktop-employer3.dev.robota.ua/my/vacancies/create');
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).click();
  await page.getByRole('textbox', { name: 'Кого ви шукаєте? *' }).fill('QA-інженер');
  await page
    .getByRole('application')
    .locator('div')
    .filter({
      hasText: 'Розкажіть, якими знаннями, навичками і особистими якостями повинен володіти канд',
    })
    .locator('div')
    .click();
  await page.getByRole('button', { name: 'gpt' }).click();
  await page.waitForTimeout(5000);
  await expect(page.getByRole('paragraph').filter({ hasText: 'Готово' })).toBeVisible();
  await page.getByRole('button', { name: 'Перегляд' }).click();
  const response = await page.waitForResponse((resp) =>
    resp.url().includes('?q=getCompanyInfoForVacancyPreview'),
  );
  await expect(response.status()).toBe(200);
});

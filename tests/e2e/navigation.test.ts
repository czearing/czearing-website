import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page renders hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Caleb Zearing' })).toBeVisible();
  });

  test('home page renders about section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /about/i })).toBeVisible();
  });

  test('home page renders experience section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible();
  });

  test('home page renders projects section', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible();
  });

  test('logo links to home', async ({ page }) => {
    await page.goto('/articles');
    await page.getByRole('link', { name: 'czearing' }).click();
    await expect(page).toHaveURL('/');
  });

  test('Articles nav link navigates to /articles', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Articles' }).first().click();
    await expect(page).toHaveURL('/articles');
  });

  test('Videos nav link navigates to /videos', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Videos' }).first().click();
    await expect(page).toHaveURL('/videos');
  });

  test('page title is correct on home', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Caleb Zearing');
  });

  test('page title is correct on articles', async ({ page }) => {
    await page.goto('/articles');
    await expect(page).toHaveTitle(/Articles/);
  });

  test('responsive layout at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Caleb Zearing' })).toBeVisible();
  });

  test('responsive layout at 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Caleb Zearing' })).toBeVisible();
  });
});

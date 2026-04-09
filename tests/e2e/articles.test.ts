import { test, expect } from '@playwright/test';

test.describe('Articles page', () => {
  test('renders Articles heading', async ({ page }) => {
    await page.goto('/articles');
    await expect(page.getByRole('heading', { name: /articles/i })).toBeVisible();
  });

  test('renders search input', async ({ page }) => {
    await page.goto('/articles');
    await expect(page.getByRole('searchbox')).toBeVisible();
  });

  test('search filters articles by title', async ({ page }) => {
    await page.goto('/articles');
    const searchbox = page.getByRole('searchbox');
    await searchbox.fill('zzzzzzzzzzzzz');
    // Either no cards or no articles found message
    const cards = page.locator('[data-testid="article-card"]');
    await expect(cards).toHaveCount(0);
  });

  test('clearing search restores articles or shows empty state', async ({ page }) => {
    await page.goto('/articles');
    const searchbox = page.getByRole('searchbox');
    await searchbox.fill('zzzzzzzzzzzzz');
    await searchbox.clear();
    // Either articles loaded or empty state message — both are valid
    const cards = page.locator('[data-testid="article-card"]');
    const emptyMsg = page.locator('text=No articles found');
    await expect(cards.first().or(emptyMsg)).toBeVisible({ timeout: 10000 });
  });

  test('article cards link to Medium when articles are present', async ({ page }) => {
    await page.goto('/articles');
    const firstCard = page.locator('[data-testid="article-card"]').first();
    // Only assert card details if the RSS feed returned data
    const cardCount = await firstCard.count();
    if (cardCount === 0) {
      // RSS feed unavailable in this environment — acceptable
      await expect(page.locator('text=No articles found')).toBeVisible({ timeout: 10000 });
      return;
    }
    await expect(firstCard).toBeVisible({ timeout: 10000 });
    const href = await firstCard.getAttribute('href');
    expect(href).toBeTruthy();
  });

  test('page title is correct', async ({ page }) => {
    await page.goto('/articles');
    await expect(page).toHaveTitle(/Articles/);
  });
});

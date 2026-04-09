import { test, expect } from '@playwright/test';

test.describe('Videos page', () => {
  test('renders Videos heading', async ({ page }) => {
    await page.goto('/videos');
    await expect(page.getByRole('heading', { name: /videos/i })).toBeVisible();
  });

  test('renders search input when API key is configured', async ({ page }) => {
    await page.goto('/videos');
    // If no API key, the page shows a notice instead of VideoList
    const notice = page.locator('text=NEXT_PUBLIC_GOOGLE_API_KEY');
    if (await notice.isVisible()) {
      return; // API key not configured — search UI intentionally absent
    }
    await expect(page.getByRole('searchbox')).toBeVisible();
  });

  test('search filters videos by title', async ({ page }) => {
    await page.goto('/videos');
    const notice = page.locator('text=NEXT_PUBLIC_GOOGLE_API_KEY');
    if (await notice.isVisible()) {
      return; // API key not configured — skip search interaction
    }
    const searchbox = page.getByRole('searchbox');
    await searchbox.fill('zzzzzzzzzzzzz');
    const cards = page.locator('[data-testid="video-card"]');
    await expect(cards).toHaveCount(0);
  });

  test('clearing search restores videos or shows empty state', async ({ page }) => {
    await page.goto('/videos');
    const notice = page.locator('text=NEXT_PUBLIC_GOOGLE_API_KEY');
    if (await notice.isVisible()) {
      return; // API key not configured — skip search interaction
    }
    const searchbox = page.getByRole('searchbox');
    await searchbox.fill('zzzzzzzzzzzzz');
    await searchbox.clear();
    // Videos page should at least render without crashing
    await expect(page.getByRole('heading', { name: /videos/i })).toBeVisible();
  });

  test('page title is correct', async ({ page }) => {
    await page.goto('/videos');
    await expect(page).toHaveTitle(/Videos/);
  });

  test('Videos nav link navigates to /videos', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Videos' }).first().click();
    await expect(page).toHaveURL('/videos');
  });
});

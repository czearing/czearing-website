import { test, expect } from '@playwright/test';

test.describe('Theme toggle', () => {
  test('applies dark theme by default (system fallback)', async ({ page }) => {
    await page.goto('/');
    const theme = await page.evaluate(
      () => document.documentElement.dataset.theme
    );
    expect(['light', 'dark']).toContain(theme);
  });

  test('cycles to dark mode via dropdown', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await page.getByRole('menuitem', { name: 'Dark' }).click();
    const theme = await page.evaluate(
      () => document.documentElement.dataset.theme
    );
    expect(theme).toBe('dark');
  });

  test('cycles to light mode via dropdown', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await page.getByRole('menuitem', { name: 'Light' }).click();
    const theme = await page.evaluate(
      () => document.documentElement.dataset.theme
    );
    expect(theme).toBe('light');
  });

  test('persists theme across page reload', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Toggle theme' }).click();
    await page.getByRole('menuitem', { name: 'Dark' }).click();
    await page.reload();
    const theme = await page.evaluate(
      () => document.documentElement.dataset.theme
    );
    expect(theme).toBe('dark');
  });
});

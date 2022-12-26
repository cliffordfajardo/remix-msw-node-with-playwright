import { test, expect } from '@playwright/test';

test('should render list of items', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  const listItemEl = page.getByText('Anna')
  expect(await listItemEl.textContent()).toEqual('Anna')

  // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});

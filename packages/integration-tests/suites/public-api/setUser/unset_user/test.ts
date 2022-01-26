import { expect } from '@playwright/test';

import { sentryTest } from '../../../../utils/fixtures';
import { getMultipleSentryRequests } from '../../../../utils/helpers';

sentryTest('should unset user', async ({ getLocalTestPath, page }) => {
  const url = await getLocalTestPath({ testDir: __dirname });

  const eventData = await getMultipleSentryRequests(page, 3, url);

  expect(eventData[0].message).toBe('no_user');
  expect(eventData[0].user).toBeUndefined();

  expect(eventData[1].message).toBe('user');
  expect(eventData[1].user).toMatchObject({
    id: 'foo',
    ip_address: 'bar',
    other_key: 'baz',
  });

  expect(eventData[2].message).toBe('unset_user');
  expect(eventData[2].user).toBeUndefined();
});

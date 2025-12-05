import { cookies } from 'next/headers';

/**
 * Check if the current request is from an authenticated admin
 * Use this in API routes before allowing write operations
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('admin_authenticated')?.value === 'true';
    return isAuthenticated;
  } catch (error) {
    return false;
  }
}


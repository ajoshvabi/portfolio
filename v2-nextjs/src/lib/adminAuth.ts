// Client utility helper to verify if the user is currently logged in as admin.
// Uses a cookie set during admin inquiries dashboard login.

export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;

  // Check for the session cookie/token
  const cookies = document.cookie.split(";");
  const authCookie = cookies.find((c) => c.trim().startsWith("admin_session="));
  return !!authCookie;
}

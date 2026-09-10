const SESSION_KEY = "arada-admin-session";

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "1";
}

export function setAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, "1");
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
}
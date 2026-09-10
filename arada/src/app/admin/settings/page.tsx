"use client";

import { useState } from "react";
import { useMutation, useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminSettingsPage() {
  const storeNameQuery = useQuery(api.settings.get, { key: "store_name" });
  const marqueeQuery = useQuery(api.settings.get, { key: "marquee_text" });
  const set = useMutation(api.settings.set);
  const changePassword = useAction(api.auth.changeAdminPassword);

  const loaded = storeNameQuery !== undefined && marqueeQuery !== undefined;

  const [storeNameEdit, setStoreNameEdit] = useState<string | null>(null);
  const [marqueeEdit, setMarqueeEdit] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const [existingPassword, setExistingPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdStatus, setPwdStatus] = useState<string | null>(null);

  // Render-phase hydration: copy server value into the editable field once it loads
  const storeNameValue = storeNameEdit === null ? (loaded ? storeNameQuery ?? "" : "") : storeNameEdit;
  const marqueeValue = marqueeEdit === null ? (loaded ? marqueeQuery ?? "" : "") : marqueeEdit;

  async function saveStoreSettings() {
    setSaving(true);
    await set({ key: "store_name", value: storeNameValue });
    await set({ key: "marquee_text", value: marqueeValue });
    setSaving(false);
    setStatus("Saved.");
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPwdStatus("Passwords do not match.");
      return;
    }
    const ok = await changePassword({ current: existingPassword, next: newPassword });
    if (ok) {
      setPwdStatus("Password updated.");
      setExistingPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setPwdStatus("Current password is incorrect or too short.");
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-surface-dim border border-outline-variant text-on-surface font-body focus:outline-none focus:border-secondary";

  return (
    <div className="p-4 md:p-8 flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl uppercase tracking-tighter text-on-surface">Settings</h1>
        <p className="font-mono text-sm text-outline uppercase tracking-widest">Store configuration</p>
      </div>

      <section className="flex flex-col gap-4 max-w-xl">
        <h2 className="font-display text-lg uppercase tracking-tighter text-on-surface">Store Settings</h2>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">Store Name</span>
          <input
            value={storeNameValue}
            onChange={(e) => setStoreNameEdit(e.target.value)}
            className={inputClass}
            placeholder="ARADA"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest">Marquee Text</span>
          <input
            value={marqueeValue}
            onChange={(e) => setMarqueeEdit(e.target.value)}
            className={inputClass}
            placeholder="BUILT TO LAST"
          />
        </label>

        <div className="flex items-center gap-4 mt-1">
          <button
            onClick={saveStoreSettings}
            disabled={saving || !loaded}
            className="bg-primary-container text-white font-display text-sm px-6 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all disabled:opacity-40"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {status && <span className="font-mono text-xs text-secondary uppercase tracking-widest">{status}</span>}
        </div>
      </section>

      <div className="h-px bg-outline-variant max-w-xl" />

      <section className="flex flex-col gap-4 max-w-xl">
        <h2 className="font-display text-lg uppercase tracking-tighter text-on-surface">Admin Password</h2>
        <p className="font-mono text-xs text-outline uppercase tracking-widest">
          Change the password used to access this panel
        </p>

        <form onSubmit={savePassword} className="flex flex-col gap-4">
          <input
            type="password"
            required
            placeholder="Current password"
            value={existingPassword}
            onChange={(e) => setExistingPassword(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            required
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
          />
          <input
            type="password"
            required
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
          />
          {pwdStatus && <span className="font-mono text-xs text-secondary uppercase tracking-widest">{pwdStatus}</span>}
          <button
            type="submit"
            className="self-start bg-primary-container text-white font-display text-sm px-6 py-3 uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,0,255,0.5)] transition-all"
          >
            Change Password
          </button>
        </form>
      </section>
    </div>
  );
}
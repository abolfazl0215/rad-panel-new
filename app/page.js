"use client";

import { useState, useEffect } from "react";
import DashboardClient from "./DashboardClient";

// ─── Credentials (static) ─────────────────────────────────────────────────────
const USERNAME = "admin";
const PASSWORD = "rad10261026";
const LS_LOGGED_IN = "estate_logged_in";
const LS_REMEMBER = "estate_remember";
const LS_USERNAME = "estate_username";

// ─── Icons ────────────────────────────────────────────────────────────────────
const EyeIcon = ({ open }) =>
  open ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: 20, height: 20 }}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ width: 20, height: 20 }}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    style={{ width: 30, height: 30 }}>
    <path d="M3 21h18M9 21V7l6-4v18M9 7H3v14M9 11H3M9 15H3M15 11h2M15 15h2" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: 16, height: 16 }}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ width: 16, height: 16 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-10px); }
    40%     { transform: translateX(10px); }
    60%     { transform: translateX(-7px); }
    80%     { transform: translateX(7px); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulseGlow {
    0%,100% { opacity: .08; }
    50%     { opacity: .16; }
  }

  .login-card-enter { animation: fadeInUp .5s cubic-bezier(.22,.68,0,1.2) both; }
  .login-card-shake { animation: shake .5s ease-in-out; }

  .login-field {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09);
    color: #e2e8f0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    border-radius: 12px;
    padding: 11px 44px 11px 40px;
    transition: border-color .2s, background .2s, box-shadow .2s;
  }
  .login-field:focus {
    outline: none;
    border-color: rgba(99,179,237,.55);
    background: rgba(99,179,237,.04);
    box-shadow: 0 0 0 3px rgba(99,179,237,.09);
  }
  .login-field::placeholder { color: rgba(255,255,255,.22); }

  .login-submit {
    width: 100%;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: transform .18s, box-shadow .18s;
  }
  .login-submit:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(99,102,241,.45);
  }
  .login-submit:active:not(:disabled) { transform: translateY(0); }
  .login-submit:disabled { opacity: .5; cursor: not-allowed; }

  .login-checkbox {
    appearance: none;
    width: 16px; height: 16px;
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 4px;
    background: rgba(255,255,255,.04);
    cursor: pointer;
    transition: all .2s;
    position: relative;
    flex-shrink: 0;
  }
  .login-checkbox:checked { background: #6366f1; border-color: #6366f1; }
  .login-checkbox:checked::after {
    content: '';
    position: absolute;
    left: 4px; top: 1px;
    width: 5px; height: 9px;
    border: 2px solid #fff;
    border-left: none; border-top: none;
    transform: rotate(45deg);
  }

  .login-grid-bg {
    background-image:
      linear-gradient(rgba(99,179,237,.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(99,179,237,.09) 1px, transparent 1px);
    background-size: 40px 40px;
  }
`;

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(LS_REMEMBER) === "true") {
        const saved = localStorage.getItem(LS_USERNAME) || "";
        if (saved) {
          setUsername(saved);
          setRemember(true);
        }
      }
    } catch (_) {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (username.trim() === USERNAME && password === PASSWORD) {
        try {
          if (remember) {
            localStorage.setItem(LS_REMEMBER, "true");
            localStorage.setItem(LS_USERNAME, username.trim());
          } else {
            localStorage.removeItem(LS_REMEMBER);
            localStorage.removeItem(LS_USERNAME);
          }
          localStorage.setItem(LS_LOGGED_IN, "true");
        } catch (_) {}
        onSuccess();
      } else {
        setError("Invalid username or password.");
        setShaking(true);
        setTimeout(() => setShaking(false), 600);
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg,#07070d 0%,#0f1117 55%,#090d18 100%)",
      }}>
      <style>{STYLES}</style>

      {/* Grid */}
      <div
        className="login-grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          left: "33%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle,rgba(59,130,246,.18),transparent 70%)",
          animation: "pulseGlow 4s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          right: "25%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          pointerEvents: "none",
          background:
            "radial-gradient(circle,rgba(139,92,246,.14),transparent 70%)",
          animation: "pulseGlow 5s ease-in-out 1.2s infinite",
        }}
      />

      {/* Card */}
      <div
        className={shaking ? "login-card-shake" : "login-card-enter"}
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: 420,
          margin: "0 16px",
        }}>
        <div
          style={{
            borderRadius: 20,
            padding: "36px",
            background: "rgba(13,15,22,0.93)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
            boxShadow:
              "0 30px 60px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.03)",
          }}>
          {/* Brand */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 32,
            }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 16,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg,rgba(59,130,246,.18),rgba(99,102,241,.22))",
                border: "1px solid rgba(99,102,241,.32)",
                boxShadow: "0 4px 20px rgba(99,102,241,.18)",
              }}>
              <span style={{ color: "#93b4f0" }}>
                <BuildingIcon />
              </span>
            </div>
            <h1
              style={{
                color: "#f1f5f9",
                fontFamily: "'DM Serif Display', serif",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}>
              Estate Admin
            </h1>
            <p
              style={{
                marginTop: 6,
                color: "rgba(255,255,255,.28)",
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
              Property Management Portal
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}>
            {/* Username */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  color: "rgba(255,255,255,.38)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                Username
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,.3)",
                    display: "flex",
                  }}>
                  <UserIcon />
                </span>
                <input
                  className="login-field"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  color: "rgba(255,255,255,.38)",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,.3)",
                    display: "flex",
                  }}>
                  <LockIcon />
                </span>
                <input
                  className="login-field"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(255,255,255,.3)",
                    display: "flex",
                    padding: 0,
                    transition: "color .15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255,255,255,.65)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(255,255,255,.3)")
                  }>
                  <EyeIcon open={showPass} />
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                userSelect: "none",
                width: "fit-content",
              }}>
              <input
                type="checkbox"
                className="login-checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span
                style={{
                  color: "rgba(255,255,255,.42)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                }}>
                Remember me
              </span>
            </label>

            {/* Error */}
            {error && (
              <div
                style={{
                  borderRadius: 12,
                  padding: "10px 16px",
                  textAlign: "center",
                  background: "rgba(239,68,68,.09)",
                  border: "1px solid rgba(239,68,68,.24)",
                  color: "#f87171",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="login-submit">
              {loading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      display: "inline-block",
                      border: "2px solid rgba(255,255,255,.35)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin .75s linear infinite",
                    }}
                  />
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Page (auth gate) ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(LS_LOGGED_IN) === "true")
        setAuthed(true);
    } catch (_) {}
    setReady(true);
  }, []);

  if (!ready) return null;

  if (!authed)
    return <LoginScreen onSuccess={() => setAuthed(true)} />;

  return <DashboardClient />;
}

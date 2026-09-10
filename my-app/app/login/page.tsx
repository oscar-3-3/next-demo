"use client";

function UserIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 text-zinc-400"
      aria-hidden="true"
    >
      <circle cx="8" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M2.5 14c.7-2.7 3-4 5.5-4s4.8 1.3 5.5 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 text-zinc-400"
      aria-hidden="true"
    >
      <rect
        x="1.5"
        y="3.5"
        width="13"
        height="9"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M2 4.5l6 4.5 6-4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="h-4 w-4 text-zinc-400"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="7"
        width="11"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Login() {
  return (
    <div className="flex min-h-screen w-full flex-1">
      <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-black md:flex">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-white/10" />
        <h1 className="z-10 text-3xl font-bold tracking-wide text-white">
          STAX FOOD
        </h1>
      </div>

      <div className="flex w-full items-center justify-center bg-white px-8 py-16 md:w-1/2">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm"
        >
          <h2 className="text-3xl font-bold text-black">Hello!</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Sign Up to Get Started
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <label className="flex items-center gap-3 rounded-lg bg-zinc-100 px-4 py-3">
              <UserIcon />
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full bg-transparent text-sm text-black placeholder-zinc-400 outline-none"
              />
            </label>

            <label className="flex items-center gap-3 rounded-lg bg-zinc-100 px-4 py-3">
              <MailIcon />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full bg-transparent text-sm text-black placeholder-zinc-400 outline-none"
              />
            </label>

            <label className="flex items-center gap-3 rounded-lg bg-zinc-100 px-4 py-3">
              <LockIcon />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-transparent text-sm text-black placeholder-zinc-400 outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-black py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

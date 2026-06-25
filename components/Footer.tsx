"use client";

import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) {
      router.push("/sign-in");
    }
  };

  const initials = `${user?.firstName?.[0] ?? ""}${
    user?.lastName?.[0] ?? ""
  }`.toUpperCase();

  return (
    <footer
      className={`
        flex items-center justify-between
        rounded-2xl border border-gray-100
        bg-white px-4 py-3
        shadow-sm transition-all duration-300
        hover:shadow-md
      `}
    >
      {/* User Info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full bg-gradient-to-br
            from-blue-600 to-cyan-500
            text-sm font-bold text-white
            shadow-md
          "
        >
          {initials}
        </div>

        {/* Name & Email */}
        <div
          className={
            type === "mobile"
              ? "max-w-[120px]"
              : "max-w-[220px]"
          }
        >
          <h2 className="truncate text-sm font-semibold text-gray-900">
            {user?.firstName} {user?.lastName}
          </h2>

          <p className="truncate text-xs text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogOut}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-gray-50
          transition-all duration-300
          hover:bg-red-50
          hover:scale-105
        "
        aria-label="Logout"
      >
        <Image
          src="/icons/logout.svg"
          alt="Logout"
          width={20}
          height={20}
        />
      </button>
    </footer>
  );
};

export default Footer;
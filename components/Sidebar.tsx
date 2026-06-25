"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className="
        sidebar
        border-r border-gray-100
        bg-white
        shadow-sm
      "
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          {/* Logo Section */}
          <Link
            href="/"
            className="
              mb-10 flex items-center gap-3
              rounded-2xl p-2
              transition-all duration-300
              hover:bg-gray-50
            "
          >
            <div
              className="
                flex h-12 w-12 items-center justify-center
                rounded-xl bg-bank-gradient
                shadow-md
              "
            >
              <Image
                src="/icons/logo.svg"
                width={24}
                height={24}
                alt="Foti Banking"
                className="brightness-0 invert"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Foti Banking
              </h1>

              <p className="text-xs text-gray-500">
                Smart Banking
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.route ||
                pathname.startsWith(`${link.route}/`);

              return (
                <Link
                  key={link.label}
                  href={link.route}
                  className={cn(
                    `
                      group flex items-center gap-3
                      rounded-2xl px-4 py-3
                      transition-all duration-300
                    `,
                    isActive
                      ? "bg-bank-gradient shadow-md"
                      : "hover:bg-gray-50"
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      `
                        flex h-10 w-10 items-center
                        justify-center rounded-xl
                        transition-all duration-300
                      `,
                      isActive
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-gray-200"
                    )}
                  >
                    <Image
                      src={link.imgURL}
                      alt={link.label}
                      width={20}
                      height={20}
                      className={cn({
                        "brightness-0 invert": isActive,
                      })}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "font-medium transition-colors",
                      isActive
                        ? "text-white"
                        : "text-gray-700"
                    )}
                  >
                    {link.label}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div
                      className="
                        ml-auto h-2 w-2
                        rounded-full bg-white
                      "
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Connect Bank Button */}
          <div className="mt-6">
            <PlaidLink user={user} />
          </div>
        </div>

        {/* Footer */}
        <Footer user={user} />
      </div>
    </aside>
  );
};

export default Sidebar;
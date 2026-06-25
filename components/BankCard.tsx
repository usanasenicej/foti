import Image from "next/image";
import Link from "next/link";

import { formatAmount } from "@/lib/utils";

import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  const {
    name,
    currentBalance,
    mask,
    shareableId,
    appwriteItemId,
    subtype,
  } = account;

  const cardStyles = [
    "from-blue-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-green-600 to-emerald-500",
    "from-orange-500 to-red-500",
  ];

  const cardColor =
    cardStyles[(appwriteItemId?.length || 0) % cardStyles.length];

  const initials = userName
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/transaction-history/?id=${appwriteItemId}`}
        className={`
          relative overflow-hidden rounded-3xl
          bg-gradient-to-br ${cardColor}
          p-6 min-h-[220px]
          transition-all duration-300
          hover:-translate-y-1
          hover:scale-[1.02]
          hover:shadow-2xl
        `}
      >
        {/* Decorative background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{name}</h2>

              {subtype && (
                <span className="mt-2 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {subtype}
                </span>
              )}
            </div>

            <Image
              src="/icons/Paypass.svg"
              width={26}
              height={26}
              alt="Paypass"
            />
          </div>

          {/* Balance */}
          <div>
            <p className="text-sm text-white/70">
              Available Balance
            </p>

            <h1 className="mt-1 text-3xl font-bold text-white">
              {formatAmount(currentBalance)}
            </h1>
          </div>

          {/* Card Number */}
          <div>
            <p className="font-mono text-lg tracking-[3px] text-white">
              •••• •••• •••• {mask}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-white/60">
                CARD HOLDER
              </p>

              <h3 className="text-sm font-semibold text-white uppercase">
                {userName}
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-white/60">
                  MEMBER
                </p>
                <p className="text-sm font-semibold text-white">
                  {initials}
                </p>
              </div>
              <Image
                src="/icons/mastercard.svg"
                width={50}
                height={35}
                alt="Mastercard"
              />
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10" />
      </Link>

      {showBalance && <Copy title={shareableId} />}
    </div>
  );
};
export default BankCard;
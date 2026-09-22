"use client";

import { useAtomValue } from "jotai";
import { addressAtom } from "@/store/wallet";
import { WalletConnect } from "@/components/WalletConnect";

export default function Home() {
  const address = useAtomValue(addressAtom);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">STACKPROOF</h1>
            <p className="text-sm text-gray-400">
              Prove what you built on Stacks.
            </p>
          </div>

          <WalletConnect />
        </header>

        <section className="mt-16">
          <h2 className="text-5xl font-bold tracking-tight">
            Your contributions,
            <br />
            onchain.
          </h2>

          <p className="mt-5 max-w-xl text-gray-400">
            Submit your Stacks contributions and create a permanent,
            verifiable proof of what you built.
          </p>

          {!address && (
            <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
              Connect your wallet to submit a contribution.
            </p>
          )}

          {address && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-xl font-semibold">Submit a proof</h3>

              <div className="mt-5 space-y-4">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
                  placeholder="Contribution title"
                />

                <input
                  className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
                  placeholder="Category"
                />

                <input
                  className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
                  placeholder="Proof URL"
                />

                <button
                  disabled
                  className="w-full rounded-xl bg-white px-5 py-4 font-semibold text-black opacity-50"
                >
                  Submit proof
                </button>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                Contract interaction will be connected next.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

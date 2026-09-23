"use client";

import { useState } from "react";
import { useAtomValue } from "jotai";
import { stringAsciiCV } from "@stacks/transactions";
import { addressAtom } from "@/store/wallet";
import { WalletConnect } from "@/components/WalletConnect";
import { useCounter_SubmitProof } from "@/generated/hooks";

export default function Home() {
  const address = useAtomValue(addressAtom);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [proofUrl, setProofUrl] = useState("");

  const {
    call: submitProof,
    loading,
    txid,
    txStatus,
    error,
  } = useCounter_SubmitProof();

  const handleSubmit = async () => {
    if (!address || !title.trim() || !category.trim() || !proofUrl.trim()) {
      return;
    }

    await submitProof([
      stringAsciiCV(title.trim()),
      stringAsciiCV(category.trim()),
      stringAsciiCV(proofUrl.trim()),
    ]);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <header className="flex items-center justify-between border-b border-white/10">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-6">
          <div>
            <h1 className="text-2xl font-bold">STACKPROOF</h1>
            <p className="text-sm text-gray-400">
              Prove what you built on Stacks.
            </p>
          </div>
          <WalletConnect />
        </div>
      </header>

      <section className="mx-auto mt-16 max-w-4xl px-6 pb-20">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
                placeholder="Contribution title"
                maxLength={100}
              />

              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
                placeholder="Category"
                maxLength={50}
              />

              <input
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black p-4 outline-none"
                placeholder="Proof URL"
                maxLength={200}
              />

              <button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !title.trim() ||
                  !category.trim() ||
                  !proofUrl.trim()
                }
                className="w-full rounded-xl bg-white px-5 py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit proof"}
              </button>

              {txid && (
                <div className="rounded-xl border border-white/10 bg-black p-4 text-sm">
                  <p className="text-gray-400">Transaction</p>
                  <p className="mt-1 break-all text-white">{txid}</p>
                  <p className="mt-2 text-gray-400">
                    Status: {txStatus ?? "pending"}
                  </p>
                </div>
              )}

              {error && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                  {error.message}
                </p>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

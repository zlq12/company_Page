"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteRecordButton({ apiPath, id, label }: { apiPath: string; id: string; label: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!confirm(`确认删除这条${label}记录？`)) return;
    setLoading(true);
    const response = await fetch(`${apiPath}?id=${id}`, { method: "DELETE" });
    setLoading(false);
    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      alert(payload?.error || "删除失败");
      return;
    }
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={remove}
      disabled={loading}
      className="inline-flex h-8 items-center gap-1 rounded-md border border-red-200 px-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
      title={`删除${label}记录`}
    >
      <Trash2 className="h-3.5 w-3.5" />
      {loading ? "删除中" : "删除"}
    </button>
  );
}

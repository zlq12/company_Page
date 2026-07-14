"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ADMIN_USERNAME = "hangzhouruiqitengda";
const ADMIN_PASSWORD = "zlq1329930148";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError("账号或密码错误");
      return;
    }
    setError("");
    router.push("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6">
      <Card className="w-full max-w-md p-6">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold">管理员登录</h1>
            <p className="text-sm text-muted-foreground">请输入管理员账号和密码</p>
          </div>
        </div>
        <form className="grid gap-4" onSubmit={submit}>
          <label className="grid gap-2 text-sm font-medium">
            账号
            <input
              className="h-10 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            密码
            <input
              className="h-10 rounded-md border bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              type="password"
              required
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button className="mt-2" type="submit">
            <LogIn className="h-4 w-4" />
            登录后台
          </Button>
        </form>
      </Card>
    </main>
  );
}

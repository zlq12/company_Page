export function isAccountingDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export function AccountingDatabaseNotice() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">鏁版嵁搴撴湭閰嶇疆</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
        璁拌处涓庢暟鎹垎鏋愭ā鍧楅渶瑕?`DATABASE_URL`銆傝鍦ㄦ€荤珯鏍圭洰褰曞垱寤?`.env`锛屽弬鑰?`.env.accounting.example`
        濉叆 PostgreSQL 杩炴帴瀛楃涓诧紝鐒跺悗鎵ц `npm run db:push`銆?      </p>
    </main>
  );
}

-- 创建留资表 leads：存姓名 / 联系方式 / 留言
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  message text,
  created_at timestamptz not null default now()
);

-- 开启行级安全（RLS）
alter table public.leads enable row level security;

-- 只允许”插入”（网页提交），不允许读取/更新/删除
-- 注意：用 to public 而不是 to anon —— Supabase 新版 publishable key
-- 体系下 to anon 会导致插入被 RLS 拒绝（42501 错误），已实测验证。
create policy “Allow public insert”
  on public.leads
  for insert
  to public
  with check (true);

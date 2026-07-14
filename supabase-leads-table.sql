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

-- 只允许匿名访客“插入”（网页提交），不允许读取/更新/删除
create policy "Allow public insert"
  on public.leads
  for insert
  to anon
  with check (true);

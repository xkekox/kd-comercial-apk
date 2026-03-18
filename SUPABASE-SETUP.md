## KD Embalagens + Supabase

1. Crie um projeto no Supabase.
2. Abra `SQL Editor`.
3. Rode o arquivo [`supabase-schema.sql`](C:/Users/Administrator/.gemini/antigravity/scratch/manifestation-bridge/kd-comercial-apk/supabase-schema.sql).
4. Em `Project Settings > API`, copie:
   - `Project URL`
   - `anon public key`
5. No app KD:
   - abra `Registros`
   - preencha `URL do projeto Supabase`
   - preencha `Chave anon`
   - clique `Salvar conexao`
   - clique `Testar conexao`
   - clique `Sincronizar agora`

### Observacoes

- O app continua com fallback local.
- Se a nuvem estiver configurada, o app tenta sincronizar automaticamente depois de salvar registros.
- Exclusoes sao enviadas como marcacao `deleted` para evitar reaparecerem em outro aparelho.

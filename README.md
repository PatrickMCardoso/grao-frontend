# 🌾 Grão Direto - Frontend

> **Desafio Técnico:** Plataforma de Compartilhamento de Artigos  
> Uma aplicação web moderna construída com Next.js 13+, React Query e Tailwind CSS.

[![Next.js](https://img.shields.io/badge/Next.js-13%2B-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-green?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React%20Query-5.0-green?style=flat-square&logo=reactquery)](https://tanstack.com/query)

## 📋 Sumário

- [🚀 Começando](#-começando)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🏗️ Arquitetura](#️-arquitetura)
- [📦 Instalação](#-instalação)
- [🔧 Configuração](#-configuração)
- [🎯 Como Usar](#-como-usar)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [💡 Decisões Técnicas](#-decisões-técnicas)
- [🎨 Design System](#-design-system)
- [🔐 Autenticação](#-autenticação)
- [🧪 Como Testar](#-como-testar)
- [🚀 Deploy](#-deploy)

## 🚀 Começando

Esta é uma aplicação web completa para compartilhamento de artigos, desenvolvida como parte do desafio técnico da **Grão Direto**. A aplicação oferece uma interface moderna e responsiva para criação, edição e visualização de artigos, com sistema de comentários e autenticação.

**Repositórios:**

- 🔗 **Frontend:** [grao-frontend](https://github.com/PatrickMCardoso/grao-frontend)
- 🔗 **Backend:** [grao-backend](https://github.com/PatrickMCardoso/grao-backend)

## ✨ Funcionalidades

### 🔐 Autenticação

- [x] Login/logout de usuários
- [x] Proteção de rotas com middleware
- [x] Contexto de autenticação global
- [x] Redirecionamento automático

### 📰 Gestão de Artigos

- [x] Listagem paginada de artigos
- [x] Busca por título e conteúdo
- [x] Filtros por tags
- [x] Visualização detalhada
- [x] Criação de novos artigos
- [x] Edição (apenas autor)
- [x] Exclusão (apenas autor)

### 💬 Sistema de Comentários

- [x] Comentários em artigos
- [x] Respostas hierárquicas (replies)
- [x] Exclusão de comentários (apenas autor)

### 🎨 Interface & UX

- [x] Design responsivo
- [x] Tema personalizado com paleta da Grão Direto
- [x] Componentes reutilizáveis
- [x] Modais de confirmação
- [x] Toasts informativos
- [x] Loading states
- [x] Error boundaries

## 🛠️ Tecnologias

### Core Framework

- **[Next.js](https://nextjs.org/)** 13+ - React framework com App Router
- **[React](https://reactjs.org/)** 18 - Biblioteca de interface
- **[TypeScript](https://www.typescriptlang.org/)** 5.6 - Tipagem estática

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** 3.0 - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes acessíveis e customizáveis
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### State Management & Data Fetching

- **[React Query](https://tanstack.com/query)** 5.0 - Server state management
- **[React Context](https://reactjs.org/docs/context.html)** - Client state management

### Development & Quality

- **[ESLint](https://eslint.org/)** 9.38 - Linting
- **[Prettier](https://prettier.io/)** 3.6 - Formatação
- **[Husky](https://typicode.github.io/husky/)** 9.1 - Git hooks

## 🏗️ Arquitetura

A aplicação segue os padrões modernos do Next.js 13+ com App Router:

```
┌─────────────────────┐
│    App Router       │  ← Roteamento baseado em arquivos
├─────────────────────┤
│   Middleware        │  ← Proteção de rotas
├─────────────────────┤
│   React Context     │  ← Estado global (auth)
├─────────────────────┤
│   React Query       │  ← Cache e sincronização de dados
├─────────────────────┤
│   Custom Hooks      │  ← Lógica de negócio reutilizável
├─────────────────────┤
│   Services Layer    │  ← Comunicação com API
├─────────────────────┤
│   Backend API       │  ← grao-backend
└─────────────────────┘
```

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn**
- **Backend rodando** ([grao-backend](https://github.com/PatrickMCardoso/grao-backend))

### Clonando o Repositório

```bash
git clone https://github.com/PatrickMCardoso/grao-frontend.git
cd grao-frontend
```

### Instalando Dependências

```bash
npm install
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie o arquivo `.env.local`:

```bash
cp .env.local.example .env.local
```

**Configuração do `.env.local`:**

```env
# URL da API Backend
NEXT_PUBLIC_API_URL=http://localhost:3333
```

## 🎯 Como Usar

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação estará rodando em: **http://localhost:3000**

### Build & Produção

```bash
# Build da aplicação
npm run build

# Iniciar em produção
npm start
```

### Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento com hot-reload
npm run build        # Build para produção
npm run start        # Executar versão de produção
npm run lint         # Linting do código
npm run lint:fix     # Corrigir problemas de lint
npm run type-check   # Verificação de tipos TypeScript
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Página inicial
│   ├── providers.tsx        # Providers globais
│   ├── (app)/              # Rotas protegidas
│   │   ├── layout.tsx      # Layout autenticado
│   │   └── articles/       # Páginas de artigos
│   │       ├── page.tsx    # Lista de artigos
│   │       ├── create/     # Criar artigo
│   │       ├── [id]/       # Detalhes do artigo
│   │       └── _components/ # Componentes específicos
│   ├── login/              # Página de login
│   └── logout/             # Página de logout
├── components/
│   ├── ui/                 # Componentes base (shadcn/ui)
│   ├── article-*.tsx       # Componentes de artigos
│   ├── comment-*.tsx       # Componentes de comentários
│   ├── confirm-dialog.tsx  # Modal de confirmação
│   ├── toast.tsx          # Sistema de notificações
│   └── site-header.tsx    # Header da aplicação
├── contexts/
│   └── auth.tsx           # Contexto de autenticação
├── hooks/
│   ├── use-articles.ts    # Hook para artigos
│   ├── use-article.ts     # Hook para artigo específico
│   ├── use-comments.ts    # Hook para comentários
│   └── use-*.ts          # Outros hooks customizados
├── services/
│   ├── api.ts            # Cliente HTTP configurado
│   ├── auth.ts           # Serviços de autenticação
│   └── articles.ts       # Serviços de artigos
└── lib/
    ├── utils.ts          # Utilitários gerais
    └── format-tag.ts     # Formatação de tags
```

## 💡 Decisões Técnicas

### Next.js 13+ App Router

**Justificativa:**

- Server Components por padrão
- Roteamento baseado em arquivos mais intuitivo
- Layout aninhados
- Streaming e Suspense nativo

### React Query (TanStack Query)

**Justificativa:**

- Cache inteligente de dados
- Sincronização automática
- Loading/error states automáticos
- Otimistic updates
- Background refetching

### Middleware para Proteção de Rotas

**Justificativa:**

- Executa antes do render
- Redirecionamento server-side
- Performance superior a route guards client-side

### Context API para Autenticação

**Justificativa:**

- Estado global simples para auth
- Não requer biblioteca externa
- Fácil de testar e manter

### Tailwind CSS + Shadcn/ui

**Justificativa:**

- Desenvolvimento rápido
- Consistência visual
- Componentes acessíveis prontos
- Customização fácil com CSS variables

### TypeScript Strict Mode

**Justificativa:**

- Type safety máxima
- Detecção precoce de erros
- Melhor DX com autocomplete
- Refatoração segura

## 🎨 Design System

### Paleta de Cores

A aplicação utiliza uma paleta inspirada na identidade da Grão Direto:

```css
:root {
  --primary: #67a22d; /* Verde principal */
  --primary-foreground: #ffffff;
  --muted: #edf2e8; /* Verde claro */
  --background: #ffffff;
  --foreground: #1a1a1a;
  --border: #e2e8f0;
  --destructive: #ef4444; /* Vermelho para ações destrutivas */
}
```

### Componentes Reutilizáveis

- **Button:** Variantes primary, secondary, outline, destructive
- **Card:** Container base para conteúdo
- **Input/Textarea:** Campos de formulário consistentes
- **Toast:** Notificações não-intrusivas
- **ConfirmDialog:** Modais de confirmação acessíveis

### Responsividade

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid system flexível com CSS Grid e Flexbox

## 🔐 Autenticação

### Fluxo de Autenticação

1. **Login:** POST `/api/v1/auth/login` retorna `userId`
2. **Armazenamento:** `userId` salvo em `localStorage` e cookie
3. **Middleware:** Verifica cookie para proteção de rotas
4. **Context:** Estado global de autenticação

### Proteção de Rotas

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth.userId')?.value;

  if (protectedPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (publicOnlyPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/articles', request.url));
  }
}
```

### Sincronização Estado

- **Cookie:** Para middleware (server-side)
- **localStorage:** Para persistência client-side
- **Context:** Para estado reativo da UI

## 🧪 Como Testar

### 1. Configuração Inicial

Certifique-se de que o backend está rodando:

```bash
cd ../grao-backend
npm run dev  # Rodando na porta 3333
```

### 2. Iniciando o Frontend

```bash
npm run dev  # Rodando na porta 3000
```

### 3. Fazendo Login

Acesse **http://localhost:3000** e use uma das credenciais:

| Usuário         | Email                         | Senha    |
| --------------- | ----------------------------- | -------- |
| Fred Marques    | `fred.marques@example.com`    | `seeded` |
| Carlos Henrique | `carlos.henrique@example.com` | `seeded` |
| Carlos Eduardo  | `carlos.eduardo@example.com`  | `seeded` |
| Geovana Rocha   | `geovana.rocha@example.com`   | `seeded` |

### 4. Testando Funcionalidades

**Artigos:**

- ✅ Visualizar lista de artigos
- ✅ Buscar por título
- ✅ Filtrar por tags
- ✅ Criar novo artigo
- ✅ Editar próprios artigos
- ✅ Deletar próprios artigos

**Comentários:**

- ✅ Adicionar comentários
- ✅ Responder comentários
- ✅ Deletar próprios comentários

**Navegação:**

- ✅ Proteção de rotas funcionando
- ✅ Redirecionamentos automáticos
- ✅ Logout limpa estado

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente na dashboard
# NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Build Manual

```bash
# Build da aplicação
npm run build

# O output estará em .next/
# Configure seu servidor para servir os arquivos estáticos
```

### Variáveis de Produção

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### Considerações de Deploy

- Configure CORS no backend para permitir seu domínio frontend
- Use HTTPS em produção
- Configure headers de segurança
- Otimize imagens com next/image

---

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico para a **Grão Direto**.

---

<div align="center">

**Desenvolvido com ❤️ para o desafio técnico da Grão Direto**

[![Grão Direto](https://img.shields.io/badge/Grão%20Direto-Challenge-green?style=flat-square)](https://graodireto.com.br/)

</div>

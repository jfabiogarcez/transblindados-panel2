# Painel Transblindados

Painel de gestão operacional para a empresa Transblindados, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Calendário Operacional**: Visualização de pagamentos e multas por data de vencimento
- **Gestão de Pagamentos**: Checklist interativo para controlar pagamentos pendentes
- **Gestão de Multas**: Acompanhamento de multas associadas às placas dos veículos
- **Frota & Agenda**: Monitoramento da utilização da frota
- **Políticas & Pricing**: Configurações de caução, quilometragem e idade mínima
- **Modo IA**: Sistema de aprendizado que pode ser ativado/desativado

## 📋 Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

## 🔧 Instalação

```bash
# Clonar o repositório
git clone https://github.com/jfabiogarcez/transblindados-panel2.git

# Entrar no diretório
cd transblindados-panel2

# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 📦 Build para Produção

```bash
# Criar build de produção
npm run build

# Executar build de produção
npm start
```

## 🌐 Deploy na Vercel

### Opção 1: Via Interface Web da Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Project"
3. Selecione o repositório `jfabiogarcez/transblindados-panel2`
4. Configure o projeto (as configurações padrão já estão corretas)
5. Clique em "Deploy"

### Opção 2: Via Vercel CLI

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm install -g vercel

# Fazer login na Vercel
vercel login

# Deploy do projeto
vercel

# Deploy para produção
vercel --prod
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14.0.1** - Framework React
- **React 18.2.0** - Biblioteca JavaScript
- **TypeScript 5.3.3** - Superset JavaScript tipado
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **date-fns 3.3.0** - Biblioteca de manipulação de datas

## 📁 Estrutura do Projeto

```
transblindados-panel2/
├── components/          # Componentes React reutilizáveis
│   ├── HelpModal.tsx   # Modal de ajuda
│   └── WidgetFrame.tsx # Frame para widgets
├── pages/              # Páginas Next.js
│   ├── _app.tsx       # Configuração global do app
│   └── index.tsx      # Página principal (dashboard)
├── styles/            # Estilos globais
│   └── globals.css    # CSS global com Tailwind
├── public/            # Arquivos estáticos
├── package.json       # Dependências e scripts
├── tsconfig.json      # Configuração TypeScript
├── tailwind.config.js # Configuração Tailwind
├── postcss.config.js  # Configuração PostCSS
└── next.config.js     # Configuração Next.js
```

## 📝 Status do Deploy

✅ Repositório configurado no GitHub
✅ Projeto Next.js criado e funcional
✅ Dependências instaladas
✅ Código enviado para o GitHub

⚠️ **Próximo passo**: Conectar o repositório à Vercel via interface web ou CLI

## 🔗 Links Úteis

- Repositório GitHub: [https://github.com/jfabiogarcez/transblindados-panel2](https://github.com/jfabiogarcez/transblindados-panel2)
- Documentação Next.js: [https://nextjs.org/docs](https://nextjs.org/docs)
- Documentação Vercel: [https://vercel.com/docs](https://vercel.com/docs)

## 📄 Licença

© 2025 Transblindados - Todos os direitos reservados

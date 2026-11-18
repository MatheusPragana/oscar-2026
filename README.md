# Oscar 2026 – Formulário de Inscrição e Indicações

Site estático (HTML + CSS + JS) para GitHub Pages. As respostas são gravadas em uma Planilha Google via Google Apps Script.

## 1. Criar a planilha e o Apps Script

1. Crie uma planilha nova no Google Sheets (ex.: "Oscar 2026 – Respostas").
2. Menu **Extensões → Apps Script**.
3. Apague o conteúdo do `Código.gs` e cole o conteúdo de `apps-script/Code.gs`. Salve.
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize o acesso quando o Google pedir (Avançado → Acessar projeto).
6. Copie a **URL do app da Web** (termina em `/exec`).

## 2. Ligar o site à planilha

Abra `script.js` e troque:

```js
const SCRIPT_URL = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";
```

pela URL copiada.

## 3. Publicar no GitHub Pages

1. Crie um repositório no GitHub (ex.: `oscar-2026`).
2. Envie os arquivos `index.html`, `style.css`, `script.js` (a pasta `apps-script` é opcional).
3. No repositório: **Settings → Pages → Branch: main / root → Save**.
4. Em alguns minutos o site fica em `https://SEU-USUARIO.github.io/oscar-2026/`.

## Personalizar

- **Setores**: edite as `<option>` do campo "Setor/Área" no `index.html`.
- **Logo oficial**: coloque `logo.png` na pasta e troque o bloco `<span class="logo-mark">…` por `<img src="logo.png" alt="Colégio Piedade">`.
- Se alterar o `Code.gs` depois, faça **Implantar → Gerenciar implantações → Editar → Nova versão** para a mudança valer.

/**
 * Google Apps Script – recebe as respostas do formulário Oscar 2026
 * e grava em uma Planilha Google.
 *
 * Cole este código em: Planilha > Extensões > Apps Script
 */

const NOME_ABA = "Respostas";

const COLUNAS = [
  ["Data/Hora", null],
  ["Nome completo", "nome"],
  ["Setor/Área", "setor"],
  ["Presença no jantar", "presenca"],
  ["Destaque do Ano", "destaque_do_ano"],
  ["Espírito de Equipe", "espirito_de_equipe"],
  ["Cuidado que Inspira", "cuidado_que_inspira"],
  ["Solução Criativa", "solucao_criativa"],
  ["Superação", "superacao"],
  ["Impacto na Comunidade Escolar", "impacto_comunidade"],
  ["Talento em Desenvolvimento", "talento_desenvolvimento"],
  ["Escolha da Equipe", "escolha_da_equipe"],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const p = e.parameter || {};
    const linha = COLUNAS.map(([, campo]) =>
      campo ? String(p[campo] || "").trim() : new Date()
    );
    sheet.appendRow(linha);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("Oscar 2026 – endpoint ativo.");
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NOME_ABA);
  if (!sheet) sheet = ss.insertSheet(NOME_ABA);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUNAS.map(([titulo]) => titulo));
    sheet.getRange(1, 1, 1, COLUNAS.length)
      .setFontWeight("bold")
      .setBackground("#7d0c14")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

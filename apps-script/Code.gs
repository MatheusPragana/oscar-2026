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
  ["Espírito de Equipe", "espirito_de_equipe"],
  ["Coração de Ouro", "coracao_de_ouro"],
  ["Mente Brilhante", "mente_brilhante"],
  ["Mestre dos Improvisos", "mestre_dos_improvisos"],
  ["Orgulho Piedade", "orgulho_piedade"],
  ["Sorriso que Contagia", "sorriso_que_contagia"],
  ["Rei ou Rainha da Resenha", "rei_rainha_da_resenha"],
  ["Radar Ligado", "radar_ligado"],
  ["Estrela do Look", "estrela_do_look"],
  ["Personalidade do Ano", "personalidade_do_ano"],
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

// ==========================================================
// COLE AQUI A URL DO SEU APP DA WEB DO GOOGLE APPS SCRIPT
// (veja o passo a passo no README.md)
// ==========================================================
const SCRIPT_URL = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";

const form = document.getElementById("oscarForm");
const btn = document.getElementById("submitBtn");
const errorBox = document.getElementById("formError");
const successBox = document.getElementById("successBox");

function validate() {
  let ok = true;
  const nome = form.nome;
  const setor = form.setor;
  const presenca = form.querySelector('input[name="presenca"]:checked');

  [nome, setor].forEach((el) => el.classList.remove("invalid"));
  document.querySelectorAll(".radio").forEach((r) => r.classList.remove("radios-invalid"));

  if (!nome.value.trim()) { nome.classList.add("invalid"); ok = false; }
  if (!setor.value) { setor.classList.add("invalid"); ok = false; }
  if (!presenca) {
    document.querySelectorAll(".radio").forEach((r) => r.classList.add("radios-invalid"));
    ok = false;
  }
  return ok;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.textContent = "";

  if (!validate()) {
    errorBox.textContent = "Preencha os campos obrigatórios (*) antes de enviar.";
    return;
  }

  if (SCRIPT_URL.startsWith("COLE_AQUI")) {
    errorBox.textContent = "Formulário ainda não configurado: defina a SCRIPT_URL no arquivo script.js.";
    return;
  }

  btn.disabled = true;
  btn.querySelector("span").textContent = "Enviando...";

  try {
    const data = new URLSearchParams(new FormData(form));
    // no-cors: o Apps Script recebe os dados normalmente
    await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", body: data });

    form.reset();
    form.hidden = true;
    successBox.hidden = false;
    window.scrollTo({ top: successBox.offsetTop - 40, behavior: "smooth" });
  } catch (err) {
    errorBox.textContent = "Não foi possível enviar. Verifique sua conexão e tente novamente.";
  } finally {
    btn.disabled = false;
    btn.querySelector("span").textContent = "Enviar respostas";
  }
});

// limpa o destaque de erro ao corrigir
form.addEventListener("input", (e) => e.target.classList.remove("invalid"));
form.addEventListener("change", (e) => {
  e.target.classList.remove("invalid");
  if (e.target.name === "presenca") {
    document.querySelectorAll(".radio").forEach((r) => r.classList.remove("radios-invalid"));
  }
});

document.getElementById("newResponse").addEventListener("click", () => {
  successBox.hidden = true;
  form.hidden = false;
});

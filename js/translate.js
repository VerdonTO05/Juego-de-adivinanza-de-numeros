// js/translate.js

// ---- Cargar dinámicamente el script de Google Translate ----
function loadGoogleTranslate() {
  if (document.querySelector('script[src*="translate.google.com/translate_a/element.js"]')) return;
  const script = document.createElement("script");
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

// ---- Inicialización del traductor (necesario para que Google cree sus iframes) ----
function googleTranslateElementInit() {
  // Asegúrate de que pageLanguage sea 'es' si tu contenido original es español
  new google.translate.TranslateElement({
    pageLanguage: 'es',
    includedLanguages: 'en,fr,de,it,pt,ja,zh-CN',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// ---- Utilidad: guardar cookie ----
function setCookie(name, value, days) {
  let expires = "";
  if (typeof days === "number") {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  const domain = location.hostname;
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
  // también intentar con domain explicito (algunos entornos lo requieren)
  try {
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; domain=" + domain;
  } catch (e) {
    // noop
  }
}

// ---- Método principal: setear googtrans cookie y recargar ----
function changeLanguageByCookie(fromLang, toLang) {
  const cookieVal = "/" + fromLang + "/" + toLang;
  setCookie("googtrans", cookieVal, 7);       // cookie simple
  setCookie("googtrans", cookieVal, 7);       // intento duplicado por compatibilidad
  // Forzar recarga para que Google Translate aplique el idioma
  // Si quieres evitar recarga, podemos intentar usar el select; pero la recarga es la forma más fiable.
  location.reload();
}

// ---- Fallback: esperar al select interno y cambiarlo ----
function waitForTranslateSelect(callback, timeout = 8000) {
  const start = Date.now();
  const iv = setInterval(() => {
    const select = document.querySelector("select.goog-te-combo");
    if (select) {
      clearInterval(iv);
      callback(select);
      return;
    }
    if (Date.now() - start > timeout) {
      clearInterval(iv);
      callback(null);
    }
  }, 300);
}

// ---- Conector público: intenta cookie primero y si no, select ----
function translateTo(lang) {
  const source = 'es'; // ajusta si tu HTML no está en español
  // 1) Intentar método cookie (rápido y compatible)
  try {
    changeLanguageByCookie(source, lang);
    // Si la cookie funciona normalmente la página se recarga y no se ejecuta nada más.
    return;
  } catch (e) {
    console.warn("cookie method failed, trying select fallback", e);
  }

  // 2) Fallback: esperar al select y cambiarlo sin recargar
  waitForTranslateSelect(select => {
    if (!select) {
      console.warn("No se encontró select.goog-te-combo. Asegúrate de que el script de Google Translate se haya cargado.");
      return;
    }
    select.value = lang;
    select.dispatchEvent(new Event("change"));
  });
}

// ---- Inicializar listeners y cargar script ----
document.addEventListener("DOMContentLoaded", () => {
  // Cargar Google Translate (crea el select/iframe necesario)
  loadGoogleTranslate();

  // Delegación: todos los elementos con data-lang lanzarán la traducción
  document.querySelectorAll(".language-menu [data-lang]").forEach(el => {
    el.addEventListener("click", (ev) => {
      const lang = el.getAttribute("data-lang");
      if (!lang) return;
      // Intentamos cookie (recarga) primero — es la opción más fiable.
      translateTo(lang);
    });
    // accesibilidad: permitir teclado
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        el.click();
      }
    });
  });

  // Si quieres que el menú muestre "activo" el idioma actual, podríamos intentar leer la cookie
});

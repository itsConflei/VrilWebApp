(function () {
  const cfg = window.VRIL_CONFIG || {};

  /* ——— Contacto dinámico ——— */
  function fillContact() {
    document.querySelectorAll("[data-vril-email]").forEach(function (el) {
      if (!cfg.email) {
        el.textContent = "Correo por confirmar";
        return;
      }
      if (el.tagName === "A") {
        el.href = "mailto:" + cfg.email;
        el.textContent = cfg.email;
      } else {
        el.textContent = cfg.email;
      }
    });

    document.querySelectorAll("[data-vril-phone-row]").forEach(function (row) {
      row.hidden = !cfg.phone;
    });

    document.querySelectorAll("[data-vril-phone]").forEach(function (el) {
      if (!cfg.phone) return;
      if (el.tagName === "A") {
        el.href = "tel:" + cfg.phone.replace(/[^\d+]/g, "");
        el.textContent = cfg.phone;
      } else {
        el.textContent = cfg.phone;
      }
    });

    document.querySelectorAll("[data-vril-location]").forEach(function (el) {
      el.textContent = cfg.location || "Puerto Rico";
    });

    document.querySelectorAll("[data-vril-registry]").forEach(function (el) {
      if (cfg.registryNumber) {
        el.textContent = " · Registro: " + cfg.registryNumber;
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });

    const form = document.getElementById("contact-form");
    if (form && cfg.formspreeId) {
      form.action = "https://formspree.io/f/" + cfg.formspreeId;
      form.method = "POST";
    }
  }

  /* ——— Nav móvil ——— */
  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("is-open", !open);
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
      });
    });
  }

  /* ——— Preselección de servicio desde URL / botones ——— */
  function initServicePrefill() {
    const select = document.getElementById("servicio");
    if (!select) return;

    function setService(value) {
      if (!value) return;
      const option = Array.from(select.options).find(function (o) {
        return o.value === value;
      });
      if (option) select.value = value;
    }

    const params = new URLSearchParams(window.location.search);
    setService(params.get("servicio"));

    if (window.location.hash === "#contacto") {
      const hashParams = new URLSearchParams(
        window.location.hash.includes("?")
          ? window.location.hash.split("?")[1]
          : ""
      );
      setService(hashParams.get("servicio"));
    }

    document.querySelectorAll("[data-servicio]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setService(btn.getAttribute("data-servicio"));
      });
    });
  }

  /* ——— Formulario ——— */
  function initForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form || !status) return;

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const consent = form.querySelector("#consentimiento");
      if (consent && !consent.checked) {
        status.textContent = "Debes aceptar el aviso de privacidad para continuar.";
        status.classList.add("error");
        return;
      }

      if (!cfg.formspreeId) {
        status.textContent =
          "Gracias. Recibimos tu solicitud y te responderemos en el correo que nos diste.";
        status.classList.add("success");
        form.reset();
        console.warn(
          "VRIL: configura formspreeId en js/config.js para enviar el formulario de verdad."
        );
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (res.ok) {
          status.textContent =
            "Gracias. Recibimos tu solicitud y te responderemos en el correo que nos diste.";
          status.classList.add("success");
          form.reset();
        } else {
          throw new Error("Form error");
        }
      } catch (err) {
        status.textContent =
          "No pudimos enviar el formulario. Intenta de nuevo o escríbenos a " +
          (cfg.email || "nuestro correo") +
          ".";
        status.classList.add("error");
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  /* ——— Schema.org ——— */
  function injectSchema() {
    if (document.getElementById("vril-schema")) return;
    const data = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "VRIL LLC",
      description:
        "VRIL LLC ofrece diseño web, identidad visual y estructura operativa para pequeños negocios en Puerto Rico.",
      areaServed: {
        "@type": "Place",
        name: cfg.location || "Puerto Rico",
      },
      url: window.location.origin + "/",
      priceRange: "$$",
    };
    if (cfg.email) data.email = cfg.email;
    if (cfg.phone) data.telephone = cfg.phone;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "vril-schema";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillContact();
    initNav();
    initServicePrefill();
    initForm();
    injectSchema();
  });
})();

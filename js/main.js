/* ══════════════════════════════════════════
   Invitación · Mis 19 · Glenda
   ══════════════════════════════════════════ */

/* ─────────── CONFIGURACIÓN ───────────
   Cambia aquí los datos del evento.
   El mes en JS empieza en 0 → 9 = Octubre.
   ───────────────────────────────────── */
const CONFIG = {
  nombre:    'Glenda',
  edad:      19,
  // Año, mes(0-11), día, hora, minuto  ·  hora local de Utah
  // 8 = Septiembre  ·  domingo 6 de septiembre de 2026, 5:00 PM
  fecha:     new Date(2026, 8, 6, 17, 0, 0),
  duracionH: 5,
  direccion: '3836 S 7000 W, West Valley City, Utah 84128',
  whatsapp:  '13857700508'   // +1 (385) 770-0508
};

/* ══════════════════════════════════════════
   1 · SOBRE
   ══════════════════════════════════════════ */
(function sobre() {
  const capa  = document.getElementById('sobre');
  const boton = document.getElementById('abrirSobre');
  const site  = document.getElementById('site');
  if (!capa || !boton || !site) return;

  boton.addEventListener('click', () => {
    capa.classList.add('is-open');
    site.classList.add('is-visible');
    document.body.classList.remove('is-locked');
    window.scrollTo(0, 0);

    // Dispara el reveal de la portada una vez visible
    setTimeout(() => {
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('is-in'));
    }, 120);

    // El botón flotante aparece cuando la portada ya se leyó
    const fab = document.getElementById('fab');
    if (fab) {
      setTimeout(() => {
        fab.dataset.listo = '1';
        fab.classList.add('is-visible');
      }, 2200);
    }

    setTimeout(() => capa.remove(), 1000);
  });
})();

/* ══════════════════════════════════════════
   2 · PÉTALOS
   ══════════════════════════════════════════ */
(function petalos() {
  const canvas = document.getElementById('petalos');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  const colores = ['#f4dfe3', '#eec8ce', '#e6b7bf', '#d9959f', '#e3c9b8'];
  let ancho, alto, flores = [];

  const cantidad = () => (window.innerWidth < 700 ? 16 : 30);

  function dimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = canvas.width  = window.innerWidth  * dpr;
    alto  = canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ancho = window.innerWidth;
    alto  = window.innerHeight;
  }

  function crear(inicial) {
    return {
      x: Math.random() * ancho,
      y: inicial ? Math.random() * alto : -30,
      r: 4 + Math.random() * 7,
      vy: 0.28 + Math.random() * 0.72,
      vx: -0.35 + Math.random() * 0.7,
      giro: Math.random() * Math.PI * 2,
      vGiro: (-0.5 + Math.random()) * 0.022,
      color: colores[(Math.random() * colores.length) | 0],
      alpha: 0.35 + Math.random() * 0.45
    };
  }

  function reiniciar() {
    flores = Array.from({ length: cantidad() }, () => crear(true));
  }

  function dibujarPetalo(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.giro);
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, -p.r);
    ctx.bezierCurveTo(p.r, -p.r * 0.6, p.r * 0.75, p.r * 0.75, 0, p.r);
    ctx.bezierCurveTo(-p.r * 0.75, p.r * 0.75, -p.r, -p.r * 0.6, 0, -p.r);
    ctx.fill();
    ctx.restore();
  }

  function animar() {
    ctx.clearRect(0, 0, ancho, alto);
    for (const p of flores) {
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.y * 0.012) * 0.35;
      p.giro += p.vGiro;
      if (p.y - p.r > alto) Object.assign(p, crear(false));
      if (p.x < -40) p.x = ancho + 20;
      if (p.x > ancho + 40) p.x = -20;
      dibujarPetalo(p);
    }
    requestAnimationFrame(animar);
  }

  dimensionar();
  reiniciar();
  animar();

  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => { dimensionar(); reiniciar(); }, 200);
  });
})();

/* ══════════════════════════════════════════
   3 · REVEAL AL HACER SCROLL
   ══════════════════════════════════════════ */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  items.forEach(el => obs.observe(el));
})();

/* ══════════════════════════════════════════
   4 · CUENTA REGRESIVA
   ══════════════════════════════════════════ */
(function countdown() {
  const grid = document.getElementById('countdown');
  const msg  = document.getElementById('cuentaMsg');
  if (!grid) return;

  const campos = {
    dias:  grid.querySelector('[data-cd="dias"]'),
    horas: grid.querySelector('[data-cd="horas"]'),
    min:   grid.querySelector('[data-cd="min"]'),
    seg:   grid.querySelector('[data-cd="seg"]')
  };

  const dosDigitos = n => String(n).padStart(2, '0');

  function tick() {
    const resta = CONFIG.fecha.getTime() - Date.now();

    if (resta <= 0) {
      Object.values(campos).forEach(el => { el.textContent = '00'; });
      grid.hidden = true;
      if (msg) msg.hidden = false;
      clearInterval(intervalo);
      return;
    }

    const seg   = Math.floor(resta / 1000);
    campos.dias.textContent  = dosDigitos(Math.floor(seg / 86400));
    campos.horas.textContent = dosDigitos(Math.floor(seg % 86400 / 3600));
    campos.min.textContent   = dosDigitos(Math.floor(seg % 3600 / 60));
    campos.seg.textContent   = dosDigitos(seg % 60);
  }

  tick();
  const intervalo = setInterval(tick, 1000);
})();

/* ══════════════════════════════════════════
   5 · AGREGAR AL CALENDARIO (.ics)
   ══════════════════════════════════════════ */
(function calendario() {
  const boton = document.getElementById('btnCalendario');
  if (!boton) return;

  const utc = d => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  boton.addEventListener('click', () => {
    const fin = new Date(CONFIG.fecha.getTime() + CONFIG.duracionH * 3600 * 1000);

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Invitacion//ES',
      'BEGIN:VEVENT',
      'UID:' + Date.now() + '@invitacion',
      'DTSTAMP:' + utc(new Date()),
      'DTSTART:' + utc(CONFIG.fecha),
      'DTEND:'   + utc(fin),
      'SUMMARY:Cumpleanos ' + CONFIG.edad + ' de ' + CONFIG.nombre,
      'LOCATION:' + CONFIG.direccion,
      'DESCRIPTION:Celebracion de los ' + CONFIG.edad + ' anos de ' + CONFIG.nombre,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cumpleanos-' + CONFIG.nombre.toLowerCase() + '.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  });
})();

/* ══════════════════════════════════════════
   6 · RSVP → WHATSAPP
   ══════════════════════════════════════════ */
(function rsvp() {
  const form = document.getElementById('formRsvp');
  if (!form) return;

  const inputNombre  = document.getElementById('nombre');
  const errNombre    = document.getElementById('errNombre');
  const selPersonas  = document.getElementById('personas');
  const campoPers    = document.getElementById('campoPersonas');
  const txtMensaje   = document.getElementById('mensaje');
  const previaTexto  = document.getElementById('previaTexto');
  const radios       = form.querySelectorAll('input[name="asistencia"]');

  const asistencia = () => form.querySelector('input[name="asistencia"]:checked').value;

  function construirMensaje() {
    const nombre   = inputNombre.value.trim() || '…';
    const extra    = txtMensaje.value.trim();
    const personas = Number(selPersonas.value);

    let texto;

    if (asistencia() === 'si') {
      const cuantos = personas === 1
        ? 'Confirmo mi asistencia.'
        : 'Confirmamos la asistencia de ' + personas + ' personas.';

      texto =
        '¡Hola! Soy ' + nombre + ' 🌸\n' +
        'Gracias por la invitación a los ' + CONFIG.edad + ' años de ' + CONFIG.nombre + '. ' +
        '¡Ahí estaré!\n' + cuantos;
    } else {
      texto =
        '¡Hola! Soy ' + nombre + ' 🌸\n' +
        'Gracias por la invitación a los ' + CONFIG.edad + ' años de ' + CONFIG.nombre + '. ' +
        'Lamentablemente no podré acompañarlos, pero les deseo una noche preciosa. 💕';
    }

    if (extra) texto += '\n\n' + extra;

    return texto;
  }

  function refrescar() {
    campoPers.hidden = asistencia() !== 'si';
    previaTexto.textContent = construirMensaje();
  }

  inputNombre.addEventListener('input', () => {
    errNombre.hidden = true;
    refrescar();
  });
  txtMensaje.addEventListener('input', refrescar);
  selPersonas.addEventListener('change', refrescar);
  radios.forEach(r => r.addEventListener('change', refrescar));
  refrescar();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!inputNombre.value.trim()) {
      errNombre.hidden = false;
      inputNombre.focus();
      return;
    }

    const url = 'https://wa.me/' + CONFIG.whatsapp +
                '?text=' + encodeURIComponent(construirMensaje());

    window.open(url, '_blank', 'noopener');
  });
})();

/* ══════════════════════════════════════════
   7 · BOTÓN FLOTANTE
   ══════════════════════════════════════════ */
(function flotante() {
  const fab     = document.getElementById('fab');
  const enviar  = document.getElementById('fabCompartir');
  const toast   = document.getElementById('toast');
  const seccion = document.getElementById('rsvp');
  if (!fab || !enviar) return;

  /* ── Aviso emergente ── */
  let temporizador;
  function aviso(texto) {
    if (!toast) return;
    clearTimeout(temporizador);
    toast.textContent = texto;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    temporizador = setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => { toast.hidden = true; }, 400);
    }, 2600);
  }

  /* ── Se esconde cuando el formulario ya está a la vista ── */
  if (seccion && 'IntersectionObserver' in window) {
    new IntersectionObserver((entradas) => {
      if (fab.dataset.listo !== '1') return;
      fab.classList.toggle('is-visible', !entradas[0].isIntersecting);
    }, { threshold: 0.18 }).observe(seccion);
  }

  /* ── Enviar la invitación a alguien más ── */
  enviar.addEventListener('click', async () => {
    const datos = {
      title: 'Mis ' + CONFIG.edad + ' · ' + CONFIG.nombre,
      text:  'Te invito a celebrar mi cumpleaños conmigo 🌸',
      url:   location.href
    };

    // Plan A: hoja para compartir del teléfono
    if (navigator.share) {
      try {
        await navigator.share(datos);
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;   // la cerró a propósito
      }
    }

    // Plan B: copiar el enlace
    try {
      await navigator.clipboard.writeText(datos.text + ' ' + datos.url);
      aviso('Enlace copiado ✓');
      return;
    } catch (err) { /* sin permiso de portapapeles */ }

    // Plan C: abrir WhatsApp para elegir contacto
    window.open(
      'https://wa.me/?text=' + encodeURIComponent(datos.text + ' ' + datos.url),
      '_blank', 'noopener'
    );
  });
})();

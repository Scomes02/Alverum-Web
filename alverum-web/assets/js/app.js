document.addEventListener('DOMContentLoaded', () => {
    /* ==================================================================
       0. MENÚ HAMBURGUESA (MÓVIL)
       ================================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            });
        });
    }

    /* ==================================================================
       1. MODAL
       ================================================================== */
    const modal = document.getElementById('modalCotizacion');
    const btnsCotizar = document.querySelectorAll('.btn-cotizar');
    const closeBtn = document.querySelector('.close-btn');
    const inputMensaje = document.getElementById('inputMensaje');
    const inputTipoSeguro = document.getElementById('inputTipoSeguro');

    btnsCotizar.forEach(btn => {
        btn.addEventListener('click', () => {
            const nombreSeguro = btn.getAttribute('data-seguro');

            inputTipoSeguro.value = nombreSeguro;
            inputMensaje.value = `Hola, me contacto desde la web. Estoy interesad@ en recibir un presupuesto sobre el ${nombreSeguro}.`;

            modal.style.display = 'flex';
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    /* ==================================================================
   2. FORMULARIO (MODO DEMO - SIN ENVÍO REAL)
   ================================================================== */
const form = document.getElementById('formCotizacion');
const formStatus = document.getElementById('formStatus');
const btnSubmit = document.getElementById('btnSubmit');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // 🔥 SIEMPRE evita envío real

        btnSubmit.textContent = 'Enviando...';
        btnSubmit.disabled = true;
        formStatus.textContent = '';
        formStatus.style.color = '';

        // ⏳ Simulación de envío (fake)
        setTimeout(() => {
            formStatus.textContent = '✅ Consulta enviada (modo demo)';
            formStatus.style.color = '#28a745';

            form.reset();

            setTimeout(() => {
                modal.style.display = 'none';
                formStatus.textContent = '';
            }, 2500);

            btnSubmit.textContent = 'Enviar Consulta';
            btnSubmit.disabled = false;

        }, 1500);
    });
}
    /* ==================================================================
       3. CHATBOT FUNCIONAL (SIN WHATSAPP)
       ================================================================== */

    const chatTrigger = document.getElementById('chatbot-trigger');
    const chatWindow = document.getElementById('chatbot-window');
    const chatClose = document.getElementById('chatbot-close');
    const chatMessages = document.getElementById('chatbot-messages');

    let chatInitialized = false;

    const chatTree = {
        inicio: {
            text: "¡Hola! 👋 Soy el asistente virtual de Alverum. ¿En qué te puedo ayudar?",
            options: [
                { label: "🛡️ Cotizar un seguro", next: "cotizar" },
                { label: "🚨 Tuve un siniestro", next: "siniestro" },
                { label: "📞 Contacto", next: "contacto" }
            ]
        },

        cotizar: {
            text: "¿Qué tipo de seguro te interesa?",
            options: [
                { label: "🚗 Vehículos", next: "seg_auto" },
                { label: "🏠 Hogar", next: "seg_hogar" },
                { label: "🚲 Bicicletas", next: "seg_bici" },
                { label: "💻 Otros", next: "seg_otros" },
                { label: "⬅️ Volver", next: "inicio" }
            ]
        },

        seg_auto: {
            text: "Seguro automotor: cubrimos RC, terceros completos y todo riesgo.\nNecesitamos marca, modelo y año.",
            options: [
                { label: "👤 Hablar con asesor", next: "no_disponible" },
                { label: "⬅️ Atrás", next: "cotizar" }
            ]
        },

        seg_hogar: {
            text: "Seguro de hogar: cubre incendios, robos y daños.",
            options: [
                { label: "👤 Hablar con asesor", next: "no_disponible" },
                { label: "⬅️ Atrás", next: "cotizar" }
            ]
        },

        seg_bici: {
            text: "Seguro de bicicletas: cobertura contra robo y daños.",
            options: [
                { label: "👤 Hablar con asesor", next: "no_disponible" },
                { label: "⬅️ Atrás", next: "cotizar" }
            ]
        },

        seg_otros: {
            text: "También ofrecemos seguros de vida, comercio y tecnología.",
            options: [
                { label: "👤 Hablar con asesor", next: "no_disponible" },
                { label: "⬅️ Atrás", next: "cotizar" }
            ]
        },

        siniestro: {
            text: "En caso de siniestro:\n- Tomá datos del tercero\n- Sacá fotos\n- Guardá evidencias",
            options: [
                { label: "👤 Contactar asesor", next: "no_disponible" },
                { label: "⬅️ Volver", next: "inicio" }
            ]
        },

        contacto: {
            text: "Podés comunicarte mediante el formulario de la web.",
            options: [
                { label: "👤 Hablar con asesor", next: "no_disponible" },
                { label: "⬅️ Volver", next: "inicio" }
            ]
        },

        no_disponible: {
            text: "⚠️ Momentáneamente no hay asesores disponibles en esta versión demo.\nPodés adaptar el código para habilitar contacto real (WhatsApp, email, etc).",
            options: [
                { label: "⬅️ Volver al inicio", next: "inicio" }
            ]
        }
    };

    function renderMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = sender === 'bot' ? 'msg-bot' : 'msg-user';
        msg.innerHTML = text.replace(/\n/g, "<br>");
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function renderOptions(options) {
        const container = document.createElement('div');
        container.className = 'chat-options-container';

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'chat-btn';
            btn.textContent = opt.label;

            btn.onclick = () => {
                container.remove();
                renderMessage(opt.label, 'user');

                setTimeout(() => {
                    loadNode(opt.next);
                }, 400);
            };

            container.appendChild(btn);
        });

        chatMessages.appendChild(container);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function loadNode(key) {
        const node = chatTree[key];
        if (!node) return;

        renderMessage(node.text, 'bot');
        renderOptions(node.options);
    }

    if (chatTrigger && chatWindow && chatClose) {

        chatTrigger.addEventListener('click', () => {
            chatWindow.classList.remove('hidden');

            // 🔥 SOLUCIÓN CLAVE: iniciar chat una sola vez
            if (!chatInitialized) {
                setTimeout(() => {
                    loadNode('inicio');
                }, 300);
                chatInitialized = true;
            }
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.add('hidden');
        });
    }

});
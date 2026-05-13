/* ═══════════════════════════════════════════════════════════════
   NEW BEAUTY SCHOOL — Application Logic
   ═══════════════════════════════════════════════════════════════ */

// ─── Course Database ───
const coursesData = [
    {
        id: 1,
        category: "nails",
        title: "Corso Base Manicure",
        subtitle: "Dry Manicure Professionale",
        master: "Anna Liardo",
        instagram: "https://www.instagram.com/annaliardo_nailmaster?igsh=ZW5neXh6bTJrajZq",
        dates: ["27–29 Aprile", "15–17 Maggio"],
        price: "700€",
        deposit: "100€",
        image: "image/base.webp",

        shortDesc: "Un percorso completo pensato per formarti da zero e portarti a lavorare in modo professionale nel settore nails.",
        longDesc: "Programma completo corso onicotecnica (3 giorni intensivi)",
        program: [
            {
                day: "Giorno 1 — Fondamenta",
                topics: [
                    { title: "Professione Onicotecnica", desc: "Introduzione al settore e percorso professionale." },
                    { title: "Anatomia", desc: "Studio approfondito dell'unghia naturale e riconoscimento patologie." },
                    { title: "Dry Manicure", desc: "Gestione delle cuticole: sottili, spesse, onicofagiche e umide." },
                    { title: "Applicazione", desc: "Pratica di applicazione semipermanente con rinforzo." }
                ]
            },
            {
                day: "Giorno 2 — La Struttura",
                topics: [
                    { title: "Nail Form", desc: "Posizionamento e utilizzo corretto delle cartine." },
                    { title: "Geometria dell'Unghia", desc: "Proporzioni, struttura e schema di limatura professionale." },
                    { title: "Forme Classiche", desc: "Tecnica di allungamento per forma mandorla e quadrata." }
                ]
            },
            {
                day: "Giorno 3 — Business & Refill",
                topics: [
                    { title: "Business & Marketing", desc: "Strategie per listino prezzi, gestione agenda e WhatsApp Business." },
                    { title: "Refill", desc: "Tecnica di riempimento e copertura dell'unghia naturale." },
                    { title: "Certificazione", desc: "Consegna degli attestati professionali." }
                ]
            }
        ]
    },
    {
        id: 2,
        category: "nails",
        title: "Ricostruzione Unghie",
        subtitle: "Specializzazione Dual Form",
        master: "Carolina",
        instagram: "https://www.instagram.com/caro_dualexpert?igsh=Mm56NzkxdmQwZW9q",
        dates: ["18–19 Aprile"],
        price: "Su richiesta",
        deposit: null,
        image: "image/example2.jpg",
        shortDesc: "Impara a realizzare strutture resistenti in modo semplice e veloce con la tecnica dual form.",
        longDesc: "Le basi della ricostruzione con le dual form e l’anatomia delle unghie naturali.",
        program: [
            {
                day: "Programma Dual Form",
                topics: [
                    { title: "Basi e Anatomia", desc: "Capire com’è fatta l’unghia naturale e come lavorare per una struttura resistente." },
                    { title: "Classificazione Dual", desc: "Vedere i diversi tipi di dual, capire le differenze e quando usarle." },
                    { title: "Il Segreto dell'Impronta", desc: "Come gestire il prodotto e la pressione per un risultato preciso e pulito." },
                    { title: "Baby Boomer", desc: "Realizzazione rapida del Baby Boomer con le dual form." }
                ]
            }
        ]
    },
    {
        id: 5,
        category: "pmu",
        title: "INIZIO PERFETTO — Corso Base PMU",
        subtitle: 'Un percorso formativo di 4 giorni ideato da Katerina Davidenko',
        master: "Katerina Davidenko",
        instagram: "https://www.instagram.com/newbeautyschool_na",
        dates: ["Contattaci per le prossime date"],
        price: "2500€",
        deposit: "500€",
        image: "image/PMU.png",


        shortDesc: "Trasforma la tua passione in una professione redditizia. Impara a gestire labbra, occhi e sopracciglia per guadagnare fin da subito.",
        longDesc: 'Il corso base "Inizio Perfetto" è un percorso formativo strutturato di 4 giorni in presenza, ideato per spingerti ad avviare la tua attività con successo.',
        program: [
            {
                day: "Giorno 1 — Fondamenti e Teoria",
                topics: [
                    { title: "Starter Kit", desc: "Consegna dell'attrezzatura professionale inclusa nel corso." },
                    { title: "Teoria & Colorimetria", desc: "Studio dei pigmenti e pigmentologia applicata a labbra e sopracciglia." },
                    { title: "Tecniche Precisione", desc: "Apprendimento della corretta profondità per evitare viraggi di colore." },
                    { title: "Cover-up", desc: "Analisi di casi reali e gestione dei vecchi lavori (correzioni)." }
                ]
            },
            {
                day: "Giorno 2 — Ombre Brows (Sopracciglia)",
                topics: [
                    { title: "Architettura", desc: "Creazione dello schizzo personalizzato in base alle proporzioni del viso." },
                    { title: "Pratica su Sintetica", desc: "Sessione per perfezionare il movimento e la sfumatura." },
                    { title: "Esecuzione su Modella", desc: "Esecuzione della tecnica Ombre Brows sotto supervisione della Master." }
                ]
            },
            {
                day: "Giorno 3 — Silk Lips (Labbra)",
                topics: [
                    { title: "Anatomia", desc: "Studio della struttura e dell'armonia del viso applicata alle labbra." },
                    { title: "Tecnica Silk Lips", desc: "Apprendimento della tracciatura precisa e sicura per volumi perfetti." },
                    { title: "Trattamento Modella", desc: "Pratica completa su modella nel rispetto della forma naturale." }
                ]
            },
            {
                day: "Giorno 4 — Infraciliare & Business",
                topics: [
                    { title: "Tecnica Infraciliare", desc: "Studio dell'anatomia dell'occhio e dei protocolli di sicurezza." },
                    { title: "Bonus Portfolio", desc: "Sessione fotografica professionale per creare contenuti Instagram." },
                    { title: "Strategia di Guadagno", desc: "Guida passo-passo per raggiungere 2.000€ già nei primi due mesi." },
                    { title: "Supporto Post-Corso", desc: "Accesso a protocolli scritti e possibilità di assistere la Master." }
                ]
            }
        ]
    },
    {
        id: 3,
        category: "lashes",
        title: "Laminazione Ciglia",
        subtitle: "Corso Intensivo (3 Giorni)",
        master: "Oxana",
        instagram: "https://www.instagram.com/oxaciglia?igsh=MWJlM2IxZmsyODN5ag==",
        dates: ["11–13 Aprile"],
        price: "400€ + Kit 350€",
        deposit: "100€",
        image: "image/Laminazione.webp",

        shortDesc: "Corso completo di 3 giorni per dominare la tecnica di laminazione ciglia e sopracciglia.",
        longDesc: "Questo percorso intensivo ti fornirà tutte le competenze necessarie per diventare una lash master specializzata.",
        program: [
            {
                day: "3 Giorni di Formazione",
                topics: [
                    { title: "Teoria Avanzata", desc: "Chimica dei prodotti e architettura dello sguardo." },
                    { title: "Pratica su Modella", desc: "Esecuzione completa del trattamento sotto supervisione." },
                    { title: "Kit Professionale", desc: "Incluso kit completo del valore di 350€ per iniziare subito." }
                ]
            }
        ]
    },
    {
        id: 7,
        category: "lashes",
        title: "Laminazione Ciglia",
        subtitle: "Corso Flash (1 Giorno)",
        master: "Oxana",
        instagram: "https://www.instagram.com/oxaciglia?igsh=MWJlM2IxZmsyODN5ag==",
        dates: ["25 Aprile"],
        price: "250€ + Kit 350€",
        deposit: "50€",
        image: "image/Laminazione2.webp",

        shortDesc: "Impara le basi della laminazione in un solo giorno intensivo.",
        longDesc: "Formazione concentrata sulla tecnica classica di laminazione per chi ha poco tempo ma vuole risultati professionali.",
        program: [
            {
                day: "Giorno Unico",
                topics: [
                    { title: "Protocollo Tecnico", desc: "Incurvatura, tintura e nutrimento delle ciglia." },
                    { title: "Dimostrazione Pratica", desc: "Osservazione del metodo Oxana passo dopo passo." }
                ]
            }
        ]
    },
    {
        id: 8,
        category: "lashes",
        title: "Laminazione Coreana",
        subtitle: "Tecnica Orientale (1 Giorno)",
        master: "Oxana",
        instagram: "https://www.instagram.com/oxaciglia?igsh=MWJlM2IxZmsyODN5ag==",
        dates: ["Contattaci"],
        price: "250€ + Kit",
        deposit: "50€",
        image: "image/Laminazione3.webp",

        shortDesc: "La tecnica coreana per ciglia lunghissime e sane. Materiali innovativi e sicuri.",
        longDesc: "Specializzazione sulla tecnica lamination coreana, nota per la sua delicatezza e i risultati straordinari.",
        program: [
            {
                day: "Specializzazione Coreana",
                topics: [
                    { title: "Materiali Innovativi", desc: "Studio dei prodotti coreani e delle loro proprietà." },
                    { title: "Differenze Tecniche", desc: "Perché scegliere la tecnica coreana per le proprie clienti." },
                    { title: "Kit Personalizzato", desc: "Opzioni kit da 350€ o versione ridotta disponibile." }
                ]
            }
        ]
    },
    {
        id: 4,
        category: "pedicure",
        title: "Pedicure Podologico",
        subtitle: "Curativo Professionale",
        master: "Alla Denisova",
        instagram: "https://www.instagram.com/alladenisova_nails?igsh=MWg3ZnJhcGpjOXdwNQ==",
        dates: ["8–9 Maggio"],
        price: "Su richiesta",
        deposit: null,
        image: "image/Pedicure.webp",

        shortDesc: "Risoluzione delle problematiche del piede e tecniche avanzate di pedicure curativo.",
        longDesc: "Corso di pedicure curativo professionale con Alla Denisova. Impara a risolvere le problematiche del piede.",
        program: [
            {
                day: "Focus Podologico",
                topics: [
                    { title: "Patologie del Piede", desc: "Anatomia e riconoscimento delle problematiche comuni." },
                    { title: "Metodo Fresa", desc: "Utilizzo corretto delle punte specifiche." },
                    { title: "Igiene & Sterilizzazione", desc: "Protocolli di sicurezza per il trattamento podologico." }
                ]
            }
        ]
    }
];

// ─── Render Course Cards ───
let currentCategory = 'all';

function renderCourses() {
    const container = document.getElementById('courses-container');
    if (!container) return;

    const filteredCourses = currentCategory === 'all'
        ? coursesData
        : coursesData.filter(c => c.category === currentCategory);

    container.innerHTML = filteredCourses.map(course => {
        const datesHtml = course.dates.map(d =>
            `<div class="date-tag">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                ${d}
            </div>`
        ).join('');

        return `
        <div class="course-card" onclick="openModal(${course.id})">
            <div class="card-image">
                <img src="${course.image}" alt="${course.title}" loading="lazy" />
                <div class="date-tags">${datesHtml}</div>
            </div>
            <div class="card-body">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${course.title}</h3>
                        <div class="card-subtitle">${course.subtitle || ''}</div>
                    </div>
                    <div class="card-price">
                        ${course.price.includes(' + ')
                ? `${course.price.split(' + ')[0]}<small>+ ${course.price.split(' + ')[1]}</small>`
                : course.price}
                    </div>
                </div>
                <p class="card-desc">${course.shortDesc}</p>
                <div class="card-footer">
                    <div class="card-master-info">
                        <div>
                            <div class="master-label">Master</div>
                            <div class="master-name">${course.master}</div>
                        </div>
                    </div>
                    <button class="card-btn" onclick="event.stopPropagation(); openModal(${course.id})">
                        Programma
                        <span class="arrow">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ─── Filter Logic ───
function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderCourses();
        });
    });
}

// ─── Modal Logic ───
const modalOverlay = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const modalClose = document.getElementById('modal-close');

function openModal(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    document.getElementById('modal-image').src = course.image;
    document.getElementById('modal-title').textContent = course.title;
    document.getElementById('modal-master').textContent = `Con ${course.master}`;
    document.getElementById('modal-price').textContent = course.price;

    // Dates
    document.getElementById('modal-dates').innerHTML = course.dates.map(d =>
        `<div class="modal-date-pill">${d}</div>`
    ).join('');

    // Deposit
    const depContainer = document.getElementById('modal-deposit-container');
    const depNote = document.getElementById('modal-deposit-note');
    if (course.deposit) {
        document.getElementById('modal-deposit').textContent = course.deposit;
        depContainer.style.display = 'block';
        depNote.style.display = 'block';
    } else {
        depContainer.style.display = 'none';
        depNote.style.display = 'none';
    }

    // WhatsApp link
    const waLink = document.getElementById('modal-wa-link');
    waLink.href = `https://wa.me/393277426400?text=${encodeURIComponent('Ciao! Vorrei informazioni sul corso: ' + course.title)}`;

    // Description
    const descEl = document.getElementById('modal-desc');
    if (course.longDesc) {
        descEl.style.display = 'block';
        descEl.textContent = course.longDesc;
    } else {
        descEl.style.display = 'none';
    }

    // Program
    document.getElementById('modal-program').innerHTML = course.program.map(day => `
        <div class="day-block">
            <h4 class="day-title">${day.day}</h4>
            <ul class="topic-list">
                ${day.topics.map(t => {
        const isObj = typeof t === 'object' && t !== null;
        const title = isObj ? t.title : t;
        const desc = isObj ? t.desc : '';
        return `
                    <li class="topic-item">
                        <svg class="check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        <div class="topic-item-content">
                            <div class="topic-item-title">${title}</div>
                            ${desc ? `<div class="topic-item-desc">${desc}</div>` : ''}
                        </div>
                    </li>`;
    }).join('')}
            </ul>
        </div>
    `).join('');

    // Show
    modalOverlay.classList.add('active');
    modalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalContainer.classList.remove('active');
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ─── Navigation Scroll Effect ───
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });



// ─── Initialize ───
document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    renderCourses();
});

// ─── SILENT DEMO MODE INTERCEPTOR ───
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    
    const href = link.getAttribute('href') || '';
    const target = link.getAttribute('target');
    
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || target === '_blank') {
        e.preventDefault();
    }
});

document.addEventListener('submit', (e) => {
    e.preventDefault();
});

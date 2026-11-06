// Primeiro definimos as variáveis globais
const textToTypeElement = document.getElementById('textToType');
const inputArea = document.getElementById('inputArea');
const timerElement = document.getElementById('timer');
const resultElement = document.getElementById('result');
let timeLeft = 60;
let timer;
let started = false;
let currentLanguage = 'portuguese';

// Lista de palavras em diferentes idiomas
const wordsByLanguage = {
    portuguese: [
        "casa", "carro", "pessoa", "tempo", "vida", "mundo", "cidade", "amor", "trabalho", "história",
        "escola", "família", "amigo", "livro", "filme", "viagem", "dinheiro", "comida", "música", "natureza",
        "água", "terra", "fogo", "ar", "sol", "lua", "estrela", "mar", "rio", "montanha",
        "floresta", "jardim", "animal", "pássaro", "peixe", "cachorro", "gato", "cavalo", "árvore", "flor",
        "fruta", "legume", "pão", "café", "leite", "açúcar", "sal", "carne", "arroz", "feijão",
        "computador", "telefone", "internet", "televisão", "rádio", "jornal", "revista", "papel", "caneta", "lápis",
        "mesa", "cadeira", "cama", "sofá", "porta", "janela", "parede", "teto", "chão", "luz",
        "roupa", "sapato", "bolsa", "relógio", "óculos", "chapéu", "camisa", "calça", "vestido", "meia",
        "médico", "professor", "estudante", "engenheiro", "artista", "músico", "escritor", "pintor", "dentista", "advogado",
        "hospital", "banco", "loja", "mercado", "restaurante", "hotel", "igreja", "escola", "universidade", "biblioteca"
    ],
    english: [
        "house", "car", "person", "time", "life", "world", "city", "love", "work", "history",
        "school", "family", "friend", "book", "movie", "trip", "money", "food", "music", "nature",
        "water", "earth", "fire", "air", "sun", "moon", "star", "sea", "river", "mountain",
        "forest", "garden", "animal", "bird", "fish", "dog", "cat", "horse", "tree", "flower",
        "fruit", "vegetable", "bread", "coffee", "milk", "sugar", "salt", "meat", "rice", "beans",
        "computer", "phone", "internet", "television", "radio", "newspaper", "magazine", "paper", "pen", "pencil",
        "table", "chair", "bed", "sofa", "door", "window", "wall", "ceiling", "floor", "light",
        "clothes", "shoe", "bag", "watch", "glasses", "hat", "shirt", "pants", "dress", "sock",
        "doctor", "teacher", "student", "engineer", "artist", "musician", "writer", "painter", "dentist", "lawyer",
        "hospital", "bank", "store", "market", "restaurant", "hotel", "church", "school", "university", "library"
    ],
    spanish: [
        "casa", "coche", "persona", "tiempo", "vida", "mundo", "ciudad", "amor", "trabajo", "historia",
        "escuela", "familia", "amigo", "libro", "película", "viaje", "dinero", "comida", "música", "naturaleza",
        "agua", "tierra", "fuego", "aire", "sol", "luna", "estrella", "mar", "río", "montaña",
        "bosque", "jardín", "animal", "pájaro", "pez", "perro", "gato", "caballo", "árbol", "flor",
        "fruta", "verdura", "pan", "café", "leche", "azúcar", "sal", "carne", "arroz", "frijoles",
        "computadora", "teléfono", "internet", "televisión", "radio", "periódico", "revista", "papel", "pluma", "lápiz",
        "mesa", "silla", "cama", "sofá", "puerta", "ventana", "pared", "techo", "piso", "luz",
        "ropa", "zapato", "bolso", "reloj", "gafas", "sombrero", "camisa", "pantalón", "vestido", "calcetín",
        "médico", "profesor", "estudiante", "ingeniero", "artista", "músico", "escritor", "pintor", "dentista", "abogado",
        "hospital", "banco", "tienda", "mercado", "restaurante", "hotel", "iglesia", "escuela", "universidad", "biblioteca"
    ]
};

// Adicione uma configuração global para os modos
const gameModes = {
    easy: {
        time: 60,  // 1 minuto
        words: 200
    },
    medium: {
        time: 45,  // 45 segundos
        words: 500
    },
    hard: {
        time: 30,  // 30 segundos
        words: 1200
    }
};

// Variável para armazenar o modo atual
let currentMode = 'easy';

// Banco de palavras em português
const wordBank = [
    // Substantivos comuns
    "casa", "carro", "livro", "mesa", "cadeira", "computador", "telefone", "porta", "janela", "escola",
    "trabalho", "cidade", "país", "mundo", "pessoa", "família", "amigo", "tempo", "dia", "noite",
    "água", "comida", "roupa", "sapato", "bolsa", "relógio", "óculos", "papel", "caneta", "lápis",
    
    // Verbos comuns
    "fazer", "ter", "ser", "estar", "ir", "vir", "poder", "querer", "dever", "saber",
    "falar", "ouvir", "ver", "olhar", "pensar", "sentir", "amar", "gostar", "viver", "morrer",
    "comer", "beber", "dormir", "acordar", "andar", "correr", "pular", "dançar", "cantar", "rir",
    
    // Adjetivos
    "bom", "mau", "grande", "pequeno", "alto", "baixo", "forte", "fraco", "rápido", "lento",
    "bonito", "feio", "novo", "velho", "quente", "frio", "duro", "mole", "claro", "escuro",
    
    // Tecnologia
    "internet", "software", "hardware", "programa", "sistema", "rede", "arquivo", "pasta", "tela", "mouse",
    "teclado", "impressora", "celular", "tablet", "notebook", "servidor", "banco", "dados", "código", "site",
    
    // Profissões
    "médico", "professor", "engenheiro", "advogado", "dentista", "arquiteto", "designer", "programador", "escritor", "artista",
    "músico", "ator", "diretor", "vendedor", "gerente", "secretário", "analista", "consultor", "técnico", "cientista",
    
    // Natureza
    "árvore", "flor", "planta", "animal", "pássaro", "peixe", "cachorro", "gato", "sol", "lua",
    "estrela", "céu", "mar", "rio", "montanha", "floresta", "jardim", "terra", "ar", "fogo",
    
    // Alimentos
    "pão", "arroz", "feijão", "carne", "frango", "peixe", "salada", "fruta", "verdura", "legume",
    "leite", "queijo", "ovo", "café", "chá", "suco", "água", "refrigerante", "cerveja", "vinho",
    
    // Cores
    "azul", "verde", "vermelho", "amarelo", "branco", "preto", "cinza", "marrom", "roxo", "rosa",
    "laranja", "dourado", "prateado", "bege", "violeta", "turquesa", "índigo", "carmim", "magenta", "ciano",
    
    // Números
    "zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove",
    "dez", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa", "cem",
    
    // Tempo
    "segundo", "minuto", "hora", "dia", "semana", "mês", "ano", "década", "século", "milênio",
    "manhã", "tarde", "noite", "ontem", "hoje", "amanhã", "agora", "depois", "antes", "sempre",
    
    // Lugares
    "casa", "apartamento", "escritório", "loja", "mercado", "shopping", "restaurante", "hotel", "hospital", "escola",
    "universidade", "biblioteca", "museu", "teatro", "cinema", "parque", "praça", "rua", "avenida", "estrada",
    
    // Emoções
    "alegria", "tristeza", "raiva", "medo", "amor", "ódio", "felicidade", "angústia", "ansiedade", "calma",
    "paz", "esperança", "desespero", "solidão", "saudade", "ciúme", "inveja", "orgulho", "vergonha", "culpa",
    
    // Corpo humano
    "cabeça", "rosto", "olho", "nariz", "boca", "orelha", "pescoço", "ombro", "braço", "mão",
    "dedo", "perna", "joelho", "pé", "costas", "peito", "barriga", "coração", "cérebro", "pulmão",
    
    // Vestuário
    "camisa", "calça", "vestido", "saia", "blusa", "casaco", "jaqueta", "meia", "sapato", "tênis",
    "bota", "chinelo", "sandália", "shorts", "bermuda", "pijama", "gravata", "cinto", "bolsa", "chapéu",
    
    // Família
    "pai", "mãe", "filho", "filha", "irmão", "irmã", "avô", "avó", "tio", "tia",
    "primo", "prima", "sobrinho", "sobrinha", "marido", "esposa", "sogro", "sogra", "cunhado", "cunhada",
    
    // Casa
    "sala", "quarto", "cozinha", "banheiro", "garagem", "jardim", "varanda", "corredor", "escada", "teto",
    "parede", "piso", "porta", "janela", "sofá", "cama", "mesa", "cadeira", "armário", "estante",

    // Esportes
    "futebol", "vôlei", "basquete", "tênis", "natação", "corrida", "ciclismo", "ginástica", "atletismo", "boxe",
    "surf", "skate", "golfe", "rugby", "handebol", "judô", "karatê", "yoga", "pilates", "crossfit",
    "maratona", "triathlon", "escalada", "patinação", "esgrima", "arco", "flecha", "boliche", "sinuca", "xadrez",

    // Instrumentos Musicais
    "violão", "piano", "bateria", "guitarra", "baixo", "flauta", "saxofone", "violino", "viola", "violoncelo",
    "trombone", "trompete", "harpa", "gaita", "tambor", "pandeiro", "teclado", "acordeão", "cavaquinho", "berimbau",

    // Materiais
    "madeira", "metal", "plástico", "vidro", "cerâmica", "couro", "tecido", "borracha", "alumínio", "aço",
    "ferro", "ouro", "prata", "bronze", "cobre", "zinco", "níquel", "titânio", "platina", "mármore",

    // Veículos
    "bicicleta", "moto", "ônibus", "caminhão", "avião", "helicóptero", "barco", "navio", "trem", "metrô",
    "patinete", "skate", "jetski", "lancha", "veleiro", "submarino", "foguete", "drone", "carroça", "charrete",

    // Profissões Específicas
    "pediatra", "ortopedista", "cardiologista", "dermatologista", "psiquiatra", "neurologista", "oftalmologista",
    "desenvolvedor", "designer", "arquiteto", "engenheiro", "mecânico", "eletricista", "encanador", "pedreiro",
    "carpinteiro", "pintor", "soldador", "motorista", "piloto",

    // Objetos de Escritório
    "grampeador", "clipe", "pasta", "arquivo", "calculadora", "agenda", "calendário", "post-it", "envelope", "etiqueta",
    "carimbo", "perfurador", "régua", "tesoura", "cola", "corretivo", "apontador", "borracha", "marcador", "fichário",

    // Eletrônicos
    "smartphone", "tablet", "laptop", "desktop", "monitor", "impressora", "scanner", "roteador", "modem", "webcam",
    "microfone", "fone", "carregador", "pendrive", "HD", "SSD", "processador", "memória", "placa", "bateria",

    // Cozinha
    "fogão", "geladeira", "microondas", "forno", "liquidificador", "batedeira", "panela", "frigideira", "prato", "copo",
    "garfo", "faca", "colher", "escorredor", "ralador", "abridor", "espátula", "concha", "peneira", "chaleira",

    // Frutas Específicas
    "maçã", "banana", "laranja", "limão", "abacaxi", "manga", "uva", "pera", "morango", "kiwi",
    "melancia", "melão", "mamão", "goiaba", "ameixa", "pêssego", "cereja", "framboesa", "mirtilo", "maracujá",

    // Legumes Específicos
    "cenoura", "batata", "cebola", "alho", "tomate", "pepino", "abobrinha", "berinjela", "pimentão", "beterraba",
    "mandioca", "inhame", "batata-doce", "nabo", "rabanete", "gengibre", "abóbora", "chuchu", "quiabo", "jiló",

    // Verbos de Ação
    "correr", "pular", "nadar", "voar", "dirigir", "cozinhar", "limpar", "lavar", "secar", "dobrar",
    "passar", "varrer", "aspirar", "esfregar", "polir", "pintar", "desenhar", "escrever", "digitar", "programar",

    // Adjetivos Específicos
    "brilhante", "opaco", "transparente", "colorido", "listrado", "xadrez", "florido", "estampado", "liso", "rugoso",
    "áspero", "macio", "suave", "pesado", "leve", "fino", "grosso", "largo", "estreito", "profundo",

    // Termos Técnicos
    "algoritmo", "variável", "função", "classe", "objeto", "método", "interface", "protocolo", "servidor", "cliente",
    "database", "framework", "biblioteca", "API", "cache", "debug", "deploy", "backup", "update", "download",

    // Termos Médicos
    "diagnóstico", "tratamento", "sintoma", "paciente", "consulta", "exame", "cirurgia", "remédio", "vacina", "receita",
    "prontuário", "ambulância", "hospital", "clínica", "laboratório", "farmácia", "enfermaria", "UTI", "radiografia", "ultrassom",

    // Termos Jurídicos
    "processo", "audiência", "sentença", "recurso", "juiz", "advogado", "promotor", "testemunha", "defesa", "acusação",
    "tribunal", "júri", "lei", "código", "artigo", "parágrafo", "contrato", "documento", "certidão", "procuração",

    // Termos Financeiros
    "dinheiro", "conta", "banco", "cartão", "crédito", "débito", "empréstimo", "financiamento", "investimento", "poupança",
    "bolsa", "ação", "fundo", "juros", "taxa", "imposto", "salário", "pagamento", "receita", "despesa",

    // Termos Educacionais
    "aula", "curso", "matéria", "disciplina", "prova", "teste", "trabalho", "pesquisa", "estudo", "leitura",
    "escrita", "cálculo", "gramática", "história", "geografia", "ciência", "física", "química", "biologia", "matemática",

    // Termos Artísticos
    "pintura", "desenho", "escultura", "fotografia", "cinema", "teatro", "dança", "música", "literatura", "poesia",
    "romance", "conto", "novela", "roteiro", "cena", "ato", "quadro", "galeria", "museu", "exposição",

    // Termos Científicos
    "átomo", "molécula", "célula", "gene", "DNA", "RNA", "proteína", "enzima", "hormônio", "neurônio",
    "sinapses", "mitocôndria", "núcleo", "membrana", "tecido", "órgão", "sistema", "organismo", "espécie", "evolução"

    // ... (continuar adicionando mais palavras até completar 2000)
];

// Função para trocar o idioma
function changeLanguage(newLanguage) {
    currentLanguage = newLanguage;
    
    // Gera novo texto no idioma selecionado com 24 palavras
    const randomText = generateRandomText(28);
    textToTypeElement.innerHTML = randomText;
    
    // Atualiza a interface
    updateUILanguage();
}

// Evento do dropdown (colocado no início do documento)
document.addEventListener('DOMContentLoaded', () => {
    // Configuração inicial do dropdown
    document.querySelectorAll('.dropdown-content a').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtém o novo idioma e atualiza
            const newLanguage = this.getAttribute('data-lang').toLowerCase();
            changeLanguage(newLanguage);
            
            // Atualiza o texto do botão
            document.querySelector('.dropbtn').textContent = this.textContent;
            
            // Fecha o dropdown
            document.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // Inicialização com 28 palavras
    const randomText = generateRandomText(28);
    textToTypeElement.innerText = randomText;
    updateUILanguage();

    const themeToggle = document.getElementById('theme-toggle');
    
    // Verifica se há uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'light';
    }
    
    // Adiciona o evento de mudança de tema
    themeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Adicione o evento de clique para o botão de reiniciar
    document.getElementById('resetButton').addEventListener('click', resetGame);

    // Adicione o controle das tabs de estatísticas
    const statsTabs = document.querySelectorAll('.stats-tab');
    const statsPanels = document.querySelectorAll('.stats-panel');

    statsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active de todas as tabs e painéis
            statsTabs.forEach(t => t.classList.remove('active'));
            statsPanels.forEach(p => p.classList.remove('active'));

            // Adiciona active na tab clicada e no painel correspondente
            tab.classList.add('active');
            const panelId = `${tab.dataset.tab}-panel`;
            document.getElementById(panelId).classList.add('active');
        });
    });

    // Adicione um event listener para os modos
    document.querySelectorAll('.modes-dropdown .dropdown-content a').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const mode = this.getAttribute('data-mode');
            changeGameMode(mode);
        });
    });
});

// Função para gerar texto aleatório com maior variedade
function generateRandomText(wordCount = 28) {
    const words = wordsByLanguage[currentLanguage];
    if (!words || words.length === 0) {
        console.error('Palavras não encontradas para o idioma:', currentLanguage);
        return '';
    }
    
    // Cria uma cópia do array de palavras para manipular
    let availableWords = [...words];
    const randomWords = [];
    
    for (let i = 0; i < wordCount; i++) {
        // Se acabarem as palavras disponíveis, recarrega a lista
        if (availableWords.length === 0) {
            availableWords = [...words];
        }
        
        // Seleciona uma palavra aleatória da lista disponível
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];
        
        // Remove a palavra selecionada das disponíveis
        availableWords.splice(randomIndex, 1);
        
        randomWords.push(selectedWord);
    }
    
    return randomWords.join(' ');
}

// Evento de clique no botão dropdown
document.querySelector('.dropbtn').addEventListener('click', function() {
    const dropdown = document.querySelector('.dropdown-content');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

function countWords(text) {
    // Remove espaços extras no início e no final e conta palavras separadas por espaços ou quebras de linha
    const words = text.trim().match(/\b\w+\b/g);
    return words ? words.length : 0;
}

// Função para gerar mais palavras quando necessário
function addMoreWords() {
    const newWord = generateRandomText(1); // Gera apenas 1 palavra nova
    return newWord;
}

// Adicione esta função para calcular WPM
function calculateWPM(correctChars, timeElapsed) {
    // WPM = (caracteres / 5) / minutos
    const minutes = timeElapsed / 60;
    return Math.round((correctChars / 5) / minutes);
}

// Primeiro, vamos corrigir o event listener do input
inputArea.addEventListener('input', function() {
    if (!started) {
        started = true;
        startTimer();
    }
    updateTextDisplay(this.value); // Estava usando this.value incorretamente
});

// Agora vamos ajustar a função updateTextDisplay
function updateTextDisplay(input) {
    const currentWord = textToTypeElement.querySelector('.word');
    if (!currentWord) return;

    const targetWord = currentWord.textContent.trim();
    const typedWord = input.trim();
    let html = '';

    // Colore cada letra da palavra atual
    for (let i = 0; i < targetWord.length; i++) {
        const targetChar = targetWord[i];
        if (i < typedWord.length) {
            // Se a letra foi digitada, verifica se está correta
            if (typedWord[i] === targetChar) {
                html += `<span class="correct">${targetChar}</span>`;
            } else {
                html += `<span class="incorrect">${targetChar}</span>`;
            }
        } else {
            // Letras ainda não digitadas
            html += targetChar;
        }
    }

    currentWord.innerHTML = html;
}

// Adicione este novo event listener para o espaço
inputArea.addEventListener('keydown', function(e) {
    if (e.key === ' ') {
        const currentWord = this.value.trim();
        const targetWord = textToTypeElement.querySelector('.word').textContent.trim();
        
        if (currentWord.length > 0) {
            // Contabiliza a palavra
            if (currentWord === targetWord) {
                correctWordsCount++;
            } else {
                incorrectWordsCount++;
            }
            
            // Limpa o input e remove a palavra
            setTimeout(() => {
                this.value = '';
                const firstWord = textToTypeElement.querySelector('.word');
                if (firstWord) {
                    firstWord.classList.add('typed');
                    setTimeout(() => {
                        firstWord.remove();
                        // Adiciona uma nova palavra
                        const newWord = wordsByLanguage[currentLanguage][Math.floor(Math.random() * wordsByLanguage[currentLanguage].length)];
                        const newWordSpan = document.createElement('span');
                        newWordSpan.textContent = newWord + ' ';
                        newWordSpan.className = 'word';
                        textToTypeElement.appendChild(newWordSpan);
                    }, 300);
                }
            }, 0);
        }
        
        e.preventDefault();
    }
});

// Função para inicializar o texto com algumas palavras
function initializeText() {
    const initialWords = generateNewWords(10); // Começa com 10 palavras
    textToTypeElement.innerHTML = initialWords.map(word => 
        `<span class="word">${word} </span>`
    ).join('');
}

// Adicione variáveis globais para contagem
let correctWordsCount = 0;
let incorrectWordsCount = 0;

// Atualize a função startTimer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            inputArea.disabled = true;
            
            const accuracy = correctWordsCount + incorrectWordsCount > 0 
                ? Math.round((correctWordsCount / (correctWordsCount + incorrectWordsCount)) * 100) 
                : 0;
            
            const texts = uiTranslations[currentLanguage];
            resultElement.innerHTML = `
                <div class="final-results">
                    <h2>${texts.timeUp}</h2>
                    <div class="result-item">
                        <span>${texts.correctWords}</span>
                        <span class="value-correct">${correctWordsCount}</span>
                    </div>
                    <div class="result-item">
                        <span>${texts.incorrectWords}</span>
                        <span class="value-incorrect">${incorrectWordsCount}</span>
                    </div>
                    <div class="result-item">
                        <span>${texts.accuracy}</span>
                        <span class="value-accuracy">${accuracy}%</span>
                    </div>
                    <div class="result-item">
                        <span>WPM:</span>
                        <span class="value-wpm">${Math.round(correctWordsCount)}</span>
                    </div>
                </div>
            `;
        }
    }, 1000);
}

// Função para atualizar a interface atualizada
function updateUILanguage() {
    const texts = uiTranslations[currentLanguage];
    if (!texts) {
        console.error('Traduções não encontradas para o idioma:', currentLanguage);
        return;
    }
    
    // Atualiza os textos da interface
    inputArea.placeholder = texts.placeholder;
    resetButton.innerText = texts.restart;
    
    // Formata o tempo no formato minuto:segundos
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Atualiza o resultado atual se existir
    if (resultElement.innerText) {
        const typedText = inputArea.value.trim();
        const referenceWords = textToTypeElement.innerText.split(' ');
        const typedWords = typedText.split(' ').filter(word => word !== '');
        
        let correctWords = 0;
        let incorrectWords = 0;
        
        typedWords.forEach((word, index) => {
            if (index < referenceWords.length) {
                if (word === referenceWords[index]) {
                    correctWords++;
                } else {
                    incorrectWords++;
                }
            }
        });
        
        const totalAttempted = correctWords + incorrectWords;
        const accuracy = totalAttempted > 0 ? Math.round((correctWords / totalAttempted) * 100) : 0;
        
        showResults(correctWords, incorrectWords, accuracy);
    }
}

// Atualize a função resetGame
function resetGame() {
    // Reseta o timer com base no modo atual
    clearInterval(timer);
    const modeConfig = gameModes[currentMode];
    timeLeft = modeConfig.time;
    started = false;
    
    // Atualiza o display do timer
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Limpa a área de input
    inputArea.value = '';
    inputArea.disabled = false;
    
    // Limpa os resultados
    resultElement.innerHTML = '';
    
    // Reinicia as palavras com base no modo atual
    const initialWords = generateNewWords(10); // Mantém 10 palavras visíveis inicialmente
    textToTypeElement.innerHTML = initialWords.map(word => 
        `<span class="word">${word} </span>`
    ).join('');

    // Reseta as contagens
    correctWordsCount = 0;
    incorrectWordsCount = 0;
}

// Objeto com as traduções da interface
const uiTranslations = {
    portuguese: {
        timer: "Tempo: ",
        timeUp: "Tempo acabou!",
        correctWords: "Palavras corretas: ",
        incorrectWords: "Palavras erradas: ",
        accuracy: "Precisão: ",
        placeholder: "Comece a digitar aqui...",
        restart: "Reiniciar"
    },
    english: {
        timer: "Time: ",
        timeUp: "Time's up!",
        correctWords: "Correct words: ",
        incorrectWords: "Incorrect words: ",
        accuracy: "Accuracy: ",
        placeholder: "Start typing here...",
        restart: "Restart"
    },
    spanish: {
        timer: "Tiempo: ",
        timeUp: "¡Se acabó el tiempo!",
        correctWords: "Palabras correctas: ",
        incorrectWords: "Palabras incorrectas: ",
        accuracy: "Precisión: ",
        placeholder: "Empieza a escribir aquí...",
        restart: "Reiniciar"
    }
};

// Atualiza a função que mostra o resultado
function showResults(correctWords, incorrectWords, accuracy) {
    const texts = uiTranslations[currentLanguage];
    if (timeLeft <= 0) {
        resultElement.innerHTML = `
            ${texts.timeUp}<br>
            ${texts.correctWords}<span style="color: #28a745">${correctWords}</span><br>
            ${texts.incorrectWords}<span style="color: #dc3545">${incorrectWords}</span><br>
            ${texts.accuracy}${accuracy}%
        `;
    } else {
        resultElement.innerText = `${texts.correctWords}${correctWords}`;
    }
}

function generateNewWords(count) {
    // Usa o banco de palavras de acordo com o modo atual
    const modeConfig = gameModes[currentMode];
    const maxWords = modeConfig.words;
    
    // Cria um subconjunto do banco de palavras baseado no modo
    const availableWords = wordBank.slice(0, maxWords);
    
    return Array.from({length: count}, () => {
        return availableWords[Math.floor(Math.random() * availableWords.length)];
    });
}

// Chama a função de inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', initializeText);

function changeGameMode(mode) {
    currentMode = mode;
    const modeConfig = gameModes[mode];
    
    // Atualiza o tempo
    timeLeft = modeConfig.time;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Reinicia o jogo com as novas configurações
    resetGame();
}

// Adicione no final do arquivo
document.addEventListener('DOMContentLoaded', function() {
    const settingsGear = document.querySelector('.settings-gear');
    const settingsMenu = document.querySelector('.settings-menu');
    const languageSelector = document.querySelector('.language-selector');

    // Clone os seletores para o menu de configurações em telas pequenas
    if (window.innerWidth <= 768) {
        const selectorClone = languageSelector.cloneNode(true);
        settingsMenu.appendChild(selectorClone);
        
        // Reaplique os event listeners no clone
        selectorClone.querySelectorAll('.dropdown-content a').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const newLanguage = this.getAttribute('data-lang').toLowerCase();
                changeLanguage(newLanguage);
                settingsMenu.classList.remove('active');
            });
        });

        selectorClone.querySelectorAll('.modes-dropdown .dropdown-content a').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const mode = this.getAttribute('data-mode');
                changeGameMode(mode);
                settingsMenu.classList.remove('active');
            });
        });
    }

    // Toggle do menu de configurações
    settingsGear.addEventListener('click', function() {
        settingsMenu.classList.toggle('active');
    });

    // Fechar o menu quando clicar fora
    document.addEventListener('click', function(e) {
        if (!settingsGear.contains(e.target) && !settingsMenu.contains(e.target)) {
            settingsMenu.classList.remove('active');
        }
    });
});
    
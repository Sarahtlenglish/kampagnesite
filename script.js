const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const apiKey = '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'; // Erstat med din faktiske nøgle

let conversation = []; // Array til at gemme samtalen

// Initialiser samtalen ved at vise assistentens introduktion med svarmuligheder
async function initializeChat() {
    // Send en tom besked for at få assistentens introduktion
    conversation.push({
        role: 'user',
        content: ''
    });

    // Send velkomstteksten
    const welcomeText = `
        Hej! Jeg hedder Sunny, og jeg er din egen personlige Sunset-bot. For at jeg bedst muligt kan hjælpe dig, skal du vælge en af nedenstående beskeder:
    `;
    conversation.push({
        role: 'ai',
        content: welcomeText
    });

    // Send knapperne med valgmuligheder
    const optionsMessage = `
        <button onclick="selectOption('A')">Prisen er afgørende for mig 💰</button>
        <button onclick="selectOption('B')">Det betyder meget for mig, at der er muligheder for hele familien 👪</button>
        <button onclick="selectOption('C')">Jeg går meget op i at vide, hvordan min mad er lavet og hvor den kommer fra 🌍</button>
        <button onclick="selectOption('D')">Jeg er her bare for sjov 🎉</button>
    `;
    conversation.push({
        role: 'options',
        content: optionsMessage
    });

    // Vis beskeder i chatvinduet
    updateChatUI();
}
async function sendMessage() {
    const userMessage = userInput.value;

    // Gem brugerens besked i samtalen
    conversation.push({
        role: 'user',
        content: userMessage
    });

    // Håndter brugerens input baseret på scenarier
    if (userMessage.toLowerCase() === 'istap') {
        // Hvis brugeren svarer rigtigt på gåden
        const correctAnswerResponse = "Det er korrekt! Her er en lille gave - fra os til dig: <br> Rabatkode: XYZ123";
        conversation.push({
            role: 'ai',
            content: correctAnswerResponse
        });
    } else if (userMessage.toLowerCase() === 'jeg er her bare for sjov') {
        // Hvis brugeren skriver "Jeg er her bare for sjov"
        const riddleResponse = "Fedt! Her er en lille gåde: Det vokser kun om vinteren og det vokser oppefra og ned – hvad er det?";
        conversation.push({
            role: 'ai',
            content: riddleResponse
        });
    } else {
        // Hvis brugeren skriver andre beskeder, send til OpenAI og fortsæt samtalen
        const aiResponse = await callOpenAI();

        // Tilføj assistentens svar kun, hvis der er en gyldig AI-respons
        if (aiResponse && typeof aiResponse === 'string' && aiResponse.trim() !== '') {
            conversation.push({
                role: 'ai',
                content: aiResponse
            });
        }
    }

    // Vis beskeder i chatvinduet
    updateChatUI();

    // Ryd brugerens inputfelt
    userInput.value = '';
}


// Funktion til at generere forudbestemt svar baseret på brugerens valgmulighed
async function generatePredefinedResponse(option) {
    let aiResponse = '';

    switch (option) {
        case 'A':
            aiResponse = 'Det forstår jeg godt!<br> Vidste du godt, at Sunset, trods hvad mange tror, er på samme prisleje som andre Fast Food-kæder?';
            break;
        case 'B':
            aiResponse = 'Det forstår jeg godt!<br> Vidste du, at der er brætspil til hele familien i flere af vores restauranter?';
            break;
        case 'C':
            aiResponse = 'Det er også vigtigt for os!<br> Vidste du godt, at mange af Sunsets restaurant producerer deres egne urter I restauranten?   ';
            break;
        case 'D':
            aiResponse = 'Fedt, her er en lille gåde!<br> Det vokser kun om vinteren og det vokser oppefra og ned – hvad er det?';
            break;
        default:
            aiResponse = 'Beklager, jeg forstår ikke valget.';
            break;
    }

    return aiResponse;
}

// Funktion til at generere nye svarmuligheder baseret på brugerens valg
function getFollowUpOptions(option) {
    let followUpOptions = '';

    switch (option) {
        case 'A':
            followUpOptions = `
                <button onclick="selectOption('F')">Fortæl mig mere</button>
                <button onclick="selectOption('G')">Ikke interesseret</button>
            `;
            break;
        case 'B':
            followUpOptions = `
                <button onclick="selectOption('H')">Fortæl mig mere</button>
                <button onclick="selectOption('I')">Ikke interesseret</button>
            `;
            break;
        case 'C':
            followUpOptions = `
                <button onclick="selectOption('J')">Fortæl mig mere</button>
                <button onclick="selectOption('K')">Ikke interesseret</button>
            `;
            break;
        case 'D':
            followUpOptions = `
               
            `;
            break;
        // Tilføj yderligere cases efter behov
        default:
            // Returner en tom streng, når der ikke er definerede opfølgningsmuligheder
            break;
    }

    return followUpOptions;
}

// Funktion til at håndtere følgesvarmuligheder baseret på brugerens valg
async function handleFollowUpOptions(option) {
    let aiResponses = [];

    switch (option) {
        case 'F':
            aiResponses.push('Prisen er ikke den eneste fordel hos os. Vores bøffer består nemlig af 99% kød - resten er salt og peber!');
            break;
        case 'G':
            aiResponses.push('Det er også helt i orden. Hvis du har lyst, kan du chatte videre med mig, og ellers må du have en dejlig dag!');
            break;
        case 'H':
            aiResponses.push('Vidste du, at dit barn er med til at plante et træ, når I bestiller en børnemenu?');
            break;
        case 'I':
            aiResponses.push('Det er også helt i orden. Hvis du har lyst, kan du chatte videre med mig, og ellers må du have en dejlig dag!');
            break;
        case 'J':
            aiResponses.push('Vidste du, at køerne hygger sig på markerne i minimum 10 måneder om året? Og gerne mere, hvis vejret tillader det.');
            break;
        case 'K':
            aiResponses.push('Det er også helt i orden. Hvis du har lyst, kan du chatte videre med mig, og ellers må du have en dejlig dag!');
            break;
        case 'L':
            aiResponses.push('Det er desværre forkert, men godt forsøgt!');
            break;
        case 'M':
            aiResponses.push('Det er også helt i orden. Hvis du har lyst, kan du chatte videre med mig, og ellers må du have en dejlig dag!');
            break;
        // Tilføj yderligere cases efter behov
        default:
            aiResponses.push('Beklager, jeg forstår ikke valget.');
            break;

    }

    // Tilføj assistentens svar kun, hvis der er gyldige AI-responser
    aiResponses.forEach(response => {
        if (response.trim() !== '') {
            conversation.push({
                role: 'ai',
                content: response
            });
        }
    });

    // Hvis option er 'G' eller 'I', tilføj en ekstra besked med rabatkoden
    if (['F', 'H', 'J', 'L'].includes(option)) {
        conversation.push({
            role: 'ai',
            content: 'Her er en lille gave - fra os til dig'
        });
        conversation.push({
            role: 'ai',
            content: 'Rabatkode: XYZ123'
        });

    } else if (['G', 'I', 'K', 'M'].includes(option)) {
        conversation.push({
            role: 'ai',
            content: 'Du får dog lige en lille gave af mig alligevel.'
        });
        conversation.push({
            role: 'ai',
            content: 'Rabatkode: XYZ123'
        });
    }

    // Vis beskeder i chatvinduet
    updateChatUI();

    // Returner AI-responserne for eventuel yderligere brug
    return aiResponses;
}

// Funktion til at opdatere chatgrænsefladen baseret på samtalen
function updateChatUI() {
    // Ryd chatvinduet
    chatContainer.innerHTML = '';

    // Vis hver besked i samtalen
    conversation.forEach(message => {
        appendMessage(message.role, message.content);
    });
}

// Funktion til at tilføje en besked til chatgrænsefladen
function appendMessage(role, content) {
    let messageElement;

    if (role === 'ai') {
        // Opret container specifikt for 'ai' beskeder
        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container');

        const imgElement = document.createElement('img');
        imgElement.src = 'billeder/avatar.png'; // Sti til assistentens billede
        imgElement.classList.add('ai-pic');
        messageContainer.appendChild(imgElement);

        messageElement = document.createElement('div');
        messageElement.classList.add(role);
        messageContainer.appendChild(messageElement);

        chatContainer.appendChild(messageContainer);
    } else {
        // For 'user' og andre roller, fortsæt uden message-container
        messageElement = document.createElement('div');
        messageElement.classList.add(role);
        chatContainer.appendChild(messageElement);
    }

    const textElement = document.createElement('p');
    textElement.innerHTML = content;
    messageElement.appendChild(textElement);
}


// Funktion til at sende forespørgsel til OpenAI's GPT og få svar
async function callOpenAI() {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4', // Erstat med den ønskede model
                messages: [{
                    role: 'system',
                    content: `
                                You are a helpful assistant, named Sunny. You only speak Danish. 
                                Let's talk about the Danish food chain, Sunset Boulevard. You are not allowed 
                                to suggest other food chains or restaurants. If the user tries to talk about 
                                something else than Sunset Boulevard related, just pretend they are asking 
                                about Sunset, and be a little funny about it, but mostly be sweet. Make it 
                                subtle that you are not allowed to talk about anything but Sunset. 
                                Remember that Sunset is short for Sunset Boulevard. 
                                Do not use too many exclamation points, and do not be annoying.
                                

                                If the user send you a message with: "jeg er her bare for sjov" responde with this specific message: "Fedt! Her er en lille gåde: Det vokser kun om vinteren og det vokser oppefra og ned – hvad er det?" 
                              

                                Here is the updated menu:
                                
                                [BRIOCHE BURGER Single Menu Ekstra: Peberbacon +8,- | Bøf +15,- | Smelteost +5,-
                                    Brioche Double Cheese 64,-94,- Bøf · to skiver smelteost · salat · rødløg · pickles · tomatrelish · mayonnaise · sennep
                                    Brioche Bacon Burn 64,-94,- Bøf · peberbacon · chipotlemayo · salat · rødløg · pickles
                                    Brioche Meat Free Double Cheese 64,-94,- Plantebøf · to skiver smelteost · salat · rødløg · pickles · tomatrelish · mayonnaise · sennep
                                    
                                    BURGER Single Menu Ekstra: Bacon +6,- | Bøf +15,- | Smelteost +5,-
                                    Original 49,-79,- Bøf · tomatrelish · iceberg · tomat · løg · pickles · mayonnaise
                                    American BBQ 49,-79,- Bøf · bacon · tomatrelish · iceberg · tomat · løg · pickles · smokey BBQ-sauce
                                    California Chicken & Bacon 49,-79,- Kyllingebryst · bacon · salatmix · tomat · løg · mayonnaise · smokey BBQ-sauce
                                    
                                    SALAT & VEGGIE Single Menu Ekstra: Brød +5,- | Kylling +15,- | Egekilde +10,- ved køb af salat
                                    Moroccan Salad 49,- Edamamebønner · couscoussalat · chili-hummus · salatmix · honningristede solsikkekerner
                                    Pasta Chicken & Bacon Salad 49,- Pestomarineret pasta · kyllingebryst · bacon · salatmix · agurk · tomat · rødløg · karrydressing
                                    Original Veggie Burger 49,-79,- Veggie chunks · tomatrelish · iceberg · tomat · løg · pickles · mayonnaise
                                    Hummus Veggie Burger 49,-79,- Veggie chunks · chili-hummus · ananas chipotle chutney · salatmix · agurk · tomat · krydderi
                                    
                                    DELICIOUS DEALS Single Menu Ekstra: Bacon +6,- | Smelteost +5,-
                                    Crispy Chicken 29,-59,- Sprød, paneret kylling · mayonnaise · iceberg · tomat
                                    Snackburger 17,-49,- Bøf · tomatrelish · mayonnaise · iceberg
                                    Snackwich® 17,-49,- Skinke · smelteost · salatmix · olivenolie
                                    
                                    DESSERT
                                    Cookies 12,-
                                    Ice Cream Pop 25,- Vaniljeis · chokoladesauce · flødeskum · karamelliseret popcorn
                                    
                                    MILKSHAKES
                                    Strawberry 39,- Vaniljeis · puré af jordbær · flødeskum
                                    Chocolate 39,- Vaniljeis · chokoladesauce · flødeskum
                                    Vanilla 39,- Vaniljeis · vaniljesirup · flødeskum
                                    
                                    BØRNEMENU
                                    Menu Børnemenu er inkl. pommes frites og lille sodavand, økologisk minimælk, vand eller æblejuice
                                    Vælg mellem: Kids Burger, Snackburger, Snackwich® eller 2 Crispy Chicken Tenders 45,-
                                    
                                    DRIKKEVARER
                                    0,5 l flaske kun til take away
                                    Pepsi · Pepsi Max · Faxe Kondi 0 kalorier · Faxe Kondi · Mirinda · Egekilde m. smag (0,5 l flaske) 24,-*
                                    Refill sodavand (Når du nyder maden i restauranten) 24,-
                                    Egekilde kildevand (0,5 l flaske) 19,-*
                                    Tropicana æblejuice (0,25 l) 16,-*
                                    Økologisk minimælk (0,25 l) 16,-
                                    Kaffe · Caffe Latte · Espresso · Cappuccino · Te Lille 16,- Stor 24,-
                                    
                                    INFORMATION OM ALLERGENER KAN FÅS VED HENVENDELSE TIL PERSONALET. * Ekskl. pant kr. 1,50
                                    
                                    SIDE ORDERS
                                    Pommes frites 21,-
                                    1 stk. Chili Cheese Bite 3,-
                                    2 stk. Crispy Chicken Tenders 20,-
                                    5 stk. Crispy Chicken Tenders 42,-72,-
                                    8 stk. Sunset Wings 22,-
                                    8 stk. Sunset Wings 40,-70,-
                                    Mix 3 Crispy Chicken Tenders & 6 Sunset Wings 58,-88,-
                                    
                                    V. TAKE AWAY ER MENUPRISER EKSKL. PANT
                                    
                                    DIPS Pr. stk.
                                    Bearnaise · Chipotlemayo · Mayo · Smokey BBQ-sauce · Aioli · Cajunmayo · Ketchup 5,-
                                    
                                    PRØV VORES SAFTIGE BØFFER AF IRSK HEREFORD KØDKVÆG
                                    HEREFORD BURGER Single Menu Ekstra: Herefordbøf +25,- | Peberbacon +8,- | Cheddarost +6,-
                                    Hereford Bearnaise 69,-99,- 170 g. Herefordbøf · cheddarost · peberbacon · pickles · bearnaisemayo · bløde, stegte løg · iceberg · løg
                                    Hereford Cajun 69,-99,- 170 g. Herefordbøf · cheddarost · cajunmayo · tomat · pickles · rødløg · bløde, stegte løg · iceberg
                                    Hereford Classic 69,-99,- 170 g. Herefordbøf · sennep · tomatrelish · rødløg · pickles · mayonnaise · iceberg
                                    
                                    SANDWICH Single Menu Ekstra: Bacon +6,- | Cheddarost +6,-
                                    Sunset Club 54,-84,- Foccacia · kyllingebryst · bacon · rødløg · salatmix · karrydressing · ananas chipotle chutney
                                    Tasty Tuna 54,-84,- Mørk foccacia · tunmousse · mayonnaise · agurkerelish · salatmix · agurk · tomat · rødløg
                                    Ham & Cheese 54,-84,- Foccacia · skinke · cheddarost · mayonnaise · sennep · agurk · tomat · rødløg · salatmix · oregano
                                    Byg selv 54,-84,- Valgfrit foccacia - valgfrit fyld
                                    Grilled Chicken & Bacon 54,-84,- Foccacia · kyllingebryst · bacon · smelteost · tomat · salatmix · rødløg · smokey BBQ-sauce · krydderi
                                    Vælg mellem foccacia eller mørk foccacia = vegetar = stærk
                                    
                                    Der tages forbehold for trykfejl. April 2021.
                                    ]
            `
                },
                {
                    role: 'user',
                    content: conversation[conversation.length - 1].content
                },
                {
                    role: 'assistant',
                    content: '  '
                }, // Tom besked som assistentens svar
                {
                    role: 'assistant',
                    content: ' '
                }, // Tom besked som assistentens svar
                {
                    role: 'assistant',
                    content: ''
                }, // Assistents foreslåede svarmuligheder
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}. ${errorText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        // Håndter fejlen her, f.eks. vis en fejlbesked til brugeren
    }
}
async function selectOption(option) {
    // Hvis det er en valgmulighed, gem brugerens valg og tilføj til samtalen
    if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].includes(option)) {
        const userChoiceMessage = `${getOptionText(option)}`;
        conversation.push({
            role: 'user',
            content: userChoiceMessage
        });

        // Fjern svarmulighederne (a, b, c, d, e, f, g, h, i, j, k, l, m) efter brugerens valg
        if (['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].includes(option)) {
            conversation = conversation.filter(message => message.role !== 'options');
        }

        // Håndter valgmuligheden her, f.eks. ved at sende en besked til assistenten
        let aiResponse = '';
        if (['A', 'B', 'C', 'D', 'E'].includes(option)) {
            aiResponse = await generatePredefinedResponse(option);

            // Tilføj assistentens svar til samtalen
            if (aiResponse && typeof aiResponse === 'string' && aiResponse.trim() !== '') {
                conversation.push({
                    role: 'ai',
                    content: aiResponse
                });

                // Generer nye svarmuligheder
                const followUpOptions = getFollowUpOptions(option);
                conversation.push({
                    role: 'options',
                    content: followUpOptions
                });
            }
        } else if (['F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'].includes(option)) {
            // Håndter følgesvarmuligheder baseret på brugerens valg
            aiResponse = await handleFollowUpOptions(option);

            // Tilføj assistentens svar kun, hvis der er en gyldig AI-respons
            if (aiResponse && typeof aiResponse === 'string' && aiResponse.trim() !== '') {
                conversation.push({
                    role: 'ai',
                    content: aiResponse
                });
            }
        } else if (['D', 'G', 'I', 'K'].includes(option)) {
            // Håndter 'D' samt følgesvarmuligheder baseret på brugerens valg
            if (option === 'D') {
                // Behandl 'D' som brugerinput og send det til OpenAI for at få et ægte svar
                aiResponse = await callOpenAI();
            } else {
                // Håndter følgesvarmuligheder baseret på brugerens valg
                aiResponse = await handleFollowUpOptions(option);
            }
        }
    } else {
        // Hvis brugeren skriver selv, send beskeden til OpenAI og fortsæt samtalen
        aiResponse = await callOpenAI();

        // Tilføj assistentens svar kun, hvis der er en gyldig AI-respons
        if (aiResponse && typeof aiResponse === 'string' && aiResponse.trim() !== '') {
            conversation.push({
                role: 'ai',
                content: aiResponse
            });
        }
    }

    // Vis beskeder i chatvinduet
    updateChatUI();

    // Ryd brugerens inputfelt
    userInput.value = '';
}

// Funktion til at hente teksten for en given valgmulighed
function getOptionText(option) {
    switch (option) {
        case 'A':
            return 'Prisen er afgørende for mig';
        case 'B':
            return 'Det betyder meget for mig, at der er muligheder for hele familien';
        case 'C':
            return 'Jeg går meget op i at vide, hvordan min mad er lavet og hvor den kommer fra';
        case 'D':
            return 'Jeg er her bare for sjov';
        case 'F':
            return 'Fortæl mig mere';
        case 'G':
            return 'Ikke interesseret';
        case 'H':
            return 'Fortæl mig mere';
        case 'I':
            return 'Ikke interesseret';
        case 'J':
            return 'Fortæl mig mere';
        case 'K':
            return 'Ikke interesseret';
        case 'L':
            return 'Fortæl mig mere';
        case 'M':
            return 'Ikke interesseret';

        default:
            return 'Ukendt valg';
    }
}

// Initialiser chat ved siden af svarmulighederne
initializeChat();

// Send besked med 'Enter'-knap
userInput.addEventListener('keyup', function (event) {
    // Tjek om tasten, der blev trykket, er Enter
    if (event.key === 'Enter') {
        // Kald sendMessage-funktionen, når Enter-tasten trykkes
        sendMessage();
    }
});

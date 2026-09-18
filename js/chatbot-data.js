/* SCOPRI L'ITALIA — ENRICHED CHATBOT LEO DATA (SPANISH & ENGLISH SUPPORT) */
var CHATBOT_DATA = {
  greeting: "Ciao, curious traveler! I am Leo da Vinci, your Renaissance guide through Italia! Ask me about pizza, Rome, Venice, wines, best time to visit, or simply tap a topic below!",
  quickReplies: [
    { label: "Best food to try?", question: "What is the best food to try in Italy?" },
    { label: "Tell me a fun fact", question: "Tell me a fun fact about Italy!" },
    { label: "Best time to visit?", question: "What is the best time to visit Italy?" },
    { label: "Help me explore the map", question: "How do I explore the map?" },
    { label: "How do I get around Italy?", question: "How do I get around Italy by train?" },
    { label: "What about Italian wines?", question: "Tell me about Tuscan wines" }
  ],
  faq: [
    { 
      keywords: ["hello", "hi", "hey", "ciao", "hola", "buongiorno", "buenas", "saludos"], 
      answer: "Ciao! Ah, qué alegría conocerte! Ask me about Neapolitan pizza, the Colosseum in Rome, Venetian gondolas, or when to plan your journey!" 
    },
    { 
      keywords: ["pizza", "pizzas", "pizzeria", "comida", "comer", "food", "eat", "eating", "gastronomia", "gastronomy", "que comer", "best food", "platillos", "plato", "napoli", "napoles"], 
      answer: "Mamma mia, Pizza Napoletana is legendary! Soft wood-fired crust, sweet San Marzano tomatoes, and creamy mozzarella di bufala. Check out our Pizza card in the Gastronomy section!" 
    },
    { 
      keywords: ["pasta", "pastas", "spaghetti", "espagueti", "tagliatelle", "carbonara", "lasagna", "bolognese", "bologna", "sfoglina"], 
      answer: "Ah, authentic Italian pasta! Try silky handmade Tagliatelle alla Bolognese in Emilia-Romagna or creamy Carbonara in Rome. Always served al dente!" 
    },
    { 
      keywords: ["gelato", "helado", "helados", "ice cream", "dessert", "postre", "postres", "sweet", "pistachio", "dulce"], 
      answer: "Gelato is pure happiness! True artisan gelato is made fresh daily with lower fat and natural ingredients. Bronte pistachio and Amalfi lemon are my favorites!" 
    },
    { 
      keywords: ["wine", "vino", "vinos", "chianti", "vineyard", "viñedo", "viñedos", "tuscany", "toscana", "drink", "bebida", "trago"], 
      answer: "Salute! Sip bold Chianti Classico or Brunello di Montalcino while admiring the golden Tuscan hills. Check our Tuscan Vineyards wine card!" 
    },
    { 
      keywords: ["colosseum", "coliseo", "rome", "roma", "flavian", "forum", "foro", "vaticano", "vatican", "trastevere"], 
      answer: "Rome is the Eternal City! The Colosseum has stood for 2,000 years. Visit early in the morning for golden light and shorter queues, then explore Trastevere." 
    },
    { 
      keywords: ["florence", "florencia", "duomo", "brunelleschi", "uffizi", "david", "toscana art"], 
      answer: "Florence is my Renaissance home! Climb Brunelleschi's magnificent terracotta dome, visit Michelangelo's David at the Accademia, and walk across Ponte Vecchio." 
    },
    { 
      keywords: ["venice", "venecia", "canal", "canales", "gondola", "gondolas", "gondolier", "burano", "murano", "grand canal"], 
      answer: "Venice floats like a magical dream! Take a sunset gondola ride along emerald canals, visit St. Mark's Basilica, and explore Burano's colorful houses." 
    },
    { 
      keywords: ["milan", "milano", "duomo milano", "fashion", "moda", "galleria"], 
      answer: "Milano is the capital of fashion and Gothic architecture! Walk among the 3,400 marble statues on the Duomo rooftops, then stroll Galleria Vittorio Emanuele II." 
    },
    { 
      keywords: ["amalfi", "positano", "coast", "costa", "playa", "playas", "sea", "mar", "ravello", "limoncello"], 
      answer: "The Amalfi Coast is breathtaking! Pastel villages like Positano cling to steep sea cliffs above turquoise Mediterranean waters amidst fragrant lemon groves." 
    },
    { 
      keywords: ["dolomites", "dolomitas", "mountain", "montaña", "montañas", "hike", "ski", "esqui", "braies", "lago", "lake"], 
      answer: "The Dolomites blush vibrant pink at sunset ('enrosadira')! Hike past pale limestone peaks in summer or row a wooden boat at Lake Braies." 
    },
    { 
      keywords: ["naples", "napoles", "sicily", "sicilia", "sardinia", "cerdeña", "etna", "isla", "island", "islands"], 
      answer: "Italy's southern regions and islands are magical! Explore Pompeii from Naples, sail Sardinia's turquoise coves, or climb Mount Etna volcano in Sicily." 
    },
    { 
      keywords: ["opera", "music", "musica", "orchestra", "orquesta", "violin", "verona", "cremona", "teatro", "la scala", "fenice"], 
      answer: "Italian music touches the soul! Watch open-air summer opera under the stars in the ancient Arena di Verona, or hear Stradivarius violins in Cremona." 
    },
    { 
      keywords: ["when", "time", "season", "weather", "clima", "cuando", "tiempo", "epoca", "mes", "meses", "estacion", "viajar", "visit"], 
      answer: "Spring (April to June) and Autumn (September to October) are ideal! Warm sunny days, pleasant temperatures, and fewer crowds than peak August summer." 
    },
    { 
      keywords: ["transport", "train", "tren", "trenes", "transporte", "como moverse", "bus", "autobus", "trenitalia", "frecciarossa", "car"], 
      answer: "High-speed trains like Trenitalia's Frecciarossa connect Rome, Florence, Venice, and Milan in under 2-3 hours! Booking in advance gives great rates." 
    },
    { 
      keywords: ["language", "idioma", "italian", "italiano", "hablar", "speak", "english", "ingles", "frases"], 
      answer: "A few friendly words go a long way: 'Ciao' (hello/goodbye), 'Grazie' (thank you), 'Per favore' (please), and 'Delizioso!' (delicious!)." 
    },
    { 
      keywords: ["tip", "tipping", "propena", "propinas", "money", "dinero", "euro", "euros", "cost", "costo", "presupuesto", "precios"], 
      answer: "The currency is the Euro (€). Tipping is modest — leaving 1-2 Euros or rounding up the bill is customary. A small cover charge ('coperto') is normal." 
    },
    { 
      keywords: ["map", "mapa", "explore", "explorar", "region", "regiones", "pines", "pins", "croquis"], 
      answer: "Our interactive Explore map features 6 regional pins: Venice, Florence, Rome, Naples, Sardinia, and Sicily. Click any pin to open full details!" 
    },
    { 
      keywords: ["fun fact", "fact", "facts", "dato", "datos", "curiosidad", "curiosidades", "dato curioso", "interesante", "cuentame algo"], 
      answer: "Fun fact: Italy has more UNESCO World Heritage sites than any other country on Earth (59 sites)! Also, Rome has over 2,000 public fountains." 
    },
    { 
      keywords: ["who are you", "leo", "quien eres", "davinci", "leonardo", "nombre", "quien sos"], 
      answer: "I am Leo da Vinci — Renaissance painter, inventor, engineer, and passionate lover of Italian culture & pizza! How can I assist your trip?" 
    }
  ],
  fallback: "Ah, my Renaissance brushes haven't painted an answer for that yet! Ask me about pizza, pasta, Rome, Venice, wine, or when to visit Italy!"
};

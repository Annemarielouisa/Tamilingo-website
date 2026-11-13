// tamil  = what shows on the card
// sound  = how to say it (English letters)
// answer = the quiz answer (must be unique within each group)
// Add a new group inside "words" or "sentences" the same way (keep 4+ items per group).

const content = {
  vowels: [
    { tamil: "அ", sound: "a",  answer: "a (about)" },
    { tamil: "ஆ", sound: "aa", answer: "aa (father)" },
    { tamil: "இ", sound: "i",  answer: "i (sit)" },
    { tamil: "ஈ", sound: "ee", answer: "ee (feet)" },
    { tamil: "உ", sound: "u",  answer: "u (put)" },
    { tamil: "ஊ", sound: "oo", answer: "oo (moon)" },
    { tamil: "எ", sound: "e",  answer: "e (pen)" },
    { tamil: "ஏ", sound: "ae", answer: "ae (say)" },
    { tamil: "ஐ", sound: "ai", answer: "ai (eye)" },
    { tamil: "ஒ", sound: "o",  answer: "o (pot)" },
    { tamil: "ஓ", sound: "oh", answer: "oh (go)" },
    { tamil: "ஔ", sound: "au", answer: "au (cow)" },

    {tamil: "க்", sound: "k",  answer: "k (skip)" },
{ tamil: "ங்", sound: "ng", answer: "ng (sing)" },
{ tamil: "ச்", sound: "ch", answer: "ch (church)" },
{ tamil: "ஞ்", sound: "ny", answer: "ny (canyon)" },
{ tamil: "ட்", sound: "t",  answer: "t (stop, retroflex)" },
{ tamil: "ண்", sound: "n",  answer: "n (retroflex, tongue curled back)" },
{ tamil: "த்", sound: "th", answer: "th (dental t, tongue at teeth)" },
{ tamil: "ந்", sound: "n",  answer: "n (dental n, tongue at teeth)" },
{ tamil: "ப்", sound: "p",  answer: "p (spin)" },
{ tamil: "ம்", sound: "m",  answer: "m (mom)" },
{ tamil: "ய்", sound: "y",  answer: "y (yes)" },
{ tamil: "ர்", sound: "r",  answer: "r (tapped r, like Spanish pero)" },
{ tamil: "ல்", sound: "l",  answer: "l (love)" },
{ tamil: "வ்", sound: "v",  answer: "v (between v and w)" },
{ tamil: "ழ்", sound: "zh", answer: "zh (retroflex, tongue curled back)" },
{ tamil: "ள்", sound: "l",  answer: "l (retroflex, tongue curled back)" },
{ tamil: "ற்", sound: "r",  answer: "r (strongly trilled/tapped r)" },
{ tamil: "ன்", sound: "n",  answer: "n (alveolar n, as in nun)" }
  ],

  consonants: [
    { tamil: "க", sound: "ka",  answer: "ka" },
    { tamil: "ங", sound: "nga", answer: "nga" },
    { tamil: "ச", sound: "cha", answer: "cha" },
    { tamil: "ஞ", sound: "nya", answer: "nya" },
    { tamil: "ட", sound: "ta",  answer: "ta (tongue curled)" },
    { tamil: "ண", sound: "na",  answer: "Na (tongue curled)" },
    { tamil: "த", sound: "tha", answer: "tha" },
    { tamil: "ந", sound: "na",  answer: "na (tongue at teeth)" },
    { tamil: "ப", sound: "pa",  answer: "pa" },
    { tamil: "ம", sound: "ma",  answer: "ma" },
    { tamil: "ய", sound: "ya",  answer: "ya" },
    { tamil: "ர", sound: "ra",  answer: "ra" },
    { tamil: "ல", sound: "la",  answer: "la" },
    { tamil: "வ", sound: "va",  answer: "va" },
    { tamil: "ழ", sound: "zha", answer: "zha (unique Tamil sound)" },
    { tamil: "ள", sound: "la",  answer: "La (tongue curled)" },
    { tamil: "ற", sound: "ra",  answer: "Ra (strong r)" },
    { tamil: "ன", sound: "na",  answer: "na (soft, word-end)" }
  ],

  numbers: [
    { tamil: "ஒன்று:சுழியம் ௦",   sound: "suliyam",   answer: "0 (௦)" },
    { tamil: "ஒன்று: ௧",   sound: "ondru",   answer: "1 (௧)" },
    { tamil: "இரண்டு: ௨",  sound: "irandu",  answer: "2 (௨)" },
    { tamil: "மூன்று: ௩",  sound: "moondru", answer: "3 (௩)" },
    { tamil: "நான்கு: ௪",  sound: "naangu",  answer: "4 (௪)" },
    { tamil: "ஐந்து: ௫",   sound: "ainthu",  answer: "5 (௫)" },
    { tamil: "ஆறு: ௬",     sound: "aaru",    answer: "6 (௬)" },
    { tamil: "ஏழு: ௭",     sound: "ezhu",    answer: "7 (௭)" },
    { tamil: "எட்டு: ௮",   sound: "ettu",    answer: "8 (௮)" },
    { tamil: "ஒன்பது: ௯",  sound: "onbathu", answer: "9 (௯)" },
    { tamil: "பத்து: ௧௦",   sound: "paththu", answer: "10 (௧௦)" }
  ],

  words: {
    relations: [
      { tamil: "அம்மா",   sound: "amma",    answer: "Mother" },
      { tamil: "அப்பா",   sound: "appa",    answer: "Father" },
      { tamil: "அண்ணன்",  sound: "annan",   answer: "Elder brother" },
      { tamil: "தம்பி",   sound: "thambi",  answer: "Younger brother" },
      { tamil: "அக்கா",   sound: "akka",    answer: "Elder sister" },
      { tamil: "தங்கை",   sound: "thangai", answer: "Younger sister" },
      { tamil: "தாத்தா",  sound: "thaatha", answer: "Grandfather" },
      { tamil: "பாட்டி",  sound: "paatti",  answer: "Grandmother" },
      { tamil: "தோழன்",  sound: "thozhan",  answer: "Male Friend" },
      { tamil: "தோழி",  sound: "thozhi",  answer: "Female Friend" },
      { tamil: "கடவுள்",  sound: "Kadavul",  answer: "God" }
    ],
    animals: [
      { tamil: "பூனை",    sound: "poonai",   answer: "Cat" },
      { tamil: "நாய்",    sound: "naai",     answer: "Dog" },
      { tamil: "மாடு",    sound: "maadu",    answer: "Cow" },
      { tamil: "ஆடு",     sound: "aadu",     answer: "Goat" },
      { tamil: "குதிரை",  sound: "kuthirai", answer: "Horse" },
      { tamil: "யானை",    sound: "yaanai",   answer: "Elephant" },
      { tamil: "சிங்கம்", sound: "singam",   answer: "Lion" },
      { tamil: "பறவை",    sound: "paravai",  answer: "Bird" },
      { tamil: "மீன்",    sound: "meen",     answer: "Fish" }
    ],
    food: [
      { tamil: "தண்ணீர்",  sound: "thanneer",  answer: "Water" },
      { tamil: "பால்",     sound: "paal",      answer: "Milk" },
      { tamil: "சாப்பாடு", sound: "saappaadu", answer: "Food" },
      { tamil: "சோறு",     sound: "soru",      answer: "Rice" },
      { tamil: "பழம்",     sound: "pazham",    answer: "Fruit" },
      { tamil: "தேநீர்",   sound: "theneer",   answer: "Tea" },
      { tamil: "உப்பு",    sound: "uppu",      answer: "Salt" },
      { tamil: " சக்கரை ", sound: "sakkarai", answer: "Sugar"},
      { tamil: " குழம்பு ", sound: "kuzhambu", answer: "curry"}
    ],

    tastes: [
      { tamil: "இனிப்பு ", sound: "inippu", answer: "Sweet"},
{ tamil: "கசப்பு ", sound: "kasappu", answer: "bitter"},
{ tamil: "புளிப்பு ", sound: "pulippu", answer: "Sour"},
{ tamil: "உறைப்பு", sound: "uraippu", answer: "Spicy"},
{ tamil: "உவர்ப்பு ", sound: "uvarppu", answer: "Salty"},
{ tamil: "துவர்ப்பு ", sound: "thuvarppu", answer: "Astringent"},
    ],
    

    gender: [
      { tamil: "உயர்திணை",  sound: "Uyarthinai",  answer: "High/Rational class: refers to Humans and God" },
      { tamil: "அஃறிணை",  sound: "Akkrinai",  answer: "Low/Irrational class: refers to Animals and non-living things." },
      { tamil: "ஆண்",  sound: "Aan",  answer: "Male : Uyarthinai" },
      { tamil: "பெண்",     sound: "Pen",      answer: "Female : Uyarthinai" },
      { tamil: "பலர்", sound: "Palar", answer: "Plural/Group gender: Refers to a mixed group of people, Uyarthinai" },
      { tamil: "ஒன்றன்",     sound: "Ondran",      answer: "Singular Neuter/Non-Human, Akkrinai" },
      { tamil: " பலவின்",     sound: "Palavin",    answer: "Plural Neuter/Non-Human, Akkrinai" }
    ],

    greetings: [
      { tamil: "வணக்கம்",       sound: "vanakkam",        answer: "Hello" },
      { tamil: "நன்றி",         sound: "nandri",          answer: "Thank you" },
      { tamil: "மன்னிக்கவும்",  sound: "mannikkavum",     answer: "Sorry" },
      { tamil: "ஆம்",           sound: "aam",             answer: "Yes" },
      { tamil: "இல்லை",         sound: "illai",           answer: "No" },
      { tamil: "காலை வணக்கம்",  sound: "kaalai vanakkam", answer: "Good morning" }
    ],
    home: [
      { tamil: "வீடு",     sound: "veedu",     answer: "House" },
      { tamil: "பள்ளி",    sound: "palli",     answer: "School" },
      { tamil: "புத்தகம்", sound: "puthagam",  answer: "Book" },
      { tamil: "கதவு",     sound: "kathavu",   answer: "Door" },
      { tamil: "நாற்காலி", sound: "naarkaali", answer: "Chair" },
      { tamil: "மேசை",     sound: "mesai",     answer: "Table" }
      
    ],

    directions: [
      { tamil: "இடது ", sound: "idathu", answer: "left"},
{ tamil: "வலது ", sound: "valathu", answer: "right"},
{ tamil: "கிழக்கு", sound: "kilakku", answer: "East"},
{ tamil: "மேற்கு", sound: "maerku", answer: "West"},
{ tamil: "வடக்கு ", sound: "vadakku", answer: "North"},
{ tamil: "தெற்கு ", sound: "therku", answer: "South"}
      
    ],
    nature: [
      { tamil: "சூரியன்", sound: "sooriyan", answer: "Sun" },
      { tamil: "நிலா",    sound: "nilaa",    answer: "Moon" },
      { tamil: "மழை",     sound: "mazhai",   answer: "Rain" },
      { tamil: "மரம்",    sound: "maram",    answer: "Tree" },
      { tamil: "பூ",      sound: "poo",      answer: "Flower" },
      { tamil: " கல் ", sound: "kal", answer: "Stone"},
{ tamil: " காடு ", sound: "kaadu", answer: "Forest"},
{ tamil: " ஆறு ", sound: "Aaru", answer: "River"},
{ tamil: " மண் ", sound: "sakkarai", answer: "Sugar"},
{ tamil: "கடல் ", sound:"kadal", answer: "Sea"},
{ tamil: "வானம்", sound:  "vaanam", answer: "Sky"},
{ tamil: " நிலம் ", sound: "nilam", answer: "Land"},
{ tamil: " தீ ", sound: "thee", answer: "Fire"},
{ tamil: " இலை ", sound:  "ilai", answer: "Leaf"},
{ tamil: " பாறை ", sound:  "paarai", answer: "Rock"},
{ tamil: "நீர்வீழ்ச்சி", sound: "neervizhchchi", answer: "Waterfall"}

    ],
    synonyms: [ 
{ tamil: "ஞாயிறு", sound: "gnayiru", answer: "Sun"},
{ tamil:"சூரியன்", sound: "sooriyan", answer: "Sun"},
{ tamil: "கதிரவன் ", sound: "kadhiravan", answer: "Sun"},
{ tamil: "பகலவன்", sound: "pagalavan", answer: "Sun"},
{ tamil: "வெய்யோன் ", sound: "Veyyon", answer: "Sun"},
{ tamil: "சுடர்", sound: "sudar", answer: "Sun"},
{ tamil: "ஆதித்தன்", sound: "Aadhithtthan", answer: "Sun"},
{ tamil: "ஆதவன் ", sound: "Aadhavan", answer: "Sun"},
{ tamil: "பரிதி ", sound: "paridhi", answer: "Sun"}
    ],
  },
 
   

  sentences: {
    greetings: [
      { tamil: "வணக்கம், எப்படி இருக்கிறீர்கள்?", sound: "vanakkam, eppadi irukkireergal?", answer: "Hello, how are you?" },
      { tamil: "நான் நன்றாக இருக்கிறேன்.",        sound: "naan nandraaga irukkiren.",       answer: "I am fine." },
      { tamil: "உங்கள் பெயர் என்ன?",              sound: "ungal peyar enna?",               answer: "What is your name?" },
      { tamil: "என் பெயர் யாழினி.",                 sound: "en peyar Raam.",                  answer: "My name is Raam." },
      { tamil: "மிக்க நன்றி.",                    sound: "mikka nandri.",                   answer: "Thank you very much." }
    ],
    family: [
      { tamil: "இது என் அம்மா.",                sound: "idhu en amma.",                 answer: "This is my mother." },
      { tamil: "அவர் என் அப்பா.",               sound: "avar en appa.",                 answer: "He is my father." },
      { tamil: "எனக்கு ஒரு தம்பி இருக்கிறான்.", sound: "enakku oru thambi irukkiraan.", answer: "I have a younger brother." },
      { tamil: "என் நண்பன் இங்கே இருக்கிறான்.", sound: "en nanban inge irukkiraan.",    answer: "My friend is here." }
    ],
    daily: [
      { tamil: "எனக்கு தண்ணீர் வேண்டும்.",  sound: "enakku thanneer vendum.", answer: "I want water." },
      { tamil: "நான் பள்ளிக்குப் போகிறேன்.", sound: "naan pallikkup pogiren.", answer: "I am going to school." },
      { tamil: "நான் சாப்பிடுகிறேன்.",       sound: "naan saappidugiren.",     answer: "I am eating." },
      { tamil: "இது என் வீடு.",              sound: "idhu en veedu.",          answer: "This is my house." }
    ],
    questions: [
      { tamil: "இது என்ன?",                    sound: "idhu enna?",                    answer: "What is this?" },
      { tamil: "நீங்கள் எங்கே போகிறீர்கள்?",   sound: "neengal enge pogireergal?",     answer: "Where are you going?" },
      { tamil: "இது எவ்வளவு?",                 sound: "idhu evvalavu?",                answer: "How much is this?" },
      { tamil: "இந்த இடத்திற்கு எப்படி போவது?", sound: "intha idathirku eppadi povathu?", answer: "How to go here?" },
      { tamil: "உங்களுக்குத் தமிழ் தெரியுமா?", sound: "ungalukku thamizh theriyumaa?", answer: "Do you know Tamil?" }
    ]
  },
  slang: {
    chennai: [
      { tamil: "மச்சி",           sound: "machi",    answer: "Buddy (friendly address)" },
      { tamil: "சிக்கோ",            sound: "chikko",    answer: "Difficult situation(casual)" },
      { tamil: "கலாய்",           sound: "kalaai",   answer: "To tease or joke around" },
      { tamil: "பீலா",            sound: "peelaa",   answer: "Bluff / showing off" },
      { tamil: "செம",             sound: "semma",    answer: "Awesome" }
    ],
    madurai: [
      { tamil: "பாவத்த",             sound: "paavaththa",          answer: "Sarcastic pitiness" },
      { tamil: "அம்புட்டு",       sound: "amputtu",      answer: "That much" },
      { tamil: "இம்புட்டு",       sound: "imputtu",      answer: "This much" },
      { tamil: "ஆத்தாடி",         sound: "aaththaadi",   answer: "Oh my! (surprise)" },
      { tamil: "என்னாத்துக்கு",   sound: "ennaaththukku",answer: "Why? / What for?" },
      { tamil: "வருவோம்ல",   sound: "varuvomla",answer: "We will come(sarcastically)" }
    ],

    kongu: [
      { tamil: "ஏனுங்க",          sound: "yenunga",    answer: "Yes? / Excuse me (polite)" },
      { tamil: "அம்மணி",          sound: "ammani",     answer: "Madam / young woman (address)" },

      { tamil: "பொறவு",           sound: "poravu",     answer: "Later / afterwards" }
      ],
    tirunelveli: [
      { tamil: "ஏலே",             sound: "ele",        answer: "Hey (to a close friend)" },
      { tamil: "மக்கா",           sound: "makkaa",     answer: "Buddy / friend" },
      { tamil: "அண்ணாச்சி",       sound: "annaachchi", answer: "Elder brother (also used for shopkeepers)" },
      { tamil: "என்னவே",          sound: "ennavae",    answer: "What, man?" },
      { tamil: "பொறவு",           sound: "poravu",     answer: "Later / afterwards" }
    ]
  }
};
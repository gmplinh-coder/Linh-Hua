import { Round, Question, QuestionType } from '../types';
import { QUESTIONS_PER_ROUND, TOTAL_ROUNDS } from '../constants';

// --- MASSIVELY EXPANDED QUESTION POOLS ---

const grammarQuestions = [
  { text: "She ___ to the store every day.", options: ["go", "goes", "is going", "went"], answer: "goes", explanation: "'Goes' is the correct third-person singular present tense form for 'she'." },
  { text: "They ___ playing soccer now.", options: ["is", "are", "was", "were"], answer: "are", explanation: "'Are' is used with the plural pronoun 'they' in the present continuous tense." },
  { text: "I have ___ an apple.", options: ["eat", "eaten", "ate", "eating"], answer: "eaten", explanation: "The present perfect tense 'have' is followed by the past participle 'eaten'." },
  { text: "What ___ you do yesterday?", options: ["did", "do", "are", "have"], answer: "did", explanation: "For questions about the past (indicated by 'yesterday'), use the auxiliary verb 'did'." },
  { text: "The book is ___ the table.", options: ["on", "in", "at", "with"], answer: "on", explanation: "'On' is the correct preposition to indicate that something is on a surface." },
  { text: "If I ___ you, I would study harder.", options: ["am", "was", "were", "be"], answer: "were", explanation: "The subjunctive mood 'were' is used in hypothetical 'if' clauses." },
  { text: "He runs ___ than his brother.", options: ["fast", "faster", "fastest", "fastly"], answer: "faster", explanation: "The comparative form 'faster' is used to compare two things." },
  { text: "There isn't ___ milk left.", options: ["some", "any", "many", "a"], answer: "any", explanation: "'Any' is used in negative sentences and questions." },
  { text: "My birthday is ___ June.", options: ["on", "at", "in", "by"], answer: "in", explanation: "'In' is used for months, years, and seasons." },
  { text: "She is the ___ girl in the class.", options: ["tall", "taller", "tallest", "more tall"], answer: "tallest", explanation: "The superlative form 'tallest' is used to compare one thing with all others in a group." },
  { text: "We ___ to the cinema last night.", options: ["go", "goes", "went", "have gone"], answer: "went", explanation: "'Went' is the simple past tense, used for actions completed in the past (like 'last night')." },
  { text: "Listen! The baby ___.", options: ["cries", "is crying", "cried", "has cried"], answer: "is crying", explanation: "The present continuous 'is crying' is used for actions happening at the moment of speaking." },
  { text: "He is interested ___ learning English.", options: ["in", "on", "at", "for"], answer: "in", explanation: "The correct preposition to follow 'interested' is 'in'." },
  { text: "I haven't seen him ___ last year.", options: ["for", "since", "from", "at"], answer: "since", explanation: "'Since' is used to refer to a specific point in time in the past." },
  { text: "You must ___ your homework.", options: ["do", "to do", "doing", "done"], answer: "do", explanation: "Modal verbs like 'must' are followed by the base form of the verb without 'to'." },
  { text: "How ___ sugar do you need?", options: ["much", "many", "a lot", "some"], answer: "much", explanation: "'Much' is used with uncountable nouns like 'sugar'." },
  { text: "I would rather ___ at home.", options: ["stay", "to stay", "staying", "stayed"], answer: "stay", explanation: "'Would rather' is followed by the base form of the verb." },
  { text: "She has been living here ___ ten years.", options: ["for", "since", "at", "in"], answer: "for", explanation: "'For' is used to denote a period of time." },
  { text: "Neither my brother nor my sister ___ video games.", options: ["like", "likes", "is liking", "are liking"], answer: "likes", explanation: "When using 'neither...nor', the verb agrees with the noun closest to it, which is 'sister' (singular)." },
  { text: "The news ___ not as bad as we expected.", options: ["is", "are", "were", "be"], answer: "is", explanation: "'News' is an uncountable noun and takes a singular verb." },
  { text: "A number of students ___ absent today.", options: ["is", "are", "was", "has been"], answer: "are", explanation: "'A number of' is a plural quantifier and takes a plural verb. 'The number of' would take a singular verb." },
  { text: "This is the boy ___ mother is a doctor.", options: ["who", "which", "whose", "whom"], answer: "whose", explanation: "'Whose' is a possessive pronoun used for people." },
  { text: "Could you tell me where ___?", options: ["is the station", "the station is", "was the station", "the station was"], answer: "the station is", explanation: "In an indirect question, the word order is subject + verb, not verb + subject." },
  { text: "I'm looking forward ___ you again.", options: ["to see", "seeing", "to seeing", "see"], answer: "to seeing", explanation: "The phrase 'look forward to' is followed by a gerund (-ing form)." },
  { text: "This book is not as ___ as that one.", options: ["interesting", "more interesting", "interestinger", "most interesting"], answer: "interesting", explanation: "The structure 'as ... as' is used for comparisons of equality, using the base form of the adjective." },
  { text: "He is used to ___ up early.", options: ["get", "getting", "got", "to get"], answer: "getting", explanation: "The phrase 'be used to' is followed by a gerund (-ing form) and means 'be accustomed to'." },
  { text: "My house is ___ the school.", options: ["near", "nearly", "next", "nearby"], answer: "near", explanation: "'Near' is a preposition that fits in this context. 'Next' would require 'to'." },
  { text: "You should ___ that movie. It's great!", options: ["see", "to see", "seeing", "saw"], answer: "see", explanation: "Modal verbs like 'should' are followed by the base form of the verb." },
  { text: "Let's go for a walk, ___?", options: ["shall we", "do we", "will we", "don't we"], answer: "shall we", explanation: "The tag question for a suggestion starting with 'Let's' is 'shall we?'." },
  { text: "I wish I ___ fly.", options: ["can", "could", "am able to", "can to"], answer: "could", explanation: "'Wish' is followed by the past tense to talk about unreal situations in the present." },
  { text: "There are ___ chairs in the room.", options: ["too much", "too many", "a lot", "so"], answer: "too many", explanation: "'Too many' is used with countable nouns like 'chairs'." },
];

const vocabQuestions = [
    { text: "A person who designs buildings is an ___.", options: ["artist", "engineer", "architect", "doctor"], answer: "architect", explanation: "An architect is a professional who plans, designs, and oversees the construction of buildings." },
    { text: "The opposite of 'brave' is ___.", options: ["scared", "cowardly", "strong", "weak"], answer: "cowardly", explanation: "'Cowardly' means lacking courage, which is the direct opposite of 'brave'." },
    { text: "A place where you can borrow books is a ___.", options: ["museum", "cinema", "library", "supermarket"], answer: "library", explanation: "A library is a building or room containing collections of books for people to read or borrow." },
    { text: "The word 'annual' means ___.", options: ["daily", "weekly", "monthly", "yearly"], answer: "yearly", explanation: "'Annual' means occurring once every year." },
    { text: "To 'postpone' something means to ___.", options: ["cancel it", "do it later", "do it now", "finish it"], answer: "do it later", explanation: "'Postpone' means to arrange for something to take place at a time later than that first scheduled." },
    { text: "Something that is 'delicious' tastes very ___.", options: ["bad", "good", "sour", "salty"], answer: "good", explanation: "'Delicious' means highly pleasant to the taste." },
    { text: "A 'decade' is a period of ___ years.", options: ["5", "10", "50", "100"], answer: "10", explanation: "A decade is a period of ten years." },
    { text: "The word 'enormous' means very ___.", options: ["small", "big", "fast", "cold"], answer: "big", explanation: "'Enormous' is a synonym for very large or huge." },
    { text: "A vehicle with two wheels, powered by a person, is a ___.", options: ["car", "bus", "bicycle", "plane"], answer: "bicycle", explanation: "A bicycle is a two-wheeled vehicle that you ride by pushing pedals." },
    { text: "If you are 'exhausted', you are very ___.", options: ["happy", "sad", "angry", "tired"], answer: "tired", explanation: "'Exhausted' means extremely tired." },
    { text: "A story from ancient times about gods and heroes is a ___.", options: ["novel", "myth", "poem", "fable"], answer: "myth", explanation: "A myth is a traditional story, especially one concerning the early history of a people or explaining some natural or social phenomenon." },
    { text: "The top surface of a room is the ___.", options: ["floor", "wall", "ceiling", "roof"], answer: "ceiling", explanation: "The ceiling is the upper interior surface of a room. The roof is the exterior top covering of a building." },
    { text: "To look at something for a long time is to ___.", options: ["glance", "stare", "peek", "blink"], answer: "stare", explanation: "'Stare' means to look fixedly or vacantly at someone or something with one's eyes wide open." },
    { text: "A person who travels to space is an ___.", options: ["astronaut", "pilot", "explorer", "diver"], answer: "astronaut", explanation: "An astronaut is a person trained to travel in a spacecraft." },
    { text: "The main character in a story is the ___.", options: ["antagonist", "protagonist", "narrator", "author"], answer: "protagonist", explanation: "The protagonist is the leading character or one of the major characters in a drama, movie, novel, or other fictional text." },
    { text: "Something that is transparent, you can ___ it.", options: ["not hear", "not touch", "see through", "smell"], answer: "see through", explanation: "Transparent materials allow light to pass through so that objects behind can be distinctly seen." },
    { text: "A list of dishes available at a restaurant is a ___.", options: ["recipe", "menu", "bill", "shopping list"], answer: "menu", explanation: "A menu is a list of food and drink available in a restaurant." },
    { text: "The money you pay to ride a bus or train is called a ___.", options: ["ticket", "fare", "fee", "price"], answer: "fare", explanation: "A fare is the money a passenger on public transport has to pay." },
    { text: "A person who studies the stars and planets is an ___.", options: ["astrologer", "geologist", "biologist", "astronomer"], answer: "astronomer", explanation: "An astronomer is an expert in or student of astronomy, the scientific study of celestial objects." },
    { text: "To 'mend' something means to ___ it.", options: ["break", "buy", "repair", "sell"], answer: "repair", explanation: "To mend means to repair something that is broken or damaged." },
    { text: "A group of lions is called a ___.", options: ["herd", "flock", "pack", "pride"], answer: "pride", explanation: "A group of lions is known as a pride." },
    { text: "The part of the day between sunset and midnight.", options: ["afternoon", "morning", "evening", "dawn"], answer: "evening", explanation: "Evening is the period of time at the end of the day, usually from about 6 p.m. to bedtime." },
    { text: "What do you call the brother of your father?", options: ["cousin", "nephew", "uncle", "grandfather"], answer: "uncle", explanation: "Your father's brother is your uncle." },
    { text: "A piece of land surrounded by water is an ___.", options: ["island", "ocean", "peninsula", "bay"], answer: "island", explanation: "An island is a piece of land completely surrounded by water." },
    { text: "Something that costs a lot of money is ___.", options: ["cheap", "free", "expensive", "valuable"], answer: "expensive", explanation: "'Expensive' means costing a lot of money." },
    { text: "The study of past events is called ___.", options: ["geography", "history", "science", "art"], answer: "history", explanation: "History is the study of past events, particularly in human affairs." },
    { text: "A person who writes for newspapers or magazines is a ___.", options: ["novelist", "poet", "journalist", "librarian"], answer: "journalist", explanation: "A journalist investigates, collects, and presents information as a news story." },
    { text: "The hard, outer layer of a tree is called ___.", options: ["leaf", "root", "bark", "branch"], answer: "bark", explanation: "Bark is the tough protective outer sheath of the trunk, branches, and twigs of a tree or woody shrub." },
    { text: "To make something smaller in size is to ___ it.", options: ["expand", "increase", "reduce", "grow"], answer: "reduce", explanation: "To reduce means to make smaller or less in amount, degree, or size." },
    { text: "The capital city of Japan is ___.", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: "Tokyo", explanation: "Tokyo is the capital and largest city of Japan." },
    { text: "Which of these is NOT a continent?", options: ["Asia", "Africa", "Canada", "Europe"], answer: "Canada", explanation: "Canada is a country in North America, which is a continent." },
    { text: "A 'century' is a period of ___ years.", options: ["10", "100", "1000", "50"], answer: "100", explanation: "A century is a period of one hundred years." },
    { text: "A document that shows you are qualified to do a job is a ___.", options: ["certificate", "receipt", "passport", "diary"], answer: "certificate", explanation: "A certificate is an official document attesting a certain fact, in particular." },
    { text: "A person who cannot see is ___.", options: ["deaf", "mute", "blind", "lame"], answer: "blind", explanation: "Blind means unable to see." },
    { text: "The sound a dog makes is called a ___.", options: ["meow", "moo", "bark", "roar"], answer: "bark", explanation: "Dogs bark." },
    { text: "To 'giggle' means to ___ lightly.", options: ["cry", "shout", "laugh", "talk"], answer: "laugh", explanation: "To giggle is to laugh lightly and repeatedly in a silly way." },
    { text: "The opposite of 'ancient' is ___.", options: ["old", "modern", "past", "historic"], answer: "modern", explanation: "Modern relates to the present or recent times as opposed to the remote past." },
    { text: "A person who flies a plane is a ___.", options: ["driver", "captain", "pilot", "sailor"], answer: "pilot", explanation: "A pilot is a person who operates the flying controls of an aircraft." },
    { text: "What is the name for the 'finger' on your foot?", options: ["hand", "nail", "toe", "ankle"], answer: "toe", explanation: "Toes are the digits on the foot." },
    { text: "A very strong wind is called a ___.", options: ["breeze", "gale", "drizzle", "fog"], answer: "gale", explanation: "A gale is a very strong wind." },
    { text: "A place where scientists do experiments is a ___.", options: ["studio", "gallery", "laboratory", "factory"], answer: "laboratory", explanation: "A laboratory is a room or building equipped for scientific experiments." },
    { text: "What do you call a baby cat?", options: ["puppy", "kitten", "cub", "chick"], answer: "kitten", explanation: "A young cat is called a kitten." },
    { text: "To fix a mistake is to ___ it.", options: ["create", "ignore", "correct", "repeat"], answer: "correct", explanation: "To correct means to put right an error or fault." },
    { text: "The land along the edge of a sea, lake, or river.", options: ["desert", "mountain", "shore", "valley"], answer: "shore", explanation: "The shore is the land along the edge of a body of water." },
    { text: "A person who cuts hair is a ___.", options: ["baker", "butcher", "barber", "dentist"], answer: "barber", explanation: "A barber's job is to cut hair." },
    { text: "The opposite of 'polite' is ___.", options: ["kind", "rude", "happy", "calm"], answer: "rude", explanation: "Rude means offensively impolite or bad-mannered." },
    { text: "A meal eaten in the middle of the day.", options: ["breakfast", "dinner", "supper", "lunch"], answer: "lunch", explanation: "Lunch is a meal eaten in the middle of the day, typically one that is lighter or less formal than an evening meal." },
    { text: "To travel on water, you can use a ___.", options: ["car", "train", "boat", "plane"], answer: "boat", explanation: "A boat is a vessel for travel on water." },
    { text: "A building where you can see movies.", options: ["theatre", "stadium", "cinema", "museum"], answer: "cinema", explanation: "A cinema is a place where people go to watch films." },
    { text: "A sweet food made from frozen cream or milk.", options: ["cheese", "yogurt", "ice cream", "butter"], answer: "ice cream", explanation: "Ice cream is a sweetened frozen food typically eaten as a snack or dessert." },
    { text: "What is the 7th month of the year?", options: ["June", "July", "August", "May"], answer: "July", explanation: "The months are January, February, March, April, May, June, July..." },
    { text: "A person who does magic tricks is a ___.", options: ["clown", "magician", "juggler", "acrobat"], answer: "magician", explanation: "A magician is a person who performs magic tricks for entertainment." },
    { text: "The opposite of 'empty' is ___.", options: ["full", "clear", "open", "big"], answer: "full", explanation: "If something is not empty, it is full." },
    { text: "To speak very quietly is to ___.", options: ["shout", "whisper", "sing", "yell"], answer: "whisper", explanation: "To whisper is to speak very softly using one's breath without one's vocal cords." },
    { text: "The money used in the USA is the ___.", options: ["Yen", "Euro", "Pound", "Dollar"], answer: "Dollar", explanation: "The official currency of the United States is the Dollar." },
    { text: "A place with many trees is a ___.", options: ["desert", "forest", "field", "beach"], answer: "forest", explanation: "A forest is a large area covered chiefly with trees and undergrowth." },
    { text: "What do you use to write on a blackboard?", options: ["pen", "pencil", "crayon", "chalk"], answer: "chalk", explanation: "Chalk is used for writing on blackboards." },
    { text: "The day after Tuesday is ___.", options: ["Monday", "Wednesday", "Thursday", "Friday"], answer: "Wednesday", explanation: "The order of the days is Tuesday, Wednesday, Thursday..." },
    { text: "A person who helps sick animals is a ___.", options: ["doctor", "nurse", "vet", "farmer"], answer: "vet", explanation: "A vet (veterinarian) is an animal doctor." },
];

const phoneticsQuestions = [
  { text: "Which word has a different sound for the underlined part: b__ea__t?", options: ["heat", "great", "seat", "meat"], answer: "great", explanation: "The 'ea' in 'great' makes an /eɪ/ sound, while in the others it makes an /iː/ sound." },
  { text: "Which word has a different sound for the underlined part: f__oo__d?", options: ["book", "look", "cook", "food"], answer: "food", explanation: "The 'oo' in 'food' makes a long /uː/ sound, while in the others it makes a short /ʊ/ sound." },
  { text: "Which word has a different sound for the underlined part: c__a__t?", options: ["father", "car", "park", "cat"], answer: "cat", explanation: "The 'a' in 'cat' makes an /æ/ sound, while in the others it makes an /ɑː/ sound." },
  { text: "Which word has a different sound for the underlined part: __th__in?", options: ["this", "that", "them", "thin"], answer: "thin", explanation: "The 'th' in 'thin' is voiceless /θ/, while in the others it is voiced /ð/." },
  { text: "Which word has a different sound for the underlined part: h__o__t?", options: ["go", "no", "so", "hot"], answer: "hot", explanation: "The 'o' in 'hot' makes an /ɒ/ sound, while in the others it makes an /oʊ/ sound." },
  { text: "Which word rhymes with 'night'?", options: ["weight", "light", "eight", "straight"], answer: "light", explanation: "'Night' and 'light' both end with the /aɪt/ sound." },
  { text: "Which word has the 'sh' sound /ʃ/?", options: ["chair", "ship", "this", "church"], answer: "ship", explanation: "The 'sh' in 'ship' makes the /ʃ/ sound." },
  { text: "Which word's underlined part sounds different: d__a__te?", options: ["make", "late", "have", "gate"], answer: "have", explanation: "The 'a' in 'have' (/æ/) is different from the /eɪ/ sound in the other words." },
  { text: "Which word's underlined part sounds different: b__u__s?", options: ["sun", "put", "fun", "cup"], answer: "put", explanation: "The 'u' in 'put' (/ʊ/) sounds different from the /ʌ/ sound in the other words." },
  { text: "Which word has a silent 'k'?", options: ["king", "make", "knife", "book"], answer: "knife", explanation: "The 'k' at the beginning of 'knife' is silent." },
  { text: "Which word has a different vowel sound: m__ee__t?", options: ["see", "feet", "get", "three"], answer: "get", explanation: "The 'e' in 'get' is a short /e/ sound, unlike the long /iː/ in the others." },
  { text: "Which word has a different sound for the underlined part: ch__ai__r?", options: ["rain", "wait", "said", "train"], answer: "said", explanation: "The 'ai' in 'said' makes an /e/ sound, while in the others it makes an /eɪ/ sound." },
  { text: "Which word's underlined part sounds different: n__ow__?", options: ["how", "cow", "show", "brown"], answer: "show", explanation: "The 'ow' in 'show' makes an /oʊ/ sound, while in the others it makes an /aʊ/ sound." },
  { text: "Which word has a silent 'b'?", options: ["rob", "comb", "mob", "job"], answer: "comb", explanation: "The 'b' at the end of 'comb' is silent." },
  { text: "Which word has a different sound for 'c': __c__ity?", options: ["cat", "cup", "cold", "city"], answer: "city", explanation: "The 'c' in 'city' makes a soft /s/ sound, while in the others it makes a hard /k/ sound." },
  { text: "Which word rhymes with 'time'?", options: ["dime", "slim", "him", "dim"], answer: "dime", explanation: "'Time' and 'dime' both end with the /aɪm/ sound." },
  { text: "Which word has a different sound for 'g': __g__oat?", options: ["goat", "game", "give", "giant"], answer: "giant", explanation: "The 'g' in 'giant' makes a soft /dʒ/ sound, while in the others it makes a hard /g/ sound." },
  { text: "Which word's underlined part sounds different: l__ou__d?", options: ["house", "mouse", "group", "cloud"], answer: "group", explanation: "The 'ou' in 'group' makes an /uː/ sound, while in the others it makes an /aʊ/ sound." },
  { text: "Which word has a silent 'h'?", options: ["hat", "hello", "hour", "home"], answer: "hour", explanation: "The 'h' at the beginning of 'hour' is silent." },
  { text: "Which word rhymes with 'bear'?", options: ["fear", "dear", "wear", "hear"], answer: "wear", explanation: "'Bear' and 'wear' both have the /eə/ sound." },
  { text: "Which word has a different sound for 's': __s__ugar?", options: ["sea", "sand", "sun", "sugar"], answer: "sugar", explanation: "The 's' in 'sugar' makes a /ʃ/ sound, while in the others it makes an /s/ sound." },
  { text: "Which word has a silent 't'?", options: ["stop", "start", "listen", "test"], answer: "listen", explanation: "The 't' in the middle of 'listen' is silent." },
  { text: "Which word's underlined part sounds different: h__ea__d?", options: ["bread", "dead", "read (present)", "read (past)"], answer: "read (present)", explanation: "The 'ea' in the present tense 'read' is /iː/, while in the others it's /e/." },
  { text: "Which word rhymes with 'four'?", options: ["hour", "tour", "sour", "door"], answer: "door", explanation: "'Four' and 'door' both have the /ɔː/ sound." },
  { text: "Which word has a silent 'w'?", options: ["what", "when", "who", "why"], answer: "who", explanation: "The 'w' in 'who' is silent; it begins with an /h/ sound." },
  { text: "Which word has a different sound for 'a': w__a__nt?", options: ["watch", "wash", "what", "wave"], answer: "wave", explanation: "The 'a' in 'wave' is /eɪ/, while in the others it's /ɒ/ or /ɔː/." },
  { text: "Which word has a different sound for 'ed': want__ed__?", options: ["needed", "waited", "played", "hated"], answer: "played", explanation: "The 'ed' in 'played' is /d/, while in the others it's /ɪd/." },
  { text: "Which word rhymes with 'eye'?", options: ["key", "me", "high", "day"], answer: "high", explanation: "'Eye' and 'high' are homophones and sound the same: /aɪ/." },
  { text: "Which word has the 'z' sound /z/?", options: ["cats", "dogs", "books", "maps"], answer: "dogs", explanation: "The plural 's' in 'dogs' is voiced, making a /z/ sound, because 'g' is a voiced consonant." },
  { text: "Which word's underlined part sounds different: m__y__?", options: ["fly", "try", "gym", "sky"], answer: "gym", explanation: "The 'y' in 'gym' makes an /ɪ/ sound, while in the others it makes an /aɪ/ sound." },
  { text: "Which word has a silent 'l'?", options: ["ball", "full", "talk", "sell"], answer: "talk", explanation: "The 'l' in 'talk' is silent." },
  { text: "Which word has a different sound for 'u': p__u__t?", options: ["but", "cut", "sun", "put"], answer: "put", explanation: "The 'u' in 'put' is /ʊ/, while in the others it is /ʌ/." },
  { text: "Which word rhymes with 'boat'?", options: ["about", "boot", "hot", "coat"], answer: "coat", explanation: "'Boat' and 'coat' share the /oʊt/ sound." },
  { text: "Which word has a silent 'p'?", options: ["apple", "cup", "psychology", "spin"], answer: "psychology", explanation: "The 'p' at the start of 'psychology' is silent." },
  { text: "Which word has a different sound for 'o': d__o__ne?", options: ["some", "come", "love", "home"], answer: "home", explanation: "The 'o' in 'home' is /oʊ/, while in the others it is /ʌ/." },
  { text: "Which word rhymes with 'face'?", options: ["has", "was", "space", "grass"], answer: "space", explanation: "'Face' and 'space' share the /eɪs/ sound." },
  { text: "Which word's underlined part sounds different: h__ere__?", options: ["dear", "near", "wear", "fear"], answer: "wear", explanation: "The sound in 'wear' is /eə/, while in the others it is /ɪə/." },
  { text: "Which word has the 'th' sound /ð/?", options: ["three", "think", "math", "mother"], answer: "mother", explanation: "The 'th' in 'mother' is voiced /ð/." },
  { text: "Which word has a different sound for 'i': f__i__ne?", options: ["nine", "live", "time", "like"], answer: "live", explanation: "The 'i' in 'live' (verb) is /ɪ/, while in the others it is /aɪ/." },
  { text: "Which word rhymes with 'cake'?", options: ["back", "make", "pack", "track"], answer: "make", explanation: "'Cake' and 'make' share the /eɪk/ sound." },
];

const readingQuestions = [
  { text: "Read the passage: The Eiffel Tower is in Paris, France. It was built in 1889. Many tourists visit it every year to see the beautiful view from the top.\n\nWhere is the Eiffel Tower located?", options: ["London", "Paris", "New York", "Tokyo"], answer: "Paris", explanation: "The text clearly states that the Eiffel Tower is in Paris, France." },
  { text: "Read the passage: Every morning, Tom wakes up at 7 AM. He eats breakfast, brushes his teeth, and then goes to school. His first class is Math.\n\nWhat is the first thing Tom does in the morning?", options: ["Goes to school", "Eats breakfast", "Wakes up", "Brushes his teeth"], answer: "Wakes up", explanation: "The passage says, 'Every morning, Tom wakes up at 7 AM,' making it the first action." },
  { text: "Read the passage: The blue whale is the largest animal on Earth. It can grow up to 30 meters long. It lives in the ocean and eats tiny shrimp-like animals called krill.\n\nWhat does a blue whale eat?", options: ["Fish", "Seaweed", "Krill", "Other whales"], answer: "Krill", explanation: "The text specifies that blue whales eat krill." },
  { text: "Read the recipe: To make lemonade, first mix sugar and water. Then, squeeze the juice from six lemons into the pitcher. Finally, add more water and stir well.\n\nWhat should you do after mixing sugar and water?", options: ["Add ice", "Stir well", "Serve it", "Squeeze lemon juice"], answer: "Squeeze lemon juice", explanation: "The recipe's second step, after mixing sugar and water, is to squeeze the lemon juice." },
  { text: "Read the passage: The Amazon rainforest is the world's largest tropical rainforest. It is home to millions of species of insects, plants, and animals. It is often called the 'Lungs of our Planet' because it produces a significant amount of the world's oxygen.\n\nWhy is the Amazon rainforest called the 'Lungs of our Planet'?", options: ["Because it's very large", "Because it's in the shape of lungs", "Because many animals live there", "Because it produces a lot of oxygen"], answer: "Because it produces a lot of oxygen", explanation: "The text explicitly states this is because it produces a significant amount of the world's oxygen." },
  { text: "Read the sign: 'LIBRARY - QUIET PLEASE. No food or drinks allowed. Return books on time.'\n\nWhich of the following is permitted in the library?", options: ["Eating a sandwich", "Talking loudly with friends", "Reading a book quietly", "Drinking a soda"], answer: "Reading a book quietly", explanation: "The sign asks for quiet and prohibits food and drinks, making quiet reading the only permitted activity." },
  { text: "Read the passage: Penguins are birds that cannot fly. They live in cold places, like Antarctica. They are excellent swimmers and use their wings like flippers to move through the water.\n\nHow do penguins move in the water?", options: ["They fly over it", "They walk on the bottom", "They use their wings to swim", "They jump like frogs"], answer: "They use their wings to swim", explanation: "The text says they 'use their wings like flippers to move through the water'." },
  { text: "Read the passage: The first person to walk on the Moon was Neil Armstrong in 1969. He was an American astronaut. When he stepped on the Moon, he said, 'That's one small step for a man, one giant leap for mankind.'\n\nWho was the first person on the Moon?", options: ["An American president", "A Russian cosmonaut", "Neil Armstrong", "A scientist from Earth"], answer: "Neil Armstrong", explanation: "The text clearly names Neil Armstrong as the first person to walk on the Moon." },
  { text: "Read the passage: Spiders are not insects. Insects have six legs, but spiders have eight legs. Spiders also have two main body parts, while insects have three.\n\nHow many legs does a spider have?", options: ["Four", "Six", "Eight", "Ten"], answer: "Eight", explanation: "The passage explicitly states that 'spiders have eight legs'." },
  { text: "Read the passage: The Great Wall of China is one of the most famous structures in the world. It was built over many centuries to protect China from invasions. It is so long that it is often (incorrectly) said to be visible from space.\n\nWhy was the Great Wall of China built?", options: ["For tourists to walk on", "To be a famous landmark", "To keep people inside China", "To protect the country from enemies"], answer: "To protect the country from enemies", explanation: "The text says it was built 'to protect China from invasions'." },
  { text: "Read the passage: A diary is a personal book where you can write about your thoughts, feelings, and daily activities. It's a private space for your own reflections.\n\nWhat is a diary for?", options: ["Doing homework", "Drawing pictures for school", "Writing down personal thoughts", "Sharing news with friends"], answer: "Writing down personal thoughts", explanation: "The text describes a diary as a place to write about 'thoughts, feelings, and daily activities'." },
  { text: "Read the passage: Chameleons are special lizards that can change their skin color. They do this not just to hide, but also to control their body temperature or to communicate with other chameleons.\n\nWhy do chameleons change color?", options: ["Only to hide from predators", "Because they are sick", "To control temperature and communicate", "To match their owner's clothes"], answer: "To control temperature and communicate", explanation: "The passage lists controlling temperature and communicating as reasons, in addition to hiding." },
  { text: "Read the passage: The sun is a star at the center of our solar system. It is a huge ball of hot gas. The Earth and other planets orbit, or travel around, the sun. The sun gives us light and heat.\n\nWhat does the Earth do?", options: ["It stays still in space", "It travels around the sun", "It is bigger than the sun", "It gives light to the sun"], answer: "It travels around the sun", explanation: "The text states that 'The Earth and other planets orbit, or travel around, the sun'." },
  { text: "Read the advertisement: 'Galaxy Pizza - Buy one large pizza, get a second one for half price! Offer valid only on Tuesdays. Call 555-1234 to order now!'\n\nWhen can you get the special pizza deal?", options: ["Any day of the week", "Only on the weekend", "Only on Tuesdays", "If you buy three pizzas"], answer: "Only on Tuesdays", explanation: "The ad says the 'Offer valid only on Tuesdays'." },
  { text: "Read the passage: The water cycle describes how water moves on Earth. Water evaporates from oceans and lakes, turns into clouds (condensation), and then falls back to Earth as rain or snow (precipitation).\n\nWhat is it called when water falls from clouds?", options: ["Evaporation", "Condensation", "Precipitation", "Collection"], answer: "Precipitation", explanation: "The text defines 'precipitation' as water falling back to Earth as rain or snow." },
  { text: "Read the passage: A recipe for cookies says you need flour, sugar, eggs, and butter. It says to mix the butter and sugar first, then add the eggs.\n\nAccording to the recipe, what should you add after mixing the butter and sugar?", options: ["Flour", "Milk", "Eggs", "Chocolate chips"], answer: "Eggs", explanation: "The recipe instructs to 'add the eggs' after mixing the butter and sugar." },
  { text: "Read the passage: The human heart is a muscle that pumps blood through the body. This blood carries oxygen and nutrients to all parts of your body. A healthy heart is very important for a long life.\n\nWhat is the main job of the heart?", options: ["To help you think", "To digest food", "To make you breathe", "To pump blood"], answer: "To pump blood", explanation: "The text clearly states the heart 'pumps blood through the body'." },
  { text: "Read the passage: A compass is a tool for finding direction. The needle on a compass always points north. This helps sailors and hikers know which way to go.\n\nWhich direction does a compass needle point?", options: ["South", "East", "West", "North"], answer: "North", explanation: "The passage says, 'The needle on a compass always points north'." },
  { text: "Read the instructions: 'For best results, wash this shirt in cold water. Do not use bleach. Tumble dry on low heat.'\n\nHow should you wash this shirt?", options: ["In hot water", "With lots of bleach", "In cold water", "On high heat"], answer: "In cold water", explanation: "The instructions explicitly say to 'wash this shirt in cold water'." },
  { text: "Read the passage: Mount Everest is the highest mountain in the world. It is located in the Himalayas, on the border between Nepal and China. Many climbers try to reach its peak every year.\n\nWhere is Mount Everest?", options: ["In the Rocky Mountains", "In the Alps", "In Africa", "In the Himalayas"], answer: "In the Himalayas", explanation: "The passage states that Mount Everest 'is located in the Himalayas'." },
  { text: "Read the passage: A thermometer is an instrument used for measuring temperature. Most thermometers have a liquid, like mercury or alcohol, inside a glass tube.\n\nWhat does a thermometer measure?", options: ["Time", "Distance", "Weight", "Temperature"], answer: "Temperature", explanation: "The text defines a thermometer as an 'instrument used for measuring temperature'." },
  { text: "Read the passage: The capital of Italy is Rome. Rome is a very old city, famous for its history, art, and food. Landmarks like the Colosseum and the Vatican City are in Rome.\n\nWhat city is the capital of Italy?", options: ["Venice", "Florence", "Milan", "Rome"], answer: "Rome", explanation: "The first sentence says, 'The capital of Italy is Rome'." },
  { text: "Read the passage: Bees are important insects because they help plants grow. They carry pollen from one flower to another, which is a process called pollination. This allows plants to make seeds and fruits.\n\nHow do bees help plants?", options: ["They eat the leaves", "They carry pollen between flowers", "They build nests in the branches", "They scare away other animals"], answer: "They carry pollen between flowers", explanation: "The text explains that bees 'carry pollen from one flower to another'." },
  { text: "Read the passage: A vegetarian is a person who does not eat meat, including beef, chicken, and fish. They eat foods like fruits, vegetables, grains, and nuts.\n\nWhat food would a vegetarian NOT eat?", options: ["Apples", "Bread", "Chicken", "Salad"], answer: "Chicken", explanation: "The definition clearly states that vegetarians do not eat meat like chicken." },
  { text: "Read the passage: The Olympic Games are a major international sports event held every four years. Athletes from countries all over the world compete in many different sports.\n\nHow often are the Olympic Games held?", options: ["Every year", "Every two years", "Every four years", "Every ten years"], answer: "Every four years", explanation: "The text says the event is 'held every four years'." },
  { text: "Read the passage: In many countries, cars drive on the right side of the road. However, in some places like the UK and Australia, they drive on the left.\n\nWhere do people drive on the left side of the road?", options: ["The USA", "France", "The UK", "Canada"], answer: "The UK", explanation: "The passage gives the UK and Australia as examples of places where people drive on the left." },
  { text: "Read the passage: A telescope is an instrument that makes faraway objects look closer. Astronomers use telescopes to study stars, planets, and galaxies.\n\nWhat is a telescope used for?", options: ["To see very small things", "To make faraway things look closer", "To listen to sounds from space", "To measure the weight of stars"], answer: "To make faraway things look closer", explanation: "The first sentence defines a telescope as an instrument that 'makes faraway objects look closer'." },
  { text: "Read the passage: The Statue of Liberty is a famous landmark in New York City. It was a gift to the United States from the people of France in 1886.\n\nWhich country gave the Statue of Liberty to the USA?", options: ["England", "Spain", "France", "Germany"], answer: "France", explanation: "The text says it was 'a gift... from the people of France'." },
  { text: "Read the passage: Deserts are very dry areas that receive very little rain. Many deserts are hot, like the Sahara, but some are cold, like the Gobi Desert in Asia.\n\nWhat is the main characteristic of a desert?", options: ["It is always hot", "It is very sandy", "It receives very little rain", "No animals live there"], answer: "It receives very little rain", explanation: "The passage defines deserts as 'very dry areas that receive very little rain'." },
  { text: "Read the passage: The main ingredients in bread are flour, water, yeast, and salt. Yeast is a tiny organism that makes the bread rise and become fluffy.\n\nWhat ingredient makes bread rise?", options: ["Flour", "Water", "Salt", "Yeast"], answer: "Yeast", explanation: "The text says 'Yeast... makes the bread rise'." },
  { text: "Read the notice: 'School Trip to the Museum. Date: Friday, October 25th. Please bring a packed lunch. The bus leaves at 9:00 AM sharp.'\n\nWhat do students need to bring?", options: ["Money for lunch", "Their own bus ticket", "A packed lunch", "Their history textbook"], answer: "A packed lunch", explanation: "The notice says, 'Please bring a packed lunch'." },
  { text: "Read the passage: A leap year happens every four years. In a leap year, the month of February has 29 days instead of the usual 28.\n\nHow many days are in February in a leap year?", options: ["28", "29", "30", "31"], answer: "29", explanation: "The passage states that in a leap year, 'February has 29 days'." },
  { text: "Read the passage: The platypus is a strange animal from Australia. It has a bill like a duck, a tail like a beaver, and it lays eggs, but it is a mammal.\n\nWhat is unusual about the platypus?", options: ["It can fly", "It lives in the water", "It is a mammal that lays eggs", "It is a very large animal"], answer: "It is a mammal that lays eggs", explanation: "The text highlights the strange combination of features, especially that it is a mammal that lays eggs." },
  { text: "Read the passage: A firefly is an insect that can produce its own light. This is called bioluminescence. They use this light to attract mates or prey.\n\nWhat special ability do fireflies have?", options: ["They can fly very fast", "They can produce light", "They can live underwater", "They can sing loudly"], answer: "They can produce light", explanation: "The text says a firefly 'can produce its own light'." },
  { text: "Read the passage: A library card is a card that lets you borrow books from a library for free. You usually need to show proof of your address to get one.\n\nWhat does a library card allow you to do?", options: ["Buy books at a discount", "Borrow books for free", "Enter the library building", "Use the library's computers"], answer: "Borrow books for free", explanation: "The text clearly states a library card 'lets you borrow books from a library for free'." },
  { text: "Read the passage: The capital of Egypt is Cairo. It is a huge city located on the banks of the Nile River. Near Cairo, you can find the famous Pyramids of Giza.\n\nWhat famous river is Cairo located on?", options: ["The Amazon River", "The Thames River", "The Nile River", "The Mississippi River"], answer: "The Nile River", explanation: "The text says Cairo is 'located on the banks of the Nile River'." },
  { text: "Read the passage: An orchestra is a large group of musicians who play music together. It includes instruments from the string, brass, woodwind, and percussion families.\n\nWhat is an orchestra?", options: ["A type of musical instrument", "A famous song", "A group of singers", "A large group of musicians"], answer: "A large group of musicians", explanation: "The first sentence defines an orchestra as 'a large group of musicians'." },
  { text: "Read the passage: Earth has one moon that orbits it. Some planets, like Jupiter, have many moons. Jupiter has over 75 moons!\n\nHow many moons does Jupiter have?", options: ["One", "None", "Two", "Many"], answer: "Many", explanation: "The text says Jupiter has 'many moons' and specifically 'over 75'." },
  { text: "Read the warning label: 'CAUTION: Contents are hot. Handle with care. Do not microwave the container.'\n\nWhat should you NOT do with this container?", options: ["Eat the contents", "Be careful when holding it", "Open it slowly", "Put it in the microwave"], answer: "Put it in the microwave", explanation: "The label clearly says, 'Do not microwave the container'." },
  { text: "Read the passage: A map is a drawing of an area, like a city or a country. It shows where things like roads, rivers, and buildings are located. A map key, or legend, explains what the symbols on the map mean.\n\nWhat does a map key do?", options: ["It helps you fold the map", "It shows the title of the map", "It explains the map's symbols", "It gives you driving directions"], answer: "It explains the map's symbols", explanation: "The text says the map key 'explains what the symbols on the map mean'." },
];

const listeningQuestions = [
  { text: "Listen and choose the correct sentence.", audioText: "The quick brown fox jumps over the lazy dog.", options: ["The fox is sleeping.", "The dog is quick.", "The fox is jumping.", "The dog is brown."], answer: "The fox is jumping.", explanation: "The audio describes a fox jumping over a dog." },
  { text: "Listen to the question: What is your favorite color?", audioText: "What is your favorite color?", options: ["I am 12 years old.", "My favorite color is blue.", "I like pizza.", "It is sunny today."], answer: "My favorite color is blue.", explanation: "This is the only option that correctly answers the question about a favorite color." },
  { text: "Listen to the announcement: 'The train to London will depart from platform 5 at 10:30 AM.'", audioText: "The train to London will depart from platform 5 at 10:30 AM.", options: ["The train goes to Paris.", "The train leaves at 10:50 AM.", "The train is on platform 5.", "The train has already left."], answer: "The train is on platform 5.", explanation: "The announcement clearly states the train will depart from platform 5." },
  { text: "Listen and choose the correct word you hear.", audioText: "I need to buy some flour to bake a cake.", options: ["floor", "flower", "flour", "four"], answer: "flour", explanation: "'Flour' is the ingredient used for baking. The other words are homophones but have different meanings." },
  { text: "Listen to the instruction: 'Please turn right at the next traffic light.'", audioText: "Please turn right at the next traffic light.", options: ["Turn left.", "Go straight.", "Stop the car.", "Turn right."], answer: "Turn right.", explanation: "The instruction is to turn right." },
  { text: "Listen to the question: 'How many people are in your family?'", audioText: "How many people are in your family?", options: ["My family is from Vietnam.", "There are four people in my family.", "My father is a doctor.", "I love my family."], answer: "There are four people in my family.", explanation: "This is the only option that answers the 'how many' question." },
  { text: "Listen to the statement: 'My sister's name is Emily, and she loves to play the piano.'", audioText: "My sister's name is Emily, and she loves to play the piano.", options: ["Emily plays the guitar.", "My brother's name is Emily.", "Emily enjoys playing the piano.", "Emily does not like music."], answer: "Emily enjoys playing the piano.", explanation: "The statement says Emily 'loves to play the piano'." },
  { text: "Listen and choose the correct time you hear.", audioText: "The meeting will start at a quarter past two.", options: ["2:45", "1:45", "2:30", "2:15"], answer: "2:15", explanation: "'A quarter past two' means 15 minutes after 2 o'clock, which is 2:15." },
  { text: "Listen to the announcement: 'All passengers for flight BA249 to New York, please proceed to gate 12.'", audioText: "All passengers for flight BA249 to New York, please proceed to gate 12.", options: ["The flight is going to London.", "The flight number is BA249.", "The gate number is 21.", "The flight has been cancelled."], answer: "The flight number is BA249.", explanation: "The announcement clearly states the flight number." },
  { text: "Listen to the question: 'Where did you go on your holiday?'", audioText: "Where did you go on your holiday?", options: ["I went with my parents.", "It was very sunny.", "We went to the beach.", "I went last summer."], answer: "We went to the beach.", explanation: "This is the only option that answers the 'where' question." },
  { text: "Listen to the statement: 'It's a cold and windy day, so you should wear a warm coat.'", audioText: "It's a cold and windy day, so you should wear a warm coat.", options: ["The weather is hot and sunny.", "You should wear shorts.", "It is a good day for a picnic.", "You should wear a coat because it's cold."], answer: "You should wear a coat because it's cold.", explanation: "The speaker advises wearing a coat due to the cold and windy weather." },
  { text: "Listen and choose the correct word you hear.", audioText: "Be careful, the plate is very hot.", options: ["plate", "plane", "plant", "play"], answer: "plate", explanation: "A plate is a dish that you eat food from." },
  { text: "Listen to the instruction: 'Please open your books to page fifty-four.'", audioText: "Please open your books to page fifty-four.", options: ["Close your books.", "Go to page 45.", "Open your books to page 54.", "Write in your notebook."], answer: "Open your books to page 54.", explanation: "The instruction is to open books to page 54." },
  { text: "Listen to the question: 'What time does the school library close?'", audioText: "What time does the school library close?", options: ["It closes at 4 PM.", "It is a very big library.", "I go there every day.", "You can borrow three books."], answer: "It closes at 4 PM.", explanation: "This is the only option that answers the 'what time' question." },
  { text: "Listen to the statement: 'I have two pets: a black cat and a white dog.'", audioText: "I have two pets: a black cat and a white dog.", options: ["I have a white cat.", "I have three pets.", "My dog is black.", "My cat is black."], answer: "My cat is black.", explanation: "The speaker specifies having a black cat." },
  { text: "Listen and choose the correct sentence you hear.", audioText: "We are going to visit the museum tomorrow.", options: ["We visited the museum yesterday.", "We will visit the museum tomorrow.", "We never go to the museum.", "We are at the museum now."], answer: "We will visit the museum tomorrow.", explanation: "'Going to visit' indicates a future plan." },
  { text: "Listen to the question: 'Can I help you?'", audioText: "Can I help you?", options: ["Yes, please. I'm looking for the post office.", "Yes, you can.", "No, I can't.", "Thank you, I'm fine."], answer: "Yes, please. I'm looking for the post office.", explanation: "This is a standard and polite response to an offer of help." },
  { text: "Listen and choose the correct word you hear.", audioText: "She has long, curly hair.", options: ["hat", "hand", "hair", "her"], answer: "hair", explanation: "Hair is what grows on your head." },
  { text: "Listen to the announcement: 'The supermarket will close in ten minutes.'", audioText: "The supermarket will close in ten minutes.", options: ["The supermarket is opening now.", "The supermarket is closed all day.", "The supermarket will close soon.", "The supermarket is open for 10 hours."], answer: "The supermarket will close soon.", explanation: "Closing in ten minutes means it will close soon." },
  { text: "Listen to the statement: 'My favorite subject in school is science because I like doing experiments.'", audioText: "My favorite subject in school is science because I like doing experiments.", options: ["I don't like school.", "I enjoy science because of the experiments.", "My favorite subject is history.", "I think experiments are boring."], answer: "I enjoy science because of the experiments.", explanation: "The speaker explicitly gives experiments as the reason for liking science." },
  { text: "Listen to the question: 'How do you go to school?'", audioText: "How do you go to school?", options: ["I go to school at 8 AM.", "My school is far away.", "I go to school by bus.", "I like my school."], answer: "I go to school by bus.", explanation: "This option answers the 'how' question about the method of transport." },
  { text: "Listen and choose the correct price you hear.", audioText: "That book costs thirteen dollars and fifty cents.", options: ["$30.50", "$13.15", "$30.15", "$13.50"], answer: "$13.50", explanation: "Thirteen dollars and fifty cents is written as $13.50." },
  { text: "Listen to the statement: 'The party is on Saturday evening. Don't be late!'", audioText: "The party is on Saturday evening. Don't be late!", options: ["The party is on Sunday morning.", "You should arrive late to the party.", "The party is in the evening on Saturday.", "There is no party this weekend."], answer: "The party is in the evening on Saturday.", explanation: "The statement clearly gives the day and time of the party." },
  { text: "Listen to the instruction: 'Please write your name at the top of the paper.'", audioText: "Please write your name at the top of the paper.", options: ["Write the date.", "Write your name at the bottom.", "Write your name at the top.", "Don't write your name."], answer: "Write your name at the top.", explanation: "The instruction specifies to write the name at the top." },
  { text: "Listen to the question: 'What's the weather like today?'", audioText: "What's the weather like today?", options: ["I like sunny weather.", "It's rainy and cool.", "Today is Thursday.", "The weather was bad yesterday."], answer: "It's rainy and cool.", explanation: "This is a direct description of the current weather, answering the question." },
  { text: "Listen to the statement: 'I'm sorry, but all the tickets for the concert are sold out.'", audioText: "I'm sorry, but all the tickets for the concert are sold out.", options: ["You can still buy a ticket.", "There are many tickets left.", "The concert is free.", "You cannot buy a ticket anymore."], answer: "You cannot buy a ticket anymore.", explanation: "'Sold out' means there are no tickets available." },
  { text: "Listen and choose the correct word you hear.", audioText: "Could you pass me the salt, please?", options: ["salt", "soap", "soup", "sand"], answer: "salt", explanation: "Salt is a common seasoning for food." },
  { text: "Listen to the announcement: 'Attention shoppers, the store will be closing in five minutes.'", audioText: "Attention shoppers, the store will be closing in five minutes.", options: ["The store is opening.", "The store will close soon.", "The store is having a sale.", "Shoppers should run."], answer: "The store will close soon.", explanation: "Closing in five minutes is a short amount of time." },
  { text: "Listen to the statement: 'He is wearing a blue shirt and brown trousers.'", audioText: "He is wearing a blue shirt and brown trousers.", options: ["His shirt is brown.", "His trousers are blue.", "His shirt is blue.", "He is wearing a dress."], answer: "His shirt is blue.", explanation: "The statement clearly describes the color of his shirt as blue." },
  { text: "Listen to the question: 'Would you like some tea or coffee?'", audioText: "Would you like some tea or coffee?", options: ["Yes, I would.", "I like tea.", "Coffee, please.", "Tea and coffee are good."], answer: "Coffee, please.", explanation: "This is a direct and polite choice in response to the question." },
];

let questionIdCounter = 0;

// Helper to shuffle an array
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Helper to get a unique set of questions from a pool
const getQuestionsFromPool = (pool: any[], count: number, type: QuestionType): Omit<Question, 'id'>[] => {
    const shuffled = shuffleArray(pool);
    // Ensure we don't request more questions than are available to prevent duplicates
    const numToSelect = Math.min(count, shuffled.length);
    const selected = [];

    for (let i = 0; i < numToSelect; i++) {
        const qData = shuffled[i];
        const question: Omit<Question, 'id'> = {
            type,
            questionText: qData.text,
            options: qData.options,
            correctAnswer: qData.answer,
            explanation: qData.explanation
        };
        if (type === QuestionType.Listening) {
            question.audioText = qData.audioText;
        }
        selected.push(question);
    }
    return selected;
};

export const generateRoundsData = (): Round[] => {
  const rounds: Round[] = [];
  questionIdCounter = 0; // Reset counter for fresh data generation

  // Define total questions needed for all rounds
  const totalGrammarNeeded = 9 * TOTAL_ROUNDS; // 90
  const totalPhoneticsNeeded = 4 * TOTAL_ROUNDS; // 40
  const totalReadingNeeded = 4 * TOTAL_ROUNDS; // 40
  const totalListeningNeeded = 3 * TOTAL_ROUNDS; // 30

  const allGrammarAndVocab = [...grammarQuestions, ...vocabQuestions];

  // Get all questions for the entire game to ensure uniqueness across rounds
  const gameGrammarQuestions = getQuestionsFromPool(allGrammarAndVocab, totalGrammarNeeded, QuestionType.Grammar);
  const gamePhoneticsQuestions = getQuestionsFromPool(phoneticsQuestions, totalPhoneticsNeeded, QuestionType.Phonetics);
  const gameReadingQuestions = getQuestionsFromPool(readingQuestions, totalReadingNeeded, QuestionType.Reading);
  const gameListeningQuestions = getQuestionsFromPool(listeningQuestions, totalListeningNeeded, QuestionType.Listening);

  // Combine, assign unique IDs, and shuffle the entire set
  let allGameQuestions: Question[] = shuffleArray([
      ...gameGrammarQuestions,
      ...gamePhoneticsQuestions,
      ...gameReadingQuestions,
      ...gameListeningQuestions,
  ]).map(q => ({ ...q, id: questionIdCounter++ }));

  // Distribute the unique questions into rounds
  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const startIndex = i * QUESTIONS_PER_ROUND;
    const endIndex = startIndex + QUESTIONS_PER_ROUND;
    
    // Ensure we don't try to slice beyond the array bounds
    if (startIndex >= allGameQuestions.length) {
        break;
    }

    const roundQuestions = allGameQuestions.slice(startIndex, endIndex);

    if (roundQuestions.length > 0) {
      rounds.push({
        id: i + 1,
        title: `Round ${i + 1}`,
        questions: roundQuestions,
        highScore: 0,
        status: 'unlocked',
      });
    }
  }

  return rounds;
};


const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Sample list of 500 meaningful words
const words = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon",
    "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "ugli", "vanilla",
    "watermelon", "xigua", "yam", "zucchini", "apricot", "blackberry", "blueberry", "cantaloupe", "dragonfruit",
    "grapefruit", "guava", "jackfruit", "kumquat", "lime", "lychee", "mulberry", "olive", "peach", "pear",
    "persimmon", "pineapple", "plum", "pomegranate", "pumpkin", "starfruit", "tomato", "cucumber", "squash", "bellpepper",
    "broccoli", "carrot", "cauliflower", "celery", "corn", "eggplant", "garlic", "lettuce", "onion", "peas",
    "potato", "radish", "spinach", "turnip", "yam", "asparagus", "beet", "brusselsprout", "cabbage", "chard",
    "collard", "kale", "leek", "okra", "parsnip", "rutabaga", "scallion", "shallot", "swede", "zucchini",
    "artichoke", "arugula", "basil", "chive", "cilantro", "dill", "fennel", "lavender", "mint", "oregano",
    "parsley", "rosemary", "sage", "thyme", "tarragon", "anise", "caraway", "cinnamon", "clove", "coriander",
    "cumin", "ginger", "nutmeg", "paprika", "pepper", "saffron", "turmeric", "vanilla", "almond", "cashew",
    "chestnut", "hazelnut", "macadamia", "peanut", "pecan", "pistachio", "walnut", "breadfruit", "coconut", "date",
    "fig", "mango", "olive", "avocado", "kiwi", "lemon", "lime", "orange", "passionfruit", "pineapple",
    "starfruit", "apricot", "blackberry", "blueberry", "boysenberry", "cranberry", "currant", "gooseberry", "grape",
    "huckleberry", "loganberry", "mulberry", "persimmon", "plum", "pomegranate", "prune", "quince", "raspberry",
    "strawberry", "tamarind", "acerola", "barberry", "bilberry", "cloudberry", "crowberry", "elderberry", "goji",
    "hackberry", "honeyberry", "juniper", "lingonberry", "mulberry", "rowan", "salmonberry", "sea-buckthorn",
    "serviceberry", "snowberry", "thimbleberry", "tomatillo", "whitebeam", "aronia", "babaco", "bignay", "camachile",
    "capuli", "cempedak", "cherimoya", "cupuacu", "feijoa", "grumichama", "imbe", "jabuticaba", "jackfruit",
    "longan", "lychee", "mangosteen", "marang", "medlar", "naranjilla", "noni", "papaya", "pawpaw", "pitanga",
    "pitaya", "pulasan", "rambutan", "sapodilla", "soursop", "surinam", "tamarillo", "ugli", "wampi", "yangmei",
    "yuzu", "santol", "velvet", "abiu", "ackee", "atemoya", "bacuri", "bilimbi", "calamondin", "cherimoya",
    "cupuassu", "damson", "durian", "elephant", "feijoa", "fuyu", "gac", "genip", "horned", "imbe",
    "ita", "jambolan", "keppel", "kwai", "langsat", "lucuma", "mamey", "mamoncillo", "marang", "miracle",
    "monstera", "oroblanco", "passiflora", "pili", "pitomba", "pomelo", "rambutan", "redcurrant", "safou", "salak",
    "santol", "sapotilla", "santol", "soursop", "sweetsop", "tamarillo", "tamarind", "ubajay", "ugni", "umbu",
    "white", "yellow", "yunnan", "zacate", "ziziphus"
];

// Endpoint to search for words
app.get('/search', (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    // Filter words based on the query
    const filteredWords = words.filter(word => word.includes(query)).slice(0, 10);

    let test =  words.filter((item) => 
        item.toLowerCase().slice(0,query.length) === query.toLowerCase())
    .map((item) => ({name: item}));

    res.json({items : test.slice(0,10)});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

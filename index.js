
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

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
    "persimmon", "pineapple", "plum", "pomegranate", "pumpkin", "tomato", "cucumber", "squash", "bellpepper",
    "broccoli", "carrot", "cauliflower", "celery", "corn", "eggplant", "garlic", "lettuce", "onion", "peas",
    "potato", "radish", "spinach", "turnip", "asparagus", "beet", "brusselsprout", "cabbage", "chard",
    "collard", "kale", "leek", "okra", "parsnip", "rutabaga", "scallion", "shallot", "swede", "artichoke",
    "arugula", "basil", "chive", "cilantro", "dill", "fennel", "lavender", "mint", "oregano", "parsley",
    "rosemary", "sage", "thyme", "tarragon", "anise", "caraway", "cinnamon", "clove", "coriander", "cumin",
    "ginger", "nutmeg", "paprika", "pepper", "saffron", "turmeric", "almond", "cashew", "chestnut", "hazelnut",
    "macadamia", "peanut", "pecan", "pistachio", "walnut", "breadfruit", "coconut", "avocado", "passionfruit",
    "star", "statice", "stephanotis", "stock", "sunflower", "sweetpea", "tansy", "thistle", "tuberose",
    "starfruit", "boysenberry", "cranberry", "currant", "gooseberry", "huckleberry", "loganberry", "prune",
    "acerola", "barberry", "bilberry", "cloudberry", "crowberry", "goji", "hackberry", "honeyberry", "juniper",
    "lingonberry", "rowan", "salmonberry", "sea-buckthorn", "serviceberry", "snowberry", "thimbleberry",
    "tomatillo", "whitebeam", "aronia", "babaco", "bignay", "camachile", "capuli", "cempedak", "cherimoya",
    "cupuacu", "feijoa", "grumichama", "imbe", "jabuticaba", "longan", "mangosteen", "marang", "medlar",
    "naranjilla", "noni", "pawpaw", "pitanga", "pitaya", "pulasan", "rambutan", "sapodilla", "soursop",
    "surinam", "tamarillo", "wampi", "yangmei", "yuzu", "santol", "velvet", "abiu", "ackee", "atemoya",
    "bacuri", "bilimbi", "calamondin", "cupuassu", "damson", "durian", "elephant", "fuyu", "gac", "genip",
    "horned", "ita", "jambolan", "keppel", "kwai", "langsat", "lucuma", "mamey", "mamoncillo", "miracle",
    "monstera", "oroblanco", "passiflora", "pili", "pitomba", "pomelo", "redcurrant", "safou", "salak",
    "sapotilla", "sweetsop", "ubajay", "ugni", "umbu", "zacate", "ziziphus", "acai", "amaranth", "aronia",
    "blackcurrant", "chokeberry", "quinoa", "buckwheat", "chia", "flaxseed", "hemp", "kamut", "millet", "sorghum", 
    "spelt", "teff", "triticale", "barley", "oat", "rye", "wheat", "maize", "rice", "wildrice", "kiwano", "yuzu", 
    "camu", "physalis", "wolfberry",

    // 1000 new words start here
    "bamboo", "persian", "florist", "snorkel", "elevator", "gazebo", "monsoon", "obelisk", "velvet", "driftwood",
    "thunderstorm", "umbrella", "volcano", "whirlpool", "xylophone", "yacht", "zephyr", "zeppelin", "turret",
    "tornado", "smokestack", "plankton", "waterfall", "turbine", "crystal", "meadow", "foxtrot", "cabana", "bonsai",
    "anvil", "lighthouse", "roadrunner", "prairie", "eagle", "harbor", "caravan", "chameleon", "cannonball",
    "quagmire", "archipelago", "delta", "fjord", "mirage", "glacier", "geyser", "igloo", "albatross", "badger",
    "coral", "dune", "heather", "inlet", "kraken", "lagoon", "marsh", "moor", "oasis", "quartz", "ravine", "sequoia",
    "starlight", "tarantula", "vortex", "whale", "xerox", "zeppelin", "bathtub", "breadbasket", "windmill", "zipper",
    "tapestry", "lighthouse", "orchid", "lotus", "harpsichord", "parrot", "stingray", "platypus", "nuthatch",
    "sunshine", "firefly", "bison", "sundial", "kayak", "manatee", "narwhal", "peacock", "quokka", "radiator",
    "seahorse", "timepiece", "umbrella", "wombat", "yeti", "zephyr", "airship", "zeppelin", "crayfish", "lynx",
    "drumstick", "fossil", "hummingbird", "iceberg", "jellyfish", "koala", "mangrove", "newt", "otter", "pelican",
    "quail", "raccoon", "starfish", "tapir", "unicorn", "vulture", "wolverine", "xenon", "yarn", "zebra", "aspen",
    "blossom", "cedar", "daisy", "elm", "fir", "gardenia", "hemlock", "ivy", "jacaranda", "karoo", "lavender",
    "magnolia", "narcissus", "oak", "palm", "quince", "rose", "sunflower", "tulip", "umbra", "violet", "willow",
    "xylosma", "yew", "zinnia", "aster", "begonia", "crocus", "dandelion", "eggnog", "fennel", "geranium", "hibiscus",
    "iris", "jasmine", "kudzu", "lily", "marigold", "nectar", "oregano", "peony", "quandary", "rhododendron",
    "sagebrush", "tamarind", "ulmus", "verbena", "walnut", "xiphoid", "yam", "zenith", "acorn", "bark", "chimera",
    "diadem", "elm", "fauna", "grotto", "harp", "incense", "jewel", "karma", "lava", "mantra", "nymph", "obsidian",
    "pyramid", "quasar", "raven", "sphinx", "tesseract", "utopia", "vesper", "wind", "xerophyte", "yarn", "zenith",
    "acacia", "buckwheat", "cattail", "dune", "elmwood", "feather", "ginkgo", "hickory", "iris", "juniper", "kale",
    "lichen", "mallow", "nectar", "oak", "poppy", "quinoa", "rhubarb", "spruce", "tumbleweed", "undergrowth",
    "violet", "willow", "xanadu", "yarrow", "zeppelin", "agate", "basalt", "coral", "diatom", "earthquake", "fossil",
    "granite", "honeycomb", "igneous", "jasper", "kiln", "limestone", "marble", "nebula", "obsidian", "pyrite",
    "quartz", "rose", "stalactite", "tornado", "updraft", "ventifact", "windmill", "xenolith", "yardang", "zircon",
    "algae", "barnacle", "coral", "diatom", "eel", "flounder", "goby", "haddock", "iceberg", "jellyfish", "krill",
    "lobster", "mackerel", "narwhal", "octopus", "piranha", "quahog", "reef", "starfish", "tuna", "urchin", "viper",
    "whale", "xenops", "yellowfin", "zebra", "alpaca", "bat", "cat", "dog", "elephant", "flamingo", "goat", "hippo",
    "iguana", "jaguar", "kangaroo", "lemur", "monkey", "narwhal", "ostrich", "parrot", "quokka", "raven", "sloth",
    "tapir", "urchin", "vulture", "wolf", "xerus", "yak", "zebu", "alpaca", "buffalo", "chinchilla", "deer", "eagle",
    "fox", "giraffe", "hamster", "impala", "jackal", "koala", "llama", "meerkat", "newt", "owl", "porcupine", "quail",
    "reindeer", "salamander", "tortoise", "uakari", "vole", "walrus", "xenops", "yak", "zebra", "armadillo", "beaver",
    "capybara", "dolphin", "elk", "falcon", "gazelle", "hedgehog", "ibex", "jellyfish", "kiwi", "lynx", "moose", "newt",
    "okapi", "penguin", "quokka", "raccoon", "skunk", "tiger", "umbrellabird", "vulture", "wombat", "xerus", "yak",
    "zebu", "abyssinian", "bandicoot", "cassowary", "dugong", "echidna", "flamingo", "gazelle", "heron", "ibis", 
    "jackal", "kiwi", "lemur", "marmoset", "narwhal", "owl", "panther", "quoll", "rhinoceros", "stoat", "tapir", 
    "unicorn", "viper", "wallaby", "xenopus", "yak", "zebra"
];


// Endpoint to search for words
app.get('/search', (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).send('Query parameter is required');
    }

    // Filter words based on the query
    const uniqueWords = [...new Set(words)];
    const filteredWords = uniqueWords.filter(word => word.includes(query)).slice(0, 10);

    let test =  uniqueWords.filter((item) => 
        item.toLowerCase().slice(0,query.length) === query.toLowerCase())
    .map((item) => ({name: item}));

    res.json({items : test.slice(0,10)});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

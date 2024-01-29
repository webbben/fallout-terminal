export const text = {
    hackScreen: {
        header: "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL",
        body: "This is a paragraph of example text, just to see how it types out on the screen.",
        passwords: ['abstract', 'achilles', 'affinity', 'affluent', 'ambition', 'argument', 'aviation', 'autonomy', 'augustus', 'aurelian', 'aurelius', 'autocrat', 'arminius',
        'baseball', 'bakesale', 'ballista', 'basileus',
        'campaign', 'commodus', 'complete', 'compound', 'computer', 'congress', 'consider', 'constant', 'consumer', 'calculus', 'contract', 'caesarea', 'cavalier', 'champion',
        'diameter', 'diadochi', 'director', 'disclose', 'discount', 'discreet', 'document', 'database', 'denarius',
        'emphasis', 'emulator', 'explicit', 'electron', 'electric', 'election', 'external', 'explorer',
        'football', 'firmware', 'frontend',
        'gradient', 'graduate', 'galactic',
        'headline', 'hercules', 'hardware', 'holistic',
        'innocent', 'instinct', 'interact', 'infinity', 'lighting',
        'magazine', 'mainline', 'merchant', 'minister', 'mystical', 'mythical', 'marathon', 'menelaus',
        'obsolete', 'odysseus', 'original', 
        'personal', 'pleasant', 'pompeius', 'poseidon', 'precinct', 'quantity', 'platonic', 'progress', 'particle',
        'referral', 'referree', 'response', 'reproach', 
        'sentence', 'separate', 'shinjuku', 'socrates', 'software', 'solitude', 'stunning', 'sukiyaki', 
        'tendency', 'terminal', 'tokugawa', 'tolerant', 'traction', 'traianus', 'tyrannis',
        'vertical', 'validate',
        'yakiniku', 'yakitori', 'yakisoba', 'yokohama', 'takayama', 'harajuku', 'hokkaido', 
        'spurious', 'nebulous', 'infamous', 'syllabus', 'ravenous', 'collosus', 'invictus', 'cerberus', 'sisyphus', 'morpheus', 'aquarius', 'dionysus', 'pandarus', 'hesperus', 'diomedes',
        'emporium', 'imperium', 'polonium', 'archives', 'diogenes', 'aviation', 'oblivion', 'scorpion', 'stallion', 'commando', 'komnenos', 'analysis', 'arquebus', 'atlantis',
        'katakana', 'basilica', 'magnolia', 'mongolia', 'timbuktu', 'honolulu', 'shanghai', 'stingray', 'chimaera', 'hydrogen', 'myrmidon', 'mariachi', 'calamari', 'carthage', 'tomahawk',
        'hibernia', 'tomatoes', 
        ],
        gibberish_char: [
            "!","@","#","$","%","^","&","*","_","+","=","|",";","?","/",
            "1","2","3","4","5","6","7","8","9","0","~",",",".",":","-",
            "f","g","h","i","j","k","v","w","x","y","z","≈","ç","√","ƒ","∆","¬","æ","œ","∑","¥","ø","π","£","¢","§"
        ],
        brackets: [
            ["(",")"], ["[","]"], ["{","}"], ["<",">"]
        ]
    }
}

// each line will be a line marker, and then a series of gibberish combined with brackets and passwords
// theoretically these lines should be the same length, so that will probably be the main challenge
export function generateLines() {
    const numLines = 18;
    const lineMarkers = generateLineNumbers(numLines);
    const lineLength = 30;
    let lines = [];
    let words = [...text.hackScreen.passwords];
    shuffleArray(words);
    let usedWords = [];

    // for each line, try to fit in a password, then try to fit in gibberish strings of descending length
    // each line must be the same length (lineLength)
    // then shuffle the contents of that line
    for (let i = 0; i < numLines; i++) {
        let curLen = lineLength;
        let curLine = [];
        // adding password
        if (Math.random() > 0.2) {
            let curWord = words.pop().toUpperCase();
            curLine.push(curWord);
            usedWords.push(curWord);
            curLen -= curWord.length;
        }
        // adding brackets
        if (Math.random() > 0.6) {
            let bracket = generateBrackets(6 - (Math.random() * 5));
            curLine.push(bracket);
            curLen -= bracket.length;
        }
        
        // fill in the remaining space with gibberish characters
        while (curLen > 0) {
            curLine.push(generateGibberish(1));
            curLen -= 1;
        }
        shuffleArray(curLine);
        curLine.unshift(lineMarkers.shift());
        lines.push(curLine);
    }
    
    shuffleArray(usedWords);
    return [lines, usedWords.pop(), usedWords];
}

function generateGibberish(length) {
    length = Math.round(length);
    if (length < 1) { length = 1; }

    let chars = [...text.hackScreen.gibberish_char];
    shuffleArray(chars);
    let str = "";

    for (let i = 0; i < length; i++) { str += chars.pop(); }
    return str;
}

function generateBrackets(length) {
    length = Math.round(length);
    if (length < 2) { length = 2; }

    let brackets = text.hackScreen.brackets[Math.floor(Math.random() * 4)]

    let str = brackets[0] + (length > 2 ? generateGibberish(length - 2) : "") + brackets[1];
    return str;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// returns a list of strings that represent the 0xF### numbers you see on the side of the hacking terminal
// these numbers go in increasing order, where numbers 0 - 9 are less than letters A - F, and they skip at random intervals
export function generateLineNumbers(numLines = 30) {
    const prefix = "0xF"; // we will always start with F, which is the highest value
    let output = [];
    let curVal = { hun: 0, ten: 0, one: 0 };
    
    curVal.hun = Math.floor(Math.random() * 13);
    curVal.ten = Math.floor(Math.random() * 13);
    curVal.one = Math.floor(Math.random() * 13);

    for (let i = 0; i < numLines; i++) {
        curVal.one += (1 + Math.floor(Math.random() * 15));
        if (curVal.one > 15) {
            curVal.one = 0;
            curVal.ten += 1;
        }
        if (curVal.ten > 15) {
            curVal.ten = 0;
            curVal.hun += 1;
        }
        if (curVal.hun > 15) {
            curVal.hun = 0;
        }

        // build string of prefix + converted curVal
        let str = "  " + prefix + formatNum(curVal.hun) + formatNum(curVal.ten) + formatNum(curVal.one) + "  ";
        output.push(str);
    }

    return output;
}

function formatNum(val) {
    const alpha = ["A", "B", "C", "D", "E", "F"];
    if (val > 9) {
        return alpha[val - 10];
    }
    return val;
}
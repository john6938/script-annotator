var runner = require('./annotationRunner.js');

function annotate(plainText) {
    var exceptCases = ["Mr.", "Ms.", "Mrs.", "Miss.", "Mt.", "N.Y.", "Prof."];

    // Add newline for triple slac
    var text = plainText + "\n";

    // Add triple slashs text
    text = text.replace(/([\w()%]+[\.\!?]+)("?)([ \n])/g, function (n0, n1, n2, n3) {
        // If n1 is in exception cases (such as 'Mr.' or 'Ms.')
        if (exceptCases.includes(n1)) {
            return n1 + n2 + n3 + " ";
        } else {
            return n1 + n2 + "<span class='slash3'>///</span> " + n3;
        }
    });

    // Add double slashs to text
    text = text.replace(/([\,\:\;])([ \n])/g, "$1<span class='slash2'>//</span> ");

    // Add single slashs to text
    text = text.replace(/(\w+)\s+(after|although|because|before|but|considering|directorly|however|though|when|whenever|whether|while)([ \n])/g, "$1<span class='slash1'>/</span> $2 $3 ");

    // Add single slashs to text
    text = text.replace(/(Today)([ \n])([\w\']+)/g, function (n0, n1, n2, n3) {
        if (n3 == "is" || n3 == "isn't") { // This is for "Today is ..."
            return n1 + n2 + n3;
        } else {
            return n1 + "<span class='slash1'>/</span> " + n2 + n3;
        }
    });

    // Add single slashs to text
    text = text.replace(/(Accordingly|Also|Besides|Consequently|Conversely|Finally|Furthermore|Hence|However|Indeed|Instead|Likewise|Meanwhile|Moreover|Nevertheless|Next|Nonetheless|Otherwise|Similarly|Still|Subsequently|Then|Therefore|Thus)([ \n])/g, "$1<span class='slash1'>/</span> $2");

    // Newline to <br>
    text = text.replace(/\n/g, "<br>");
    return text;
};

module.exports = {
    id: "pausing",
    run: annotate,
    type: runner.types.all
}
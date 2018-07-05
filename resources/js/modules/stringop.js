export default class StringOp {
    static sentenceCase(string) {
        var rg = /(^\w{1}|\.\s*\w{1})/gi;
        return string.replace(rg, function(toReplace) {
            return toReplace.toUpperCase();
        });
    }

    // Really basic, disappoints Williams
    static isQuestion(string) {
        var interrogatives = [
            "is",
            "are",
            "was",
            "were",
            "will",
            "would",
            "how",
            "what",
            "why",
            "where",
            "when",
            "whence",
            "which",
            "who",
            "whom",
            "whose",
            "whither",
            "shall",
            "should",
            "can",
            "could"
        ];
        return interrogatives.includes(string.split(` `)[0].split(`'`)[0]);
    }
}

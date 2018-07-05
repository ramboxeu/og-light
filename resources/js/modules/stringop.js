export default class StringOp {
    static SentenceCase(string) {
        var rg = /(^\w{1}|\.\s*\w{1})/gi;
        return string.replace(rg, function(toReplace) {
            return toReplace.toUpperCase();
        });
    }
}

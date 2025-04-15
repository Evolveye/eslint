export default function findTokenIndex(tokenValue, tokens, startFrom = 0, maxSearchIndex = (startFrom + 5)) {
    const max = tokens.length > maxSearchIndex
        ? maxSearchIndex
        : tokens.length;
    for (let i = startFrom; i < max; ++i) {
        if (tokens[i].value != tokenValue)
            continue;
        return i;
    }
}

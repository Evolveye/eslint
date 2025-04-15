export default function validateSpacesInCtx(preRequiredData, a, b, openOrClose) {
    const { context, code, insertSpaces } = preRequiredData;
    const undesirableErr = `undesirableSpace` + (openOrClose === `open` ? `Start` : `End`);
    const missingErr = `missingSpace` + (openOrClose === `open` ? `Start` : `End`);
    if (code.isSpaceBetween(a, b)) {
        if (!insertSpaces) {
            context.report({
                loc: {
                    start: a.loc.end,
                    end: b.loc.start,
                },
                messageId: undesirableErr,
                fix: fixer => fixer.removeRange([a.range[1], b.range[0]]),
            });
        }
        else {
            if (a.loc.end.column < b.loc.start.column - 1) {
                context.report({
                    loc: {
                        start: { line: a.loc.end.line, column: a.loc.end.column + 1 },
                        end: b.loc.start,
                    },
                    messageId: undesirableErr,
                    fix: fixer => fixer.removeRange([a.range[1] + 1, b.range[0]]),
                });
            }
        }
    }
    else if (insertSpaces) {
        context.report({
            loc: openOrClose === `open` ? a.loc : b.loc,
            messageId: missingErr,
            fix: fixer => fixer.insertTextAfterRange(a.range, ` `),
        });
    }
}

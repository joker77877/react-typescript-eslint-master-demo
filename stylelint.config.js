module.exports = {
    extends: ['stylelint-config-recommended', 'stylelint-config-prettier'],
    rules: {
        // 'selector-nested-pattern': '^(-|\.):(?:hover|focus|header|filter)$',
        'selector-nested-pattern': '^[\\s\\S]*$',
        // 'selector-nested-pattern': '^&-*$',
        'no-descending-specificity': null,
        'selector-type-no-unknown': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global']
            }
        ]
    }
};

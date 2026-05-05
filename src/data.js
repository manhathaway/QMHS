const FORM_SCHEMA = [
    { id: 'name', label: 'Name', type: 'text' },

    { id: 'new_customer', label: 'New Customer?', type: 'checkbox' },
    {
        id: 'address',
        label: 'Address',
        type: 'textarea',
        enabledWhen: (form) => form.new_customer
    },

    { id: 'salesman', label: 'Salesman', type: 'select', data: 'salesman' },

    {
        id: 'city',
        label: 'City',
        type: 'text',
        enabledWhen: (form, ctx) =>
            ctx.selectedSalesman?.region === 'AZ'
    },

    { id: 'email_date', label: 'Email Date', type: 'text' },
    { id: 'contract_date', label: 'Contract Date', type: 'date' },

    { id: 'sources', label: 'Sources', type: 'select', data: 'sources' },

    { id: 'price', label: 'Price', type: 'text' },
    { id: 'deposit', label: 'Deposit', type: 'text' },
    { id: 'depositType', label: 'Deposit Type', type: 'select', data: 'depositType' },

    { id: 'financed', label: 'Financed?', type: 'checkbox' },

    {
        id: 'amount_financed',
        label: 'Amount Financed',
        type: 'text',
        enabledWhen: (form) => form.financed
    },
    {
        id: 'account_number',
        label: 'Account Number',
        type: 'text',
        enabledWhen: (form) => form.financed
    },

    {
        id: 'progress_payments',
        label: 'Progress Payments?',
        type: 'repeatable',
        toggle: 'progress_payments',
        fields: [
            { key: 'name', placeholder: 'Payment Name' },
            { key: 'price', placeholder: 'Payment Price' }
        ]
    },

    {
        id: 'discounts',
        label: 'Discounts',
        type: 'repeatable',
        toggle: 'discounts',
        includeInitial: true,
        fields: [
            { key: 'name', placeholder: 'Discount Name' },
            { key: 'price', placeholder: 'Discount Price' }
        ]
    }
];

const SALESMEN = {
    name: 'salesman',
    list: [
        { name: '-' },
        { name: 'Sal', region: 'CA', subregion: 'SC' },
        { name: 'Zac', region: 'CA', subregion: 'SC' },
        { name: 'Dom', region: 'CA', subregion: 'SC' },
        { name: 'Dave', region: 'CA', subregion: 'NC' },
        { name: 'Nick B.', region: 'CA', subregion: 'NC' },
        { name: 'Chris', region: 'AZ' },
        { name: 'Nick M.', region: 'AZ' }
    ]
};

const SOURCES = {
    name: 'sources',
    list: [
        { name: '-' },
        { name: 'Postcard' },
        { name: 'Park Magazine' },
        { name: 'Web Ads.' },
        { name: 'Carlyn' },
        { name: 'Viki' },
        { name: 'Jose' }
    ]
};

const DEPOSIT_TYPES = {
    name: 'depositType',
    list: [
        { name: '-' },
        { name: 'CC' },
        { name: 'Check' },
        { name: 'Cash' },
        { name: 'Synchrony' }
    ]
};

export { FORM_SCHEMA, SALESMEN, SOURCES, DEPOSIT_TYPES };
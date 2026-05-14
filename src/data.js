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
        type: 'select',
        data: 'cities',
        enabledWhen: (form, ctx) =>
            ctx.selectedSalesman?.region === 'AZ'
    },

    { id: 'email_date', label: 'Email Date', type: 'text' },
    { id: 'contract_date', label: 'Contract Date', type: 'date' },

    { id: 'sources', label: 'Source', type: 'select', data: 'sources' },

    { id: 'job_name', label: 'Job Name', type: 'text' },
    { id: 'job_description', label: 'Job Description', type: 'textarea' },

    { id: 'price', label: 'Price', type: 'text', currency: true },
    { id: 'deposit', label: 'Deposit', type: 'text', currency: true },
    { id: 'depositType', label: 'Deposit Type', type: 'select', data: 'depositType' },

    { id: 'financed', label: 'Financed?', type: 'checkbox' },

    {
        id: 'amount_financed',
        label: 'Amount Financed',
        type: 'text',
        currency: true,
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
            { key: 'price', placeholder: 'Payment Price', currency: true }
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
            { key: 'price', placeholder: 'Discount Price', currency: true }
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

const AZ_CITIES = {
    name: 'AZ Cities',
    list: [
        { name: '-' },
        { name: 'N/A' },
        { name: 'Apache Junction', class: 'MP' },
        { name: 'Black Canyon City', class: 'NA' },
        { name: 'Benson', class: 'TU' },
        { name: 'Buckeye', class: 'MP' },
        { name: 'Casa Grande', class: 'MP' },
        { name: 'Cave Creek', class: 'MP' },
        { name: 'Chandler', class: 'MP' },
        { name: 'Chino Valley', class: 'NA' },
        { name: 'Cottonwood', class: 'MP' },
        { name: 'Dewey', class: 'NA' },
        { name: 'Flagstaff', class: 'NA' },
        { name: 'Gilbert', class: 'MP' },
        { name: 'Glendale', class: 'MP' },
        { name: 'Goodyear', class: 'MP' },
        { name: 'Kearny', class: 'MP' },
        { name: 'Mesa', class: 'MP' },
        { name: 'Marana', class: 'TU' },
        { name: 'New River', class: 'NA' },
        { name: 'Pheonix', class: 'MP' },
        { name: 'Preoria', class: 'MP' },
        { name: 'Prescott', class: 'NA' },
        { name: 'Queen Creek', class: 'MP' },
        { name: 'San Tan Valley', class: 'MP' },
        { name: 'Sedona', class: 'NA' },
        { name: 'Sun Lakes', class: 'MP' },
        { name: 'Superior', class: 'MP' },
        { name: 'Surprise', class: 'MP' },
        { name: 'Tempe', class: 'MP' },
        { name: 'Tucson', class: 'TU' },
        { name: 'Wickenburg', class: 'NA' },
        { name: 'Witmann', class: 'NA' },
    ]
};

const SOURCES = {
    name: 'sources',
    list: [
        { name: '-' },
        { name: 'Postcard', type: 'CI', abbreviation: 'PC' },
        { name: 'Park Magazine', type: 'CI', abbreviation: 'PM' },
        { name: 'Web Advertizements', type: 'CI', abbreviation: 'Web' },
        { name: 'Go Back' },
        { name: 'Upsale' },
        { name: 'Carlyn', type: 'WC' },
        { name: 'Viki', type: 'WC' },
        { name: 'Jose', type: 'WC' }
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

export { FORM_SCHEMA, SALESMEN, AZ_CITIES, SOURCES, DEPOSIT_TYPES };
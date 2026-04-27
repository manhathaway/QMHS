const FORM_ELEMENTS = [
    { title: 'Name',           id: 'name',            type: 'input'     },
    { title: 'New Customer?',  id: 'new-customer',    type: 'checkbox'  },
    { title: 'Address',        id: 'address',         type: 'textarea'  },
    { title: 'Salesman',       id: 'salesman',        type: 'select'    },
    { title: 'Email Date',     id: 'email-date',      type: 'input'     },
    { title: 'Contract Date',  id: 'contract-date',   type: 'date'      },
    { title: 'Sources',        id: 'sources',         type: 'select'    },
    { title: 'Price',          id: 'price',           type: 'input'     },
    { title: 'Deposit',        id: 'deposit',         type: 'input'     },
    { title: 'Deposit Type',   id: 'depositType',    type: 'select'     },
];

const SALESMEN = {
    name: 'salesman',
    list: [
        { name: '-' },
        { name: 'Sal',      region: 'CA',  subregion: 'SC'  },
        { name: 'Zac',      region: 'CA',  subregion: 'SC'  },
        { name: 'Dom',      region: 'CA',  subregion: 'SC'  },
        { name: 'Dave',     region: 'CA',  subregion: 'NC'  },
        { name: 'Nick B.',  region: 'CA',  subregion: 'NC'  },
        { name: 'Chris',    region: 'AZ'                    },
        { name: 'Nick M.',  region: 'AZ'                    }
    ]
};

const SOURCES = {
    name: 'sources',
    list: [
        { name: '-' },
        { name: 'Postcard',       type: 'CI',  abbreviation: 'PC', },
        { name: 'Park Magazine',  type: 'CI',  abbreviation: 'PM', },
        { name: 'Web Ads.',       type: 'CI'                       },
        { name: 'Carlyn',         type: 'WC'                       },
        { name: 'Viki',           type: 'WC'                       },
        { name: 'Jose',           type: 'WC'                       }
    ]
};

const DEPOSIT_TYPES = {
    name: 'deposit-types',
    list: [
        { name: '-' },
        { name: 'CC'        },
        { name: 'Check'     },
        { name: 'Cash'      },
        { name: 'Synchrony' },
    ]
};

export { FORM_ELEMENTS, SALESMEN, SOURCES, DEPOSIT_TYPES };
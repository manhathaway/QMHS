const getClass = (salesmanObj, cityObj) => {
    if (salesmanObj) {
        if (salesmanObj.region === 'CA') return salesmanObj.subregion;
        if (cityObj) return cityObj.subregion;
        return 'N/A';
    } else {
        return null;
    }
};

const getStatus = (salesmanObj) => {
    if (salesmanObj) {
        if (salesmanObj.region === 'CA') return 'Admin Ready';
        return 'Ready';
    } else {
        return null;
    }
}

const getSource = (sourceObj) => {
    if (sourceObj) {
        if (sourceObj.type && sourceObj.abbreviation) {
            return `${sourceObj.type} - ${sourceObj.abbreviation}`;
        } else if (sourceObj.type) {
            return `${sourceObj.type} - ${sourceObj.name}`;
        } else {
            return sourceObj.name;
        }
    } else {
        return null;
    }
};

const buildAddressText = (data) => {
    let text = '';

    text += data.address_name;
    text += data.address;

    return text;
};

const buildEstimateText = (data) => {
    let text = '';

    text += `${data.job_description}\n`;

    if (data.financed) {
        text += '\nSYNCHRONY\n';
        text += `   - Amount Financed: ${data.amount_financed}\n`;
        text += `   - Account Number: ${data.account_number}\n`;
    }

    if (data.progress_payments.length) {
        text += '\nPROGRESS PAYMENTS:\n';
        data.progress_payments.forEach(payment => {
            text += `   - ${payment.name}: ${payment.price}\n`;
        });
    }

    if (data.discounts.length) {
        text += '\nDISCOUNTS:\n';
        data.discounts.forEach(discount => {
            text += `   - ${discount.name}: ${discount.price}\n`;
        });
    }

    text += `\nPrice: ${data.price}`;
    text += `\nDeposit: ${data.deposit}`;
    if (data.depositType) {
        text += ` - ${data.depositType}`;
    }
    text += `\nBalance: ${data.balance}`

    return text;
};

const buildNoteText = (data) => {
    let text = '';

    text += `${data.contract_date} - ${data.price} - ${data.salesman}:\n`;
    text += `- Job entered, folder made.\n`;
    text += `- Sales email received: ${data.email_date}\n`;

    return text;
};

export {
    getClass,
    getStatus,
    getSource,
    buildAddressText,
    buildEstimateText,
    buildNoteText,
};
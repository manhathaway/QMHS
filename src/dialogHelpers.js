const getClass = (salesmanObj, cityObj) => {
    if (salesmanObj) {
        if (salesmanObj.region === 'CA') return salesmanObj.subregion;
        if (cityObj) return cityObj.subregion;
        return 'N/A';
    } else {
        return null;
    }
};

const getStatus = (getClass) => {
    if (getClass === 'AZ') return 'Ready';
    if (getClass === 'CA') return 'Admin Ready';
    return null;
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

const buildAddressText = (addressName, address) => {
    let text = '';

    text += `${addressName}\n`;
    text += address;

    return text;
};

const buildEstimateText = (job_description, formData, amount_financed, account_number, price, deposit) => {
    let text = '';

    text += `${job_description}\n`;

    if (formData.financed) {
        text += '\nSYNCHRONY\n';
        text += `   - Amount Financed: ${amount_financed}\n`;
        text += `   - Account Number: ${account_number}\n`;
    }

    if (formData.progress_payments.length) {
        text += '\nPROGRESS PAYMENTS:\n';
        formData.progress_payments.forEach(payment => {
            text += `   - ${required(payment.name)}: ${required(payment.price)}\n`;
        });
    }

    if (formData.discounts.length) {
        text += '\nDISCOUNTS:\n';
        formData.discounts.forEach(discount => {
            text += `   - ${required(discount.name)}: ${required(discount.price)}\n`;
        });
    }

    text += `\nPrice: ${price}`;
    text += `\nDeposit: ${deposit}`;
    if (formData.depositType) {
        text += ` - ${formData.depositType}`;
    }

    return text;
};

const buildNoteText = (contract_date, price, salesman, email_date) => {
    let text = '';

    text += `${contract_date} - ${price} - ${salesman}:\n`;
    text += `- Job entered, folder made.\n`;
    text += `- Sales email received: ${email_date}\n`;

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
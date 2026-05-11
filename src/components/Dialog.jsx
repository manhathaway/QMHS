import css from './Dialog.module.css';
import { useMemo, useEffect } from 'react';
import IconButton from './subcomponents/Button';
import { SALESMEN, AZ_CITIES, SOURCES } from '../data.js';

const getSelectedEntry = (data, value) => {
    return data.list.find(
        item => item.name === value
    );
};

const required = (field, errorText) => field || (errorText || '[MISSING]');

const CopyText = ({ children, ...props}) => {
    const display = required(children);

    return (
        <p
            onClick={() =>
                navigator.clipboard.writeText(display)
            }
            className={css.CopyText}
            {...props}
        >
            {display}
        </p>
    );
};

const Dialog = ({ formData }) => {
    const name = required(formData.name);
    const addressName = formData.name.replace(' ', '').split(',').reverse().join(' ') || '[MISSING NAME]';
    const address = required(formData.address, '[MISSING ADDRESS]');
    const salesman = required(formData.salesman);
    const city = required(formData.city);
    const email_date = required(formData.email_date);
    const contract_date = required(formData.contract_date);
    const sources = required(formData.sources);
    const job_name = required(formData.job_name);
    const job_description = required(formData.job_description, '[MISSING DESCRIPTION]');
    const price = required(formData.price);
    const deposit = required(formData.deposit);
    const amount_financed = required(formData.amount_financed);
    const account_number = required(formData.account_number);
    
    const salesmanObj = getSelectedEntry(SALESMEN, salesman);
    const cityObj = getSelectedEntry(AZ_CITIES, city);
    const sourceObj = getSelectedEntry(SOURCES, sources);

    const getClass = () => {
        if (salesmanObj) {
            if (salesmanObj.region === 'CA') return salesmanObj.subregion;
            if (cityObj) return cityObj.subregion;
            return 'N/A';
        } else {
            return null;
        }
    };

    const getSource = () => {
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

    const buildAddressText = () => {
        let text = '';

        text += `${addressName}\n`;
        text += address;

        return text;
    };

    const buildEstimateText = () => {
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

    const buildNoteText = () => {
        let text = '';

        text += `${contract_date} - ${price} - ${salesman}:\n`;
        text += `- Job entered, folder made.\n`;
        text += `- Sales email received: ${email_date}\n`;

        return text;
    };

    return (
        <dialog id="dialog" className={css.dialog}>
            <div id={css.dialogContainer}>
                {formData.new_customer &&
                    <div id={css.newCustomerContainer} className={css.imageContainer}>
                        <CopyText id={css.name}>{name}</CopyText>
                        <CopyText id={css.address}>{buildAddressText()}</CopyText>
                    </div>
                }
                <div id={css.addJobContainer} className={css.imageContainer}>
                    <CopyText id={css.job_name}>{job_name}</CopyText>
                </div>
                <div id={css.estimateDetailsContainer} className={css.imageContainer}>
                    <CopyText id={css.class}>{getClass()}</CopyText>
                    <CopyText id={css.contract_date}>{contract_date}</CopyText>
                    <CopyText id={css.salesman}>{salesman}</CopyText>
                    <CopyText id={css.source}>{getSource()}</CopyText>
                    <CopyText id={css.price}>{price}</CopyText>
                </div>
                <div id={css.estimateDescriptionContainer} className={css.imageContainer}>
                    <CopyText id={css.job_description}>{buildEstimateText()}</CopyText>
                </div>
                <div id={css.crmNoteContainer} className={css.imageContainer}>
                    <CopyText id={css.crm_note}>{buildNoteText()}</CopyText>
                </div>
            </div>

            <div id={css.closeButtonContainer}>
                <IconButton id={css.closeButton} commandfor="dialog" command="close">
                    Close
                </IconButton>
            </div>
        </dialog>
    );
};

export default Dialog;
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
    const salesmanObj = getSelectedEntry(SALESMEN, formData.salesman) || null;
    const cityObj = getSelectedEntry(AZ_CITIES, formData.city) || null;
    const sourceObj = getSelectedEntry(SOURCES, formData.sources) || null;

    const getClass = () => {
        if (salesmanObj) {
            if (salesmanObj.region === 'CA'){
                return salesmanObj.subregion;
            } else {
                if (cityObj) {
                    return cityObj.subregion;
                } else {
                    return 'N/A'
                }
            }
        } else {
            return null;
        }
    }

    const getSource = () => {
        if (sourceObj) {
            if (sourceObj.type && sourceObj.abbreviation) {
                return `${sourceObj.type} - ${sourceObj.abbreviation}`
            } else if (sourceObj.type) {
                return `${sourceObj.type} - ${sourceObj.name}`
            } else {
                return sourceObj.name
            }
        } else {
            return null;
        }
    };

    const buildAddressText = () => {
        let text = '';
        const name = required(formData.name.replace(' ', '').split(',').reverse().join(' '), '[MISSING NAME]');
        const address = required(formData.address, '[MISSING ADDRESS]')

        text += `${name}\n`;
        text += address;

        return text;
    }

    const buildEstimateText = () => {
        let text = '';
        
        const job_description = required(formData.job_description, '[MISSING DESCRIPTION]');
        const amount_financed = required(formData.amount_financed);
        const account_number = required(formData.account_number);
        const price = required(formData.price);
        const deposit = required(formData.deposit);

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

    return (
        <dialog id="dialog" className={css.dialog}>
            <div id={css.dialogContainer}>
                {formData.new_customer &&
                    <div id={css.newCustomerContainer} className={css.imageContainer}>
                        <CopyText id={css.name}>{formData.name}</CopyText>
                        <CopyText id={css.address}>{buildAddressText()}</CopyText>
                    </div>
                }
                <div id={css.addJobContainer} className={css.imageContainer}>
                    <CopyText id={css.job_name}>{formData.job_name}</CopyText>
                </div>
                <div id={css.estimateDetailsContainer} className={css.imageContainer}>
                    <CopyText id={css.class}>{getClass()}</CopyText>
                    <CopyText id={css.contract_date}>{formData.contract_date}</CopyText>
                    <CopyText id={css.salesman}>{formData.salesman}</CopyText>
                    <CopyText id={css.source}>{getSource()}</CopyText>
                    <CopyText id={css.price}>{formData.price}</CopyText>
                </div>
                <div id={css.estimateDescriptionContainer} className={css.imageContainer}>
                    <CopyText id={css.job_description}>
                        {buildEstimateText()}
                    </CopyText>
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
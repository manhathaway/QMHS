import css from './Dialog.module.css';
import { useMemo, useEffect } from 'react';
import IconButton from './subcomponents/Button';
import { SALESMEN, AZ_CITIES, SOURCES } from '../data.js';
import { formatCurrency } from '../formHelpers.js';
import {
    getClass,
    getStatus,
    getSource,
    buildAddressText,
    buildEstimateText,
    buildNoteText
} from '../dialogHelpers.js';

const getSelectedEntry = (data, value) => {
    return data.list.find(
        item => item.name === value
    );
};

const required = (field, errorText) => field || (errorText || '[MISSING]');

const CopyText = ({ children, overide, ...props }) => {
    return (
        <div
            onClick={() =>
                navigator.clipboard.writeText(overide || required(children))
            }
            className={css.CopyText}
            {...props}
        >
            {required(children)}
        </div>
    );
};

const Dialog = ({ formData }) => {
    const name = required(formData.name);
    const address = required(formData.address, '[MISSING ADDRESS]');
    const addressName = required(formData.name.replace(' ', '').split(',').reverse().join(' '), '[MISSING NAME]');
    const salesman = required(formData.salesman);
    const city = required(formData.city);
    const email_date = required(formData.email_date);
    const contract_date = required(formData.contract_date.split('-').slice(1).concat(formData.contract_date.split('-')[0]).join('/'));
    const job_name = required(formData.job_name);
    const job_description = required(formData.job_description, '[MISSING DESCRIPTION]');
    const price = required(formData.price);
    const price_num = required(Number(formData.price.replace(/[^0-9.-]+/g, "")));
    const deposit = required(formData.deposit);
    const deposit_num = required(Number(formData.deposit.replace(/[^0-9.-]+/g, "")));
    const balance = required(formatCurrency(price_num - deposit_num));
    const amount_financed = required(formData.amount_financed);
    const account_number = required(formData.account_number);


    const salesmanObj = getSelectedEntry(SALESMEN, formData.salesman);
    const cityObj = getSelectedEntry(AZ_CITIES, formData.city);
    const sourceObj = getSelectedEntry(SOURCES, formData.sources);

    const jobClass = required(getClass(salesmanObj, cityObj));
    const jobStatus = required(getStatus(jobClass));
    const jobSource = required(getSource(sourceObj));

    const addressText = buildAddressText(addressName, address);
    const estimateText = buildEstimateText(formData, job_description, amount_financed, account_number, price, deposit, balance);
    const noteText = buildNoteText(contract_date, price, salesman, email_date);

    const estimateDetails = {
        class: jobClass,
        contract_date: contract_date,
        salesman: salesman,
        source: jobSource,
        price: price_num
    }

    const excelRow = {
        Class: jobClass,
        Date: contract_date,
        Salesman: salesman,
        Customer: name,
        Job: job_name,
        Price: price_num,
        Status: jobStatus
    };

    return (
        <dialog id="dialog" className={css.dialog}>
            <div id={css.dialogContainer}>
                {formData.new_customer &&
                    <div id={css.newCustomerContainer} className={css.imageContainer}>
                        <CopyText id={css.name}>{name}</CopyText>
                        <CopyText id={css.address}>{addressText}</CopyText>
                    </div>
                }
                <div id={css.addJobContainer} className={css.imageContainer}>
                    <CopyText id={css.job_name}>{job_name}</CopyText>
                </div>
                <div id={css.estimateDetailsContainer} className={css.imageContainer}>
                    {Object.entries(estimateDetails).map(([key, value], index) =>
                        <CopyText key={index} id={css[key]}>{value}</CopyText>
                    )}
                </div>
                <div id={css.estimateDescriptionContainer} className={css.imageContainer}>
                    <CopyText id={css.job_description}>{estimateText}</CopyText>
                </div>
                <div id={css.crmNoteContainer} className={css.imageContainer}>
                    <CopyText id={css.crm_note}>{noteText}</CopyText>
                </div>
                <CopyText id={css.excelRowContainer} overide={Object.values(excelRow).join('\t')}>
                    <table>
                        <tr>
                            {Object.keys(excelRow).map((heading, index) =>
                                <th key={index} className={css.excelRowHeaders}>{heading}</th>
                            )}
                        </tr>
                        <tr>
                            {Object.values(excelRow).map((data, index) =>
                                <td key={index} className={css.excelRowData}>{data}</td>
                            )}
                        </tr>
                    </table>
                </CopyText>
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
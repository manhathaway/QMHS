import css from './Dialog.module.css';
import { useMemo, useEffect } from 'react';
import IconButton from './subcomponents/Button';
import { SALESMEN, AZ_CITIES, SOURCES } from '../data.js';

const getSelectedEntry = (data, value) => {
    return data.list.find(
        item => item.name === value
    );
};

const CopyText = ({ children, ...props }) => {
    return (
        <p
            onClick={() => {navigator.clipboard.writeText(children || 'MISSING')}}
            className={css.CopyText}
            {...props}
        >
            {children || 'MISSING'}
        </p>
    )
};

const Dialog = ({ formData }) => {
    const salesmanObj = getSelectedEntry(SALESMEN, formData.salesman);
    const cityObj = getSelectedEntry(AZ_CITIES, formData.city) || null;
    const sourceObj = getSelectedEntry(SOURCES, formData.sources);

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
            return 'MISSING';
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
            return 'MISSING';
        }
    };

    return (
        <dialog id="dialog" className={css.dialog}>
            <div id={css.dialogContainer}>
                {formData.new_customer &&
                    <div id={css.newCustomerContainer} className={css.imageContainer}>
                        <CopyText id={css.name}>{formData.name}</CopyText>
                        <CopyText id={css.address}>{formData.address}</CopyText>
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
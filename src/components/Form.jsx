import { useMemo, useState, useEffect } from 'react';

import css from './Form.module.css';

import {FORM_SCHEMA, SALESMEN, SOURCES, DEPOSIT_TYPES} from '../data';
import {
    buildInitialState,
    updateField,
    updateCheckbox,
    addRow,
    updateRow,
    removeRow
} from '../formHelpers';

import Dialog from './Dialog';
import DynamicSection from './subcomponents/DynamicSection';
import Button from './subcomponents/Button';

const SELECT_DATA = {
    salesman: SALESMEN,
    sources: SOURCES,
    depositType: DEPOSIT_TYPES
};

const Form = () => {
    const [formData, setFormData] = useState(
        buildInitialState(FORM_SCHEMA)
    );

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const selectedSalesman = useMemo(() => {
        return SALESMEN.list.find(
            p => p.name === formData.salesman
        );
    }, [formData.salesman]);

    const ctx = { selectedSalesman };

    const isEnabled = (field) => {
        if (!field.enabledWhen) return true;
        return field.enabledWhen(formData, ctx);
    };

    return (
        <>
            <form id={css.container}>
                {FORM_SCHEMA.map(field => {
                    if (field.type === 'repeatable') return null;

                    return (
                        <div key={field.id} className={css.entryContainer}>
                            <label className={css.label}>{field.label}</label>

                            {field.type === 'select' ? (
                                <select
                                    className={css.select}
                                    value={formData[field.id]}
                                    onChange={(e) =>
                                        updateField(setFormData, field.id, e.target.value)
                                    }
                                >
                                    {SELECT_DATA[field.data].list.map(
                                        (item, index) => (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        )
                                    )}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    className={css.textarea}
                                    value={formData[field.id]}
                                    onChange={(e) =>
                                        updateField(setFormData, field.id, e.target.value)
                                    }
                                    disabled={!isEnabled(field)}
                                />
                            ) : (
                                <input
                                    className={css.input}
                                    style={{
                                        width: field.type !== 'checkbox' ? '100%' : '30px'
                                    }}
                                    type={field.type}
                                    value={field.type !== 'checkbox' ? formData[field.id]: undefined}
                                    checked={field.type === 'checkbox' ? formData[field.id] : undefined}
                                    onChange={(e) =>
                                        field.type === 'checkbox'
                                            ? updateCheckbox(setFormData, FORM_SCHEMA, field.id, e.target.checked)
                                            : updateField(setFormData, field.id, e.target.value)
                                    }
                                    disabled={!isEnabled(field)}
                                />
                            )}
                        </div>
                    );
                })}

                {FORM_SCHEMA.filter(f => f.type === 'repeatable').map(field => {
                    if (!formData[field.toggle]) return null;

                    return (
                        <DynamicSection
                            key={field.id}
                            field={field}
                            rows={formData[field.id]}
                            addRow={(id) => addRow(setFormData, id)}
                            updateRow={(...args) => updateRow(setFormData, ...args)}
                            removeRow={(id, index) => removeRow(setFormData, id, index)}
                        />
                    );
                })}
            </form>
            <Dialog />

            <div id={css.submitButtonContainer}>
                <Button id={css.submitButton} command="show-modal" commandfor="dialog">
                    Map Data
                </Button>
            </div>
        </>
    );
};

export default Form;
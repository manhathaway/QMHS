import { useMemo, useState, useEffect } from 'react';
import css from './Form.module.css';
import { FORM_SCHEMA, SALESMEN, SOURCES, DEPOSIT_TYPES } from '../data';

const SELECT_DATA = {
    salesman: SALESMEN,
    sources: SOURCES,
    depositType: DEPOSIT_TYPES
};

const buildInitialState = () => {
    const state = {};

    FORM_SCHEMA.forEach(field => {
        if (field.type === 'checkbox') state[field.id] = false;
        else if (field.type === 'repeatable') state[field.id] = [];
        else state[field.id] = '';

        if (field.includeInitial) state.initial_price = '';
    });

    return state;
};

const Form = () => {
    const [formData, setFormData] = useState(buildInitialState());
    useEffect(() => { console.log(formData) }, [formData]);

    const selectedSalesman = useMemo(() => {
        return SALESMEN.list.find(p => p.name === formData.salesman);
    }, [formData.salesman]);

    const ctx = { selectedSalesman };

    const isEnabled = (field) => {
        if (!field.enabledWhen) return true;
        return field.enabledWhen(formData, ctx);
    };

    const updateField = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const updateCheckbox = (id, checked) => {
        setFormData(prev => {
            let updated = { ...prev, [id]: checked };

            const field = FORM_SCHEMA.find(f => f.id === id);

            if (field?.type === 'repeatable') {
                updated[id] = checked ? [{}] : [];
                if (!checked && field.includeInitial) {
                    updated.initial_price = '';
                }
            }

            return updated;
        });
    };

    const addRow = (id) => {
        setFormData(prev => ({
            ...prev,
            [id]: [...prev[id], {}]
        }));
    };

    const updateRow = (id, index, key, value) => {
        setFormData(prev => {
            const rows = [...prev[id]];
            rows[index][key] = value;
            return { ...prev, [id]: rows };
        });
    };

    const removeRow = (id, index) => {
        setFormData(prev => ({
            ...prev,
            [id]: prev[id].filter((_, i) => i !== index)
        }));
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
                                    onChange={(e) => updateField(field.id, e.target.value)}
                                >
                                    {SELECT_DATA[field.data].list.map((item, index) => (
                                        <option key={index} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === 'textarea' ? (
                                <textarea
                                    className={css.textarea}
                                    value={formData[field.id]}
                                    onChange={(e) => updateField(field.id, e.target.value)}
                                    disabled={!isEnabled(field)}
                                />
                            ) : (
                                <input
                                    className={css.input}
                                    style={{ width: field.type !== 'checkbox' ? '100%' : '30px' }}
                                    type={field.type}
                                    value={field.type !== 'checkbox' ? formData[field.id] : undefined}
                                    checked={field.type === 'checkbox' ? formData[field.id] : undefined}
                                    onChange={(e) =>
                                        field.type === 'checkbox'
                                            ? updateCheckbox(field.id, e.target.checked)
                                            : updateField(field.id, e.target.value)
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
                        <div key={field.id} className={css.addContainer}>
                            <label className={css.label}>{field.label}</label>
                            <button
                                className={`${css.button} ${css.addButton}`}
                                type="button"
                                onClick={() => addRow(field.id)}
                            >
                                +
                            </button>

                            <div className={css.dynamicContainer}>
                                {formData[field.id].map((row, i) => (
                                    <div key={i} className={css.dynamicRow}>
                                        {field.fields.map(f => (
                                            <input
                                                className={css.input}
                                                key={f.key}
                                                placeholder={f.placeholder}
                                                value={row[f.key] || ''}
                                                onChange={(e) =>
                                                    updateRow(field.id, i, f.key, e.target.value)
                                                }
                                            />
                                        ))}
                                        <button
                                            className={`${css.button} ${css.removeButton}`}
                                            type="button"
                                            onClick={() => removeRow(field.id, i)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </form>
            <dialog id="dialog" className={css.dialog}>
                <div id={css.dialogContainer}>
                    <div
                        id={css.newCustomerContainer}
                        className={css.imageContainer}
                    ></div>
                    <div
                        id={css.addJobContainer}
                        className={css.imageContainer}
                    ></div>
                    <div
                        id={css.estimateDetailsContainer}
                        className={css.imageContainer}
                    ></div>
                    <div id={css.closeButtonContainer}>
                        <button
                            id={css.closeButton}
                            className={css.button}
                            commandfor="dialog"
                            command="close"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
            <div id={css.submitButtonContainer}>
                <button
                    id={css.submitButton}
                    className={css.button}
                    command="show-modal"
                    commandfor="dialog"
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Form;
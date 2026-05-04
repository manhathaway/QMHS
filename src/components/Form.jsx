import { useEffect, useMemo, useState } from 'react';
import Select from './Subcomponents/Select';
import css from './Form.module.css';
import { FORM_ELEMENTS, SALESMEN, SOURCES, DEPOSIT_TYPES } from '../data';

const FIELD_DEPENDENCIES = {
    new_customer: ['address'],
    financed: ['amount_financed', 'account_number'],
    progress_payments: ['initial_price'],
    salesman: ['city']
};

const SELECT_DATA = {
    salesman: SALESMEN,
    sources: SOURCES,
    depositType: DEPOSIT_TYPES,
};

const Form = () => {
    const initialFormState = FORM_ELEMENTS.reduce((acc, el) => {
        if (el.type === 'checkbox') acc[el.id] = false;
        else acc[el.id] = '';
        return acc;
    }, {});
    
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        setFormData(prev => {
            let updated = { ...prev };
            let changed = false;

            Object.entries(FIELD_DEPENDENCIES).forEach(([key, fields]) => {
                if (key === 'salesman') {
                    const selected = SALESMEN.list.find(
                        person => person.name === prev.salesman
                    );

                    if (!(selected && selected.region === 'AZ')) {
                        fields.forEach(field => {
                            if (updated[field] !== '') {
                                updated[field] = '';
                                changed = true;
                            }
                        });
                    }
                } else if (!prev[key]) {
                    fields.forEach(field => {
                        if (updated[field] !== '') {
                            updated[field] = '';
                            changed = true;
                        }
                    });
                }
            });

            return changed ? updated : prev;
        });
    }, [formData]);

    const selectedSalesman = useMemo(() => {
        return SALESMEN.list.find(
            person => person.name === formData.salesman
        );
    }, [formData.salesman]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleChecked = (event) => {
        const { name, checked } = event.target;
        setFormData({ ...formData, [name]: checked })
    };

    const handleDisabled = (id) => {
        if (id === 'address') return !formData.new_customer;
        if (id === 'amount_financed' || id === 'account_number') return !formData.financed;
        if (id === 'initial_price') return !formData.progress_payments;

        if (id === 'city') {
            const selected = selectedSalesman;
            return !(selected && selected.region === 'AZ');
        }

        return false;
    };

    return (
        <form id={css.container}>
            {FORM_ELEMENTS.map((element, index) => (
                <div className={css.entryContainer} key={index}>
                    <label
                        className={css.label}
                        htmlFor={element.id}
                    >
                        {element.title}
                    </label>
                    {element.type == 'textarea' ?
                        <textarea
                            className={css.textarea}
                            name={element.id}
                            id={element.id}
                            value={formData[element.id]}
                            onChange={handleChange}
                            disabled={handleDisabled(element.id)}
                        />
                    : element.type == 'select' ? 
                        <Select
                            className={css.select}
                            name={element.id}
                            id={element.id}
                            value={formData[element.id]}
                            onChange={handleChange}
                            data={SELECT_DATA[element.id]}
                        />
                    :
                    <input
                        className={css.input}
                        type={element.type}
                        name={element.id}
                        id={element.id}
                        value={element.type != 'checkbox' ? formData[element.id] : undefined}
                        checked={element.type == 'checkbox' ? formData[element.id] : undefined}
                        onChange={element.type == 'checkbox' ? handleChecked : handleChange}
                        disabled={handleDisabled(element.id)}
                        style={{
                            width: element.type == 'checkbox' ? '26px' : '100%'
                        }}
                    />
                    }
                </div>
            ))}
        </form>
    )
}

export default Form;
export const buildInitialState = (schema) => {
    const state = {};

    schema.forEach(field => {
        if (field.type === 'checkbox') state[field.id] = false;
        else if (field.type === 'repeatable') state[field.id] = [];
        else state[field.id] = '';

        if (field.includeInitial) {
            state.initial_price = '';
        }
    });

    return state;
};

export const updateField = (setFormData, id, value) => {
    setFormData(prev => ({
        ...prev,
        [id]: value
    }));
};

export const updateCheckbox = (setFormData, schema, id, checked) => {
    setFormData(prev => {
        let updated = { ...prev, [id]: checked };

        const field = schema.find(f => f.id === id);

        if (field?.type === 'repeatable') {
            updated[id] = checked ? [{}] : [];

            if (!checked && field.includeInitial) {
                updated.initial_price = '';
            }
        }

        return updated;
    });
};

export const addRow = (setFormData, id) => {
    setFormData(prev => ({
        ...prev,
        [id]: [...prev[id], {}]
    }));
};

export const updateRow = (setFormData, id, index, key, value) => {
    setFormData(prev => {
        const rows = [...prev[id]];

        rows[index] = {
            ...rows[index],
            [key]: value
        };

        return {
            ...prev,
            [id]: rows
        };
    });
};

export const removeRow = (setFormData, id, index) => {
    setFormData(prev => ({
        ...prev,
        [id]: prev[id].filter((_, i) => i !== index)
    }));
};
import form_css from '../Form.module.css';
import css from './DynamicSection.module.css';
import Button from './Button';

const DynamicSection = ({
    field,
    rows,
    addRow,
    updateRow,
    removeRow
}) => {
    return (
        <div className={css.addContainer}>
            <label className={form_css.label}>{field.label}</label>

            <Button
                className={css.addButton}
                type="button"
                onClick={() => addRow(field.id)}
            >
                +
            </Button>

            <div className={css.dynamicContainer}>
                {rows.map((row, i) => (
                    <div key={i} className={css.dynamicRow}>
                        {field.fields.map(f => (
                            <input
                                className={form_css.input}
                                key={f.key}
                                placeholder={f.placeholder}
                                value={row[f.key] || ''}
                                onChange={(e) =>
                                    updateRow(field.id, i, f.key, e.target.value)
                                }
                            />
                        ))}

                        <Button
                            className={css.removeButton}
                            type="button"
                            onClick={() => removeRow(field.id, i)}
                        >
                            ×
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicSection;
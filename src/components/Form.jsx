import Select from './Subcomponents/Select';
import css from './Form.module.css';
import { FORM_ELEMENTS, SALESMEN, SOURCES, DEPOSIT_TYPES } from '../data';

const SELECT_DATA = {
    salesman: SALESMEN,
    sources: SOURCES,
    depositType: DEPOSIT_TYPES
};

const Form = () => {
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
                            id={element.id}
                        />
                    : element.type == 'select' ? 
                        <Select
                            className={css.select}
                            data={SELECT_DATA[element.id]}
                        />
                    :
                    <input
                        className={css.input}
                        type={element.type}
                        id={element.id}
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
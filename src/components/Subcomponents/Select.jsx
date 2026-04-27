const Select = ({ data, ...props }) => (
    <select name={data.name} id={data.name} {...props}>
        {data.list.map((item, index) => (
            <option
                key={index} value={item.name}>{item.name}</option>
        ))}
    </select>
);

export default Select;
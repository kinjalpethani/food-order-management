export const Label = (props) => {
    return (
        <label>{props.children} {props.required && <span
            className="text-danger">*</span>}</label>
    )
}
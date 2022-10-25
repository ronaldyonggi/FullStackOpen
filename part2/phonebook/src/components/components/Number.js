const  Number = ({value, onChange}) => {
    return (
        <div>
          number: <input value={value} onChange={onChange} />
        </div>
    )
}

export default Number
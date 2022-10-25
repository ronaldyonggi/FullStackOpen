const Name = ({value, onChange}) => {
    return (
        <div>
          name: <input value={value} onChange={onChange} />
        </div>
    )
}

export default Name
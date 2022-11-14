const Notification = ({message}) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 20,
        border: '3px solid green',
        borderRadius: '4px',
        padding: '9px',
        backgroundColor: '#DCDCDC'
    }

    if (message === null) return null

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
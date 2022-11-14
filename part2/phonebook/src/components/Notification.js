const Notification = ({message, errorType}) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 20,
        border: '3px solid green',
        borderRadius: '4px',
        padding: '9px',
        backgroundColor: '#DCDCDC'
    }

    const errorStyle = {
        color: 'red',
        fontStyle: 20,
        border: '3px solid red',
        borderRadius: '4px',
        padding: '9px',
        backgroundColor: '#DCDCDC'
    }

    if (message === null) return null
    // If the notification is error type, use error style
    if (errorType) return (
        <div style={errorStyle}>
            {message}
        </div>
    )
    else { // Otherwise use normal notification style
        return (
            <div style={notificationStyle}>
                {message}
            </div>
        )
    }
}

export default Notification
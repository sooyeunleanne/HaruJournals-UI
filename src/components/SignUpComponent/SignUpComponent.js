
export default function SignUpComponent( {onCloseClick, onLogInClick} ) {
    return (
        <div className='popup-container'>
            <button className='close-button' onClick={onCloseClick}> X </button>
            <h1>Sign-up</h1>
            <p>Username</p>
            <textarea className='login-textarea'></textarea>
            <p>Password</p>
            <textarea className='login-textarea'></textarea>

            <button className='connect-to-button' onClick={onLogInClick}>Log-in</button>            
        </div>
    )
}
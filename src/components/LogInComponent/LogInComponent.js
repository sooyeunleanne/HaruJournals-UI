export default function LogInComponent({ onCloseClick, onSignUpClick }) {
    return (
        <div className='popup-container'>
            <button className='close-button' onClick={onCloseClick}> X </button>
            <h1>Log-in</h1>
            <p>Username</p>
            <textarea className='login-textarea'></textarea>
            <p>Password</p>
            <textarea className='login-textarea'></textarea>
            <button className='connect-to-button' onClick={onSignUpClick}>Sign up</button>            
        </div>
    );
}
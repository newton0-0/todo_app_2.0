import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const NavBar = (props) => {
    return(
        <div className="navbar">
            <h3>Hello there</h3>
            <div className="accebilities">
                <div className="achievementbar"><EmojiEventsOutlinedIcon className="EmojiEventsOutlinedIcon"/><h2 className="score">{ props.count }</h2></div>
                <button onClick={() => {console.log('clcked to logout');}} className="logoutbutton"><h4><ExitToAppOutlinedIcon/></h4></button>
            </div>
        </div>
    )
}

export default NavBar
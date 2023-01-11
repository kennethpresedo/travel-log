import '../styles.css'
export default function Toggle() {
     return(
        <label className="switch">
            <input type="checkbox"></input>
                <span className="slider round"></span>
        </label>
    )
}
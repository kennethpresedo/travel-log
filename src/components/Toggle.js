import '../styles.css'
export default function Toggle() {
     return(<>
     <div id="toggle">
        <label className="switch">
            <input type="checkbox"></input>
                <span className="slider round"></span>
        </label>
    </div>
        </>
    )
}
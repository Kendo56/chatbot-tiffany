import "./home.css"
import { useState } from "react"

const Home = () => {

    //Estados
    const [textOut, setTextOut] = useState("")
    const [messages, setMessages] = useState([])

    async function sendMessage(e) {
        e.preventDefault()

        //Comunicacion con el servidor
        const text = textOut.trim()
        if (!text) return
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ message: textOut })
        }
        )
        const datos = await respuesta.json()
        const now = Date.now()

        //Mensajes
        setMessages((prev) => [
            ...prev,
            { id: `${now}-user`, from: "user", text },
            { id: `${now}-bot`, from: "bot", text: datos.reply },
        ])
        setTextOut("")
    }

    return (
        <section className="phoneSection">
            <div className="phone-device">
                <div className="phoneNotch"></div>
                <div className="phoneScreen">

                    <div className="phoneHeader"></div>

                    <div className="phoneBody">
                        {messages.map((msg) => {
                            const type = msg.from === "user" ? "out" : "in"

                            return (
                                <div className={`message-${type}-container`} key={msg.id}>
                                    <div className={`message-${type}-content`}>
                                        <span className={`message-${type}`}>{msg.text}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Footer: input + botón de envío */}
                    <form className="phoneFooter" onSubmit={sendMessage}>
                        <input
                            className="phoneInput"
                            type="text"
                            name="message"
                            placeholder="Type a message..."
                            value={textOut}
                            onChange={(e) => setTextOut(e.target.value)}
                        />
                        <button type="submit" className="btn-send" aria-label="Send message">
                            <svg className="sendIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <polyline points="13,6 19,12 13,18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Home
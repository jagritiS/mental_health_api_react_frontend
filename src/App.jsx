import { useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await api.post("/chat/", {
        message: message,
      });

      const botMessage = {
        sender: "bot",
        text: response.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);

      const errorMessage = {
        sender: "bot",
        text: "Server connection failed.",
      };

      setChat((prev) => [...prev, errorMessage]);
    }

    setMessage("");
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <h1 style={styles.heading}>Mental Health chatbot </h1>

        <div style={styles.messages}>
          {chat.map((msg, index) => (
            <div
              key={index}
              style={
                msg.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div style={styles.botMessage}>
              Typing...
            </div>
          )}
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            style={styles.input}
          />

          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  chatBox: {
    width: "500px",
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },

  heading: {
    textAlign: "center",
  marginBottom: "20px",
  fontSize: "28px",
  fontWeight: "bold",
  color: "#111827",
  },

  messages: {
    height: "400px",
    overflowY: "auto",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  userMessage: {
    alignSelf: "flex-end",
    background: "#2563eb",
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },

  botMessage: {
    alignSelf: "flex-start",
    background: "#e5e7eb",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px 20px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;
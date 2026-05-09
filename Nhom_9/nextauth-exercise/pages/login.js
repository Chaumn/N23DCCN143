import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    if (result.ok) {
      router.push("/");
    } else {
      setError("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        background: "white",
        borderRadius: 20,
        padding: "50px 40px",
        width: "100%",
        maxWidth: 420,
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🔐</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 30, color: "#333" }}>
          Đăng Nhập
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%", padding: "13px 15px", marginBottom: 15,
            border: "1.5px solid #ddd", borderRadius: 8, fontSize: 15,
            boxSizing: "border-box", outline: "none"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%", padding: "13px 15px", marginBottom: 20,
            border: "1.5px solid #ddd", borderRadius: 8, fontSize: 15,
            boxSizing: "border-box", outline: "none"
          }}
        />

        {error && (
          <p style={{ color: "#d32f2f", marginBottom: 15, fontSize: 14 }}>{error}</p>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%", padding: "13px", fontSize: 16, fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white", border: "none", borderRadius: 8, cursor: "pointer"
          }}
        >
          Đăng Nhập
        </button>

        <div style={{
          marginTop: 30, padding: "15px 20px",
          background: "#f8f8f8", borderRadius: 10, textAlign: "left"
        }}>
          <p style={{ fontWeight: 700, color: "#667eea", marginBottom: 8, fontSize: 13 }}>
            Demo Credentials:
          </p>
          <p style={{ fontSize: 13, color: "#555", margin: "5px 0" }}>
            👤 <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4 }}>student</code>
            {" / "}
            <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4 }}>123456</code>
            {" → ROLE_STUDENT"}
          </p>
          <p style={{ fontSize: 13, color: "#555", margin: "5px 0" }}>
            👤 <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4 }}>advisor</code>
            {" / "}
            <code style={{ background: "#eee", padding: "2px 6px", borderRadius: 4 }}>123456</code>
            {" → ROLE_ADVISOR"}
          </p>
        </div>
      </div>
    </div>
  );
}
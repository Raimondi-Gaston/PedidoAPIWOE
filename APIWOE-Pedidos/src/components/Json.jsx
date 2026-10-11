const Json = ({ titulo, data, error }) => (
    <div>
        {titulo && <strong style={{ color: error ? "crimson" : "green" }}>{titulo}</strong>}
        <pre style={{
            background: "#1e1e1e", color: "#d4d4d4", padding: 12,
            borderRadius: 6, overflow: "auto", textAlign: "left",
        }}>
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
);

export default Json;
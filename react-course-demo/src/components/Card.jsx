function Card({ title, content }) {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '10px 0', textAlign: 'left' }}>
            <h3 style={{ color: '#646cff', marginTop: 0 }}>{title}</h3>
            <p style={{ margin: 0 }}>{content}</p>
        </div>
    );
}

export default Card;

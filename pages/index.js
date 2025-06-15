import { useState } from 'react';

export default function Home() {
  const [pass, setPass] = useState('');
  const correct = 'R^9k!2Xv$eP@1#LmB7&cUq!Fz';

  if (pass === correct) {
    if (typeof window !== 'undefined') window.location = '/upload';
  }

  return (
    <div style={{ color: '#0ff', background: '#000', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Enter Password</h1>
      <input type="password" onChange={e => setPass(e.target.value)} />
      <button>Login</button>
    </div>
  );
}

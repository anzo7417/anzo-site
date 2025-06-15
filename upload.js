'use client';
import { useState, useEffect } from 'react';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      fetchFiles();
      setFile(null);
    }
  }

  async function fetchFiles() {
    const res = await fetch('/api/list');
    const data = await res.json();
    setFiles(data);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {files.map(f => (
          <li key={f.url}>
            <a href={f.downloadUrl} target="_blank" rel="noopener noreferrer">{f.pathname}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
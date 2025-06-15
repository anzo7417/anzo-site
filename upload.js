'use client';
import { useState, useEffect } from 'react';
import { upload, list } from '@vercel/blob/client';

export default function Upload() {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  async function handleUpload(e) {
    e.preventDefault();
    const blob = await upload(file.name, file, { access: 'public', handleUploadUrl: '/api/upload' });
    fetchFiles();
  }

  async function fetchFiles() {
    const res = await fetch('/api/list');
    const data = await res.json();
    setFiles(data);
  }

  useEffect(() => { fetchFiles(); }, []);

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <ul>
        {files.map(f => <li key={f.url}><a href={f.downloadUrl}>{f.pathname}</a></li>)}
      </ul>
    </div>
  );
}
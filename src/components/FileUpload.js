import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { storage, firestore } from './firebase';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setUploading(true);
        const storageRef = ref(storage, `pdfs/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const filesCollection = collection(firestore, 'pdfs');
        await addDoc(filesCollection, {
            url: downloadURL,
            fileName: file.name,
        });

        setFile(null);
        setUploading(false);
    };

    return (
        <div className="file-upload-container">
            <h2>Upload Your Medical Report</h2>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default FileUpload;

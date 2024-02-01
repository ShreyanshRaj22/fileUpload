import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { firestore, storage } from './firebase';

const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const filesCollection = collection(firestore, 'pdfs');
                const querySnapshot = await getDocs(filesCollection);

                const filesData = [];
                for (const doc of querySnapshot.docs) {
                    try {
                        const fileData = doc.data();
                        const downloadURL = await getDownloadURL(ref(storage, `pdfs/${fileData.fileName}`));
                        filesData.push({
                            id: doc.id,
                            ...fileData,
                            downloadURL,
                        });
                    } catch (innerError) {
                        console.error('Error fetching download URL:', innerError);
                    }
                }

                setFiles(filesData);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    const handleDownload = (file) => {
        const link = document.createElement('a');
        link.href = file.downloadURL;
        link.download = file.fileName;
        link.click();
    };

    return (
        <div className="file-list-container">
            <h2>Uploaded Reports</h2>
            <ul className="file-list">
                {files.map((file) => (
                    <li key={file.id} className="file-item">
                        <div>
                            <span className="file-name">{file.fileName}</span>
                        </div>
                        <button className="download-btn" onClick={() => handleDownload(file)}>Download</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;

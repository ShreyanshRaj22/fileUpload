import './App.css';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';

function App() {
  return (
    <div className="App">
      <FileUpload />
      <FileList />
    </div>
  );
}

export default App;
